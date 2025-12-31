import React, { useEffect, useState, useRef } from "react";
import { Code2, ShoppingCart, Calendar, Shield, ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/components/LanguageContext";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

// iOS/Safari optimized animation variants - uses transform-gpu and will-change
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// Lightweight floating animation - runs only once, no infinite loops for iOS performance
const floatOnce = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Servicios() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "Servicios - PuraWeb CR";
    window.scrollTo(0, 0);
    // Delay animation start to ensure smooth initial render
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const content = {
    es: {
      title: "Soluciones Digitales de Alto Rendimiento",
      subtitle: "Diseñamos, desarrollamos y mantenemos ecosistemas digitales escalables que transforman la operación de su negocio.",
      viewPlans: "Ver Planes",
      services: [
        {
          icon: Code2,
          title: "Desarrollo Web Premium",
          badge: "Todos los Planes",
          badgeColor: "bg-blue-100 text-blue-800",
          description: "No creamos simples páginas; construimos activos digitales. Todos nuestros desarrollos son 100% responsivos, optimizados para SEO y diseñados bajo estándares de UX (Experiencia de Usuario) internacionales.",
          includes: [
            { text: "Landing Pages de alto impacto", tooltip: "Páginas de aterrizaje diseñadas para convertir visitantes en clientes, con velocidades de carga ultra rápidas y mensajes persuasivos." },
            { text: "Blogs de contenido optimizados", tooltip: "Plataformas de blog configuradas para posicionamiento SEO, que aumentan su visibilidad en Google y atraen tráfico orgánico constante." },
            { text: "Portafolios de alta resolución", tooltip: "Vitrinas visuales que proyectan profesionalismo, perfectas para mostrar sus proyectos, productos o servicios con impacto." },
            { text: "Autogestión Total", tooltip: "Sistema de gestión de contenido intuitivo que le permite actualizar textos, imágenes y precios sin conocimientos técnicos ni depender de terceros." }
          ],
          differentiator: "Autogestión total. Usted tiene el control de su contenido sin depender de terceros.",
          planLink: "basic"
        },
        {
          icon: ShoppingCart,
          title: "E-commerce & Infraestructura de Pagos",
          badge: "Plan Profesional y Empresa",
          badgeColor: "bg-red-100 text-red-800",
          description: "Transformamos su sitio en una máquina de ventas global. Especialistas en integración de Stripe, permitiendo cobros locales e internacionales con seguridad de grado bancario.",
          includes: [
            { text: "Carrito de compras optimizado", tooltip: "Experiencia de compra fluida y sin fricciones que reduce carritos abandonados y aumenta las conversiones de venta." },
            { text: "Gestión de inventario automatizado", tooltip: "Control de stock en tiempo real que actualiza disponibilidad automáticamente y evita sobreventa o falta de productos." },
            { text: "Pagos locales e internacionales con Stripe", tooltip: "Procese pagos seguros en colones (CRC), dólares (USD) y más de 135 monedas, expandiendo su alcance de mercado globalmente." },
            { text: "Suscripciones recurrentes y membresías", tooltip: "Genere ingresos predecibles con pagos automáticos mensuales/anuales para servicios, contenido premium o productos por suscripción." }
          ],
          differentiator: "Notificaciones automáticas por WhatsApp para cada venta, manteniendo su negocio conectado en tiempo real.",
          planLink: "professional"
        },
        {
          icon: Calendar,
          title: "Automatización de Servicios y Reservas",
          badge: "Plan Profesional y Empresa",
          badgeColor: "bg-red-100 text-red-800",
          description: "Eliminamos la fricción operativa. Implementamos sistemas inteligentes de agendamiento que trabajan 24/7 por usted.",
          includes: [
            { text: "Calendarios interactivos", tooltip: "Calendarios visuales en tiempo real donde sus clientes seleccionan fechas y horarios disponibles, eliminando el ir y venir de mensajes." },
            { text: "Sincronización con Gmail", tooltip: "Integración bidireccional con Google Calendar que mantiene su agenda personal y profesional siempre actualizada automáticamente." },
            { text: "Formularios personalizados avanzados", tooltip: "Recopile información específica de cada cliente (ej: número de personas, requisitos especiales, presupuesto) antes de la reserva para ofrecer un servicio más personalizado." },
            { text: "Sistemas de reservas para servicios", tooltip: "Plataforma 24/7 que permite a clientes agendar citas, clases o servicios sin intervención humana, maximizando su capacidad de captar reservas incluso fuera de horario." }
          ],
          differentiator: "Integración completa con bases de datos externas y APIs para flujos de trabajo avanzados.",
          planLink: "professional"
        },
        {
          icon: Shield,
          title: "Web as a Service (WaaS) & Soporte Élite",
          badge: "Todos los Planes",
          badgeColor: "bg-blue-100 text-blue-800",
          description: "Olvídese de los problemas técnicos. Su suscripción garantiza que su sitio web evolucione constantemente, se mantenga seguro y nunca quede obsoleto.",
          includes: [
            { text: "Hosting premium incluido", tooltip: "Servidores de alta velocidad con 99.9% de disponibilidad garantizada, asegurando que su sitio esté siempre en línea y cargue rápido para no perder ventas." },
            { text: "Certificado SSL y seguridad", tooltip: "Cifrado de datos que protege la información de sus clientes y mejora su posicionamiento en Google (requisito obligatorio para SEO)." },
            { text: "Backups diarios automáticos", tooltip: "Copias de seguridad automáticas cada 24 horas que garantizan recuperación total de su sitio en caso de problemas, sin pérdida de datos." },
            { text: "Actualizaciones de seguridad proactivas", tooltip: "Monitoreo continuo y parches de seguridad aplicados antes de que surjan vulnerabilidades, protegiendo su negocio de hackeos y malware." }
          ],
          differentiator: "Promesa de servicio (SLA) con tiempos de respuesta desde 4 horas y soporte multicanal (Llamada, WhatsApp, Ticket).",
          planLink: "basic"
        }
      ]
    },
    en: {
      title: "High-Performance Digital Architecture",
      subtitle: "We design, develop, and maintain scalable digital ecosystems that transform your business operations.",
      viewPlans: "View Plans",
      services: [
        {
          icon: Code2,
          title: "Premium Web Development",
          badge: "All Plans",
          badgeColor: "bg-blue-100 text-blue-800",
          description: "We don't create simple pages; we build digital assets. All our developments are 100% responsive, SEO-optimized, and designed under international UX (User Experience) standards.",
          includes: [
            { text: "High-impact Landing Pages", tooltip: "Landing pages designed to convert visitors into customers, with ultra-fast loading speeds and persuasive messaging." },
            { text: "Optimized Content Blogs", tooltip: "Blog platforms configured for SEO ranking, increasing your Google visibility and attracting consistent organic traffic." },
            { text: "High-resolution Portfolios", tooltip: "Visual showcases that project professionalism, perfect for displaying your projects, products, or services with impact." },
            { text: "Total Self-Management", tooltip: "Intuitive content management system that allows you to update text, images, and prices without technical knowledge or depending on third parties." }
          ],
          differentiator: "Total self-management. You have control of your content without depending on third parties.",
          planLink: "basic"
        },
        {
          icon: ShoppingCart,
          title: "E-commerce & Payment Infrastructure",
          badge: "Professional & Business Plan",
          badgeColor: "bg-red-100 text-red-800",
          description: "We transform your site into a global sales machine. Stripe integration specialists, enabling local and international payments with bank-grade security.",
          includes: [
            { text: "Optimized shopping cart", tooltip: "Smooth and frictionless shopping experience that reduces abandoned carts and increases sales conversions." },
            { text: "Automated inventory management", tooltip: "Real-time stock control that automatically updates availability and prevents overselling or out-of-stock situations." },
            { text: "Local and international payments with Stripe", tooltip: "Process secure payments in colones (CRC), dollars (USD), and 135+ currencies, expanding your market reach globally." },
            { text: "Recurring subscriptions and memberships", tooltip: "Generate predictable revenue with automatic monthly/annual payments for services, premium content, or subscription products." }
          ],
          differentiator: "Automatic WhatsApp notifications for every sale, keeping your business connected in real-time.",
          planLink: "professional"
        },
        {
          icon: Calendar,
          title: "Service Automation & Booking Systems",
          badge: "Professional & Business Plan",
          badgeColor: "bg-red-100 text-red-800",
          description: "We eliminate operational friction. We implement intelligent scheduling systems that work 24/7 for you.",
          includes: [
            { text: "Interactive calendars", tooltip: "Real-time visual calendars where your clients select available dates and times, eliminating back-and-forth messaging." },
            { text: "Gmail synchronization", tooltip: "Bidirectional integration with Google Calendar that keeps your personal and professional schedule always updated automatically." },
            { text: "Advanced custom forms", tooltip: "Collect specific information from each client (e.g., number of people, special requirements, budget) before booking to offer more personalized service." },
            { text: "Booking systems for services", tooltip: "24/7 platform that allows clients to schedule appointments, classes, or services without human intervention, maximizing your capacity to capture bookings even outside business hours." }
          ],
          differentiator: "Full integration with external databases and APIs for advanced workflows.",
          planLink: "professional"
        },
        {
          icon: Shield,
          title: "Web as a Service (WaaS) & Elite Support",
          badge: "All Plans",
          badgeColor: "bg-blue-100 text-blue-800",
          description: "Forget about technical problems. Your subscription guarantees that your website constantly evolves, stays secure, and never becomes obsolete.",
          includes: [
            { text: "Premium hosting included", tooltip: "High-speed servers with 99.9% guaranteed uptime, ensuring your site is always online and loads fast so you don't lose sales." },
            { text: "SSL certificate and security", tooltip: "Data encryption that protects your customers' information and improves your Google ranking (mandatory requirement for SEO)." },
            { text: "Automatic daily backups", tooltip: "Automatic backups every 24 hours that guarantee full site recovery in case of problems, without data loss." },
            { text: "Proactive security updates", tooltip: "Continuous monitoring and security patches applied before vulnerabilities arise, protecting your business from hacks and malware." }
          ],
          differentiator: "Service promise (SLA) with response times from 4 hours and multichannel support (Call, WhatsApp, Ticket).",
          planLink: "basic"
        }
      ]
    }
  };

  const t = content[language];

  const handleViewPlans = () => {
    navigate(createPageUrl("Planes"));
  };

  const handleRequestQuote = () => {
    navigate(createPageUrl("Home") + "#contact");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Animated Background Elements - GPU accelerated with infinite float */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl transform-gpu will-change-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-red-400/15 to-orange-400/15 rounded-full blur-3xl transform-gpu will-change-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, 25, 0],
              x: [0, -15, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.1 },
              scale: { duration: 0.8, delay: 0.1 },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl transform-gpu will-change-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, 15, 0],
              x: [0, -10, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 },
              scale: { duration: 0.8, delay: 0.2 },
              y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 11, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </div>

        {/* Animated Geometric Shapes - with infinite rotation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div 
            className="absolute top-32 right-1/4 w-32 h-32 border-4 border-blue-900/20 transform-gpu"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.6 }
            }}
          />
          <motion.div 
            className="absolute bottom-40 left-1/4 w-24 h-24 border-4 border-red-600/20 transform-gpu"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: -360, opacity: 1 }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.5, delay: 0.2 }
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-900/10 to-transparent rounded-full transform-gpu"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </div>

        <motion.div 
          className="max-w-7xl mx-auto text-center relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp}>
            <div className="mb-8">
              <motion.div 
                className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200 mb-6"
                variants={floatOnce}
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {language === 'es' ? 'Soluciones Integrales' : 'Comprehensive Solutions'}
                </span>
              </motion.div>
            </div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                {t.title}
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-8"
              variants={fadeInUp}
            >
              {t.subtitle}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                onClick={handleViewPlans}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-shadow"
              >
                {t.viewPlans}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {t.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index}>
                  <Card className="h-full hover:shadow-2xl transition-shadow duration-200 border-2 hover:border-blue-200 group flex flex-col">
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <Badge className={service.badgeColor}>
                          {service.badge}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-6 flex-1 flex flex-col">
                      {/* Qué incluye */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                          {language === 'es' ? 'Qué incluye' : 'What\'s included'}
                        </h4>
                        <TooltipProvider>
                          <ul className="space-y-2">
                            {service.includes.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <Tooltip delayDuration={200}>
                                  <TooltipTrigger asChild>
                                    <span className="text-gray-700 text-sm cursor-help hover:text-blue-900 transition-colors">
                                      {item.text}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="max-w-xs bg-blue-950 text-white border-blue-900">
                                    <p className="text-sm">{item.tooltip}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </li>
                            ))}
                          </ul>
                        </TooltipProvider>
                      </div>

                      {/* CTA */}
                      <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={handleViewPlans}
                          variant="outline"
                          className="flex-1 group-hover:bg-blue-900 group-hover:text-white group-hover:border-blue-900 transition-all"
                        >
                          {language === 'es' ? 'Ver Planes' : 'View Plans'}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button
                          onClick={handleRequestQuote}
                          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                        >
                          {language === 'es' ? 'Cotización' : 'Get Quote'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'es' ? '¿Listo para transformar su negocio?' : 'Ready to transform your business?'}
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              {language === 'es' 
                ? 'Descubra el plan perfecto para sus necesidades y comience hoy mismo.' 
                : 'Discover the perfect plan for your needs and start today.'}
            </p>
            <Button
              onClick={handleRequestQuote}
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
            >
              {language === 'es' ? 'Contáctanos' : 'Contact Us'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}