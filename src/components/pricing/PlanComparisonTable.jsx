import React, { useMemo, useCallback, memo } from "react";
import { Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageContext";

function PlanComparisonTable() {
  const { language } = useLanguage();

  // Memoize content object - only created once
  const content = useMemo(() => ({
    es: {
      title: "Comparación Detallada de Planes",
      subtitle: "Todas las características y beneficios de cada plan",
      plans: ["Básico", "Profesional", "Empresa"],
      sections: [
        {
          title: "Información General",
          rows: [
            { label: "Objetivo", values: ["Presencia digital", "Crecimiento y ventas", "Solución integral"] }
          ]
        },
        {
          title: "Características Incluidas",
          rows: [
            { label: "Hosting y dominio", values: [true, true, true] },
            { label: "Seguridad y SSL", values: [true, true, true] },
            { label: "Actualizaciones y mantenimiento", values: [true, true, true] },
            { label: "Backups", values: [true, true, true] },
            { label: "SEO", values: [true, true, true] },
            { label: "Diseño para celulares y tablets", values: [true, true, true] },
            { label: "Autogestión de contenido", values: [true, true, true] },
            { label: "Contenido", values: ["Hasta 6 páginas/secciones", "Hasta 12 páginas/secciones", "Páginas ilimitadas (uso justo)"] },
            { label: "Cancelación gratis", values: [true, true, true] }
          ]
        },
        {
          title: "Soporte y Mantenimiento",
          rows: [
            { label: "Soporte (mantenimiento)", values: ["3 horas", "5 horas", "15+ horas"] },
            { label: "Cambios mensuales", values: ["2 horas", "5 horas", "Ilimitadas (bajo fair use)"] },
            { label: "Tiempo respuesta (SLA)", values: ["48 horas", "24 horas", "4 horas"] },
            { label: "Días de atención", values: ["Lunes a Viernes", "Lunes a Viernes", "24/7 (Emergencias críticas)"] },
            { label: "Canales de atención", values: ["WhatsApp/Ticket/Email", "WhatsApp/Ticket/Email", "WhatsApp/Ticket/Email/Llamada"] }
          ]
        },
        {
          title: "Funcionalidades Web",
          rows: [
            { label: "Landing Page", values: [true, true, true] },
            { label: "Web básica", values: [true, true, true] },
            { label: "Blog", values: [true, true, true] },
            { label: "Portafolio", values: [true, true, true] },
            { label: "Galería de imágenes", values: [true, true, true] },
            { label: "Redes sociales y WhatsApp", values: [true, true, true] },
            { label: "Formulario de contacto", values: [true, true, true] },
            { label: "Sistema citas o reservas", values: [false, true, true] },
            { label: "Integración con Gmail", values: [false, true, true] },
            { label: "Notificaciones WhatsApp", values: [false, true, true] }
          ]
        },
        {
          title: "E-Commerce y Pagos",
          rows: [
            { label: "E-Commerce", values: [false, true, true] },
            { label: "Cupones y descuentos", values: [false, true, true] },
            { label: "Integración con Stripe", values: [false, true, true] },
            { label: "Pagos locales e internacionales", values: [false, true, true] },
            { label: "Suscripciones y membresías", values: [false, true, true] },
            { label: "Inventario", values: [false, true, true] }
          ]
        },
        {
          title: "Funcionalidades Avanzadas",
          rows: [
            { label: "Sitio web corporativo", values: [false, false, true] },
            { label: "Ecosistema digital completo", values: [false, false, true] },
            { label: "Formularios personalizados", values: [false, false, true] },
            { label: "Asistente virtual (IA)", values: [false, false, true] },
            { label: "Integración con APIs", values: [false, false, true] },
            { label: "Integración con DBs externas", values: [false, false, true] }
          ]
        }
      ]
    },
    en: {
      title: "Detailed Plan Comparison",
      subtitle: "All features and benefits of each plan",
      plans: ["Basic", "Professional", "Business"],
      sections: [
        {
          title: "General Information",
          rows: [
            { label: "Objective", values: ["Digital presence", "Growth and sales", "Comprehensive solution"] }
          ]
        },
        {
          title: "Included Features",
          rows: [
            { label: "Hosting and domain", values: [true, true, true] },
            { label: "Security and SSL", values: [true, true, true] },
            { label: "Updates and maintenance", values: [true, true, true] },
            { label: "Backups", values: [true, true, true] },
            { label: "SEO", values: [true, true, true] },
            { label: "Mobile and tablet design", values: [true, true, true] },
            { label: "Content self-management", values: [true, true, true] },
            { label: "Content", values: ["Up to 6 pages/sections", "Up to 12 pages/sections", "Unlimited pages (fair use)"] },
            { label: "Free cancellation", values: [true, true, true] }
          ]
        },
        {
          title: "Support and Maintenance",
          rows: [
            { label: "Support (maintenance)", values: ["3 hours", "5 hours", "15+ hours"] },
            { label: "Monthly changes", values: ["2 hours", "5 hours", "Unlimited (fair use)"] },
            { label: "Response time (SLA)", values: ["48 hours", "24 hours", "4 hours"] },
            { label: "Service days", values: ["Mon-Fri", "Mon-Fri", "24/7 (Critical emergencies)"] },
            { label: "Support channels", values: ["WhatsApp/Ticket/Email", "WhatsApp/Ticket/Email", "WhatsApp/Ticket/Email/Call"] }
          ]
        },
        {
          title: "Web Features",
          rows: [
            { label: "Landing Page", values: [true, true, true] },
            { label: "Basic website", values: [true, true, true] },
            { label: "Blog", values: [true, true, true] },
            { label: "Portfolio", values: [true, true, true] },
            { label: "Image gallery", values: [true, true, true] },
            { label: "Social media and WhatsApp", values: [true, true, true] },
            { label: "Contact form", values: [true, true, true] },
            { label: "Appointments or booking system", values: [false, true, true] },
            { label: "Gmail integration", values: [false, true, true] },
            { label: "WhatsApp notifications", values: [false, true, true] }
          ]
        },
        {
          title: "E-Commerce and Payments",
          rows: [
            { label: "E-Commerce", values: [false, true, true] },
            { label: "Coupons and discounts", values: [false, true, true] },
            { label: "Stripe integration", values: [false, true, true] },
            { label: "Local and international payments", values: [false, true, true] },
            { label: "Subscriptions and memberships", values: [false, true, true] },
            { label: "Inventory", values: [false, true, true] }
          ]
        },
        {
          title: "Advanced Features",
          rows: [
            { label: "Corporate website", values: [false, false, true] },
            { label: "Complete digital ecosystem", values: [false, false, true] },
            { label: "Custom forms", values: [false, false, true] },
            { label: "Virtual Assistant (AI)", values: [false, false, true] },
            { label: "API integration", values: [false, false, true] },
            { label: "External DB integration", values: [false, false, true] }
          ]
        }
      ]
    }
  }), []);

  const t = content[language];

  // Memoize renderValue function
  const renderValue = useCallback((value, isGeneralSection = false, rowLabel = '') => {
    if (typeof value === "boolean") {
      return (
        <div className="flex items-center justify-center">
          {value ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <X className="w-5 h-5 text-gray-300" />
          )}
        </div>
      );
    }
    

    
    return (
      <span className={`${isGeneralSection ? 'text-base font-semibold' : 'text-sm'} text-gray-700`}>
        {value}
      </span>
    );
  }, []);

  return (
    <div id="comparacion-detallada" className="pt-16 pb-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-lg">
              {t.sections.map((section, sectionIdx) => {
                const isGeneralSection = sectionIdx === 0;
                return (
                  <div key={sectionIdx}>
                    {/* Section Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-800">
                      <h3 className={`font-bold text-white ${isGeneralSection ? 'text-xl' : 'text-lg'}`}>
                        {section.title}
                      </h3>
                    </div>
                    
                    {/* Section Rows */}
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                      {sectionIdx === 0 && (
                        <thead className="bg-gray-50">
                          <tr>
                            <th className={`px-6 py-5 text-left uppercase tracking-wider w-1/4 ${
                              isGeneralSection 
                                ? 'text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700' 
                                : 'text-xs font-semibold text-gray-700'
                            }`}>
                              Plan
                            </th>
                            {t.plans.map((plan, idx) => (
                              <th
                                key={idx}
                                className={`px-6 py-5 text-center uppercase tracking-wider w-1/4 ${
                                  isGeneralSection 
                                    ? 'text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700' 
                                    : 'text-xs font-semibold text-gray-700'
                                }`}
                              >
                                {plan}
                              </th>
                            ))}
                          </tr>
                        </thead>
                      )}
                      <tbody className={`divide-y divide-gray-200 ${isGeneralSection ? 'bg-white' : 'bg-white'}`}>
                        {section.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className={`transition-colors ${
                            isGeneralSection 
                              ? 'hover:bg-gray-50' 
                              : 'hover:bg-gray-50'
                          }`}>
                            <td className={`px-6 py-5 whitespace-nowrap font-medium w-1/4 ${
                              isGeneralSection ? 'text-lg text-gray-900 font-bold' : 'text-sm text-gray-900'
                            }`}>
                              {row.label}
                            </td>
                            {row.values.map((value, valueIdx) => (
                              <td key={valueIdx} className={`px-6 text-center align-middle w-1/4 ${
                                isGeneralSection ? 'py-5' : 'py-4'
                              }`}>
                                {renderValue(value, isGeneralSection, row.label)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {t.plans.map((plan, planIdx) => (
            <Card key={planIdx} className="overflow-hidden border-2 border-gray-200 shadow-lg">
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4">
                <h3 className="text-2xl font-bold text-white text-center">{plan}</h3>
              </div>
              <CardContent className="p-6">
                {t.sections.map((section, sectionIdx) => {
                  const isGeneralSection = sectionIdx === 0;
                  return (
                    <div key={sectionIdx} className={`mb-6 last:mb-0 ${
                      isGeneralSection ? 'bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 -mx-6 px-6 py-4 rounded-lg border-l-4 border-r-4 border-blue-900' : ''
                    }`}>
                      <h4 className={`font-bold mb-3 pb-2 ${
                        isGeneralSection 
                          ? 'text-xl text-blue-900 border-b-2 border-blue-300' 
                          : 'text-lg text-gray-900 border-b-2 border-blue-200'
                      }`}>
                        {section.title}
                      </h4>
                      <div className="space-y-3">
                        {section.rows.map((row, rowIdx) => (
                          <div key={rowIdx} className="flex items-center justify-between py-2">
                            <span className={`font-medium flex-1 ${
                              isGeneralSection ? 'text-base font-bold text-gray-900' : 'text-sm text-gray-700'
                            }`}>
                              {row.label}
                            </span>
                            <div className="flex-shrink-0 ml-4">
                              {renderValue(row.values[planIdx], isGeneralSection, row.label)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(PlanComparisonTable);