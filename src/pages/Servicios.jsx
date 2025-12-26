import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, ShoppingCart, Wrench, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageContext";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Servicios() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = language === 'es' ? 'Soluciones - PuraWeb CR' : 'Solutions - PuraWeb CR';
  }, [language]);

  const content = {
    es: {
      hero: {
        badge: "Partner Tecnológico",
        title: "Arquitectura Digital de Alto Rendimiento",
        subtitle: "Diseñamos, desarrollamos y mantenemos ecosistemas digitales escalables que transforman la operación de su negocio.",
        cta: "Comenzar Proyecto"
      },
      solutions: [
        {
          icon: Code2,
          title: "Web Experience & Design",
          focus: "UX/UI Premium, carga instantánea, diseño persuasivo",
          description: "Sitios web que no solo se ven bien, sino que están optimizados para convertir visitantes en clientes.",
          features: [
            "Diseño responsive y mobile-first",
            "Optimización de velocidad (Core Web Vitals)",
            "Interfaces intuitivas centradas en el usuario",
            "Arquitectura escalable y mantenible"
          ],
          color: "from-blue-900 to-blue-700"
        },
        {
          icon: ShoppingCart,
          title: "E-commerce Ecosystems",
          focus: "Integración global con Stripe, gestión de inventario, automatización de ventas",
          description: "Plataformas de venta robustas y seguras, listas para procesar transacciones locales e internacionales sin fricción.",
          features: [
            "Pasarela de pagos Stripe integrada",
            "Gestión de inventario en tiempo real",
            "Checkout optimizado para conversión",
            "Soporte para suscripciones y membresías"
          ],
          color: "from-red-600 to-red-700"
        },
        {
          icon: Wrench,
          title: "WaaS (Web as a Service)",
          focus: "Soporte proactivo, mantenimiento de seguridad, actualizaciones continuas",
          description: "Su tecnología siempre al día. Nos encargamos de la infraestructura para que usted se enfoque en el negocio.",
          features: [
            "Monitoreo 24/7 y uptime garantizado",
            "Actualizaciones de seguridad automáticas",
            "Backups diarios y recuperación rápida",
            "Soporte técnico prioritario"
          ],
          color: "from-green-600 to-green-700"
        },
        {
          icon: Zap,
          title: "Operational Automation",
          focus: "Sistemas de citas, integración con APIs, automatización de flujos de trabajo",
          description: "Optimice su tiempo con sistemas inteligentes de reservas y notificaciones automatizadas.",
          features: [
            "Sistema de reservas y citas online",
            "Notificaciones por email y WhatsApp",
            "Integración con herramientas externas",
            "Flujos de trabajo personalizados"
          ],
          color: "from-purple-600 to-purple-700"
        }
      ],
      techStack: {
        title: "Tech Stack de Clase Mundial",
        subtitle: "Construimos con las tecnologías más avanzadas y confiables del mercado",
        technologies: [
          { name: "React", category: "Frontend" },
          { name: "Node.js", category: "Backend" },
          { name: "Stripe", category: "Payments" },
          { name: "AWS", category: "Cloud" },
          { name: "PostgreSQL", category: "Database" },
          { name: "Tailwind CSS", category: "Styling" }
        ]
      },
      cta: {
        title: "¿Listo para Escalar su Negocio?",
        subtitle: "Comencemos a construir la infraestructura digital que su empresa necesita.",
        button: "Agendar Consultoría Gratuita"
      }
    },
    en: {
      hero: {
        badge: "Technology Partner",
        title: "High-Performance Digital Architecture",
        subtitle: "We design, develop, and maintain scalable digital ecosystems that transform your business operations.",
        cta: "Start Project"
      },
      solutions: [
        {
          icon: Code2,
          title: "Web Experience & Design",
          focus: "Premium UX/UI, instant loading, persuasive design",
          description: "Websites that not only look great but are optimized to convert visitors into customers.",
          features: [
            "Responsive and mobile-first design",
            "Speed optimization (Core Web Vitals)",
            "Intuitive user-centered interfaces",
            "Scalable and maintainable architecture"
          ],
          color: "from-blue-900 to-blue-700"
        },
        {
          icon: ShoppingCart,
          title: "E-commerce Ecosystems",
          focus: "Global Stripe integration, inventory management, sales automation",
          description: "Robust and secure sales platforms, ready to process local and international transactions seamlessly.",
          features: [
            "Integrated Stripe payment gateway",
            "Real-time inventory management",
            "Conversion-optimized checkout",
            "Support for subscriptions and memberships"
          ],
          color: "from-red-600 to-red-700"
        },
        {
          icon: Wrench,
          title: "WaaS (Web as a Service)",
          focus: "Proactive support, security maintenance, continuous updates",
          description: "Your technology always up to date. We handle the infrastructure so you can focus on your business.",
          features: [
            "24/7 monitoring and guaranteed uptime",
            "Automatic security updates",
            "Daily backups and quick recovery",
            "Priority technical support"
          ],
          color: "from-green-600 to-green-700"
        },
        {
          icon: Zap,
          title: "Operational Automation",
          focus: "Appointment systems, API integration, workflow automation",
          description: "Optimize your time with intelligent booking systems and automated notifications.",
          features: [
            "Online booking and appointment system",
            "Email and WhatsApp notifications",
            "Integration with external tools",
            "Custom workflows"
          ],
          color: "from-purple-600 to-purple-700"
        }
      ],
      techStack: {
        title: "World-Class Tech Stack",
        subtitle: "We build with the most advanced and reliable technologies on the market",
        technologies: [
          { name: "React", category: "Frontend" },
          { name: "Node.js", category: "Backend" },
          { name: "Stripe", category: "Payments" },
          { name: "AWS", category: "Cloud" },
          { name: "PostgreSQL", category: "Database" },
          { name: "Tailwind CSS", category: "Styling" }
        ]
      },
      cta: {
        title: "Ready to Scale Your Business?",
        subtitle: "Let's start building the digital infrastructure your company needs.",
        button: "Schedule Free Consultation"
      }
    }
  };

  const t = content[language];

  const scrollToContact = () => {
    navigate(createPageUrl("Home"));
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(206,17,38,0.1),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <span className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold border border-white/20">
                {t.hero.badge}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t.hero.title}
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              {t.hero.subtitle}
            </p>
            
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {t.solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${solution.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {solution.title}
                      </h3>
                      
                      {/* Focus */}
                      <p className="text-sm text-gray-500 italic mb-4">
                        {solution.focus}
                      </p>
                      
                      {/* Description */}
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {solution.description}
                      </p>
                      
                      {/* Features */}
                      <ul className="space-y-3">
                        {solution.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.techStack.title}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t.techStack.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {t.techStack.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all hover:scale-105"
              >
                <div className="text-white font-bold text-lg mb-2">{tech.name}</div>
                <div className="text-blue-200 text-sm">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              {t.cta.subtitle}
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              {t.cta.button}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}