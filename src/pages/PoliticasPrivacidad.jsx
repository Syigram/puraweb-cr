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
      intro: "En PuraWeb CR (en adelante, \"la Agencia\"), nos tomamos muy en serio la privacidad de su información. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos sus datos personales de conformidad con la Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley No. 8968) de Costa Rica y los estándares internacionales de privacidad.",
      sections: [
        {
          title: "1. Responsable del Tratamiento de Datos",
          content: "La entidad responsable de la base de datos es PuraWeb CR, con domicilio en San José, Costa Rica.\n\n<b>Correo de contacto para privacidad:</b> purawebsoluciones@gmail.com\n<b>Sitio Web:</b> https://purawebcr.com"
        },
        {
          title: "2. Información que Recopilamos",
          content: "Dependiendo de su interacción con nuestros servicios, podemos recopilar los siguientes datos:\n\n<b>2.1. Datos proporcionados directamente por usted:</b>\n<b>Información de Identificación:</b> Nombre completo, número de cédula o identificación tributaria.\n<b>Información de Contacto:</b> Dirección de correo electrónico, número de teléfono (incluyendo WhatsApp) y dirección física.\n<b>Información del Negocio:</b> Datos sobre su empresa, logotipos, imágenes y textos que usted nos proporciona para la creación de su sitio web.\n\n<b>2.2. Datos de Facturación y Pago:</b>\nPara procesar sus suscripciones mensuales, utilizamos Stripe. La Agencia NO almacena ni tiene acceso a los números completos de su tarjeta de crédito o débito. Toda la información financiera es procesada directamente por Stripe mediante protocolos de encriptación y tokenización de nivel bancario (PCI DSS Nivel 1).\n\n<b>2.3. Datos de Navegación (Cookies):</b>\nDirección IP, tipo de navegador, tiempo de visita y páginas vistas, utilizados únicamente para fines analíticos y de mejora del rendimiento del sitio."
        },
        {
          title: "3. Finalidad del Uso de los Datos",
          content: "Sus datos personales serán utilizados exclusivamente para los siguientes fines (\"Consentimiento Informado\"):\n\n<b>Prestación del Servicio:</b> Configuración, desarrollo y mantenimiento de su sitio web y ecosistema digital.\n<b>Gestión de Cobros:</b> Procesamiento de pagos recurrentes, emisión de facturas y gestión contable.\n<b>Soporte Técnico:</b> Comunicación vía Email, Ticket o WhatsApp para resolver incidencias o realizar cambios mensuales.\n<b>Comunicaciones:</b> Envío de notificaciones sobre el estado de su servicio, actualizaciones de seguridad o cambios en los términos."
        },
        {
          title: "4. Compartir Información con Terceros",
          content: "La Agencia no vende, alquila ni comercializa sus datos personales con terceros. Sin embargo, para prestar el servicio, compartimos datos estrictamente necesarios con los siguientes proveedores de infraestructura:\n\n<b>Stripe Inc. (EE.UU.):</b> Para el procesamiento de pagos.\n<b>Proveedores de Hosting/Nube:</b> Para el alojamiento de su sitio web y bases de datos.\n<b>Google (Analytics/Workspace):</b> Para análisis de tráfico y gestión de correos/calendarios si su plan lo incluye.\n<b>WhatsApp (Meta):</b> Si elige utilizar este canal para soporte o notificaciones.\n\nTodos estos proveedores cumplen con estrictas normativas de seguridad internacional."
        },
        {
          title: "5. Seguridad de los Datos",
          content: "Implementamos medidas de seguridad técnicas, físicas y administrativas para proteger sus datos, incluyendo:\n\n• Uso de certificados de seguridad SSL (Secure Socket Layer) en todas nuestras comunicaciones.\n• Acceso restringido a las bases de datos solo a personal autorizado de la Agencia.\n• No almacenamiento de datos sensibles de pago en nuestros propios servidores."
        },
        {
          title: "6. Derechos ARCO (Sus Derechos)",
          content: "De acuerdo con la legislación costarricense (Ley 8968) y estándares globales, usted tiene los siguientes derechos sobre sus datos:\n\n<b>Acceso:</b> Conocer qué datos tenemos de usted.\n<b>Rectificación:</b> Solicitar la corrección de datos erróneos o desactualizados.\n<b>Cancelación:</b> Solicitar la eliminación de sus datos cuando ya no sean necesarios para la relación contractual.\n<b>Oposición:</b> Oponerse al tratamiento de sus datos para fines específicos.\n\nPara ejercer cualquiera de estos derechos, envíe una solicitud a purawebsoluciones@gmail.com."
        },
        {
          title: "7. Retención de Datos y \"Uso Justo\"",
          content: "Conservaremos sus datos personales mientras su suscripción esté activa. En caso de cancelación del servicio:\n\n• Mantendremos sus datos fiscales y de facturación por el tiempo exigido por las leyes tributarias de Costa Rica.\n• Sus datos de contenido web (imágenes, textos) podrán ser exportados según lo estipulado en nuestros Términos y Condiciones, y posteriormente serán eliminados de nuestros servidores activos."
        },
        {
          title: "8. Cambios en la Política de Privacidad",
          content: "Nos reservamos el derecho de actualizar esta política para reflejar cambios en nuestros servicios o en la legislación. Notificaremos cualquier cambio sustancial a través de su correo electrónico registrado o mediante un aviso destacado en nuestro sitio web."
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      subtitle: "How we protect and handle your personal information",
      backButton: "Back to Policies",
      lastUpdate: "Last updated: January 2026",
      intro: "At PuraWeb CR (hereinafter, \"the Agency\"), we take the privacy of your information very seriously. This Privacy Policy describes how we collect, use, store, and protect your personal data in accordance with Costa Rica's Law for the Protection of Individuals Regarding the Processing of Their Personal Data (Law No. 8968) and international privacy standards.",
      sections: [
        {
          title: "1. Data Controller",
          content: "The entity responsible for the database is PuraWeb CR, located in San José, Costa Rica.\n\n<b>Privacy contact email:</b> purawebsoluciones@gmail.com\n<b>Website:</b> https://purawebcr.com"
        },
        {
          title: "2. Information We Collect",
          content: "Depending on your interaction with our services, we may collect the following data:\n\n<b>2.1. Data provided directly by you:</b>\n<b>Identification Information:</b> Full name, ID number, or tax identification number.\n<b>Contact Information:</b> Email address, phone number (including WhatsApp), and physical address.\n<b>Business Information:</b> Data about your company, logos, images, and texts you provide for the creation of your website.\n\n<b>2.2. Billing and Payment Data:</b>\nTo process your monthly subscriptions, we use Stripe. The Agency does NOT store or have access to complete credit or debit card numbers. All financial information is processed directly by Stripe using bank-level encryption and tokenization protocols (PCI DSS Level 1).\n\n<b>2.3. Browsing Data (Cookies):</b>\nIP address, browser type, visit duration, and pages viewed, used solely for analytical purposes and site performance improvement."
        },
        {
          title: "3. Purpose of Data Use",
          content: "Your personal data will be used exclusively for the following purposes (\"Informed Consent\"):\n\n<b>Service Provision:</b> Configuration, development, and maintenance of your website and digital ecosystem.\n<b>Billing Management:</b> Processing recurring payments, issuing invoices, and accounting management.\n<b>Technical Support:</b> Communication via Email, Ticket, or WhatsApp to resolve incidents or make monthly changes.\n<b>Communications:</b> Sending notifications about the status of your service, security updates, or changes to terms."
        },
        {
          title: "4. Sharing Information with Third Parties",
          content: "The Agency does not sell, rent, or commercialize your personal data with third parties. However, to provide our service, we share strictly necessary data with the following infrastructure providers:\n\n<b>Stripe Inc. (USA):</b> For payment processing.\n<b>Hosting/Cloud Providers:</b> For hosting your website and databases.\n<b>Google (Analytics/Workspace):</b> For traffic analysis and email/calendar management if your plan includes it.\n<b>WhatsApp (Meta):</b> If you choose to use this channel for support or notifications.\n\nAll these providers comply with strict international security regulations."
        },
        {
          title: "5. Data Security",
          content: "We implement technical, physical, and administrative security measures to protect your data, including:\n\n• Use of SSL (Secure Socket Layer) security certificates in all our communications.\n• Restricted access to databases only to authorized Agency personnel.\n• No storage of sensitive payment data on our own servers."
        },
        {
          title: "6. ARCO Rights (Your Rights)",
          content: "In accordance with Costa Rican legislation (Law 8968) and global standards, you have the following rights over your data:\n\n<b>Access:</b> Know what data we have about you.\n<b>Rectification:</b> Request correction of erroneous or outdated data.\n<b>Cancellation:</b> Request deletion of your data when no longer necessary for the contractual relationship.\n<b>Opposition:</b> Object to the processing of your data for specific purposes.\n\nTo exercise any of these rights, send a request to purawebsoluciones@gmail.com."
        },
        {
          title: "7. Data Retention and \"Fair Use\"",
          content: "We will retain your personal data while your subscription is active. In case of service cancellation:\n\n• We will keep your fiscal and billing data for the time required by Costa Rican tax laws.\n• Your web content data (images, texts) may be exported as stipulated in our Terms and Conditions, and will subsequently be deleted from our active servers."
        },
        {
          title: "8. Changes to the Privacy Policy",
          content: "We reserve the right to update this policy to reflect changes in our services or legislation. We will notify any substantial changes through your registered email or through a prominent notice on our website."
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