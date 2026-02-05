import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { ExternalLink, Eye, Tag, Calendar, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const portfolioProjects = [
  {
    id: 1,
    name: "Torre Serenity",
    category: "realestate",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6901cf191d3736d23a1ebf19/26645c03e_serenity1.jpg",
    description: {
      es: "Página web de bienes raíces para la venta de condominios exclusivos con galería interactiva y sistema de agendamiento de visitas.",
      en: "Real estate website for exclusive condominium sales with interactive gallery and visit scheduling system."
    },
    fullDescription: {
      es: "Desarrollamos un sitio web completo de bienes raíces para Torre Serenity, un proyecto de condominios exclusivos en Costa Rica. El sitio cuenta con una galería interactiva de alta calidad que permite a los potenciales compradores explorar cada detalle de las unidades disponibles. Implementamos un sistema de agendamiento de visitas integrado que facilita la coordinación entre clientes y agentes de ventas, mejorando significativamente la tasa de conversión del proyecto.",
      en: "We developed a complete real estate website for Torre Serenity, an exclusive condominium project in Costa Rica. The site features a high-quality interactive gallery that allows potential buyers to explore every detail of the available units. We implemented an integrated visit scheduling system that facilitates coordination between clients and sales agents, significantly improving the project's conversion rate."
    },
    tags: ["Bienes Raíces", "Galería", "Agendamiento"],
    year: "2024",
    plan: "Profesional",
    demoUrl: "https://torreserenity.com/"
  },
  {
    id: 2,
    name: "TechSolutions CR",
    category: "corporate",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description: {
      es: "Portal corporativo moderno para empresa de tecnología con integración de CRM y formularios avanzados.",
      en: "Modern corporate portal for technology company with CRM integration and advanced forms."
    },
    fullDescription: {
      es: "Creamos un portal corporativo de última generación para TechSolutions CR que integra perfectamente su sistema CRM existente. La plataforma incluye formularios avanzados de contacto y cotización, seguimiento de leads en tiempo real, y un sistema de gestión de contenidos que permite al equipo actualizar información sin conocimientos técnicos.",
      en: "We created a state-of-the-art corporate portal for TechSolutions CR that seamlessly integrates with their existing CRM system. The platform includes advanced contact and quote forms, real-time lead tracking, and a content management system that allows the team to update information without technical knowledge."
    },
    tags: ["Corporativo", "CRM", "APIs"],
    year: "2024",
    plan: "Empresa"
  },
  {
    id: 3,
    name: "Boutique Luna",
    category: "ecommerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    description: {
      es: "Tienda online de moda con catálogo dinámico, carrito de compras y pagos con Stripe integrados.",
      en: "Online fashion store with dynamic catalog, shopping cart, and integrated Stripe payments."
    },
    fullDescription: {
      es: "Boutique Luna es una tienda online de moda que revolucionó su modelo de negocio con nuestra solución e-commerce. Implementamos un catálogo dinámico con filtros avanzados, carrito de compras intuitivo, y sistema de pagos con Stripe que acepta todas las tarjetas principales. La plataforma incluye gestión de inventario en tiempo real, notificaciones automáticas de pedidos, y un sistema de envíos integrado.",
      en: "Boutique Luna is an online fashion store that revolutionized its business model with our e-commerce solution. We implemented a dynamic catalog with advanced filters, intuitive shopping cart, and Stripe payment system that accepts all major cards. The platform includes real-time inventory management, automatic order notifications, and an integrated shipping system."
    },
    tags: ["E-Commerce", "Stripe", "Catálogo"],
    year: "2024",
    plan: "Profesional"
  },
  {
    id: 4,
    name: "Dr. Rodríguez Dental",
    category: "health",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    description: {
      es: "Sitio profesional para clínica dental con sistema de citas online y portal de pacientes.",
      en: "Professional website for dental clinic with online appointment system and patient portal."
    },
    fullDescription: {
      es: "Desarrollamos una solución digital completa para la Clínica Dental del Dr. Rodríguez, incluyendo un sistema de citas online que reduce el trabajo administrativo en un 60%. El portal de pacientes permite acceder a historiales médicos, resultados de exámenes y recordatorios automáticos de citas. Integramos un sistema de pagos online para tratamientos y consultas.",
      en: "We developed a complete digital solution for Dr. Rodríguez Dental Clinic, including an online appointment system that reduces administrative work by 60%. The patient portal allows access to medical records, exam results, and automatic appointment reminders. We integrated an online payment system for treatments and consultations."
    },
    tags: ["Salud", "Citas Online", "Portal"],
    year: "2025",
    plan: "Profesional"
  },
  {
    id: 5,
    name: "Aventuras Pura Vida",
    category: "tourism",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: {
      es: "Plataforma de turismo con reservas de tours, galería inmersiva y testimonios de viajeros.",
      en: "Tourism platform with tour bookings, immersive gallery, and traveler testimonials."
    },
    fullDescription: {
      es: "Aventuras Pura Vida es una plataforma de turismo que conecta a viajeros con experiencias auténticas en Costa Rica. Desarrollamos un sistema completo de reservas de tours en tiempo real, galería inmersiva con fotos y videos 360°, calendario de disponibilidad dinámico, y sección de testimonios verificados. La plataforma incluye integración con WhatsApp para consultas instantáneas.",
      en: "Aventuras Pura Vida is a tourism platform that connects travelers with authentic experiences in Costa Rica. We developed a complete real-time tour booking system, immersive gallery with 360° photos and videos, dynamic availability calendar, and verified testimonials section. The platform includes WhatsApp integration for instant queries."
    },
    tags: ["Turismo", "Reservas", "Galería"],
    year: "2025",
    plan: "Empresa"
  },
  {
    id: 6,
    name: "Fitness Pro Gym",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    description: {
      es: "Web dinámica para gimnasio con membresías online, horarios de clases y seguimiento de progreso.",
      en: "Dynamic website for gym with online memberships, class schedules, and progress tracking."
    },
    fullDescription: {
      es: "Fitness Pro Gym transformó su operación con nuestra plataforma digital integral. Los miembros pueden comprar y gestionar membresías online, reservar clases grupales, hacer seguimiento de su progreso con gráficas personalizadas, y recibir planes de entrenamiento personalizados. Implementamos un sistema de check-in con código QR.",
      en: "Fitness Pro Gym transformed its operation with our comprehensive digital platform. Members can purchase and manage memberships online, book group classes, track their progress with personalized graphs, and receive customized training plans. We implemented a QR code check-in system."
    },
    tags: ["Membresías", "Calendario", "Pagos"],
    year: "2025",
    plan: "Profesional"
  }
];

const categories = [
  { id: "all", label: { es: "Todos", en: "All" } },
  { id: "realestate", label: { es: "Bienes Raíces", en: "Real Estate" } },
  { id: "ecommerce", label: { es: "E-Commerce", en: "E-Commerce" } },
  { id: "corporate", label: { es: "Corporativo", en: "Corporate" } },
  { id: "health", label: { es: "Salud", en: "Health" } },
  { id: "tourism", label: { es: "Turismo", en: "Tourism" } },
  { id: "restaurant", label: { es: "Restaurantes", en: "Restaurants" } },
  { id: "fitness", label: { es: "Fitness", en: "Fitness" } }
];

function PortfolioCard({ project, language }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        {project.demoUrl && (
          <div
            className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="sm"
              className="bg-white text-blue-900 hover:bg-blue-50 gap-2"
              onClick={() => window.open(project.demoUrl, '_blank')}
            >
              <Eye className="w-4 h-4" />
              {language === "es" ? "Ver Demo" : "View Demo"}
            </Button>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            {project.plan}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{project.year}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
          {project.name}
        </h3>
        <p className={`text-gray-600 text-sm mb-4 ${!isExpanded ? 'line-clamp-2' : ''}`}>
          {isExpanded ? project.fullDescription[language] : project.description[language]}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 mb-4 transition-colors"
        >
          {isExpanded ? (
            <>
              {language === "es" ? "Leer menos" : "Read less"}
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              {language === "es" ? "Leer más" : "Read more"}
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PortafolioExpandible() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const content = useMemo(
    () => ({
      es: {
        title: "Nuestro Portafolio",
        subtitle: "Proyectos que Inspiran",
        description:
          "Descubre algunos de los sitios web que hemos creado para nuestros clientes. Cada proyecto refleja nuestra pasión por el diseño y la funcionalidad.",
        cta: "¿Listo para tu proyecto?",
        ctaButton: "Contáctanos"
      },
      en: {
        title: "Our Portfolio",
        subtitle: "Projects That Inspire",
        description:
          "Discover some of the websites we've created for our clients. Each project reflects our passion for design and functionality.",
        cta: "Ready for your project?",
        ctaButton: "Contact Us"
      }
    }),
    []
  );

  const t = content[language];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return portfolioProjects;
    return portfolioProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-3">
              {t.subtitle}
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t.description}
            </p>
            <p className="text-sm text-blue-600 mt-2 font-medium">
              {language === "es" ? "Versión: Descripción Expandible" : "Version: Expandable Description"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-y border-gray-100 bg-white/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label[language]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredProjects.map((project) => (
              <PortfolioCard
                key={project.id}
                project={project}
                language={language}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.cta}
            </h2>
            <Link to={createPageUrl("Contacto")}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg gap-2"
              >
                {t.ctaButton}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}