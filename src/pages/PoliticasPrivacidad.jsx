import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
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

export default function PoliticasPrivacidad() {
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
      title: "Política de Privacidad",
      subtitle: "Cómo protegemos y manejamos tu información personal",
      backButton: "Volver a Políticas",
      lastUpdate: "Última actualización: Enero 2026",
      sections: [
        {
          title: "1. Información que Recopilamos",
          content: "En PuraWeb CR recopilamos únicamente la información necesaria para prestar nuestros servicios de desarrollo web. Esto incluye:\n\n• Datos de contacto: nombre, correo electrónico, teléfono y empresa\n• Información de facturación: datos necesarios para procesar pagos\n• Datos técnicos: información sobre el uso de nuestro sitio web\n• Comunicaciones: mensajes y solicitudes que nos envías"
        },
        {
          title: "2. Uso de la Información",
          content: "Utilizamos tu información para:\n\n• Prestar y mejorar nuestros servicios de desarrollo web\n• Procesar pagos y gestionar suscripciones\n• Comunicarnos contigo sobre tu proyecto\n• Enviar actualizaciones técnicas y de seguridad\n• Cumplir con requisitos legales y fiscales"
        },
        {
          title: "3. Protección de Datos",
          content: "Implementamos medidas de seguridad de nivel bancario:\n\n• Cifrado SSL/TLS en todas las comunicaciones\n• Almacenamiento seguro en servidores certificados\n• Backups automáticos encriptados\n• Acceso restringido solo a personal autorizado\n• Cumplimiento con estándares internacionales de seguridad"
        },
        {
          title: "4. Compartir Información",
          content: "No vendemos ni compartimos tu información personal con terceros, excepto:\n\n• Procesadores de pago (Stripe) para transacciones seguras\n• Proveedores de hosting y servicios técnicos necesarios\n• Cuando lo requiera la ley o autoridades competentes"
        },
        {
          title: "5. Tus Derechos",
          content: "Tienes derecho a:\n\n• Acceder a tu información personal\n• Rectificar datos incorrectos o desactualizados\n• Solicitar la eliminación de tus datos\n• Oponerte al procesamiento de tu información\n• Exportar tus datos en formato legible\n• Revocar consentimientos otorgados"
        },
        {
          title: "6. Retención de Datos",
          content: "Conservamos tu información mientras:\n\n• Mantengas una suscripción activa con nosotros\n• Sea necesario para cumplir obligaciones legales\n• Durante el período de garantía de nuestros servicios\n• 5 años después de la finalización del servicio para fines fiscales"
        },
        {
          title: "7. Cookies y Tecnologías de Rastreo",
          content: "Utilizamos cookies esenciales para el funcionamiento del sitio, cookies de preferencias para guardar tu idioma, y cookies de análisis anónimas. Puedes gestionar las cookies desde la configuración de tu navegador."
        },
        {
          title: "8. Transferencias Internacionales",
          content: "Tu información puede ser procesada en servidores ubicados fuera de Costa Rica. Garantizamos que todos nuestros proveedores cumplen con estándares internacionales de protección de datos."
        },
        {
          title: "9. Menores de Edad",
          content: "Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información de menores de edad. Si descubrimos que hemos recopilado datos de un menor, los eliminaremos inmediatamente."
        },
        {
          title: "10. Cambios a esta Política",
          content: "Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos de cualquier cambio significativo por correo electrónico o mediante un aviso destacado en nuestro sitio web al menos 30 días antes de que los cambios entren en vigor."
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      subtitle: "How we protect and handle your personal information",
      backButton: "Back to Policies",
      lastUpdate: "Last updated: January 2026",
      sections: [
        {
          title: "1. Information We Collect",
          content: "At PuraWeb CR, we only collect information necessary to provide our web development services. This includes:\n\n• Contact information: name, email, phone, and company\n• Billing information: data needed to process payments\n• Technical data: information about your use of our website\n• Communications: messages and requests you send us"
        },
        {
          title: "2. Use of Information",
          content: "We use your information to:\n\n• Provide and improve our web development services\n• Process payments and manage subscriptions\n• Communicate with you about your project\n• Send technical and security updates\n• Comply with legal and tax requirements"
        },
        {
          title: "3. Data Protection",
          content: "We implement bank-level security measures:\n\n• SSL/TLS encryption in all communications\n• Secure storage on certified servers\n• Encrypted automatic backups\n• Restricted access to authorized personnel only\n• Compliance with international security standards"
        },
        {
          title: "4. Sharing Information",
          content: "We do not sell or share your personal information with third parties, except:\n\n• Payment processors (Stripe) for secure transactions\n• Hosting and technical service providers as necessary\n• When required by law or competent authorities"
        },
        {
          title: "5. Your Rights",
          content: "You have the right to:\n\n• Access your personal information\n• Rectify incorrect or outdated data\n• Request deletion of your data\n• Object to processing of your information\n• Export your data in readable format\n• Revoke granted consents"
        },
        {
          title: "6. Data Retention",
          content: "We retain your information while:\n\n• You maintain an active subscription with us\n• Necessary to comply with legal obligations\n• During the warranty period of our services\n• 5 years after service termination for tax purposes"
        },
        {
          title: "7. Cookies and Tracking Technologies",
          content: "We use essential cookies for site functionality, preference cookies to save your language, and anonymous analytics cookies. You can manage cookies from your browser settings."
        },
        {
          title: "8. International Transfers",
          content: "Your information may be processed on servers located outside Costa Rica. We ensure all our providers comply with international data protection standards."
        },
        {
          title: "9. Minors",
          content: "Our services are not directed to individuals under 18 years of age. We do not knowingly collect information from minors. If we discover we have collected data from a minor, we will delete it immediately."
        },
        {
          title: "10. Changes to this Policy",
          content: "We may update this privacy policy occasionally. We will notify you of any significant changes by email or through a prominent notice on our website at least 30 days before the changes take effect."
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
        canonical={`https://puraweb.cr/${language === 'es' ? 'politicas-privacidad' : 'privacy-policy'}`}
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
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Lock className="w-4 h-4" />
                {language === 'es' ? 'Privacidad' : 'Privacy'}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-transparent">
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
                    <h3 className="text-xl font-semibold mb-3 text-green-900">{section.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-12 p-6 bg-green-50 rounded-xl border border-green-100">
              <h3 className="text-lg font-semibold mb-2 text-green-900">
                {language === 'es' ? '¿Preguntas sobre nuestra política de privacidad?' : 'Questions about our privacy policy?'}
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'es' 
                  ? 'Si tienes alguna pregunta o inquietud sobre cómo manejamos tu información personal, contáctanos.'
                  : 'If you have any questions or concerns about how we handle your personal information, contact us.'}
              </p>
              <a 
                href="mailto:info@puraweb.cr" 
                className="text-green-600 hover:text-green-800 font-medium underline"
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