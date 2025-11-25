import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  CreditCard, 
  Loader2, 
  Calendar, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Plus,
  Folder
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import { PLAN_LABELS } from "@/components/paymentConstants";

const translations = {
  es: {
    title: "Mis Suscripciones",
    subtitle: "Gestiona tus suscripciones activas",
    noSubscriptions: "No tienes suscripciones activas",
    noSubscriptionsDesc: "Explora nuestros planes para comenzar",
    viewPlans: "Ver Planes",
    renewsOn: "Se renueva el",
    endsOn: "Termina el",
    cancelSubscription: "Cancelar Suscripción",
    canceling: "Cancelando...",
    canceledLabel: "Cancelada",
    activeLabel: "Activa",
    pastDueLabel: "Pago pendiente",
    incompleteLabel: "Incompleta",
    refresh: "Actualizar",
    cancelDialogTitle: "¿Cancelar suscripción?",
    cancelDialogDesc: "Tu suscripción permanecerá activa hasta el final del período actual. Después de esa fecha, no se realizarán más cobros.",
    cancelDialogCancel: "No, mantener",
    cancelDialogConfirm: "Sí, cancelar",
    projectLabel: "Proyecto",
    unnamedProject: "Sin nombre"
  },
  en: {
    title: "My Subscriptions",
    subtitle: "Manage your active subscriptions",
    noSubscriptions: "You have no active subscriptions",
    noSubscriptionsDesc: "Explore our plans to get started",
    viewPlans: "View Plans",
    renewsOn: "Renews on",
    endsOn: "Ends on",
    cancelSubscription: "Cancel Subscription",
    canceling: "Canceling...",
    canceledLabel: "Canceled",
    activeLabel: "Active",
    pastDueLabel: "Past due",
    incompleteLabel: "Incomplete",
    refresh: "Refresh",
    cancelDialogTitle: "Cancel subscription?",
    cancelDialogDesc: "Your subscription will remain active until the end of the current period. After that date, no more charges will be made.",
    cancelDialogCancel: "No, keep it",
    cancelDialogConfirm: "Yes, cancel",
    projectLabel: "Project",
    unnamedProject: "Unnamed"
  }
};

export default function UserSubscriptions({ user }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const fetchSubscriptions = async () => {
    setLoading(true);
    const { data } = await base44.functions.invoke("stripe", {
      action: "getUserSubscriptions"
    });
    setSubscriptions(data.subscriptions || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleCancelSubscription = async (subscriptionId) => {
    setCancelingId(subscriptionId);
    await base44.functions.invoke("stripe", {
      action: "cancelSubscription",
      subscriptionId
    });
    await fetchSubscriptions();
    setCancelingId(null);
    setConfirmCancel(null);
  };

  const getStatusConfig = (sub) => {
    if (sub.cancelAtPeriodEnd) {
      return { label: t.canceledLabel, icon: XCircle, className: "bg-gray-100 text-gray-700" };
    }
    switch (sub.status) {
      case "active":
        return { label: t.activeLabel, icon: CheckCircle2, className: "bg-green-100 text-green-700" };
      case "past_due":
        return { label: t.pastDueLabel, icon: AlertTriangle, className: "bg-yellow-100 text-yellow-700" };
      case "incomplete":
        return { label: t.incompleteLabel, icon: Clock, className: "bg-orange-100 text-orange-700" };
      default:
        return { label: sub.status, icon: Clock, className: "bg-gray-100 text-gray-700" };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{t.title}</h2>
          <p className="text-sm text-gray-500">{t.subtitle}</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchSubscriptions}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t.refresh}
        </Button>
      </div>

      {subscriptions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CreditCard className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noSubscriptions}</h3>
            <p className="text-gray-500 mb-6">{t.noSubscriptionsDesc}</p>
            <Button onClick={() => navigate(createPageUrl("Planes"))} className="bg-blue-900 hover:bg-blue-800">
              <Plus className="w-4 h-4 mr-2" />
              {t.viewPlans}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {subscriptions.map((sub) => {
            const statusConfig = getStatusConfig(sub);
            const StatusIcon = statusConfig.icon;
            const planLabel = PLAN_LABELS[language]?.[sub.planId] || PLAN_LABELS.es[sub.planId] || sub.planId;

            return (
              <Card key={sub.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={statusConfig.className}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                          <Badge variant="outline">{planLabel}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-700 mb-1">
                          <Folder className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">
                            {sub.projectName || t.unnamedProject}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {sub.cancelAtPeriodEnd ? t.endsOn : t.renewsOn}:{" "}
                            {format(new Date(sub.currentPeriodEnd * 1000), "d 'de' MMMM, yyyy", { locale: es })}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₡{(sub.amount / 100).toLocaleString()}
                          <span className="text-sm font-normal text-gray-500">/mes</span>
                        </span>
                        
                        {!sub.cancelAtPeriodEnd && sub.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmCancel(sub.id)}
                            disabled={cancelingId === sub.id}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            {cancelingId === sub.id ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {t.canceling}
                              </>
                            ) : (
                              t.cancelSubscription
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <AlertDialog open={!!confirmCancel} onOpenChange={() => setConfirmCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.cancelDialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.cancelDialogDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancelDialogCancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleCancelSubscription(confirmCancel)}
              className="bg-red-600 hover:bg-red-700"
            >
              {t.cancelDialogConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}