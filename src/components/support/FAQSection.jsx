import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, CreditCard, Settings, HelpCircle, Zap } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const translations = {
  es: {
    title: "Preguntas Frecuentes",
    subtitle: "Encuentra respuestas rápidas a las consultas más comunes",
    searchPlaceholder: "Buscar en las preguntas...",
    noResults: "No se encontraron resultados",
    categories: {
      billing: "Facturación",
      technical: "Técnico",
      general: "General",
      plans: "Planes"
    },
    faqs: [
      {
        category: "billing",
        question: "¿Cómo puedo cancelar mi suscripción?",
        answer: "Puedes cancelar tu suscripción desde tu panel de usuario, en la sección 'Suscripciones'. Haz clic en 'Cancelar Suscripción' y confirma. Seguirás teniendo acceso hasta el final del período facturado."
      },
      {
        category: "billing",
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) a través de nuestra pasarela segura Stripe. Todos los pagos son procesados en colones costarricenses (CRC)."
      },
      {
        category: "billing",
        question: "¿Puedo cambiar de plan en cualquier momento?",
        answer: "Sí, es posible cambiar de plan. Sin embargo, te recomendamos contactar primero con nuestro equipo para evaluar juntos la viabilidad del cambio según el estado actual de tu proyecto y suscripción. Así nos aseguramos de que la transición sea lo más fluida posible para ti."
      },
      {
        category: "technical",
        question: "¿Cuánto tiempo toma desarrollar mi sitio web?",
        answer: "El tiempo de desarrollo varía según el plan: Plan Básico (2-3 semanas), Plan Profesional (3-4 semanas), Plan Empresa (4-6 semanas). Estos tiempos pueden variar según la complejidad de los requisitos."
      },
      {
        category: "technical",
        question: "¿Puedo solicitar cambios después de que el sitio esté en línea?",
        answer: "Sí, todos nuestros planes incluyen soporte continuo. Los cambios menores están incluidos en tu suscripción. Para cambios mayores o nuevas funcionalidades, te proporcionaremos un presupuesto adicional."
      },
      {
        category: "technical",
        question: "¿El hosting está incluido en el precio?",
        answer: "Sí, todos nuestros planes incluyen hosting de alto rendimiento, certificado SSL gratuito y copias de seguridad automáticas. No tienes que preocuparte por costos adicionales de infraestructura."
      },
      {
        category: "general",
        question: "¿Cómo inicio el proceso de desarrollo?",
        answer: "Una vez que elijas un plan y completes el pago, nos pondremos en contacto contigo en 24-48 horas para agendar una reunión inicial. En esta reunión discutiremos tus necesidades, objetivos y diseño deseado."
      },
      {
        category: "general",
        question: "¿Necesito proporcionar contenido para mi sitio?",
        answer: "Idealmente sí, pero podemos ayudarte. Si tienes textos, imágenes y logos, genial. Si no, ofrecemos servicios de redacción de contenido y selección de imágenes de stock como parte de nuestros planes Profesional y Empresa."
      },
      {
        category: "plans",
        question: "¿Cuál es la diferencia entre los planes?",
        answer: "Plan Básico: ideal para presencia online simple (5 páginas, formulario de contacto). Plan Profesional: para negocios en crecimiento (10 páginas, CMS, redes sociales). Plan Empresa: solución completa con e-commerce, páginas ilimitadas y soporte 24/7."
      },
      {
        category: "plans",
        question: "¿Puedo probar el servicio antes de pagar?",
        answer: "Ofrecemos una consulta gratuita donde analizamos tus necesidades y te mostramos ejemplos de nuestro trabajo. Además, tienes 14 días de garantía de satisfacción después de tu primera suscripción."
      }
    ]
  },
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Find quick answers to the most common questions",
    searchPlaceholder: "Search questions...",
    noResults: "No results found",
    categories: {
      billing: "Billing",
      technical: "Technical",
      general: "General",
      plans: "Plans"
    },
    faqs: [
      {
        category: "billing",
        question: "How can I cancel my subscription?",
        answer: "You can cancel your subscription from your user dashboard, in the 'Subscriptions' section. Click 'Cancel Subscription' and confirm. You will continue to have access until the end of the billed period."
      },
      {
        category: "billing",
        question: "What payment methods do you accept?",
        answer: "We accept credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe gateway. All payments are processed in Costa Rican colones (CRC)."
      },
      {
        category: "billing",
        question: "Can I change plans at any time?",
        answer: "Yes, you can upgrade or change your plan at any time. If you upgrade to a higher plan, you will be charged the prorated difference. If you downgrade, the change will apply on your next billing cycle."
      },
      {
        category: "billing",
        question: "Do you offer refunds?",
        answer: "We offer refunds within the first 14 days after your first subscription if you are not satisfied with our service. Contact us through the support form to request a refund."
      },
      {
        category: "technical",
        question: "How long does it take to develop my website?",
        answer: "Development time varies by plan: Basic Plan (2-3 weeks), Professional Plan (3-4 weeks), Business Plan (4-6 weeks). These times may vary depending on the complexity of requirements."
      },
      {
        category: "technical",
        question: "Can I request changes after the site is live?",
        answer: "Yes, all our plans include ongoing support. Minor changes are included in your subscription. For major changes or new features, we will provide you with an additional quote."
      },
      {
        category: "technical",
        question: "Is hosting included in the price?",
        answer: "Yes, all our plans include high-performance hosting, free SSL certificate, and automatic backups. You don't have to worry about additional infrastructure costs."
      },
      {
        category: "general",
        question: "How do I start the development process?",
        answer: "Once you choose a plan and complete payment, we will contact you within 24-48 hours to schedule an initial meeting. In this meeting, we will discuss your needs, goals, and desired design."
      },
      {
        category: "general",
        question: "Do I need to provide content for my site?",
        answer: "Ideally yes, but we can help. If you have texts, images, and logos, great. If not, we offer content writing and stock image selection services as part of our Professional and Business plans."
      },
      {
        category: "plans",
        question: "What is the difference between the plans?",
        answer: "Basic Plan: ideal for simple online presence (5 pages, contact form). Professional Plan: for growing businesses (10 pages, CMS, social media). Business Plan: complete solution with e-commerce, unlimited pages, and 24/7 support."
      },
      {
        category: "plans",
        question: "Can I try the service before paying?",
        answer: "We offer a free consultation where we analyze your needs and show you examples of our work. Additionally, you have a 14-day satisfaction guarantee after your first subscription."
      }
    ]
  }
};

const categoryIcons = {
  billing: CreditCard,
  technical: Settings,
  general: HelpCircle,
  plans: Zap
};

const categoryColors = {
  billing: "bg-green-100 text-green-700",
  technical: "bg-blue-100 text-blue-700",
  general: "bg-purple-100 text-purple-700",
  plans: "bg-orange-100 text-orange-700"
};

export default function FAQSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFaqs = t.faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "billing", "technical", "general", "plans"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {t.title}
        </h2>
        <p className="text-gray-500">{t.subtitle}</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-blue-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {category === "all"
                  ? language === "es"
                    ? "Todas"
                    : "All"
                  : t.categories[category]}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ List */}
      {filteredFaqs.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const Icon = categoryIcons[faq.category];
            return (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-xl px-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left py-4 hover:no-underline">
                  <div className="flex items-start gap-3 pr-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${categoryColors[faq.category]}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{faq.question}</p>
                      <Badge
                        variant="secondary"
                        className={`mt-1 text-xs ${categoryColors[faq.category]}`}
                      >
                        {t.categories[faq.category]}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pl-11 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>{t.noResults}</p>
        </div>
      )}
    </div>
  );
}