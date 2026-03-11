import { translations } from "@/components/translations";

export const KNOWLEDGE_BASE_CATEGORIES = [
  { value: "overview", label: "Resumen" },
  { value: "services", label: "Servicios" },
  { value: "pricing", label: "Precios" },
  { value: "process", label: "Proceso" },
  { value: "contact", label: "Contacto" },
  { value: "about", label: "Nosotros" },
  { value: "support", label: "Soporte" },
  { value: "legal", label: "Legal" },
  { value: "custom", label: "Personalizado" }
];

function buildPlanSection(language, pricing) {
  return pricing.plans
    .map((plan) => {
      const features = (plan.features || []).map((feature) => `- ${feature}`).join("\n");
      const priceLabel = language === "es" ? `/mes` : `/month`;
      const promoLine = plan.originalPrice
        ? `${language === "es" ? "Precio anterior" : "Previous price"}: ₡${plan.originalPrice}`
        : "";

      return `${plan.name} - ₡${plan.price}${priceLabel}\n${plan.description}\n${promoLine}\n${features}`.trim();
    })
    .join("\n\n");
}

function buildLanguageEntries(language) {
  const t = translations[language];
  const isSpanish = language === "es";
  const services = [
    t.services.webDev,
    t.services.ecommerce,
    t.services.mobile,
    t.services.performance,
    t.services.securitySupport,
    t.services.payments
  ];
  const serviceContent = services
    .map((service) => `- ${service.title}: ${service.description}`)
    .join("\n");
  const pricingCommon = t.pricing.commonFeatures.map((item) => `- ${item}`).join("\n");
  const processContent = t.about.processSteps
    .map((step) => `${step.step} - ${step.title}: ${step.description}`)
    .join("\n");
  const valuesContent = t.about.values
    .map((item) => `- ${item.title}: ${item.description}`)
    .join("\n");
  const differentiatorsContent = t.about.differentiators
    .map((item) => `- ${item.title}: ${item.description}`)
    .join("\n");

  return [
    {
      title: isSpanish ? "Resumen general de PuraWeb CR" : "PuraWeb CR Overview",
      slug: isSpanish ? "resumen-general-puraweb" : "puraweb-overview",
      language,
      category: "overview",
      summary: isSpanish
        ? "Descripción general, propuesta de valor y contexto principal del sitio."
        : "General overview, value proposition and main website context.",
      content: `${t.hero.badge}\n${t.hero.title1} ${t.hero.title2}\n\n${t.hero.description}\n\n${t.footer.description}`,
      source_page: "Home",
      sort_order: isSpanish ? 1 : 101,
      is_published: true,
      keywords: isSpanish
        ? ["puraweb", "resumen", "empresa", "presencia digital"]
        : ["puraweb", "overview", "company", "digital presence"]
    },
    {
      title: isSpanish ? "Servicios principales" : "Core Services",
      slug: isSpanish ? "servicios-principales" : "core-services",
      language,
      category: "services",
      summary: isSpanish
        ? "Servicios y capacidades activas que el sitio presenta a los usuarios."
        : "Live services and capabilities shown on the website.",
      content: `${t.services.title}\n${t.services.subtitle}\n\n${serviceContent}`,
      source_page: "Servicios",
      sort_order: isSpanish ? 2 : 102,
      is_published: true,
      keywords: isSpanish
        ? ["servicios", "desarrollo web", "ecommerce", "stripe", "seo"]
        : ["services", "web development", "ecommerce", "stripe", "seo"]
    },
    {
      title: isSpanish ? "Planes y precios" : "Plans and Pricing",
      slug: isSpanish ? "planes-y-precios" : "plans-and-pricing",
      language,
      category: "pricing",
      summary: isSpanish
        ? "Planes comerciales, precios y beneficios incluidos actualmente."
        : "Current commercial plans, pricing and included benefits.",
      content: `${t.pricing.title}\n${t.pricing.subtitle}\n\n${isSpanish ? "Todos los planes incluyen:" : "All plans include:"}\n${pricingCommon}\n\n${buildPlanSection(language, t.pricing)}`,
      source_page: "Planes",
      sort_order: isSpanish ? 3 : 103,
      is_published: true,
      keywords: isSpanish
        ? ["planes", "precios", "básico", "profesional", "empresa"]
        : ["plans", "pricing", "basic", "professional", "business"]
    },
    {
      title: isSpanish ? "Proceso de trabajo" : "Delivery Process",
      slug: isSpanish ? "proceso-de-trabajo" : "delivery-process",
      language,
      category: "process",
      summary: isSpanish
        ? "Cómo trabaja PuraWeb CR desde la consulta inicial hasta el soporte."
        : "How PuraWeb CR works from first consultation to support.",
      content: `${t.about.processTitle}\n${t.about.processSubtitle}\n\n${processContent}\n\n${t.contact.subtitle}`,
      source_page: "Nosotros",
      sort_order: isSpanish ? 4 : 104,
      is_published: true,
      keywords: isSpanish
        ? ["proceso", "cotización", "consulta", "lanzamiento", "soporte"]
        : ["process", "quote", "consultation", "launch", "support"]
    },
    {
      title: isSpanish ? "Contacto y atención" : "Contact and Support",
      slug: isSpanish ? "contacto-y-atencion" : "contact-and-support",
      language,
      category: "contact",
      summary: isSpanish
        ? "Canales de contacto y tiempos de respuesta publicados en el sitio."
        : "Contact channels and response times published on the website.",
      content: `${t.contact.title}\n${t.contact.description}\n\nEmail: info@puraweb.cr\nTeléfono: +506 1234 5678\nUbicación: ${t.contact.info.locationCity}\n${isSpanish ? "Atención" : "Availability"}: ${t.contact.info.phoneAvailable}\n${isSpanish ? "Respuesta" : "Response"}: ${isSpanish ? "menos de 24 horas" : "within 24 hours"}`,
      source_page: "Contacto",
      sort_order: isSpanish ? 5 : 105,
      is_published: true,
      keywords: isSpanish
        ? ["contacto", "email", "teléfono", "respuesta"]
        : ["contact", "email", "phone", "response"]
    },
    {
      title: isSpanish ? "Nosotros y propuesta de valor" : "About and Value Proposition",
      slug: isSpanish ? "nosotros-y-propuesta-de-valor" : "about-and-value-proposition",
      language,
      category: "about",
      summary: isSpanish
        ? "Misión, visión, valores y diferenciales que usa el sitio en vivo."
        : "Mission, vision, values and differentiators used across the live site.",
      content: `${t.about.heroTitle}\n${t.about.heroSubtitle}\n\n${t.about.missionTitle}: ${t.about.missionText}\n\n${t.about.visionTitle}: ${t.about.visionText}\n\n${t.about.valuesTitle}\n${valuesContent}\n\n${t.about.whyDifferentTitle}\n${differentiatorsContent}`,
      source_page: "Nosotros",
      sort_order: isSpanish ? 6 : 106,
      is_published: true,
      keywords: isSpanish
        ? ["nosotros", "misión", "visión", "valores", "diferenciadores"]
        : ["about", "mission", "vision", "values", "differentiators"]
    }
  ];
}

export function getKnowledgeBaseSeedEntries() {
  return [...buildLanguageEntries("es"), ...buildLanguageEntries("en")];
}