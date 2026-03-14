import React, { useMemo, memo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import { 
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
  Phone,
  BadgeCheck,
  Network
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Contact from "@/components/home/Contact";
import { WORKFLOW_ICONS } from "@/components/icons/WorkflowIcons";

// Memoized animation config - defined outside component to prevent recreation
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function ComoTrabajamos() {
  const [selectedIconId, setSelectedIconId] = useState('network');
  const { language } = useLanguage();

  // Memoize content object - only recreated when dependencies change
  const content = useMemo(() => ({
    es: {
      title: "Transparencia total: Nuestra forma de trabajar para usted",
      subtitle: "Todo lo que necesitas saber sobre cómo operamos tu plataforma y nuestros compromisos.",
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
          tip: "Tip: Agrupa varios cambios pequeños en una sola solicitud para aprovechar mejor tu tiempo.",
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
            "La cantidad de solicitudes no pueden exceder las capacidades técnicas de nuestro equipo",
            "No puedes solicitar cambios que comprometan la integridad de nuestros servidores o infraestructura"
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
          title: "¿Cómo contactarnos?"
        }
      }
    },
    en: {
      title: "Full Transparency: Our Way of Working for You",
      subtitle: "Everything you need to know about how we operate your platform and our commitments.",
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
          tip: "Tip: Group several small changes in a single request to make better use of your time.",
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
            "The number of requests cannot exceed our team's technical capabilities",
            "You cannot request changes that compromise the integrity of our servers or infrastructure"
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
          title: "How to contact us?"
        }
      }
    }
  }), []);

  const t = content[language];

  const seoTitle = useMemo(() => language === 'es' 
    ? 'Cómo Trabajamos - PuraWeb CR' 
    : 'How We Work - PuraWeb CR', [language]);
  
  const seoDescription = useMemo(() => language === 'es'
    ? 'Transparencia total: conoce cómo operamos tu plataforma, nuestros compromisos, soporte, pagos y políticas de uso.'
    : 'Full transparency: learn how we operate your platform, our commitments, support, payments and usage policies.', [language]);

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical={`https://puraweb.cr/comotrabajamos`}
        language={language}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section - Acento Rojo Elegante */}
        <div className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
              {/* Text column */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-3 mb-7"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-700 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-red-700 text-sm font-semibold uppercase tracking-widest">
                    {language === 'es' ? 'Claridad & Compromiso' : 'Clarity & Commitment'}
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6"
                >
                  {t.title}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.14 }}
                  className="w-16 h-0.5 bg-red-600 mb-6"
                />
                <motion.p
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                  className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed"
                >
                  {t.subtitle}
                </motion.p>
              </div>

              {/* Icon column — visible only on large screens */}
              <div className="hidden lg:flex flex-col items-center justify-center w-72 xl:w-80 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="flex-shrink-0"
                >
                  <div className="relative flex items-center justify-center w-64 h-64 xl:w-72 xl:h-72">
                    {(() => {
                      const selectedIcon = WORKFLOW_ICONS.find(i => i.id === selectedIconId);
                      const IconComponent = selectedIcon?.icon;
                      return IconComponent ? <IconComponent /> : null;
                    })()}
                  </div>
                </motion.div>

                {/* Icon selector */}
                <div className="flex flex-wrap gap-2 justify-center max-w-xs">
                  {WORKFLOW_ICONS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedIconId(item.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                        selectedIconId === item.id
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
                      }`}
                      title={item.name}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20 pt-16">
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
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {language === 'es' ? 'Contáctenos' : 'Contact Us'}
              </h2>
            </div>
            
            {/* Contact Widget */}
            <div className="w-full overflow-hidden">
              <Contact transparent />
            </div>
            </motion.div>
            </div>
            </div>
            </>
            );
}

export default memo(ComoTrabajamos);