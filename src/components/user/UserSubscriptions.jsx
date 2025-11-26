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
  X
} from "lucide-react";
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
    status: {
      active: "Activa",
      canceled: "Cancelada",
      past_due: "Pago Pendiente",
      unpaid: "Impaga",
      trialing: "Período de Prueba"
    },
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
    status: {
      active: "Active",
      canceled: "Canceled",
      past_due: "Past Due",
      unpaid: "Unpaid",
      trialing: "Trialing"
    },
    subscriptionName: "Subscription name"
  }
};

const STATUS_CONFIG = {
  active: { icon: CheckCircle2, className: "bg-green-100 text-green-700 border-green-200" },
  canceled: { icon: XCircle, className: "bg-gray-100 text-gray-700 border-gray-200" },
  past_due: { icon: Clock, className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  unpaid: { icon: AlertTriangle, className: "bg-red-100 text-red-700 border-red-200" },
  trialing: { icon: Clock, className: "bg-blue-100 text-blue-700 border-blue-200" }
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

  useEffect(() => {
    fetchSubscriptions();
  }, [user.email]);

  const fetchSubscriptions = async () => {
    try {
      const payments = await base44.entities.Payment.filter({
        customer_email: user.email,
        payment_mode: PAYMENT_MODES.SUBSCRIPTION
      });
      
      // Filter to show only subscriptions (with stripe_subscription_id) that are not failed
      const activeSubscriptions = payments.filter(
        p => p.stripe_subscription_id && p.status !== "failed"
      );
      
      setSubscriptions(activeSubscriptions);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!cancelDialog.subscription) return;
    
    setCanceling(true);
    try {
      const { data } = await base44.functions.invoke("stripe", {
        action: "cancelSubscription",
        subscriptionId: cancelDialog.subscription.stripe_subscription_id
      });

      if (data.error) throw new Error(data.error);

      // Update local state
      setSubscriptions(prev =>
        prev.map(sub =>
          sub.id === cancelDialog.subscription.id
            ? { ...sub, subscription_status: "canceled" }
            : sub
        )
      );

      // Update in database
      await base44.entities.Payment.update(cancelDialog.subscription.id, {
        subscription_status: "canceled"
      });

      setCancelDialog({ open: false, subscription: null });
    } catch (error) {
      console.error("Error canceling subscription:", error);
    } finally {
      setCanceling(false);
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
      // Use stripe_subscription_id as unique identifier
      await base44.entities.Payment.update(subscription.id, {
        subscription_name: editName
      });
      
      setSubscriptions(prev =>
        prev.map(sub =>
          sub.stripe_subscription_id === subscription.stripe_subscription_id
            ? { ...sub, subscription_name: editName }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t.noSubscriptions}
          </h3>
          <p className="text-gray-500 mb-6">{t.noSubscriptionsDesc}</p>
          <Link to={createPageUrl("Planes")}>
            <Button className="bg-blue-900 hover:bg-blue-800">
              {t.viewPlans}
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            {t.title}
            <Badge variant="secondary" className="ml-2">
              {subscriptions.length} {t.activeSubscriptions}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
              onStartEdit={() => handleStartEdit(subscription)}
              onSaveName={() => handleSaveName(subscription)}
              onCancelEdit={() => setEditingId(null)}
              onCancelSubscription={() => setCancelDialog({ open: true, subscription })}
            />
          ))}
        </CardContent>
      </Card>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialog.open} onOpenChange={(open) => setCancelDialog({ open, subscription: null })}>
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
  onStartEdit,
  onSaveName,
  onCancelEdit,
  onCancelSubscription
}) {
  const status = subscription.subscription_status || "active";
  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.active;
  const StatusIcon = statusConfig.icon;
  const displayName = subscription.subscription_name || PLAN_LABELS[language][subscription.plan_id] || subscription.plan_id;

  return (
    <div className="border rounded-lg p-4 sm:p-6 space-y-4">
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
        <Badge variant="outline" className={statusConfig.className}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {t.status[status] || status}
        </Badge>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-500">
            {status === "canceled" ? t.canceledOn : t.renewsOn}:
          </span>
          <span className="font-medium">
            {subscription.current_period_end
              ? format(new Date(subscription.current_period_end), "d MMMM yyyy", { locale: dateLocale })
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span className="text-gray-500">{t.monthlyPayment}:</span>
          <span className="font-medium">
            ₡{((subscription.amount || 0) / 100).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      {status !== "canceled" && (
        <div className="pt-4 border-t flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            onClick={onCancelSubscription}
          >
            {t.cancelSubscription}
          </Button>
        </div>
      )}
    </div>
  );
}