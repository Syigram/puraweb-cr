import React, { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { Calendar, Tag, ArrowRight, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Contact from "@/components/home/Contact";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
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
    year: "2026",
    plan: "Profesional",
    demoUrl: "https://torreserenity.com/"
  },
  {
    id: 7,
    name: "ÉLARA",
    category: "ecommerce",
    image: "https://media.base44.com/images/public/6901cf191d3736d23a1ebf19/ec61fff60_web_design.png",
    description: {
      es: "Tienda de moda femenina con estilos florales y casuales, catálogo completo de ropa y pagos integrados con Stripe.",
      en: "Women's fashion store featuring floral and casual styles, complete clothing catalog, and Stripe integrated payments."
    },
    fullDescription: {
      es: "ÉLARA es una elegante tienda de ropa femenina que captura la esencia de la moda casual con un toque floral y romántico. Desarrollamos una experiencia de compra online completa con catálogo dinámico de blusas, vestidos y pantalones, sistema de carrito y pagos seguros con Stripe. El diseño refleja la identidad de la marca: limpio, sofisticado y pensado para la mujer moderna que busca prendas con personalidad.",
      en: "ÉLARA is an elegant women's clothing store that captures the essence of casual fashion with a floral and romantic touch. We developed a complete online shopping experience with a dynamic catalog of blouses, dresses, and pants, a cart system, and secure Stripe payments. The design reflects the brand's identity: clean, sophisticated, and designed for the modern woman who seeks garments with personality."
    },
    tags: ["E-Commerce", "Tienda", "Ropa", "Mujer", "Stripe"],
    year: "2026",
    plan: "Profesional",
    demoUrl: "https://elaracr.com/"
  },
  {
    id: 8,
    name: "AquaLuxe",
    category: "ecommerce",
    image: "https://media.base44.com/images/public/6901cf191d3736d23a1ebf19/de63e87cb_design.png",
    description: {
      es: "Tienda de trajes de baño femeninos con colecciones exclusivas de bikinis y enterizos, catálogo completo y pagos integrados.",
      en: "Women's swimwear store with exclusive bikini and one-piece collections, complete catalog, and integrated payments."
    },
    fullDescription: {
      es: "AquaLuxe es una elegante tienda de trajes de baño femeninos diseñada para la mujer que busca sofisticación y confort bajo el sol. Desarrollamos una experiencia de compra completa con catálogo dinámico de bikinis, enterizos y salidas de playa, navegación por categorías, y sistema de pagos seguro. El diseño captura la esencia de la marca: sofisticado, sensual y orientado a la moda de playa premium.",
      en: "AquaLuxe is an elegant women's swimwear store designed for the woman who seeks sophistication and comfort under the sun. We developed a complete shopping experience with a dynamic catalog of bikinis, one-pieces, and cover-ups, category navigation, and a secure payment system. The design captures the brand's essence: sophisticated, sensual, and focused on premium beachwear fashion."
    },
    tags: ["E-Commerce", "Swimwear", "Mujer", "Bikinis", "Moda"],
    year: "2026",
    plan: "Profesional",
    demoUrl: "https://aqualuxecr.com/"
  },
  {
    id: 9,
    name: "FisioSalud",
    category: "health",
    image: "https://media.base44.com/images/public/6901cf191d3736d23a1ebf19/5e987ce37_fisio2.png",
    description: {
      es: "Sitio web para fisioterapeuta profesional con servicios de terapias, masajes, rehabilitación, tratamientos post-quirúrgicos y atención de lesiones.",
      en: "Website for a professional physiotherapist offering therapy, massage, rehabilitation, post-surgical treatments, and injury care services."
    },
    fullDescription: {
      es: "FisioSalud es el sitio web del Dr. Jordan Brenes, fisioterapeuta con más de 10 años de experiencia brindando tratamientos especializados. Desarrollamos una plataforma profesional que presenta sus servicios de fisioterapia, masajes terapéuticos, rehabilitación, tratamientos post-quirúrgicos y atención de lesiones deportivas. El sitio incluye sistema de agendamiento de citas online, sección de testimonios de pacientes y mapa de ubicación, facilitando que los pacientes accedan a atención especializada de forma rápida y sencilla.",
      en: "FisioSalud is the website of Dr. Jordan Brenes, a physiotherapist with over 10 years of experience providing specialized treatments. We developed a professional platform showcasing his physiotherapy services, therapeutic massages, rehabilitation, post-surgical treatments, and sports injury care. The site includes an online appointment booking system, patient testimonials section, and location map, making it easy for patients to access specialized care quickly and conveniently."
    },
    tags: ["Salud", "Fisioterapia", "Citas Online", "Rehabilitación"],
    year: "2026",
    plan: "Profesional",
    demoUrl: "https://jordanbrenes.com/"
  },
  {
    id: 13,
    name: "KMSEnfermería",
    category: "health",
    image: "https://media.base44.com/images/public/6901cf191d3736d23a1ebf19/24902a10f_image.png",
    description: {
      es: "Plataforma de servicios de enfermería a domicilio con cuidado personalizado y atención excepcional para pacientes en su hogar.",
      en: "Home nursing services platform offering personalized care and exceptional attention for patients at home."
    },
    fullDescription: {
      es: "KMS Enfermería es una plataforma especializada en servicios de enfermería premium a domicilio. Ofrece cuidado de enfermería personalizado con los más altos estándares clínicos, llevando atención excepcional directamente al hogar del paciente. Desarrollamos un sitio web profesional que destaca la excelencia clínica y compasión de los servicios, con información detallada de servicios disponibles, calendarios de disponibilidad, testimonios de pacientes y sistema de reserva de consultas.",
      en: "KMS Enfermería is a platform specialized in premium home nursing services. It offers personalized nursing care with the highest clinical standards, bringing exceptional attention directly to the patient's home. We developed a professional website that highlights the clinical excellence and compassion of the services, with detailed information about available services, availability schedules, patient testimonials, and appointment booking system."
    },
    tags: ["Enfermería", "Salud", "Domicilio", "Cuidado", "Servicios"],
    year: "2026",
    plan: "Profesional",
    demoUrl: "https://kmsenfermeria.com/"
  },
  {
    id: 10,
    name: "Yours",
    category: "ecommerce",
    image: "https://media.base44.com/images/public/6901cf191d3736d23a1ebf19/dd858ecbc_image.png",
    description: {
      es: "Perfumería premium online con colecciones exclusivas de fragancias para hombre y mujer de las mejores marcas del mundo.",
      en: "Premium online perfumery featuring exclusive fragrance collections for men and women from the world's finest brands."
    },
    fullDescription: {
      es: "Yours es una elegante tienda de perfumería premium diseñada para los amantes de las fragancias exclusivas. Desarrollamos una experiencia de compra sofisticada con catálogo completo de perfumes para hombre y mujer, decants y colecciones especiales de las mejores marcas internacionales. El diseño oscuro y dorado refleja la esencia de la marca: lujo, exclusividad y distinción. La tienda incluye navegación por categorías, sistema de carrito y pagos integrados.",
      en: "Yours is an elegant premium perfumery store designed for lovers of exclusive fragrances. We developed a sophisticated shopping experience with a complete catalog of men's and women's perfumes, decants, and special collections from the world's finest international brands. The dark and gold design reflects the brand's essence: luxury, exclusivity, and distinction. The store includes category navigation, cart system, and integrated payments."
    },
    tags: ["E-Commerce", "Perfumería", "Lujo", "Fragancias", "Premium"],
    year: "2026",
    plan: "Profesional",
    demoUrl: "https://yourscr.com/"
  },
  {
    id: 11,
    name: "MastersAcademyMMA",
    category: "fitness",
    image: "https://media.base44.com/images/public/6901cf191d3736d23a1ebf19/4e6fe5d31_image.png",
    description: {
      es: "Gimnasio de artes marciales mixtas con clases de Jiu-Jitsu, Boxeo, Kickboxing y MMA, dirigido por entrenadores profesionales.",
      en: "Mixed martial arts gym offering classes in Jiu-Jitsu, Boxing, Kickboxing, and MMA, led by professional trainers."
    },
    fullDescription: {
      es: "Masters Academy MMA es un gimnasio de artes marciales mixtas de élite que ofrece entrenamientos especializados en Jiu-Jitsu, Boxeo, Kickboxing y MMA. Dirigido por entrenadores profesionales con más de 10 años de experiencia, la academia cuenta con más de 50 miembros activos y una comunidad apasionada. Desarrollamos un sitio web moderno que refleja la intensidad y profesionalismo de la academia, con galerías dinámicas, información de clases, perfiles de entrenadores y sistema de reservas para clases.",
      en: "Masters Academy MMA is an elite mixed martial arts gym offering specialized training in Jiu-Jitsu, Boxing, Kickboxing, and MMA. Led by professional trainers with over 10 years of experience, the academy boasts more than 50 active members and a passionate community. We developed a modern website that reflects the intensity and professionalism of the academy, with dynamic galleries, class information, trainer profiles, and a booking system for classes."
    },
    tags: ["MMA", "Artes Marciales", "Gimnasio", "Jiu-Jitsu", "Boxeo"],
    year: "2026",
    plan: "Profesional",
    demoUrl: "https://mastersacademymma.com/"
  },
  {
    id: 12,
    name: "VertigoTropical",
    category: "tourism",
    image: "https://media.base44.com/images/public/6901cf191d3736d23a1ebf19/c4d6de122_image.png",
    description: {
      es: "Plataforma de expediciones de cliff jumping con reservas de tours, galería de aventuras y testimonios de participantes.",
      en: "Cliff jumping expeditions platform with tour bookings, adventure gallery, and participant testimonials."
    },
    fullDescription: {
      es: "VertigoTropical es una plataforma de aventura extrema especializada en expediciones de cliff jumping. Desarrollamos un sitio web dinámico que captura la adrenalina y emoción de saltar desde acantilados espectaculares. La plataforma incluye un sistema completo de reservas en línea, galería inmersiva con fotos y videos de las aventuras, información detallada de cada expedición, perfiles de guías certificados, y un sistema de testimonios de participantes. También integramos un calendario de disponibilidad dinámico y opciones de reserva flexible para diferentes niveles de experiencia.",
      en: "VertigoTropical is an extreme adventure platform specialized in cliff jumping expeditions. We developed a dynamic website that captures the adrenaline and excitement of jumping from spectacular cliffs. The platform includes a complete online booking system, immersive gallery with photos and videos of adventures, detailed information for each expedition, certified guide profiles, and a participant testimonials system. We also integrated a dynamic availability calendar and flexible booking options for different experience levels."
    },
    tags: ["Aventura", "Cliff Jumping", "Turismo Extremo", "Reservas"],
    year: "2026",
    plan: "Profesional",
    demoUrl: "https://vertigotropical.com/"
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

];

const categories = [
  { id: "all", label: { es: "Todos", en: "All" } },
  { id: "realestate", label: { es: "Bienes Raíces", en: "Real Estate" } },
  { id: "ecommerce", label: { es: "E-Commerce", en: "E-Commerce" } },
  { id: "corporate", label: { es: "Corporativo", en: "Corporate" } },
  { id: "health", label: { es: "Salud", en: "Health" } },
  { id: "tourism", label: { es: "Turismo", en: "Tourism" } },
  { id: "fitness", label: { es: "Fitness", en: "Fitness" } }
];

const PortfolioCard = memo(function PortfolioCard({ project, language }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      variants={fadeInUp}
      className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden md:h-64">
        <img
          src={project.image}
          alt={project.name}
          className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-900/35 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
        {project.demoUrl && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Button
              size="sm"
              className="gap-2 bg-white text-blue-900 hover:bg-blue-50"
              onClick={() => window.open(project.demoUrl, "_blank")}
            >
              <Eye className="w-4 h-4" />
              {language === "es" ? "Ver Demo" : "View Demo"}
            </Button>
          </div>
        )}
        <div className="absolute right-4 top-4">
          <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white">{project.plan}</Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{project.year}</span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-900">{project.name}</h3>
        <p className="mb-4 text-sm text-gray-600">{isExpanded ? project.fullDescription[language] : project.description[language]}</p>
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mb-4 flex items-center gap-1 text-sm font-medium text-blue-700 transition-colors hover:text-blue-900"
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
          {project.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
});

export default function PortfolioExpandablePage() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const content = useMemo(() => ({
    es: {
      subtitle: "Proyectos que Inspiran",
      description: "Descubre algunos de los sitios web que hemos creado para nuestros clientes. Cada proyecto refleja nuestra pasión por el diseño y la funcionalidad.",
      cta: "¿Listo para tu proyecto?",
      ctaButton: "Contáctanos",
      themesLabel: "Filtrar por tema"
    },
    en: {
      subtitle: "Projects That Inspire",
      description: "Discover some of the websites we've created for our clients. Each project reflects our passion for design and functionality.",
      cta: "Ready for your project?",
      ctaButton: "Contact Us",
      themesLabel: "Filter by theme"
    }
  }), []);

  const t = content[language];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return portfolioProjects;
    return portfolioProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-28">
      <section className="bg-white py-4 mb-0 mt-4 md:mt-6">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-3 text-center text-sm font-medium text-gray-500 md:hidden">{t.themesLabel}</p>

          <div className="-mx-6 overflow-x-auto px-6 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max snap-x snap-mandatory gap-2 pb-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`snap-start flex-none whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.label[language]}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden flex-wrap justify-center gap-3 md:flex">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label[language]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} language={language} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pt-16 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              {language === 'es' ? 'Contáctanos' : 'Contact Us'}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'es'
              ? '¿Tienes un proyecto en mente? Nos encantaría escucharte. Completa el formulario y te responderemos en menos de 24 horas.'
              : 'Have a project in mind? We\'d love to hear from you. Fill out the form and we\'ll get back to you within 24 hours.'}
          </p>
        </div>
      </section>
      <Contact transparent={true} showContactTitle={true} />
    </div>
  );
}