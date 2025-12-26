import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, ShoppingCart, Calendar, Shield, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/LanguageContext";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Servicios() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Servicios - PuraWeb CR";
    window.scrollTo(0, 0);
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
            "Landing Pages de alto impacto",
            "Autogestión Total",
            "Blogs de contenido optimizados",
            "Portafolios de alta resolución"
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
            "Carrito de compras optimizado",
            "Gestión de inventario automatizado",
            "Sistemas de cupones y descuentos",
            "Suscripciones recurrentes y membresías"
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
            "Calendarios interactivos",
            "Sincronización con Gmail",
            "Formularios personalizados avanzados",
            "Sistemas de reservas para servicios"
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
            "Hosting premium incluido",
            "Certificado SSL y seguridad",
            "Backups diarios automáticos",
            "Actualizaciones de seguridad proactivas"
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
            "High-impact Landing Pages",
            "Scalable Corporate Websites",
            "Optimized Content Blogs",
            "High-resolution Portfolios"
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
            "Optimized shopping cart",
            "Automated inventory management",
            "Coupon and discount systems",
            "Recurring subscriptions and memberships"
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
            "Interactive calendars",
            "Gmail synchronization",
            "Advanced custom forms",
            "Booking systems for services"
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
            "Premium hosting included",
            "SSL certificate and security",
            "Automatic daily backups",
            "Proactive security updates"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-red-400/15 to-orange-400/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div
            className="absolute top-32 right-1/4 w-32 h-32 border-4 border-blue-900/20 rotate-45"
            animate={{ rotate: [45, 225, 45] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-40 left-1/4 w-24 h-24 border-4 border-red-600/20"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-900/10 to-transparent rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200 mb-6">
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
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                {t.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              {t.subtitle}
            </p>
            <Button
              onClick={handleViewPlans}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              {t.viewPlans}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {t.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 group">
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
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

                    <CardContent className="space-y-6">
                      {/* Qué incluye */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                          {language === 'es' ? 'Qué incluye' : 'What\'s included'}
                        </h4>
                        <ul className="space-y-2">
                          {service.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Diferenciador */}
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                        <h4 className="font-semibold text-red-900 mb-2 text-sm uppercase tracking-wide">
                          {language === 'es' ? 'Diferenciador PuraWeb' : 'PuraWeb Differentiator'}
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {service.differentiator}
                        </p>
                      </div>

                      {/* CTA */}
                      <Button
                        onClick={handleViewPlans}
                        variant="outline"
                        className="w-full group-hover:bg-blue-900 group-hover:text-white group-hover:border-blue-900 transition-all"
                      >
                        {language === 'es' ? 'Ver detalles del plan' : 'View plan details'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'es' ? '¿Listo para transformar su negocio?' : 'Ready to transform your business?'}
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              {language === 'es' 
                ? 'Descubra el plan perfecto para sus necesidades y comience hoy mismo.' 
                : 'Discover the perfect plan for your needs and start today.'}
            </p>
            <Button
              onClick={handleViewPlans}
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
            >
              {t.viewPlans}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}