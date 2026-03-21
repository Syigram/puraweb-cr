import React, { useMemo, useCallback, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
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
    navigate(createPageUrl("Contacto"));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
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
        "price": "350000",
        "priceCurrency": "CRC",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "350000",
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
      
      {/* Portfolio CTA Banner */}
      <div className="pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#001A4D] via-[#002B7F] to-[#0a3fa8]">
          <div className="flex flex-col md:flex-row items-center gap-0">
            {/* Left: text */}
            <div className="flex-1 px-8 md:px-12 py-10 md:py-12">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300 mb-2">
                {language === 'es' ? 'Nuestro trabajo' : 'Our work'}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {language === 'es' ? '¿Cómo luce en la práctica?' : 'What does it look like in practice?'}
              </h3>
              <p className="text-blue-200 text-sm md:text-base mb-6">
                {language === 'es'
                  ? 'Conoce los proyectos que hemos desarrollado antes de elegir tu plan.'
                  : 'Explore the projects we have built before choosing your plan.'}
              </p>
              <Link to={createPageUrl("Portafolio")}>
                <Button className="bg-white text-[#002B7F] hover:bg-blue-50 hover:text-[#002B7F] font-bold px-7 py-5 text-base shadow-lg transition-all">
                  {language === 'es' ? 'Ver Portafolio' : 'View Portfolio'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            {/* Right: accent image strip */}
            <div className="hidden md:block w-64 h-full self-stretch relative overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80"
                alt="Portfolio"
                className="w-full h-full object-cover opacity-40"
                style={{ minHeight: "220px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#002B7F] to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
      </div>
      </div>

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