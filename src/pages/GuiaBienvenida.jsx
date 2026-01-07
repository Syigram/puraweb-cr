import React, { useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import { 
  Rocket, 
  HandshakeIcon, 
  Shield, 
  Clock, 
  Zap, 
  CreditCard, 
  Heart,
  CheckCircle2,
  AlertCircle,
  Users,
  Code,
  Database,
  Headphones,
  TrendingUp,
  Award,
  Download,
  Calendar,
  Mail,
  Phone
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

// Memoized animation config - defined outside component to prevent recreation
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function GuiaBienvenida() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Memoize content object - only recreated when dependencies change
  const content = useMemo(() => ({
    es: {
      title: "Guía de PuraWeb CR",
      subtitle: "Tu Nuevo Sitio Web con PuraWeb CR",
      hero: "Esta guía te ayudará a entender cómo funciona PuraWeb CR y cómo sacar el máximo provecho de nuestros servicios. Somos tu partner tecnológico: a diferencia de una agencia tradicional, funcionamos como un servicio de suscripción donde nos encargamos de la tecnología para que tú te encargues de tu negocio.",
      subtitle2: "Aquí encontrarás todo lo que necesitas saber sobre tu plan y nuestros servicios.",
      
      sections: {
        ownership: {
          title: "¿Cómo funciona nuestra relación?",
          tagline: "Tú eres el dueño del contenido, nosotros del motor",
          yours: "Tu Propiedad",
          yoursDesc: "Todo lo que escribas, tus fotos, tu logo y tu base de datos de clientes son 100% tuyos.",
          ours: "Nuestra Propiedad",
          oursDesc: "El código, los servidores y la estructura técnica nos pertenecen. Te damos una licencia de uso mientras tu suscripción esté activa.",
          benefit: "¿Por qué es bueno esto?",
          benefitDesc: "Porque si algo técnico se rompe, es problema nuestro, no tuyo. Tú no pagas por reparaciones de servidor."
        },
        
        support: {
          title: "Soporte y Cambios Mensuales",
          intro: "Sabemos que los negocios evolucionan. Por eso, tu plan incluye horas para realizar cambios.",
          whatIs: "¿Qué se considera un 'Cambio Mensual'?",
          whatIsDesc: "Son mejoras estéticas o de contenido que tú solicitas.",
          examples: [
            "Cambiar textos o imágenes",
            "Agregar una nueva sección (ej. 'Nuestros Servicios')",
            "Cambiar colores o agregar una funcionalidad nueva"
          ],
          rule: "Regla de los 30 Minutos",
          ruleDesc: "Cada solicitud consume un mínimo de 30 minutos de tu saldo mensual.",
          tip: "Tip: Agrupa varios cambios pequeños en un solo correo para aprovechar mejor tu tiempo.",
          bugs: "¿Qué pasa si hay un error (Bug)?",
          bugsDesc: "Si el sitio falla (ej. un botón no funciona o la página no carga), eso no consume tus horas. Es nuestra responsabilidad y lo arreglaremos sin costo lo antes posible.",
          rollover: "Banco de Horas (Rollover)",
          rolloverDesc: "¿Este mes no necesitas cambios pero el próximo quieres lanzar algo grande?",
          rolloverBenefit: "Puedes acumular tus horas hasta por 3 meses.",
          rolloverExample: "Ejemplo: Si tu plan tiene 5 horas, puedes guardar las de enero y febrero para tener 15 horas disponibles en marzo y hacer una renovación mayor."
        },
        
        payments: {
          title: "Ventas en Línea y Pagos (Stripe)",
          intro: "Si tu sitio vende productos o cobra suscripciones, utilizamos Stripe por su seguridad mundial. Es vital que entiendas los costos reales de vender en internet para que fijes bien tus precios.",
          noCommission: "Nosotros no cobramos comisión por tus ventas, pero la cadena financiera sí:",
          fees: [
            {
              currency: "Dólares ($)",
              rate: "~ 6% por venta",
              reason: "Tarifa Stripe + Tarjetas Internacionales + Transferencia"
            },
            {
              currency: "Colones (₡)",
              rate: "~ 8% por venta",
              reason: "Incluye lo anterior + Conversión de moneda (Stripe opera en USD)"
            }
          ],
          note: "Nota: Estos montos son retenidos automáticamente por la pasarela de pago y los bancos, no por la agencia."
        },
        
        fairUse: {
          title: "Política de Uso Justo (Para Planes Ilimitados)",
          unlimited: "¿Qué significa 'Ilimitado'?",
          unlimitedDesc: "Significa que puedes pedir todo lo que tu negocio necesite para crecer orgánicamente.",
          notAllowed: "¿Qué NO está permitido?",
          notAllowedList: [
            "Revender nuestro servicio (hospedar sitios de terceros en tu cuenta)",
            "Usar bots para crear cientos de páginas automáticamente",
            "Sobrecargar el servidor intencionalmente"
          ]
        },
        
        freedom: {
          title: "Libertad Total",
          intro: "Esperamos trabajar contigo por años, pero si decides irte:",
          noLock: "Sin ataduras",
          noLockDesc: "Puedes cancelar cuando quieras.",
          export: "Llévate tus datos",
          exportDesc: "Tienes derecho a pedir una exportación de tu contenido (textos e imágenes). Te entregaremos todo en un plazo máximo de 30 días hábiles."
        },
        
        contact: {
          title: "¿Cómo contactarnos?",
          hours: "Horario de Atención",
          hoursDesc: "Lunes a Viernes de 8:00 AM - 6:00 PM, excepto Plan Empresarial (24/7)",
          channel: "Canal Oficial",
          channelDesc: "info@puraweb.cr o sistema de tickets desde tu panel",
          response: "Tiempo de Respuesta",
          responseDesc: "Dependerá del plan que hayas contratado (SLA)"
        }
      },
      
      nextSteps: {
        title: "¿Qué sigue ahora?",
        description: "¡Relájate! Estamos configurando tu entorno. Te avisaremos en breve para la primera revisión de diseño. Recuerda que tu primera mensualidad solo corre una vez que apruebes el diseño inicial.",
        thanks: "¡Gracias por ser parte de PuraWeb CR!"
      },
      
      cta: "Contáctanos"
    },
    en: {
      title: "PuraWeb CR Guide",
      subtitle: "Your New Website with PuraWeb CR",
      hero: "This guide will help you understand how PuraWeb CR works and how to get the most out of our services. We are your technology partner: unlike a traditional agency, we function as a subscription service where we take care of the technology so you can take care of your business.",
      subtitle2: "Here you'll find everything you need to know about your plan and our services.",
      
      sections: {
        ownership: {
          title: "How does our relationship work?",
          tagline: "You own the content, we own the engine",
          yours: "Your Property",
          yoursDesc: "Everything you write, your photos, your logo, and your customer database are 100% yours.",
          ours: "Our Property",
          oursDesc: "The code, servers, and technical structure belong to us. We give you a license to use while your subscription is active.",
          benefit: "Why is this good?",
          benefitDesc: "Because if something technical breaks, it's our problem, not yours. You don't pay for server repairs."
        },
        
        support: {
          title: "Support and Monthly Changes",
          intro: "We know businesses evolve. That's why your plan includes hours for making changes.",
          whatIs: "What is considered a 'Monthly Change'?",
          whatIsDesc: "They are aesthetic or content improvements that you request.",
          examples: [
            "Change texts or images",
            "Add a new section (e.g. 'Our Services')",
            "Change colors or add a new functionality"
          ],
          rule: "30-Minute Rule",
          ruleDesc: "Each request consumes a minimum of 30 minutes from your monthly balance.",
          tip: "Tip: Group several small changes in one email to make better use of your time.",
          bugs: "What if there's a bug?",
          bugsDesc: "If the site fails (e.g. a button doesn't work or the page doesn't load), that doesn't consume your hours. It's our responsibility and we'll fix it at no cost ASAP.",
          rollover: "Hour Bank (Rollover)",
          rolloverDesc: "Don't need changes this month but want to launch something big next month?",
          rolloverBenefit: "You can accumulate your hours for up to 3 months.",
          rolloverExample: "Example: If your plan has 5 hours, you can save January and February's hours to have 15 hours available in March for a major renovation."
        },
        
        payments: {
          title: "Online Sales and Payments (Stripe)",
          intro: "If your site sells products or charges subscriptions, we use Stripe for its worldwide security. It's vital that you understand the real costs of selling online so you can price correctly.",
          noCommission: "We don't charge commission on your sales, but the financial chain does:",
          fees: [
            {
              currency: "Dollars ($)",
              rate: "~ 6% per sale",
              reason: "Stripe fee + International Cards + Transfer"
            },
            {
              currency: "Colones (₡)",
              rate: "~ 8% per sale",
              reason: "Includes the above + Currency conversion (Stripe operates in USD)"
            }
          ],
          note: "Note: These amounts are automatically withheld by the payment gateway and banks, not by the agency."
        },
        
        fairUse: {
          title: "Fair Use Policy (For Unlimited Plans)",
          unlimited: "What does 'Unlimited' mean?",
          unlimitedDesc: "It means you can request everything your business needs to grow organically.",
          notAllowed: "What is NOT allowed?",
          notAllowedList: [
            "Reselling our service (hosting third-party sites in your account)",
            "Using bots to create hundreds of pages automatically",
            "Intentionally overloading the server"
          ]
        },
        
        freedom: {
          title: "Total Freedom",
          intro: "We hope to work with you for years, but if you decide to leave:",
          noLock: "No lock-in",
          noLockDesc: "You can cancel whenever you want.",
          export: "Take your data",
          exportDesc: "You have the right to request an export of your content (texts and images). We'll deliver everything within a maximum of 30 business days."
        },
        
        contact: {
          title: "How to contact us?",
          hours: "Business Hours",
          hoursDesc: "Monday to Friday 8:00 AM - 6:00 PM, except Business Plan (24/7)",
          channel: "Official Channel",
          channelDesc: "info@puraweb.cr or ticket system from your dashboard",
          response: "Response Time",
          responseDesc: "Will depend on the plan you've contracted (SLA)"
        }
      },
      
      nextSteps: {
        title: "What's next?",
        description: "Relax! We're setting up your environment. We'll notify you shortly for the first design review. Remember that your first monthly payment only runs once you approve the initial design.",
        thanks: "Thank you for being part of PuraWeb CR!"
      },
      
      cta: "Contact Us"
    }
  }), []);

  const t = content[language];

  const seoTitle = useMemo(() => language === 'es' 
    ? 'Guía de PuraWeb CR - Cliente' 
    : 'PuraWeb CR Guide - Client', [language]);
  
  const seoDescription = useMemo(() => language === 'es'
    ? 'Guía completa para nuevos clientes de PuraWeb CR. Aprende sobre propiedad, soporte, cambios mensuales, pagos en línea y más.'
    : 'Complete guide for new PuraWeb CR clients. Learn about ownership, support, monthly changes, online payments and more.', [language]);

  // Memoize navigation handler
  const handleContactClick = useCallback(() => {
    navigate(createPageUrl("Contacto"));
  }, [navigate]);

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical={`https://puraweb.cr/${language === 'es' ? 'guia-bienvenida' : 'welcome-guide'}`}
        language={language}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-red-900/5" />
          
          <motion.div 
            className="max-w-5xl mx-auto px-6 relative z-10"
            {...fadeInUp}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-2xl">
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-red-700 bg-clip-text text-transparent">
              {t.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-center text-gray-600 font-medium mb-8">
              {t.subtitle}
            </p>
            
            <Card className="bg-white border border-blue-200 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  {t.hero}
                </p>
                <p className="text-base md:text-lg text-gray-600 font-semibold">
                  {t.subtitle2}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-20">
          {/* 1. Ownership Section */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <HandshakeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.sections.ownership.title}
                </h2>
                <p className="text-blue-600 font-medium">
                  {t.sections.ownership.tagline}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="border border-blue-200 bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-blue-900" />
                    <h3 className="text-xl font-bold text-gray-900">{t.sections.ownership.yours}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {t.sections.ownership.yoursDesc}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-red-200 bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="w-8 h-8 text-red-600" />
                    <h3 className="text-xl font-bold text-gray-900">{t.sections.ownership.ours}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {t.sections.ownership.oursDesc}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-50 border border-blue-300">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Award className="w-8 h-8 text-blue-900 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {t.sections.ownership.benefit}
                    </h4>
                    <p className="text-gray-700">
                      {t.sections.ownership.benefitDesc}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Support Section */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t.sections.support.title}
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t.sections.support.intro}
            </p>

            <Card className="bg-white border border-blue-200 mb-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t.sections.support.whatIs}
                </h3>
                <p className="text-gray-700 mb-4">{t.sections.support.whatIsDesc}</p>
                
                <div className="space-y-2">
                  {t.sections.support.examples.map((example, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{example}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-white border border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-6 h-6 text-blue-900" />
                    <h4 className="text-lg font-bold text-gray-900">
                      {t.sections.support.rule}
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-3">{t.sections.support.ruleDesc}</p>
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <p className="text-sm text-blue-900 font-medium">
                      💡 {t.sections.support.tip}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <h4 className="text-lg font-bold text-gray-900">
                      {t.sections.support.bugs}
                    </h4>
                  </div>
                  <p className="text-gray-700">{t.sections.support.bugsDesc}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-8 h-8 text-blue-900" />
                  <h4 className="text-xl font-bold text-gray-900">
                    {t.sections.support.rollover}
                  </h4>
                </div>
                <p className="text-gray-700 mb-3">{t.sections.support.rolloverDesc}</p>
                <p className="text-blue-900 font-semibold mb-4">
                  ✨ {t.sections.support.rolloverBenefit}
                </p>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-gray-700">{t.sections.support.rolloverExample}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3. Payments Section */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t.sections.payments.title}
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t.sections.payments.intro}
            </p>

            <Card className="bg-white border border-blue-200 mb-6">
              <CardContent className="p-6">
                <p className="text-lg font-semibold text-gray-900 mb-4">
                  {t.sections.payments.noCommission}
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-blue-200">
                        <th className="text-left py-3 px-4 text-gray-900 font-bold">
                          {language === 'es' ? 'Si cobras en...' : 'If you charge in...'}
                        </th>
                        <th className="text-left py-3 px-4 text-gray-900 font-bold">
                          {language === 'es' ? 'Comisión total estimada' : 'Estimated total commission'}
                        </th>
                        <th className="text-left py-3 px-4 text-gray-900 font-bold">
                          {language === 'es' ? '¿Por qué?' : 'Why?'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.sections.payments.fees.map((fee, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-blue-50">
                          <td className="py-4 px-4 font-semibold text-gray-900">{fee.currency}</td>
                          <td className="py-4 px-4 text-blue-900 font-bold">{fee.rate}</td>
                          <td className="py-4 px-4 text-gray-700">{fee.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-sm text-red-900">
                ⚠️ {t.sections.payments.note}
              </p>
            </div>
          </motion.div>

          {/* 4. Fair Use Section */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t.sections.fairUse.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-8 h-8 text-blue-900" />
                    <h3 className="text-xl font-bold text-gray-900">
                      {t.sections.fairUse.unlimited}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {t.sections.fairUse.unlimitedDesc}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      {t.sections.fairUse.notAllowed}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {t.sections.fairUse.notAllowedList.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* 5. Freedom Section */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t.sections.freedom.title}
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t.sections.freedom.intro}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Download className="w-7 h-7 text-blue-900" />
                    <h4 className="text-lg font-bold text-gray-900">
                      {t.sections.freedom.export}
                    </h4>
                  </div>
                  <p className="text-gray-700">{t.sections.freedom.exportDesc}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-red-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-7 h-7 text-red-600" />
                    <h4 className="text-lg font-bold text-gray-900">
                      {t.sections.freedom.noLock}
                    </h4>
                  </div>
                  <p className="text-gray-700">{t.sections.freedom.noLockDesc}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* 6. Contact Section */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t.sections.contact.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border border-blue-200">
                <CardContent className="p-6">
                  <Calendar className="w-8 h-8 text-blue-900 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {t.sections.contact.hours}
                  </h4>
                  <p className="text-gray-700 text-sm">{t.sections.contact.hoursDesc}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-blue-200">
                <CardContent className="p-6">
                  <Mail className="w-8 h-8 text-blue-900 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {t.sections.contact.channel}
                  </h4>
                  <p className="text-gray-700 text-sm">{t.sections.contact.channelDesc}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-red-200">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-red-600 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {t.sections.contact.response}
                  </h4>
                  <p className="text-gray-700 text-sm">{t.sections.contact.responseDesc}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Next Steps / CTA */}
          <motion.div {...fadeInUp}>
            <Card className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 border-none shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
                  {t.nextSteps.title}
                </h2>
                
                <p className="text-lg text-white/90 text-center mb-6 leading-relaxed max-w-3xl mx-auto">
                  {t.nextSteps.description}
                </p>
                
                <p className="text-2xl font-bold text-center text-white mb-8">
                  {t.nextSteps.thanks}
                </p>
                
                <div className="flex justify-center">
                  <Button
                    onClick={handleContactClick}
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    {t.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default memo(GuiaBienvenida);