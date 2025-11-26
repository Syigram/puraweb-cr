import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Loader2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Pencil,
  Package,
  Save,
  X,
  HelpCircle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";
import { PLAN_LABELS, PAYMENT_MODES } from "@/components/paymentConstants";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const translations = {
  es: {
    title: "Mis Suscripciones",
    noSubscriptions: "No tienes suscripciones activas",
    noSubscriptionsDesc: "Explora nuestros planes y comienza a disfrutar de nuestros servicios.",
    viewPlans: "Ver Planes",
    activeSubscriptions: "suscripciones activas",
    renewsOn: "Se renueva el",
    canceledOn: "Cancelada, activa hasta",
    monthlyPayment: "Pago mensual",
    cancelSubscription: "Cancelar Suscripción",
    editName: "Editar Nombre",
    saveName: "Guardar",
    cancelEdit: "Cancelar",
    confirmCancel: "Confirmar Cancelación",
    confirmCancelDesc: "¿Estás seguro de que deseas cancelar esta suscripción? Seguirás teniendo acceso hasta el final del período actual.",
    keepSubscription: "Mantener Suscripción",
    yesCancel: "Sí, Cancelar",
    canceling: "Cancelando...",
    activateSubscription: "Completar Pago",
    status: {
      active: "Activa",
      canceled: "Cancelada",
      past_due: "Pago Pendiente",
      unpaid: "Impaga",
      trialing: "Período de Prueba",
      incomplete: "Incompleta",
      incomplete_expired: "Expirada"
    },
    incompleteTooltip: "Esta suscripción no se completó porque el pago inicial falló o fue abandonado. Haz clic en 'Completar Pago' para activarla.",
    subscriptionName: "Nombre de la suscripción"
  },
  en: {
    title: "My Subscriptions",
    noSubscriptions: "You don't have active subscriptions",
    noSubscriptionsDesc: "Explore our plans and start enjoying our services.",
    viewPlans: "View Plans",
    activeSubscriptions: "active subscriptions",
    renewsOn: "Renews on",
    canceledOn: "Canceled, active until",
    monthlyPayment: "Monthly payment",
    cancelSubscription: "Cancel Subscription",
    editName: "Edit Name",
    saveName: "Save",
    cancelEdit: "Cancel",
    confirmCancel: "Confirm Cancellation",
    confirmCancelDesc: "Are you sure you want to cancel this subscription? You will continue to have access until the end of the current period.",
    keepSubscription: "Keep Subscription",
    yesCancel: "Yes, Cancel",
    canceling: "Canceling...",
    activateSubscription: "Complete Payment",
    status: {
      active: "Active",
      canceled: "Canceled",
      past_due: "Past Due",
      unpaid: "Unpaid",
      trialing: "Trialing",
      incomplete: "Incomplete",
      incomplete_expired: "Expired"
    },
    incompleteTooltip: "This subscription was not completed because the initial payment failed or was abandoned. Click 'Complete Payment' to activate it.",
    subscriptionName: "Subscription name"
  }
};

const STATUS_CONFIG = {
  active: { icon: CheckCircle2, className: "bg-green-100 text-green-700 border-green-200" },
  canceled: { icon: XCircle, className: "bg-gray-100 text-gray-700 border-gray-200" },
  past_due: { icon: Clock, className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  unpaid: { icon: AlertTriangle, className: "bg-red-100 text-red-700 border-red-200" },
  trialing: { icon: Clock, className: "bg-blue-100 text-blue-700 border-blue-200" },
  incomplete: { icon: AlertTriangle, className: "bg-orange-100 text-orange-700 border-orange-200" },
  incomplete_expired: { icon: XCircle, className: "bg-red-100 text-red-700 border-red-200" }
};

export default function UserSubscriptions({ user }) {
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === "es" ? es : enUS;

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelDialog, setCancelDialog] = useState({ open: false, subscription: null });
  const [canceling, setCanceling] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [activatingId, setActivatingId] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, [user.email]);

  const fetchSubscriptions = async () => {
    try {
      // Obtener suscripciones directamente desde Stripe
      const { data } = await base44.functions.invoke("stripe", {
        action: "getSubscriptions"
      });

      if (data.error) {
        throw new Error(data.error);
      }

      // Obtener nombres personalizados guardados en la base de datos
      const payments = await base44.entities.Payment.filter({
        customer_email: user.email,
        payment_mode: PAYMENT_MODES.SUBSCRIPTION
      });

      // Crear mapa de nombres por stripe_subscription_id
      const nameMap = {};
      payments.forEach(p => {
        if (p.stripe_subscription_id && p.subscription_name) {
          nameMap[p.stripe_subscription_id] = p.subscription_name;
        }
      });

      // Combinar datos de Stripe con nombres guardados localmente
      // Filtrar suscripciones canceladas e incomplete_expired
      const subscriptionsWithNames = data.subscriptions
        .filter(sub => sub.subscription_status !== 'canceled' && sub.subscription_status !== 'incomplete_expired')
        .map(sub => ({
          ...sub,
          subscription_name: nameMap[sub.stripe_subscription_id] || sub.subscription_name,
          // Agregar id local si existe para poder actualizar
          id: payments.find(p => p.stripe_subscription_id === sub.stripe_subscription_id)?.id
        }));
      
      setSubscriptions(subscriptionsWithNames);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!cancelDialog.subscription) return;
    
    const subscriptionToCancel = cancelDialog.subscription;
    setCanceling(true);
    
    try {
      const { data } = await base44.functions.invoke("stripe", {
        action: "cancelSubscription",
        subscriptionId: subscriptionToCancel.stripe_subscription_id
      });

      if (data.error) throw new Error(data.error);

      // Remove from local state (since we don't show canceled subscriptions)
      setSubscriptions(prev =>
        prev.filter(sub => sub.stripe_subscription_id !== subscriptionToCancel.stripe_subscription_id)
      );

      // Update in database if exists
      if (subscriptionToCancel.id) {
        await base44.entities.Payment.update(subscriptionToCancel.id, {
          subscription_status: "canceled"
        });
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    } finally {
      setCanceling(false);
      setCancelDialog({ open: false, subscription: null });
    }
  };

  const handleStartEdit = (subscription) => {
    // Use stripe_subscription_id as unique identifier for editing
    setEditingId(subscription.stripe_subscription_id);
    setEditName(subscription.subscription_name || PLAN_LABELS[language][subscription.plan_id] || subscription.plan_id);
  };

  const handleSaveName = async (subscription) => {
    setSavingName(true);
    try {
      if (subscription.id) {
        // Si existe en la base de datos, actualizar
        await base44.entities.Payment.update(subscription.id, {
          subscription_name: editName
        });
      } else {
        // Si no existe, crear registro con el nombre
        const newPayment = await base44.entities.Payment.create({
          customer_email: user.email,
          plan_id: subscription.plan_id,
          payment_mode: PAYMENT_MODES.SUBSCRIPTION,
          amount: subscription.amount,
          currency: subscription.currency || 'crc',
          status: 'succeeded',
          stripe_subscription_id: subscription.stripe_subscription_id,
          stripe_customer_id: subscription.stripe_customer_id,
          subscription_status: subscription.subscription_status,
          current_period_end: subscription.current_period_end,
          subscription_name: editName
        });
        subscription.id = newPayment.id;
      }
      
      setSubscriptions(prev =>
        prev.map(sub =>
          sub.stripe_subscription_id === subscription.stripe_subscription_id
            ? { ...sub, subscription_name: editName, id: subscription.id }
            : sub
        )
      );
      
      setEditingId(null);
    } catch (error) {
      console.error("Error updating subscription name:", error);
    } finally {
      setSavingName(false);
    }
  };

  const handleActivateSubscription = async (subscription) => {
    setActivatingId(subscription.stripe_subscription_id);
    try {
      const { data } = await base44.functions.invoke("stripe", {
        action: "getSubscriptionPaymentUrl",
        subscriptionId: subscription.stripe_subscription_id
      });

      if (data.error) throw new Error(data.error);

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error activating subscription:", error);
    } finally {
      setActivatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-white overflow-hidden">
        <CardContent className="py-16 text-center relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-100/30 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.noSubscriptions}
            </h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">{t.noSubscriptionsDesc}</p>
            <Link to={createPageUrl("Planes")}>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all px-8 py-3 h-auto text-base text-white">
                {t.viewPlans}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-0 shadow-lg overflow-hidden">
        {/* Header con gradiente cálido */}
        <CardHeader className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white pb-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">{t.title}</CardTitle>
                <p className="text-amber-100 text-sm mt-1">
                  {language === 'es' ? 'Gestiona tus planes activos' : 'Manage your active plans'}
                </p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2 text-sm self-start sm:self-auto">
              {subscriptions.length} {t.activeSubscriptions}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 bg-gradient-to-b from-amber-50/50 to-white">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.stripe_subscription_id || subscription.id}
              subscription={subscription}
              language={language}
              dateLocale={dateLocale}
              t={t}
              isEditing={editingId === subscription.stripe_subscription_id}
              editName={editName}
              setEditName={setEditName}
              savingName={savingName}
              activating={activatingId === subscription.stripe_subscription_id}
              onStartEdit={() => handleStartEdit(subscription)}
              onSaveName={() => handleSaveName(subscription)}
              onCancelEdit={() => setEditingId(null)}
              onCancelSubscription={() => setCancelDialog({ open: true, subscription })}
              onActivateSubscription={() => handleActivateSubscription(subscription)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialog.open} onOpenChange={(open) => {
        if (!open && !canceling) {
          setCancelDialog({ open: false, subscription: null });
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              {t.confirmCancel}
            </DialogTitle>
            <DialogDescription>{t.confirmCancelDesc}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setCancelDialog({ open: false, subscription: null })}
              disabled={canceling}
            >
              {t.keepSubscription}
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={canceling}
            >
              {canceling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.canceling}
                </>
              ) : (
                t.yesCancel
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SubscriptionCard({
  subscription,
  language,
  dateLocale,
  t,
  isEditing,
  editName,
  setEditName,
  savingName,
  activating,
  onStartEdit,
  onSaveName,
  onCancelEdit,
  onCancelSubscription,
  onActivateSubscription
}) {
  const status = subscription.subscription_status || "active";
  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.active;
  const StatusIcon = statusConfig.icon;
  const displayName = subscription.subscription_name || PLAN_LABELS[language][subscription.plan_id] || subscription.plan_id;
  const isIncomplete = status === "incomplete";

  return (
    <TooltipProvider>
      <div className="bg-white border border-amber-100 rounded-xl p-4 sm:p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="max-w-xs"
                  placeholder={t.subscriptionName}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onSaveName}
                  disabled={savingName}
                  className="shrink-0"
                >
                  {savingName ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 text-green-600" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onCancelEdit}
                  className="shrink-0"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{displayName}</h3>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onStartEdit}
                  className="h-7 w-7"
                >
                  <Pencil className="w-3 h-3 text-gray-400" />
                </Button>
              </div>
            )}
            <p className="text-sm text-gray-500">
              {PLAN_LABELS[language][subscription.plan_id] || subscription.plan_id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={statusConfig.className}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {t.status[status] || status}
            </Badge>
            {isIncomplete && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-orange-500 hover:text-orange-600">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{t.incompleteTooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-amber-100">
          <div className="flex items-center gap-3 bg-amber-50/50 rounded-lg p-3">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <p className="text-xs text-gray-500">
                {status === "canceled" ? t.canceledOn : t.renewsOn}
              </p>
              <p className="font-semibold text-gray-900">
                {subscription.current_period_end
                  ? format(new Date(subscription.current_period_end), "d MMMM yyyy", { locale: dateLocale })
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-green-50/50 rounded-lg p-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{t.monthlyPayment}</p>
              <p className="font-semibold text-gray-900">
                ₡{((subscription.amount || 0) / 100).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {status !== "canceled" && (
          <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row justify-end gap-2">
            {isIncomplete && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all"
                onClick={onActivateSubscription}
                disabled={activating}
              >
                {activating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {language === 'es' ? 'Cargando...' : 'Loading...'}
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    {t.activateSubscription}
                  </>
                )}
              </Button>
            )}
            <Button
              size="sm"
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all"
              onClick={onCancelSubscription}
            >
              <XCircle className="w-4 h-4 mr-2" />
              {t.cancelSubscription}
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}