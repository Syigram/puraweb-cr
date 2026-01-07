import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  MessageCircle, 
  Calendar, 
  Zap, 
  Heart, 
  CheckCircle2,
  Clock,
  Users,
  Lightbulb,
  Rocket,
  Gift,
  Star,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export default function GuiaBienvenida() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  const content = {
    es: {
      title: "Guía de Bienvenida",
      subtitle: "Todo lo que necesitas saber para comenzar tu viaje digital con nosotros",
      welcomeTitle: "¡Bienvenido a PuraWeb CR! 🎉",
      welcomeText: "Estamos emocionados de tenerte como parte de nuestra familia digital. Esta guía está diseñada para que tu experiencia sea increíble desde el primer día. Vamos a construir algo extraordinario juntos.",
      whatToExpect: {
        title: "¿Qué Puedes Esperar?",
        subtitle: "Tu viaje comienza aquí",
        items: [
          {
            icon: Rocket,
            title: "Lanzamiento Rápido",
            description: "Tu sitio estará listo en tiempo récord. Trabajamos con agilidad sin comprometer la calidad.",
            color: "blue"
          },
          {
            icon: MessageCircle,
            title: "Comunicación Clara",
            description: "Respuestas en menos de 24 horas. Siempre sabrás qué está pasando con tu proyecto.",
            color: "green"
          },
          {
            icon: Zap,
            title: "Actualizaciones Constantes",
            description: "Tu sitio evoluciona contigo. Mejoras continuas sin costos adicionales sorpresa.",
            color: "purple"
          },
          {
            icon: Heart,
            title: "Soporte Dedicado",
            description: "Un equipo que realmente se preocupa por tu éxito. Estamos aquí para ti.",
            color: "red"
          }
        ]
      },
      process: {
        title: "Tu Viaje con Nosotros",
        subtitle: "Paso a paso hacia tu sitio web perfecto",
        steps: [
          {
            number: "01",
            title: "Conversación Inicial",
            description: "Nos conocemos, entendemos tu visión y definimos objetivos claros.",
            icon: Users,
            tip: "Consejo: Ten lista tu paleta de colores y sitios web que te inspiren."
          },
          {
            number: "02",
            title: "Diseño y Aprobación",
            description: "Creamos el diseño inicial. Tú revisas, ajustamos y perfeccionamos.",
            icon: Lightbulb,
            tip: "Consejo: Sé específico con tus comentarios. Nos ayuda a darte exactamente lo que quieres."
          },
          {
            number: "03",
            title: "Desarrollo Activo",
            description: "Construimos tu sitio con actualizaciones constantes del progreso.",
            icon: Rocket,
            tip: "Consejo: Prueba cada funcionalidad que te enviemos. Tu feedback temprano ahorra tiempo."
          },
          {
            number: "04",
            title: "Lanzamiento y Más Allá",
            description: "Tu sitio va en vivo y comenzamos el soporte continuo.",
            icon: Star,
            tip: "Consejo: Agenda una sesión de capacitación para aprovechar al máximo tu panel."
          }
        ]
      },
      bestPractices: {
        title: "Mejores Prácticas para Trabajar Juntos",
        subtitle: "Así logramos los mejores resultados",
        practices: [
          {
            icon: CheckCircle2,
            title: "Feedback Específico",
            description: "En lugar de 'No me gusta', di 'Prefiero el azul más oscuro' o 'Ese botón debería estar más arriba'.",
            color: "green"
          },
          {
            icon: Clock,
            title: "Responde Rápido",
            description: "Cuanto más rápido apruebas diseños y funcionalidades, más rápido avanzamos.",
            color: "orange"
          },
          {
            icon: Calendar,
            title: "Planifica los Cambios",
            description: "Si necesitas cambios grandes, avísanos con tiempo. Así podemos planificar mejor.",
            color: "blue"
          },
          {
            icon: Gift,
            title: "Usa tus Horas Mensuales",
            description: "No dejes que tus horas de cambio se desperdicien. Mejora tu sitio constantemente.",
            color: "purple"
          }
        ]
      },
      communication: {
        title: "¿Cómo Nos Comunicamos?",
        channels: [
          {
            icon: MessageCircle,
            title: "WhatsApp",
            description: "Para consultas rápidas y urgentes",
            response: "Respuesta en minutos (horario laboral)"
          },
          {
            icon: MessageCircle,
            title: "Email",
            description: "Para solicitudes detalladas y formales",
            response: "Respuesta en 24 horas"
          },
          {
            icon: Users,
            title: "Reuniones Virtuales",
            description: "Para revisiones de diseño y planificación",
            response: "Agenda con 48 horas de anticipación"
          }
        ]
      },
      tips: {
        title: "Tips para el Éxito",
        subtitle: "Pequeños consejos que marcan la diferencia",
        list: [
          "Ten listos tus textos, imágenes y logos antes de comenzar",
          "Revisa tu sitio en móvil y desktop regularmente",
          "Usa el panel de administración que te proporcionamos",
          "No tengas miedo de pedir ayuda o aclaraciones",
          "Aprovecha nuestro soporte ilimitado",
          "Mantén tus credenciales seguras y no las compartas",
          "Exporta tus datos regularmente como respaldo",
          "Comunica cambios en tu negocio que puedan afectar el sitio"
        ]
      },
      resources: {
        title: "Recursos Útiles",
        items: [
          {
            title: "Panel de Usuario",
            description: "Gestiona tus suscripciones y tickets de soporte",
            link: "UserDashboard",
            icon: Users
          },
          {
            title: "Soporte Técnico",
            description: "Resuelve dudas y reporta problemas",
            link: "Support",
            icon: MessageCircle
          },
          {
            title: "Términos y Condiciones",
            description: "Lee los detalles de tu servicio",
            link: "TerminosCondiciones",
            icon: CheckCircle2
          }
        ]
      },
      cta: {
        title: "¿Listo para Comenzar?",
        subtitle: "Estamos aquí para hacer que tu proyecto sea un éxito",
        button: "Contactar Ahora"
      }
    },
    en: {
      title: "Welcome Guide",
      subtitle: "Everything you need to know to start your digital journey with us",
      welcomeTitle: "Welcome to PuraWeb CR! 🎉",
      welcomeText: "We're excited to have you as part of our digital family. This guide is designed to make your experience amazing from day one. Let's build something extraordinary together.",
      whatToExpect: {
        title: "What to Expect?",
        subtitle: "Your journey starts here",
        items: [
          {
            icon: Rocket,
            title: "Fast Launch",
            description: "Your site will be ready in record time. We work with agility without compromising quality.",
            color: "blue"
          },
          {
            icon: MessageCircle,
            title: "Clear Communication",
            description: "Responses in less than 24 hours. You'll always know what's happening with your project.",
            color: "green"
          },
          {
            icon: Zap,
            title: "Constant Updates",
            description: "Your site evolves with you. Continuous improvements without surprise costs.",
            color: "purple"
          },
          {
            icon: Heart,
            title: "Dedicated Support",
            description: "A team that truly cares about your success. We're here for you.",
            color: "red"
          }
        ]
      },
      process: {
        title: "Your Journey with Us",
        subtitle: "Step by step towards your perfect website",
        steps: [
          {
            number: "01",
            title: "Initial Conversation",
            description: "We meet, understand your vision, and define clear objectives.",
            icon: Users,
            tip: "Tip: Have your color palette and inspiring websites ready."
          },
          {
            number: "02",
            title: "Design and Approval",
            description: "We create the initial design. You review, we adjust and perfect.",
            icon: Lightbulb,
            tip: "Tip: Be specific with your feedback. It helps us give you exactly what you want."
          },
          {
            number: "03",
            title: "Active Development",
            description: "We build your site with constant progress updates.",
            icon: Rocket,
            tip: "Tip: Test every feature we send you. Early feedback saves time."
          },
          {
            number: "04",
            title: "Launch and Beyond",
            description: "Your site goes live and we begin continuous support.",
            icon: Star,
            tip: "Tip: Schedule a training session to get the most out of your dashboard."
          }
        ]
      },
      bestPractices: {
        title: "Best Practices for Working Together",
        subtitle: "How we achieve the best results",
        practices: [
          {
            icon: CheckCircle2,
            title: "Specific Feedback",
            description: "Instead of 'I don't like it', say 'I prefer darker blue' or 'That button should be higher'.",
            color: "green"
          },
          {
            icon: Clock,
            title: "Respond Quickly",
            description: "The faster you approve designs and features, the faster we move forward.",
            color: "orange"
          },
          {
            icon: Calendar,
            title: "Plan Changes",
            description: "If you need major changes, let us know in advance. We can plan better.",
            color: "blue"
          },
          {
            icon: Gift,
            title: "Use Your Monthly Hours",
            description: "Don't let your change hours go to waste. Constantly improve your site.",
            color: "purple"
          }
        ]
      },
      communication: {
        title: "How Do We Communicate?",
        channels: [
          {
            icon: MessageCircle,
            title: "WhatsApp",
            description: "For quick and urgent inquiries",
            response: "Response in minutes (business hours)"
          },
          {
            icon: MessageCircle,
            title: "Email",
            description: "For detailed and formal requests",
            response: "Response within 24 hours"
          },
          {
            icon: Users,
            title: "Virtual Meetings",
            description: "For design reviews and planning",
            response: "Schedule 48 hours in advance"
          }
        ]
      },
      tips: {
        title: "Success Tips",
        subtitle: "Small tips that make a big difference",
        list: [
          "Have your texts, images, and logos ready before starting",
          "Check your site on mobile and desktop regularly",
          "Use the admin panel we provide",
          "Don't be afraid to ask for help or clarifications",
          "Take advantage of our unlimited support",
          "Keep your credentials secure and don't share them",
          "Export your data regularly as backup",
          "Communicate business changes that may affect the site"
        ]
      },
      resources: {
        title: "Useful Resources",
        items: [
          {
            title: "User Dashboard",
            description: "Manage your subscriptions and support tickets",
            link: "UserDashboard",
            icon: Users
          },
          {
            title: "Technical Support",
            description: "Resolve questions and report issues",
            link: "Support",
            icon: MessageCircle
          },
          {
            title: "Terms and Conditions",
            description: "Read the details of your service",
            link: "TerminosCondiciones",
            icon: CheckCircle2
          }
        ]
      },
      cta: {
        title: "Ready to Get Started?",
        subtitle: "We're here to make your project a success",
        button: "Contact Now"
      }
    }
  };

  const t = content[language];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    red: "bg-red-100 text-red-600",
    orange: "bg-orange-100 text-orange-600"
  };

  return (
    <>
      <SEO
        title={t.title}
        description={t.subtitle}
        canonical={`https://puraweb.cr/${language === 'es' ? 'guia-bienvenida' : 'welcome-guide'}`}
        language={language}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                <Sparkles className="w-4 h-4" />
                {language === 'es' ? 'Tu Viaje Comienza Aquí' : 'Your Journey Starts Here'}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t.title}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Welcome Message */}
        <section className="pb-16 px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                  {t.welcomeTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 text-center leading-relaxed">
                  {t.welcomeText}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* What to Expect */}
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.whatToExpect.title}
              </h2>
              <p className="text-gray-600 text-lg">{t.whatToExpect.subtitle}</p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {t.whatToExpect.items.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-2">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-2xl ${colorClasses[item.color]} flex items-center justify-center mb-4 mx-auto`}>
                        <item.icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-xl text-center">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="pb-16 px-6 bg-white/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.process.title}</h2>
              <p className="text-gray-600 text-lg">{t.process.subtitle}</p>
            </motion.div>

            <div className="space-y-8">
              {t.process.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {step.number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <step.icon className="w-6 h-6 text-purple-600" />
                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 text-lg mb-4">{step.description}</p>
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                            <p className="text-sm text-yellow-800">
                              <span className="font-semibold">💡 {step.tip}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.bestPractices.title}</h2>
              <p className="text-gray-600 text-lg">{t.bestPractices.subtitle}</p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {t.bestPractices.practices.map((practice, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${colorClasses[practice.color]} flex items-center justify-center flex-shrink-0`}>
                          <practice.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{practice.title}</CardTitle>
                          <CardDescription className="text-base">{practice.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Communication */}
        <section className="pb-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.communication.title}</h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {t.communication.channels.map((channel, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="h-full text-center hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <channel.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{channel.title}</CardTitle>
                      <CardDescription>{channel.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                        ⏱️ {channel.response}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tips */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.tips.title}</h2>
              <p className="text-gray-600 text-lg">{t.tips.subtitle}</p>
            </motion.div>

            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {t.tips.list.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.resources.title}</h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {t.resources.items.map((resource, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Link to={createPageUrl(resource.link)}>
                    <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                      <CardHeader>
                        <div className="w-16 h-16 bg-purple-100 group-hover:bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                          <resource.icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
                        </div>
                        <CardTitle className="text-xl text-center">{resource.title}</CardTitle>
                        <CardDescription className="text-center">{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <ArrowRight className="w-5 h-5 text-purple-600 mx-auto group-hover:translate-x-1 transition-transform" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
              <CardContent className="p-12 text-center">
                <Rocket className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
                <p className="text-xl mb-8 text-blue-100">{t.cta.subtitle}</p>
                <Link to={createPageUrl("Contacto")}>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                    {t.cta.button}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}