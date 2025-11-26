import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Loader2, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  RefreshCw,
  Package
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PLAN_LABELS, PAYMENT_STATUS } from "@/components/paymentConstants";

export default function UserSubscriptions({ user }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const payments = await base44.entities.Payment.filter({
        user_id: user.id,
        payment_mode: "subscription"
      });
      setSubscriptions(payments);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user.id]);

  const handleCancelSubscription = async (subscription) => {
    setCancelingId(subscription.id);
    try {
      await base44.functions.invoke("cancelSubscription", {
        subscriptionId: subscription.stripe_subscription_id
      });
      await fetchSubscriptions();
      setConfirmCancel(null);
    } catch (error) {
      console.error("Error canceling subscription:", error);
      alert("Error al cancelar la suscripción. Por favor intenta de nuevo.");
    } finally {
      setCancelingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  const activeSubscriptions = subscriptions.filter(s => 
    s.status === PAYMENT_STATUS.SUCCEEDED && 
    (!s.subscription_status || s.subscription_status === "active")
  );
  const inactiveSubscriptions = subscriptions.filter(s => 
    s.status !== PAYMENT_STATUS.SUCCEEDED || 
    (s.subscription_status && s.subscription_status !== "active")
  );

  return (
    <>
      <div className="space-y-6">
        {/* Header with refresh */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Mis Suscripciones</h2>
            <p className="text-sm text-gray-500">
              {activeSubscriptions.length} {activeSubscriptions.length === 1 ? "suscripción activa" : "suscripciones activas"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchSubscriptions}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
        </div>

        {/* Active Subscriptions */}
        {activeSubscriptions.length > 0 ? (
          <div className="grid gap-4">
            {activeSubscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                onCancel={() => setConfirmCancel(sub)}
                canceling={cancelingId === sub.id}
              />
            ))}
          </div>
        ) : (
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              No tienes suscripciones activas. Explora nuestros planes para comenzar.
            </AlertDescription>
          </Alert>
        )}

        {/* Inactive Subscriptions */}
        {inactiveSubscriptions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-700">Suscripciones Inactivas</h3>
            <div className="grid gap-4">
              {inactiveSubscriptions.map((sub) => (
                <SubscriptionCard
                  key={sub.id}
                  subscription={sub}
                  inactive
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!confirmCancel} onOpenChange={() => setConfirmCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar Suscripción?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas cancelar la suscripción para{" "}
              <strong>{confirmCancel?.project_name || "este proyecto"}</strong>?
              Esta acción no se puede deshacer y tu suscripción finalizará al término del período actual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, mantener</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleCancelSubscription(confirmCancel)}
              className="bg-red-600 hover:bg-red-700"
            >
              Sí, cancelar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function SubscriptionCard({ subscription, inactive, onCancel, canceling }) {
  const getStatusBadge = () => {
    if (inactive) {
      if (subscription.subscription_status === "canceled") {
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelada
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
          <AlertCircle className="w-3 h-3 mr-1" />
          Inactiva
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-green-100 text-green-700">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Activa
      </Badge>
    );
  };

  return (
    <Card className={inactive ? "opacity-60" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              {subscription.project_name || "Proyecto sin nombre"}
            </CardTitle>
            <CardDescription className="mt-1">
              Plan: {PLAN_LABELS.es[subscription.plan_id] || subscription.plan_id}
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Monto Mensual</p>
            <p className="font-bold text-lg">
              ₡{((subscription.amount || 0) / 100).toLocaleString()}
            </p>
          </div>
          {subscription.next_billing_date && !inactive && (
            <div>
              <p className="text-gray-500 mb-1">Próxima Facturación</p>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                {format(new Date(subscription.next_billing_date), "dd MMM yyyy", { locale: es })}
              </p>
            </div>
          )}
        </div>

        {!inactive && onCancel && (
          <div className="pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={canceling}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {canceling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cancelando...
                </>
              ) : (
                "Cancelar Suscripción"
              )}
            </Button>
          </div>
        )}

        {inactive && subscription.subscription_status === "canceled" && (
          <p className="text-xs text-gray-500 pt-2 border-t">
            Cancelada el {format(new Date(subscription.updated_date), "dd MMM yyyy", { locale: es })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}