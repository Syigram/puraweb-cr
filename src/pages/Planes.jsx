import React, { useMemo, useCallback, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, ExternalLink, Sparkles, Eye, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import Pricing from "@/components/home/Pricing";
import PlanComparisonTable from "@/components/pricing/PlanComparisonTable";

function Planes() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleContactClick = useCallback(() => {
    navigate(createPageUrl("Home") + "#contact");
  }, [navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get("scroll");

    if (!targetId) return;

    requestAnimationFrame(() => {
      const targetElement = document.getElementById(targetId);
      const navigationElement = document.querySelector("nav");

      if (targetElement) {
        const navigationOffset = navigationElement?.offsetHeight || 88;
        const extraSpacing = 28;
        const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - navigationOffset - extraSpacing;

        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: "smooth"
        });
      }
    });
  }, []);

  const seoTitle = useMemo(() => language === 'es' 
    ? 'Planes y Precios de Desarrollo Web'
    : 'Web Development Plans & Pricing', [language]);
  
  const seoDescription = useMemo(() => language === 'es'
    ? 'Planes de desarrollo web desde ₡100,000/mes. Básico, Profesional y Empresa con hosting, SSL, soporte, backups y mantenimiento incluido. Compara características y elige tu plan.'
    : 'Web development plans from ₡100,000/month. Basic, Professional and Business with hosting, SSL, support, backups and maintenance included. Compare features and choose your plan.', [language]);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Offer",
        "position": 1,
        "name": language === 'es' ? "Plan Básico" : "Basic Plan",
        "description": language === 'es' 
          ? "Perfecto para pequeños negocios que inician su presencia digital"
          : "Perfect for small businesses starting their digital journey",
        "price": "100000",
        "priceCurrency": "CRC",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "100000",
          "priceCurrency": "CRC",
          "unitText": "MONTH"
        },
        "itemOffered": {
          "@type": "Service",
          "name": language === 'es' ? "Sitio Web Básico" : "Basic Website",
          "provider": {
            "@type": "Organization",
            "name": "PuraWeb CR"
          }
        }
      },
      {
        "@type": "Offer",
        "position": 2,
        "name": language === 'es' ? "Plan Profesional" : "Professional Plan",
        "description": language === 'es'
          ? "Ideal para empresas en crecimiento que necesitan más potencia"
          : "Ideal for growing companies needing more power",
        "price": "150000",
        "priceCurrency": "CRC",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "150000",
          "priceCurrency": "CRC",
          "unitText": "MONTH"
        },
        "itemOffered": {
          "@type": "Service",
          "name": language === 'es' ? "Sitio Web Profesional" : "Professional Website",
          "provider": {
            "@type": "Organization",
            "name": "PuraWeb CR"
          }
        }
      },
      {
        "@type": "Offer",
        "position": 3,
        "name": language === 'es' ? "Plan Empresa" : "Business Plan",
        "description": language === 'es'
          ? "Solución completa para negocios establecidos y tiendas online"
          : "Complete solution for established businesses and online stores",
        "price": "250000",
        "priceCurrency": "CRC",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "250000",
          "priceCurrency": "CRC",
          "unitText": "MONTH"
        },
        "itemOffered": {
          "@type": "Service",
          "name": language === 'es' ? "Sitio Web Empresa con E-commerce" : "Business Website with E-commerce",
          "provider": {
            "@type": "Organization",
            "name": "PuraWeb CR"
          }
        }
      }
    ]
  }), [language]);

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical="https://puraweb.cr/planes"
        structuredData={structuredData}
        language={language}
      />
      <div className="pt-20">
      <Pricing compact />
      
      {/* VARIANTE A — Banner cinematográfico con imagen de fondo y overlay */}
      <div className="pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80"
                alt="Portfolio"
                className="w-full h-56 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/75 to-transparent flex items-center px-8 md:px-14">
                <div className="text-white max-w-sm">
                  <p className="text-sm font-semibold uppercase tracking-widest text-blue-300 mb-1">
                    {language === 'es' ? 'Nuestro trabajo' : 'Our work'}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    {language === 'es' ? '¿Cómo luce en la práctica?' : 'What does it look like in practice?'}
                  </h3>
                  <Link to={createPageUrl("Portafolio")}>
                    <Button className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
                      {language === 'es' ? 'Ver Portafolio' : 'View Portfolio'}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* VARIANTE B — Card con íconos y tres mini-puntos de valor */}
      {/* 
      <div className="pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-indigo-900 to-blue-900 border-0 shadow-2xl text-white overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span className="text-sm font-medium text-blue-100">{language === 'es' ? 'Resultados reales' : 'Real results'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      {language === 'es' ? 'Primero mira, luego decide' : 'See first, then decide'}
                    </h3>
                    <p className="text-blue-200 mb-6">
                      {language === 'es'
                        ? 'Antes de elegir un plan, conoce el nivel de calidad que entregamos en cada proyecto.'
                        : 'Before choosing a plan, see the quality level we deliver in every project.'}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-blue-200 mb-6">
                      <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{language === 'es' ? 'Diseños reales' : 'Real designs'}</span>
                      <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" />{language === 'es' ? 'Múltiples industrias' : 'Multiple industries'}</span>
                      <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" />{language === 'es' ? 'Alta calidad' : 'High quality'}</span>
                    </div>
                    <Link to={createPageUrl("Portafolio")}>
                      <Button className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-5 text-base">
                        {language === 'es' ? 'Explorar Portafolio' : 'Explore Portfolio'}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex-shrink-0 hidden md:block">
                    <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Layers className="w-12 h-12 text-white/70" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      */}

      {/* VARIANTE C — Fila minimalista con texto + botón alineado */}
      {/* 
      <div className="pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-blue-100 rounded-2xl px-8 py-7 bg-blue-50/50">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">
                  {language === 'es' ? '¿Dudas sobre la calidad?' : 'Wondering about quality?'}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {language === 'es' ? 'Conoce nuestros proyectos antes de decidir' : 'See our projects before you decide'}
                </h3>
              </div>
              <Link to={createPageUrl("Portafolio")} className="flex-shrink-0">
                <Button size="lg" className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold px-8 whitespace-nowrap">
                  {language === 'es' ? 'Ver Portafolio' : 'View Portfolio'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      */}

      <PlanComparisonTable />

      {/* CTA Asesoría — al final, justo antes del footer */}
      <div className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {language === 'es' ? '¿Necesita asesoría personalizada?' : 'Need personalized advice?'}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg">
                      {language === 'es'
                        ? 'Nuestro equipo está listo para ayudarle a elegir el plan perfecto para su negocio.'
                        : 'Our team is ready to help you choose the perfect plan for your business.'}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <Button
                      onClick={handleContactClick}
                      className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      {language === 'es' ? 'Contáctanos' : 'Contact Us'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}

export default memo(Planes);