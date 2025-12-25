import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const comparisonData = {
  es: {
    title: "Comparación Detallada de Planes",
    subtitle: "Todas las características y servicios incluidos en cada plan",
    plans: {
      basic: "Básico",
      professional: "Profesional",
      business: "Empresa"
    },
    categories: {
      general: "Información General",
      support: "Soporte y Mantenimiento",
      design: "Diseño y Funcionalidad Básica",
      advanced: "Características Avanzadas"
    },
    features: {
      price: "Precio mensual",
      hosting: "Hosting y dominio",
      security: "Seguridad y SSL",
      updates: "Actualizaciones y mantenimiento",
      backups: "Backups",
      supportHours: "Soporte (mantenimiento)",
      monthlyChanges: "Cambios mensuales",
      responseTime: "Tiempo respuesta (SLA)",
      attentionDays: "Días de atención",
      channels: "Canales de atención",
      responsive: "Diseño para celulares y tablets",
      seo: "SEO",
      cms: "Autogestión de contenido",
      cancellation: "Cancelación gratis",
      objective: "Objetivo",
      landing: "Landing Page",
      basicWeb: "Web básica",
      blog: "Blog",
      portfolio: "Portafolio",
      gallery: "Galería de imágenes",
      social: "Redes sociales y Whatsapp",
      contactForm: "Formulario de contacto",
      appointments: "Sistema citas o reservas",
      gmail: "Integración con Gmail",
      whatsappNotif: "Notificaciones Whatsapp",
      ecommerce: "E-Commerce",
      coupons: "Cupones y descuentos",
      stripe: "Integración con Stripe",
      payments: "Pagos locales e internacionales",
      subscriptions: "Suscripciones y membresías",
      inventory: "Inventario",
      corporate: "Sitio web corporativo",
      ecosystem: "Ecosistema digital completo",
      customForms: "Formularios personalizados",
      apis: "Integración con APIs",
      databases: "Integración con DBs externas"
    }
  },
  en: {
    title: "Detailed Plan Comparison",
    subtitle: "All features and services included in each plan",
    plans: {
      basic: "Basic",
      professional: "Professional",
      business: "Business"
    },
    categories: {
      general: "General Information",
      support: "Support and Maintenance",
      design: "Design and Basic Functionality",
      advanced: "Advanced Features"
    },
    features: {
      price: "Monthly price",
      hosting: "Hosting and domain",
      security: "Security and SSL",
      updates: "Updates and maintenance",
      backups: "Backups",
      supportHours: "Support (maintenance)",
      monthlyChanges: "Monthly changes",
      responseTime: "Response time (SLA)",
      attentionDays: "Service days",
      channels: "Support channels",
      responsive: "Mobile and tablet design",
      seo: "SEO",
      cms: "Content self-management",
      cancellation: "Free cancellation",
      objective: "Objective",
      landing: "Landing Page",
      basicWeb: "Basic website",
      blog: "Blog",
      portfolio: "Portfolio",
      gallery: "Image gallery",
      social: "Social media and Whatsapp",
      contactForm: "Contact form",
      appointments: "Appointment or booking system",
      gmail: "Gmail integration",
      whatsappNotif: "Whatsapp notifications",
      ecommerce: "E-Commerce",
      coupons: "Coupons and discounts",
      stripe: "Stripe integration",
      payments: "Local and international payments",
      subscriptions: "Subscriptions and memberships",
      inventory: "Inventory",
      corporate: "Corporate website",
      ecosystem: "Complete digital ecosystem",
      customForms: "Custom forms",
      apis: "API integration",
      databases: "External DB integration"
    }
  }
};

const tableData = [
  { 
    category: "general",
    rows: [
      { key: "price", basic: "₡100,000", professional: "₡150,000", business: "₡250,000", type: "text" },
      { key: "hosting", basic: true, professional: true, business: true, type: "bool" },
      { key: "security", basic: true, professional: true, business: true, type: "bool" },
      { key: "updates", basic: true, professional: true, business: true, type: "bool" },
      { key: "backups", basic: true, professional: true, business: true, type: "bool" }
    ]
  },
  {
    category: "support",
    rows: [
      { key: "supportHours", basic: "3 horas", professional: "5 horas", business: "15+ horas", type: "text" },
      { key: "monthlyChanges", basic: "2 horas", professional: "5 horas", business: "Ilimitadas", type: "text" },
      { key: "responseTime", basic: "48 horas", professional: "24 horas", business: "4 horas", type: "text" },
      { key: "attentionDays", basic: "Lun-Vie", professional: "Lun-Vie", business: "24/7", type: "text" },
      { key: "channels", basic: "WhatsApp/Ticket/Email", professional: "WhatsApp/Ticket/Email", business: "WhatsApp/Ticket/Email/Llamada", type: "text" }
    ]
  },
  {
    category: "design",
    rows: [
      { key: "responsive", basic: true, professional: true, business: true, type: "bool" },
      { key: "seo", basic: true, professional: true, business: true, type: "bool" },
      { key: "cms", basic: true, professional: true, business: true, type: "bool" },
      { key: "cancellation", basic: true, professional: true, business: true, type: "bool" },
      { key: "objective", basic: "Presencia digital", professional: "Crecimiento y ventas", business: "Solución integral", type: "text" },
      { key: "landing", basic: true, professional: true, business: true, type: "bool" },
      { key: "basicWeb", basic: true, professional: true, business: true, type: "bool" },
      { key: "blog", basic: true, professional: true, business: true, type: "bool" },
      { key: "portfolio", basic: true, professional: true, business: true, type: "bool" },
      { key: "gallery", basic: true, professional: true, business: true, type: "bool" },
      { key: "social", basic: true, professional: true, business: true, type: "bool" },
      { key: "contactForm", basic: true, professional: true, business: true, type: "bool" }
    ]
  },
  {
    category: "advanced",
    rows: [
      { key: "appointments", basic: false, professional: true, business: true, type: "bool" },
      { key: "gmail", basic: false, professional: true, business: true, type: "bool" },
      { key: "whatsappNotif", basic: false, professional: true, business: true, type: "bool" },
      { key: "ecommerce", basic: false, professional: true, business: true, type: "bool" },
      { key: "coupons", basic: false, professional: true, business: true, type: "bool" },
      { key: "stripe", basic: false, professional: true, business: true, type: "bool" },
      { key: "payments", basic: false, professional: true, business: true, type: "bool" },
      { key: "subscriptions", basic: false, professional: true, business: true, type: "bool" },
      { key: "inventory", basic: false, professional: true, business: true, type: "bool" },
      { key: "corporate", basic: false, professional: false, business: true, type: "bool" },
      { key: "ecosystem", basic: false, professional: false, business: true, type: "bool" },
      { key: "customForms", basic: false, professional: false, business: true, type: "bool" },
      { key: "apis", basic: false, professional: false, business: true, type: "bool" },
      { key: "databases", basic: false, professional: false, business: true, type: "bool" }
    ]
  }
];

export default function ComparisonTable() {
  const { language } = useLanguage();
  const t = comparisonData[language];
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderValue = (value, type) => {
    if (type === "bool") {
      return value ? (
        <Check className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-sm text-gray-700">{value}</span>;
  };

  // Mobile view - Cards
  if (isMobile) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
          <p className="text-gray-600 text-sm">{t.subtitle}</p>
        </div>

        {["basic", "professional", "business"].map((plan) => (
          <Card key={plan} className="overflow-hidden">
            <CardHeader className="bg-blue-900 text-white pb-4">
              <CardTitle className="text-xl text-center">{t.plans[plan]}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {tableData.map((section) => (
                <div key={section.category} className="border-b last:border-b-0">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-semibold text-sm text-gray-700">
                      {t.categories[section.category]}
                    </h3>
                  </div>
                  {section.rows.map((row) => (
                    <div key={row.key} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0">
                      <span className="text-sm text-gray-600">{t.features[row.key]}</span>
                      <div>{renderValue(row[plan], row.type)}</div>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Desktop view - Table
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.title}</h2>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="px-6 py-4 text-left font-semibold">Característica</th>
                <th className="px-6 py-4 text-center font-semibold">{t.plans.basic}</th>
                <th className="px-6 py-4 text-center font-semibold bg-blue-800">
                  <div className="flex flex-col items-center gap-1">
                    <Badge className="bg-yellow-400 text-blue-900 text-xs">Más Popular</Badge>
                    <span>{t.plans.professional}</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center font-semibold">{t.plans.business}</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((section, sectionIndex) => (
                <React.Fragment key={section.category}>
                  <tr className="bg-gray-50">
                    <td colSpan="4" className="px-6 py-3 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      {t.categories[section.category]}
                    </td>
                  </tr>
                  {section.rows.map((row, rowIndex) => (
                    <tr 
                      key={row.key} 
                      className={`border-b ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {t.features[row.key]}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderValue(row.basic, row.type)}
                      </td>
                      <td className="px-6 py-4 text-center bg-blue-50/50">
                        {renderValue(row.professional, row.type)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderValue(row.business, row.type)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}