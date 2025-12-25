import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Globe, 
  Search, 
  FileText, 
  Mail, 
  Headphones, 
  Settings, 
  Zap, 
  Share2, 
  ShoppingCart, 
  Infinity, 
  CreditCard, 
  Puzzle, 
  Clock,
  Star
} from "lucide-react";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import ComparisonTable from "@/components/pricing/ComparisonTable";

export default function Planes() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    es: {
      title: "Elige el Plan Perfecto para Tu Negocio",
      subtitle: "Soluciones web flexibles que se adaptan a tus necesidades y presupuesto",
      mostPopular: "Más Popular",
      perMonth: "/mes",
      chooseButton: "Elegir Plan",
      allPlansInclude: "Todos los planes incluyen",
      includedItems: ["Certificado SSL gratuito", "Hosting incluido", "Asistencia con dominio"],
      plans: [
        {
          id: "basic",
          name: "Básico",
          price: "60,000",
          description: "Perfecto para pequeños negocios que inician su presencia digital",
          recommended: false,
          features: [
            { icon: Globe, text: "Sitio Web Responsive" },
            { icon: Search, text: "SEO Básico" },
            { icon: FileText, text: "Hasta 5 Páginas" },
            { icon: Mail, text: "Formulario de Contacto" },
            { icon: Headphones, text: "Soporte por Email" }
          ]
        },
        {
          id: "professional",
          name: "Profesional",
          price: "100,000",
          description: "Ideal para empresas en crecimiento que necesitan más potencia",
          recommended: true,
          features: [
            { icon: Check, text: "Todo lo del Básico" },
            { icon: Settings, text: "CMS Autoadministrable" },
            { icon: FileText, text: "Hasta 10 Páginas" },
            { icon: Zap, text: "Optimización de Velocidad" },
            { icon: Share2, text: "Integración Redes Sociales" },
            { icon: Headphones, text: "Soporte Prioritario" }
          ]
        },
        {
          id: "business",
          name: "Empresa",
          price: "150,000",
          description: "Solución completa para negocios establecidos y tiendas online",
          recommended: false,
          features: [
            { icon: Check, text: "Todo lo del Profesional" },
            { icon: ShoppingCart, text: "E-commerce Completo" },
            { icon: Infinity, text: "Páginas Ilimitadas" },
            { icon: CreditCard, text: "Pasarela de Pagos" },
            { icon: Puzzle, text: "Integraciones Personalizadas" },
            { icon: Clock, text: "Soporte 24/7 Dedicado" }
          ]
        }
      ]
    },
    en: {
      title: "Choose the Perfect Plan for Your Business",
      subtitle: "Flexible web solutions that adapt to your needs and budget",
      mostPopular: "Most Popular",
      perMonth: "/month",
      chooseButton: "Choose Plan",
      allPlansInclude: "All plans include",
      includedItems: ["Free SSL certificate", "Hosting included", "Domain assistance"],
      plans: [
        {
          id: "basic",
          name: "Basic",
          price: "60,000",
          description: "Perfect for small businesses starting their digital journey",
          recommended: false,
          features: [
            { icon: Globe, text: "Responsive Website" },
            { icon: Search, text: "Basic SEO" },
            { icon: FileText, text: "Up to 5 Pages" },
            { icon: Mail, text: "Contact Form" },
            { icon: Headphones, text: "Email Support" }
          ]
        },
        {
          id: "professional",
          name: "Professional",
          price: "100,000",
          description: "Ideal for growing companies needing more power and flexibility",
          recommended: true,
          features: [
            { icon: Check, text: "Everything in Basic" },
            { icon: Settings, text: "Self-managed CMS" },
            { icon: FileText, text: "Up to 10 Pages" },
            { icon: Zap, text: "Speed Optimization" },
            { icon: Share2, text: "Social Media Integration" },
            { icon: Headphones, text: "Priority Support" }
          ]
        },
        {
          id: "business",
          name: "Business",
          price: "150,000",
          description: "Complete solution for established businesses and online stores",
          recommended: false,
          features: [
            { icon: Check, text: "Everything in Professional" },
            { icon: ShoppingCart, text: "Full E-commerce" },
            { icon: Infinity, text: "Unlimited Pages" },
            { icon: CreditCard, text: "Payment Gateway" },
            { icon: Puzzle, text: "Custom Integrations" },
            { icon: Clock, text: "24/7 Dedicated Support" }
          ]
        }
      ]
    }
  };

  const t = content[language];

  const handleChoosePlan = (planId) => {
    navigate(createPageUrl("Checkout") + `?plan=${planId}&mode=subscription`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {t.plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.recommended 
                  ? "border-2 border-blue-900 shadow-lg scale-[1.02]" 
                  : "border border-gray-200 hover:border-blue-300"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-0 right-0 bg-blue-900 text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {t.mostPopular}
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.recommended ? "pt-12" : "pt-6"} pb-4`}>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2 min-h-[48px]">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-900">₡{plan.price}</span>
                  <span className="text-gray-500 text-sm">{t.perMonth}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0 pb-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <li key={index} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          plan.recommended 
                            ? "bg-blue-100 text-blue-900" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <Button 
                  onClick={() => handleChoosePlan(plan.id)}
                  className={`w-full h-12 text-base font-semibold transition-all ${
                    plan.recommended
                      ? "bg-blue-900 hover:bg-blue-800 text-white shadow-lg hover:shadow-xl"
                      : "bg-white border-2 border-blue-900 text-blue-900 hover:bg-blue-50"
                  }`}
                >
                  {t.chooseButton}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center bg-blue-50 rounded-xl p-6 border border-blue-100 mb-16">
          <h3 className="font-semibold text-blue-900 mb-3">{t.allPlansInclude}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {t.includedItems.map((item, index) => (
              <Badge key={index} variant="secondary" className="bg-white text-blue-900 px-4 py-2">
                <Check className="w-4 h-4 mr-2 text-green-600" />
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <ComparisonTable />
      </div>
    </div>
  );
}