import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";
import { PLAN_LABELS, PAYMENT_STATUS, PAYMENT_MODES } from "@/components/paymentConstants";

const translations = {
  es: {
    title: "Mi Suscripción",
    subtitle: "Información de tu plan actual",
    currentPlan: "Plan Actual",
    status: "Estado",
    statusActive: "Activo",
    statusInactive: "Inactivo",
    paymentMode: "Tipo de Pago",
    subscription: "Suscripción Mensual",
    onetime: "Pago Único",
    lastPayment: "Último Pago",
    amount: "Monto",
    managePlan: "Gestionar Plan",
    upgradePlan: "Mejorar Plan",
    noPlan: {
      title: "Sin Plan Activo",
      description: "Aún no tienes un plan activo. Explora nuestros planes para comenzar.",
      cta: "Ver Planes"
    },
    features: {
      basic: ["Sitio Web Responsive", "SEO Básico", "Hasta 5 Páginas", "Formulario de Contacto", "Soporte por Email"],
      professional: ["Todo lo del Básico", "CMS Autoadministrable", "Hasta 10 Páginas", "Optimización de Velocidad", "Integración Redes Sociales", "Soporte Prioritario"],
      business: ["Todo lo del Profesional", "E-commerce Completo", "Páginas Ilimitadas", "Pasarela de Pagos", "Integraciones Personalizadas", "Soporte 24/7 Dedicado"]
    }
  },
  en: {
    title: "My Subscription",
    subtitle: "Your current plan information",
    currentPlan: "Current Plan",
    status: "Status",
    statusActive: "Active",
    statusInactive: "Inactive",
    paymentMode: "Payment Type",
    subscription: "Monthly Subscription",
    onetime: "One-time Payment",
    lastPayment: "Last Payment",
    amount: "Amount",
    managePlan: "Manage Plan",
    upgradePlan: "Upgrade Plan",
    noPlan: {
      title: "No Active Plan",
      description: "You don't have an active plan yet. Explore our plans to get started.",
      cta: "View Plans"
    },
    features: {
      basic: ["Responsive Website", "Basic SEO", "Up to 5 Pages", "Contact Form", "Email Support"],
      professional: ["Everything in Basic", "Self-managed CMS", "Up to 10 Pages", "Speed Optimization", "Social Media Integration", "Priority Support"],
      business: ["Everything in Professional", "Full E-commerce", "Unlimited Pages", "Payment Gateway", "Custom Integrations", "24/7 Dedicated Support"]
    }
  }
};

export default function UserSubscription({ userEmail }) {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === "es" ? es : enUS;

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const payments = await base44.entities.Payment.filter(
          { customer_email: userEmail, status: PAYMENT_STATUS.SUCCEEDED },
          "-created_date",
          1
        );
        if (payments.length > 0) {
          setSubscription(payments[0]);
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscription();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  if (!subscription) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t.noPlan.title}
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            {t.noPlan.description}
          </p>
          <Button 
            onClick={() => navigate(createPageUrl("Planes"))}
            className="bg-blue-900 hover:bg-blue-800"
          >
            {t.noPlan.cta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  const planFeatures = t.features[subscription.plan_id] || [];

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <Card className="border-t-4 border-t-blue-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-900" />
                {t.currentPlan}
              </CardTitle>
              <CardDescription>{t.subtitle}</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200 self-start">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {t.statusActive}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Plan Name & Price */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t.currentPlan}</p>
              <h2 className="text-2xl font-bold text-blue-900">
                {PLAN_LABELS[language][subscription.plan_id] || subscription.plan_id}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">{t.amount}</p>
              <p className="text-2xl font-bold">
                ₡{((subscription.amount || 0) / 100).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Plan Details */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                {t.paymentMode}
              </p>
              <p className="font-medium">
                {subscription.payment_mode === PAYMENT_MODES.SUBSCRIPTION 
                  ? t.subscription 
                  : t.onetime
                }
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {t.lastPayment}
              </p>
              <p className="font-medium">
                {subscription.created_date 
                  ? format(new Date(subscription.created_date), "dd MMMM yyyy", { locale: dateLocale })
                  : "N/A"
                }
              </p>
            </div>
          </div>

          {/* Plan Features */}
          {planFeatures.length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-gray-700 mb-3">Incluido en tu plan:</p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {planFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              variant="outline"
              onClick={() => navigate(createPageUrl("Planes"))}
              className="flex-1"
            >
              {t.upgradePlan}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}