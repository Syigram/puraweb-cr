import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Loader2, 
  CreditCard, 
  Calendar, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Clock,
  Package
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PLAN_LABELS, PAYMENT_STATUS } from "@/components/paymentConstants";
import { useLanguage } from "@/components/LanguageContext";

const translations = {
  es: {
    title: "Mis Suscripciones",
    description: "Administra tus suscripciones activas",
    noSubscriptions: "No tienes suscripciones activas",
    noSubscriptionsDesc: "Explora nuestros planes y elige el que mejor se adapte a tus necesidades.",
    viewPlans: "Ver Planes",
    active: "Activa",
    canceling: "Cancelando",
    canceled: "Cancelada",
    pending: "Pendiente",
    failed: "Fallida",
    nextBilling: "Próximo cobro",
    endsOn: "Finaliza el",
    cancelSubscription: "Cancelar Suscripción",
    reactivate: "Reactivar",
    confirmCancel: "Confirmar Cancelación",
    cancelWarning: "¿Estás seguro de que deseas cancelar esta suscripción? Mantendrás el acceso hasta el final del período actual.",
    keepSubscription: "Mantener Suscripción",
    confirmCancelBtn: "Sí, Cancelar",
    canceling_action: "Cancelando...",
    reactivating: "Reactivando...",
    unnamed: "Servicio sin nombre"
  },
  en: {
    title: "My Subscriptions",
    description: "Manage your active subscriptions",
    noSubscriptions: "You have no active subscriptions",
    noSubscriptionsDesc: "Explore our plans and choose the one that best fits your needs.",
    viewPlans: "View Plans",
    active: "Active",
    canceling: "Canceling",
    canceled: "Canceled",
    pending: "Pending",
    failed: "Failed",
    nextBilling: "Next billing",
    endsOn: "Ends on",
    cancelSubscription: "Cancel Subscription",
    reactivate: "Reactivate",
    confirmCancel: "Confirm Cancellation",
    cancelWarning: "Are you sure you want to cancel this subscription? You'll keep access until the end of the current period.",
    keepSubscription: "Keep Subscription",
    confirmCancelBtn: "Yes, Cancel",
    canceling_action: "Canceling...",
    reactivating: "Reactivating...",
    unnamed: "Unnamed service"
  }
};

export default function UserSubscriptions({ userEmail }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelDialog, setCancelDialog] = useState({ open: false, subscription: null });
  const [actionLoading, setActionLoading] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === 'es' ? es : enUS;

  const fetchSubscriptions = async () => {
    try {
      const payments = await base44.entities.Payment.filter({
        customer_email: userEmail,
        payment_mode: "subscription"
      });
      
      // Enrich with Stripe data
      const enrichedSubs = await Promise.all(
        payments.map(async (payment) => {
          if (payment.stripe_subscription_id) {
            try {
              const { data } = await base44.functions.invoke("stripe", {
                action: "getSubscription",
                subscriptionId: payment.stripe_subscription_id
              });
              return { ...payment, stripeData: data };
            } catch (e) {
              return payment;
            }
          }
          return payment;
        })
      );
      
      setSubscriptions(enrichedSubs);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [userEmail]);

  const handleCancel = async (subscription) => {
    setActionLoading(subscription.id);
    try {
      await base44.functions.invoke("stripe", {
        action: "cancelSubscription",
        subscriptionId: subscription.stripe_subscription_id
      });
      await fetchSubscriptions();
    } catch (error) {
      console.error("Error canceling subscription:", error);
    } finally {
      setActionLoading(null);
      setCancelDialog({ open: false, subscription: null });
    }
  };

  const handleReactivate = async (subscription) => {
    setActionLoading(subscription.id);
    try {
      await base44.functions.invoke("stripe", {
        action: "reactivateSubscription",
        subscriptionId: subscription.stripe_subscription_id
      });
      await fetchSubscriptions();
    } catch (error) {
      console.error("Error reactivating subscription:", error);
    } finally {
      setActionLoading(null);
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
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noSubscriptions}</h3>
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
      <div className="space-y-4">
        {subscriptions.map((sub) => (
          <SubscriptionCard
            key={sub.id}
            subscription={sub}
            onCancel={() => setCancelDialog({ open: true, subscription: sub })}
            onReactivate={() => handleReactivate(sub)}
            actionLoading={actionLoading === sub.id}
            t={t}
            dateLocale={dateLocale}
            language={language}
          />
        ))}
      </div>

      <Dialog open={cancelDialog.open} onOpenChange={(open) => setCancelDialog({ open, subscription: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              {t.confirmCancel}
            </DialogTitle>
            <DialogDescription>
              {t.cancelWarning}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setCancelDialog({ open: false, subscription: null })}
            >
              {t.keepSubscription}
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleCancel(cancelDialog.subscription)}
              disabled={actionLoading === cancelDialog.subscription?.id}
            >
              {actionLoading === cancelDialog.subscription?.id ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.canceling_action}
                </>
              ) : (
                t.confirmCancelBtn
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SubscriptionCard({ subscription, onCancel, onReactivate, actionLoading, t, dateLocale, language }) {
  const stripeData = subscription.stripeData;
  const isCanceling = stripeData?.cancel_at_period_end;
  const isActive = subscription.status === PAYMENT_STATUS.SUCCEEDED && !isCanceling;
  
  const getStatusBadge = () => {
    if (isCanceling) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
        <Clock className="w-3 h-3 mr-1" />{t.canceling}
      </Badge>;
    }
    if (subscription.status === PAYMENT_STATUS.SUCCEEDED) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        <CheckCircle2 className="w-3 h-3 mr-1" />{t.active}
      </Badge>;
    }
    if (subscription.status === PAYMENT_STATUS.PENDING) {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
        <Clock className="w-3 h-3 mr-1" />{t.pending}
      </Badge>;
    }
    if (subscription.status === PAYMENT_STATUS.CANCELED) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
        <XCircle className="w-3 h-3 mr-1" />{t.canceled}
      </Badge>;
    }
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
      <XCircle className="w-3 h-3 mr-1" />{t.failed}
    </Badge>;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {subscription.service_name || t.unnamed}
                </h3>
                <p className="text-sm text-gray-500">
                  {PLAN_LABELS[language][subscription.plan_id] || subscription.plan_id}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {getStatusBadge()}
              <span className="text-lg font-bold text-gray-900">
                ₡{((subscription.amount || 0) / 100).toLocaleString()}/mes
              </span>
            </div>

            {stripeData?.current_period_end && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {isCanceling ? t.endsOn : t.nextBilling}:{" "}
                {format(new Date(stripeData.current_period_end * 1000), "dd MMMM yyyy", { locale: dateLocale })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {isCanceling ? (
              <Button
                variant="outline"
                onClick={onReactivate}
                disabled={actionLoading}
                className="text-blue-900 border-blue-900 hover:bg-blue-50"
              >
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                {actionLoading ? t.reactivating : t.reactivate}
              </Button>
            ) : isActive ? (
              <Button
                variant="outline"
                onClick={onCancel}
                disabled={actionLoading}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {t.cancelSubscription}
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}