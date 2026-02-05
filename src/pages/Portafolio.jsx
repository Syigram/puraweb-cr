import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { ExternalLink, Eye, Tag, Calendar, ArrowRight } from "lucide-react";
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
    name: "Café Montaña Verde",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    description: {
      es: "Sitio web elegante para cafetería artesanal con sistema de reservas online y menú digital interactivo.",
      en: "Elegant website for artisan coffee shop with online reservation system and interactive digital menu."
    },
    tags: ["E-Commerce", "Reservas", "Menú Digital"],
    year: "2024",
    plan: "Profesional"
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
    tags: ["Membresías", "Calendario", "Pagos"],
    year: "2025",
    plan: "Profesional"
  }
];

const categories = [
  { id: "all", label: { es: "Todos", en: "All" } },
  { id: "ecommerce", label: { es: "E-Commerce", en: "E-Commerce" } },
  { id: "corporate", label: { es: "Corporativo", en: "Corporate" } },
  { id: "health", label: { es: "Salud", en: "Health" } },
  { id: "tourism", label: { es: "Turismo", en: "Tourism" } },
  { id: "restaurant", label: { es: "Restaurantes", en: "Restaurants" } },
  { id: "fitness", label: { es: "Fitness", en: "Fitness" } }
];

function PortfolioCard({ project, language }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          loading="lazy"
        />
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Hover Actions */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="sm"
            className="bg-white text-blue-900 hover:bg-blue-50 gap-2"
          >
            <Eye className="w-4 h-4" />
            {language === "es" ? "Ver Demo" : "View Demo"}
          </Button>
        </div>
        {/* Plan Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            {project.plan}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{project.year}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description[language]}
        </p>
        {/* Tags */}
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

export default function Portafolio() {
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
        ctaButton: "Contáctanos",
        stats: {
          projects: "Proyectos",
          clients: "Clientes Felices",
          satisfaction: "Satisfacción"
        }
      },
      en: {
        title: "Our Portfolio",
        subtitle: "Projects That Inspire",
        description:
          "Discover some of the websites we've created for our clients. Each project reflects our passion for design and functionality.",
        cta: "Ready for your project?",
        ctaButton: "Contact Us",
        stats: {
          projects: "Projects",
          clients: "Happy Clients",
          satisfaction: "Satisfaction"
        }
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
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-blue-100 text-blue-800 mb-4">
              {t.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t.subtitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {t.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-gray-600 mt-1">{t.stats.projects}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                40+
              </div>
              <div className="text-gray-600 mt-1">{t.stats.clients}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-gray-600 mt-1">{t.stats.satisfaction}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
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

      {/* Portfolio Grid */}
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

      {/* CTA Section */}
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