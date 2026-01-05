import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function TerminosCondiciones() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  const content = {
    es: {
      title: "Términos y Condiciones de Uso",
      subtitle: "Las reglas y acuerdos para usar nuestros servicios",
      backButton: "Volver a Políticas",
      lastUpdate: "Última actualización: Enero 2026",
      sections: [
        {
          title: "1. Aceptación de los Términos",
          content: "Al contratar nuestros servicios o usar nuestro sitio web, aceptas estos términos y condiciones. Si no estás de acuerdo, por favor no uses nuestros servicios."
        },
        {
          title: "2. Servicios Ofrecidos",
          content: "PuraWeb CR ofrece servicios de desarrollo web bajo modelo de suscripción (WaaS - Web as a Service):\n\n• Desarrollo y diseño de sitios web\n• Hosting premium y mantenimiento continuo\n• Actualizaciones de seguridad y rendimiento\n• Soporte técnico según el plan contratado\n• Backups automáticos y recuperación de datos"
        },
        {
          title: "3. Planes y Facturación",
          content: "• Los planes se facturan mensualmente de forma recurrente\n• Los precios están en colones costarricenses (CRC)\n• Los pagos se procesan a través de Stripe\n• Las suscripciones se renuevan automáticamente\n• Puedes cancelar en cualquier momento sin penalización\n• No ofrecemos reembolsos por tiempo no utilizado"
        },
        {
          title: "4. Cancelación y Terminación",
          content: "• Puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario\n• La cancelación es efectiva al final del período de facturación actual\n• Después de la cancelación, tu sitio permanecerá activo hasta el fin del período pagado\n• Puedes exportar tu contenido antes de la cancelación\n• No hay cargos por cancelación anticipada\n• Nos reservamos el derecho de suspender o terminar servicios por incumplimiento"
        },
        {
          title: "5. Uso Aceptable",
          content: "Te comprometes a:\n\n• Usar nuestros servicios de forma legal y ética\n• No alojar contenido ilegal, ofensivo o malicioso\n• No realizar actividades que afecten el rendimiento del servidor\n• Respetar los derechos de propiedad intelectual\n• No intentar acceder a sistemas o datos no autorizados\n• Cumplir con las leyes aplicables en Costa Rica"
        },
        {
          title: "6. Propiedad Intelectual",
          content: "• El código y diseño desarrollado por PuraWeb CR es de nuestra propiedad\n• Tu contenido y datos son de tu propiedad exclusiva\n• Te otorgamos una licencia de uso del sitio web mientras mantengas tu suscripción\n• Puedes exportar tu contenido en cualquier momento\n• Las marcas y logos de PuraWeb CR son propiedad registrada"
        },
        {
          title: "7. Garantías y Limitaciones de Responsabilidad",
          content: "• Garantizamos tiempos de carga menores a 2 segundos\n• Garantizamos 99.9% de uptime (excepto mantenimiento programado)\n• Garantizamos respuesta en menos de 24 horas laborables\n• No garantizamos resultados de negocio específicos\n• No somos responsables por contenido de terceros enlazado\n• La responsabilidad máxima está limitada al monto de tu suscripción mensual"
        },
        {
          title: "8. Modificaciones de Servicios y Precios",
          content: "Nos reservamos el derecho de:\n\n• Modificar estos términos con aviso previo de 30 días\n• Actualizar precios con notificación anticipada de 60 días\n• Suspender servicios por incumplimiento de términos\n• Mejorar o modificar las funcionalidades ofrecidas\n• Realizar mantenimiento programado con notificación previa"
        },
        {
          title: "9. Soporte y Mantenimiento",
          content: "• El soporte técnico se brinda según el plan contratado\n• Respondemos en menos de 24 horas en días laborables\n• El mantenimiento incluye actualizaciones de seguridad y rendimiento\n• Los backups automáticos se realizan diariamente\n• El soporte no cubre desarrollo de nuevas funcionalidades no incluidas en tu plan"
        },
        {
          title: "10. Ley Aplicable y Jurisdicción",
          content: "Estos términos se rigen por las leyes de Costa Rica. Cualquier disputa será resuelta en los tribunales de San José, Costa Rica. Ambas partes acuerdan someterse a la jurisdicción exclusiva de dichos tribunales."
        }
      ]
    },
    en: {
      title: "Terms and Conditions of Use",
      subtitle: "The rules and agreements for using our services",
      backButton: "Back to Policies",
      lastUpdate: "Last updated: January 2026",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By contracting our services or using our website, you accept these terms and conditions. If you do not agree, please do not use our services."
        },
        {
          title: "2. Services Offered",
          content: "PuraWeb CR offers web development services under a subscription model (WaaS - Web as a Service):\n\n• Website development and design\n• Premium hosting and continuous maintenance\n• Security and performance updates\n• Technical support according to contracted plan\n• Automatic backups and data recovery"
        },
        {
          title: "3. Plans and Billing",
          content: "• Plans are billed monthly on a recurring basis\n• Prices are in Costa Rican colones (CRC)\n• Payments are processed through Stripe\n• Subscriptions renew automatically\n• You can cancel at any time without penalty\n• We do not offer refunds for unused time"
        },
        {
          title: "4. Cancellation and Termination",
          content: "• You can cancel your subscription at any time from your user panel\n• Cancellation is effective at the end of the current billing period\n• After cancellation, your site remains active until the end of the paid period\n• You can export your content before cancellation\n• There are no early cancellation fees\n• We reserve the right to suspend or terminate services for breach of terms"
        },
        {
          title: "5. Acceptable Use",
          content: "You agree to:\n\n• Use our services legally and ethically\n• Not host illegal, offensive, or malicious content\n• Not perform activities that affect server performance\n• Respect intellectual property rights\n• Not attempt to access unauthorized systems or data\n• Comply with applicable laws in Costa Rica"
        },
        {
          title: "6. Intellectual Property",
          content: "• Code and design developed by PuraWeb CR is our property\n• Your content and data are your exclusive property\n• We grant you a license to use the website while maintaining your subscription\n• You can export your content at any time\n• PuraWeb CR trademarks and logos are registered property"
        },
        {
          title: "7. Warranties and Limitation of Liability",
          content: "• We guarantee loading times under 2 seconds\n• We guarantee 99.9% uptime (except scheduled maintenance)\n• We guarantee response within 24 business hours\n• We do not guarantee specific business results\n• We are not responsible for linked third-party content\n• Maximum liability is limited to your monthly subscription amount"
        },
        {
          title: "8. Service and Price Modifications",
          content: "We reserve the right to:\n\n• Modify these terms with 30 days prior notice\n• Update prices with 60 days advance notification\n• Suspend services for breach of terms\n• Improve or modify offered functionalities\n• Perform scheduled maintenance with prior notification"
        },
        {
          title: "9. Support and Maintenance",
          content: "• Technical support is provided according to the contracted plan\n• We respond within 24 hours on business days\n• Maintenance includes security and performance updates\n• Automatic backups are performed daily\n• Support does not cover development of new features not included in your plan"
        },
        {
          title: "10. Applicable Law and Jurisdiction",
          content: "These terms are governed by the laws of Costa Rica. Any dispute will be resolved in the courts of San José, Costa Rica. Both parties agree to submit to the exclusive jurisdiction of said courts."
        }
      ]
    }
  };

  const t = content[language];

  return (
    <>
      <SEO
        title={t.title}
        description={t.subtitle}
        canonical={`https://puraweb.cr/${language === 'es' ? 'terminos-condiciones' : 'terms-conditions'}`}
        language={language}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate(createPageUrl("Politicas"))}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backButton}
            </Button>

            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                {language === 'es' ? 'Términos y Condiciones' : 'Terms and Conditions'}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                  {t.title}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </motion.div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t.title}</CardTitle>
                <p className="text-sm text-gray-500">{t.lastUpdate}</p>
              </CardHeader>
              <CardContent className="space-y-8">
                {t.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-semibold mb-3 text-blue-900">{section.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">
                {language === 'es' ? '¿Preguntas sobre los términos?' : 'Questions about the terms?'}
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'es' 
                  ? 'Si tienes alguna pregunta sobre nuestros términos y condiciones, no dudes en contactarnos.'
                  : 'If you have any questions about our terms and conditions, feel free to contact us.'}
              </p>
              <a 
                href="mailto:info@puraweb.cr" 
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                info@puraweb.cr
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}