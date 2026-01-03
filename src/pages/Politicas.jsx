import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Shield, FileText, Lock, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Politicas() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'es' ? 'Políticas y Términos | PuraWeb CR' : 'Policies and Terms | PuraWeb CR';
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  const content = {
    es: {
      title: "Políticas y Términos",
      subtitle: "Transparencia total en nuestra relación con nuestros clientes",
      tabs: {
        privacy: "Privacidad",
        terms: "Términos",
        cookies: "Cookies"
      },
      privacy: {
        title: "Política de Privacidad",
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
          }
        ]
      },
      terms: {
        title: "Términos y Condiciones de Uso",
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
            title: "4. Cancelación",
            content: "• Puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario\n• La cancelación es efectiva al final del período de facturación actual\n• Después de la cancelación, tu sitio permanecerá activo hasta el fin del período pagado\n• Puedes exportar tu contenido antes de la cancelación\n• No hay cargos por cancelación anticipada"
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
            title: "7. Garantías y Limitaciones",
            content: "• Garantizamos tiempos de carga menores a 2 segundos\n• Garantizamos 99.9% de uptime (excepto mantenimiento programado)\n• Garantizamos respuesta en menos de 24 horas laborables\n• No garantizamos resultados de negocio específicos\n• No somos responsables por contenido de terceros enlazado\n• La responsabilidad máxima está limitada al monto de tu suscripción"
          },
          {
            title: "8. Modificaciones",
            content: "Nos reservamos el derecho de:\n\n• Modificar estos términos con aviso previo de 30 días\n• Actualizar precios con notificación anticipada de 60 días\n• Suspender servicios por incumplimiento de términos\n• Mejorar o modificar las funcionalidades ofrecidas"
          }
        ]
      },
      cookies: {
        title: "Política de Cookies",
        lastUpdate: "Última actualización: Enero 2026",
        sections: [
          {
            title: "¿Qué son las Cookies?",
            content: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a mejorar tu experiencia y entender cómo usas nuestro sitio."
          },
          {
            title: "Cookies que Utilizamos",
            content: "Usamos los siguientes tipos de cookies:\n\n• Cookies esenciales: Necesarias para el funcionamiento del sitio\n• Cookies de preferencias: Guardan tu idioma y configuraciones\n• Cookies de análisis: Nos ayudan a entender cómo usas el sitio (anónimas)\n• Cookies de autenticación: Mantienen tu sesión activa"
          },
          {
            title: "Gestión de Cookies",
            content: "Puedes controlar y eliminar las cookies:\n\n• Configurando tu navegador para rechazar cookies\n• Eliminando cookies existentes desde la configuración del navegador\n• Usando navegación privada o modo incógnito\n\nNota: Bloquear cookies puede afectar la funcionalidad del sitio."
          },
          {
            title: "Cookies de Terceros",
            content: "Utilizamos servicios de terceros que pueden colocar cookies:\n\n• Stripe (procesamiento de pagos)\n• Base44 (plataforma de desarrollo)\n\nEstos servicios tienen sus propias políticas de privacidad que te recomendamos revisar."
          }
        ]
      }
    },
    en: {
      title: "Policies and Terms",
      subtitle: "Total transparency in our relationship with our clients",
      tabs: {
        privacy: "Privacy",
        terms: "Terms",
        cookies: "Cookies"
      },
      privacy: {
        title: "Privacy Policy",
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
          }
        ]
      },
      terms: {
        title: "Terms and Conditions of Use",
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
            title: "4. Cancellation",
            content: "• You can cancel your subscription at any time from your user panel\n• Cancellation is effective at the end of the current billing period\n• After cancellation, your site remains active until the end of the paid period\n• You can export your content before cancellation\n• There are no early cancellation fees"
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
            title: "7. Warranties and Limitations",
            content: "• We guarantee loading times under 2 seconds\n• We guarantee 99.9% uptime (except scheduled maintenance)\n• We guarantee response within 24 business hours\n• We do not guarantee specific business results\n• We are not responsible for linked third-party content\n• Maximum liability is limited to your subscription amount"
          },
          {
            title: "8. Modifications",
            content: "We reserve the right to:\n\n• Modify these terms with 30 days prior notice\n• Update prices with 60 days advance notification\n• Suspend services for breach of terms\n• Improve or modify offered functionalities"
          }
        ]
      },
      cookies: {
        title: "Cookie Policy",
        lastUpdate: "Last updated: January 2026",
        sections: [
          {
            title: "What are Cookies?",
            content: "Cookies are small text files stored on your device when you visit a website. They help us improve your experience and understand how you use our site."
          },
          {
            title: "Cookies We Use",
            content: "We use the following types of cookies:\n\n• Essential cookies: Necessary for site functionality\n• Preference cookies: Save your language and settings\n• Analytics cookies: Help us understand how you use the site (anonymous)\n• Authentication cookies: Keep your session active"
          },
          {
            title: "Cookie Management",
            content: "You can control and delete cookies by:\n\n• Configuring your browser to reject cookies\n• Deleting existing cookies from browser settings\n• Using private browsing or incognito mode\n\nNote: Blocking cookies may affect site functionality."
          },
          {
            title: "Third-Party Cookies",
            content: "We use third-party services that may place cookies:\n\n• Stripe (payment processing)\n• Base44 (development platform)\n\nThese services have their own privacy policies that we recommend you review."
          }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <>
      <SEO
        title={t.title}
        description={t.subtitle}
        canonical={`https://puraweb.cr/${language === 'es' ? 'politicas' : 'policies'}`}
        language={language}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                {language === 'es' ? 'Transparencia Total' : 'Total Transparency'}
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
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="privacy" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {t.tabs.privacy}
                </TabsTrigger>
                <TabsTrigger value="terms" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t.tabs.terms}
                </TabsTrigger>
                <TabsTrigger value="cookies" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {t.tabs.cookies}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">{t.privacy.title}</CardTitle>
                    <p className="text-sm text-gray-500">{t.privacy.lastUpdate}</p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {t.privacy.sections.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-xl font-semibold mb-3 text-blue-900">{section.title}</h3>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="terms">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">{t.terms.title}</CardTitle>
                    <p className="text-sm text-gray-500">{t.terms.lastUpdate}</p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {t.terms.sections.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-xl font-semibold mb-3 text-blue-900">{section.title}</h3>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cookies">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">{t.cookies.title}</CardTitle>
                    <p className="text-sm text-gray-500">{t.cookies.lastUpdate}</p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {t.cookies.sections.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-xl font-semibold mb-3 text-blue-900">{section.title}</h3>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Contact Section */}
            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">
                {language === 'es' ? '¿Preguntas sobre nuestras políticas?' : 'Questions about our policies?'}
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'es' 
                  ? 'Si tienes alguna pregunta o inquietud sobre nuestras políticas de privacidad, términos de uso o cookies, no dudes en contactarnos.'
                  : 'If you have any questions or concerns about our privacy policies, terms of use, or cookies, feel free to contact us.'}
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