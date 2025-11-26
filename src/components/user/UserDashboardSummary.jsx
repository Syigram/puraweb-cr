import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Loader2,
  Calendar,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Wallet
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";
import { PAYMENT_MODES } from "@/components/paymentConstants";

const translations = {
  es: {
    activeSubscriptions: "Suscripciones Activas",
    nextPayment: "Próximo Pago",
    monthlySpend: "Gasto Mensual",
    accountStatus: "Estado de Cuenta",
    noNextPayment: "Sin pagos pendientes",
    allGood: "Todo en orden",
    attentionNeeded: "Requiere atención",
    pending: "Pagos pendientes",
    subscription: "suscripción",
    subscriptions: "suscripciones",
    perMonth: "/mes"
  },
  en: {
    activeSubscriptions: "Active Subscriptions",
    nextPayment: "Next Payment",
    monthlySpend: "Monthly Spend",
    accountStatus: "Account Status",
    noNextPayment: "No pending payments",
    allGood: "All good",
    attentionNeeded: "Attention needed",
    pending: "Pending payments",
    subscription: "subscription",
    subscriptions: "subscriptions",
    perMonth: "/month"
  }
};

export default function UserDashboardSummary({ user }) {
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === "es" ? es : enUS;

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeSubscriptions: 0,
    nextPaymentDate: null,
    nextPaymentAmount: 0,
    monthlySpend: 0,
    accountStatus: "good", // good, attention, pending
    hasIncomplete: false
  });

  useEffect(() => {
    fetchStats();
  }, [user.email]);

  const fetchStats = async () => {
    try {
      // Obtener suscripciones desde Stripe
      const { data } = await base44.functions.invoke("stripe", {
        action: "getSubscriptions"
      });

      if (data.error) throw new Error(data.error);

      const subscriptions = data.subscriptions || [];
      
      // Filtrar suscripciones activas (no canceladas ni expiradas)
      const activeSubscriptions = subscriptions.filter(
        sub => sub.subscription_status !== 'canceled' && 
               sub.subscription_status !== 'incomplete_expired'
      );

      // Calcular gasto mensual total
      const monthlySpend = activeSubscriptions
        .filter(sub => sub.subscription_status === 'active')
        .reduce((total, sub) => total + (sub.amount || 0), 0);

      // Encontrar próximo pago
      const upcomingPayments = activeSubscriptions
        .filter(sub => sub.subscription_status === 'active' && sub.current_period_end)
        .sort((a, b) => new Date(a.current_period_end) - new Date(b.current_period_end));

      const nextPayment = upcomingPayments[0];

      // Verificar si hay suscripciones incompletas o con problemas
      const hasIncomplete = activeSubscriptions.some(
        sub => sub.subscription_status === 'incomplete' || 
               sub.subscription_status === 'past_due' ||
               sub.subscription_status === 'unpaid'
      );

      // Determinar estado de cuenta
      let accountStatus = "good";
      if (hasIncomplete) {
        accountStatus = activeSubscriptions.some(
          sub => sub.subscription_status === 'past_due' || sub.subscription_status === 'unpaid'
        ) ? "attention" : "pending";
      }

      setStats({
        activeSubscriptions: activeSubscriptions.filter(
          sub => sub.subscription_status === 'active' || sub.subscription_status === 'trialing'
        ).length,
        nextPaymentDate: nextPayment?.current_period_end || null,
        nextPaymentAmount: nextPayment?.amount || 0,
        monthlySpend,
        accountStatus,
        hasIncomplete
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statusConfig = {
    good: {
      icon: CheckCircle2,
      label: t.allGood,
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      badgeClass: "bg-green-100 text-green-700"
    },
    attention: {
      icon: AlertCircle,
      label: t.attentionNeeded,
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      badgeClass: "bg-red-100 text-red-700"
    },
    pending: {
      icon: Clock,
      label: t.pending,
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      badgeClass: "bg-orange-100 text-orange-700"
    }
  };

  const currentStatus = statusConfig[stats.accountStatus];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Suscripciones Activas */}
      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {t.activeSubscriptions}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.activeSubscriptions}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {stats.activeSubscriptions === 1 ? t.subscription : t.subscriptions}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próximo Pago */}
      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {t.nextPayment}
              </p>
              {stats.nextPaymentDate ? (
                <>
                  <p className="text-3xl font-bold text-gray-900">
                    {format(new Date(stats.nextPaymentDate), "dd", { locale: dateLocale })}
                    <span className="text-lg font-medium text-gray-500 ml-1">
                      {format(new Date(stats.nextPaymentDate), "MMM", { locale: dateLocale })}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    ₡{(stats.nextPaymentAmount / 100).toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-400 mt-2">
                  {t.noNextPayment}
                </p>
              )}
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gasto Mensual */}
      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {t.monthlySpend}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                ₡{(stats.monthlySpend / 100).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {t.perMonth}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estado de Cuenta */}
      <Card className={`border-0 shadow-md hover:shadow-lg transition-shadow ${currentStatus.bgColor}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {t.accountStatus}
              </p>
              <Badge className={`${currentStatus.badgeClass} mt-2 text-sm px-3 py-1`}>
                <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
                {currentStatus.label}
              </Badge>
            </div>
            <div className={`w-12 h-12 ${currentStatus.iconBg} rounded-xl flex items-center justify-center`}>
              <StatusIcon className={`w-6 h-6 ${currentStatus.iconColor}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}