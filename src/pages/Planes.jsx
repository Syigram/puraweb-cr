import React, { useMemo, useCallback, useEffect, memo, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, ExternalLink, Sparkles, Eye, Layers, Monitor, Star, Zap, Globe, Play, CheckCircle } from "lucide-react";
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

  const [activeVariant, setActiveVariant] = useState("A");

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
      
      {/* CTA Portafolio — preview de variantes */}
      <div className="pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Selector de variante */}
          <div className="max-w-4xl mx-auto mb-4 flex items-center gap-2 justify-center flex-wrap">
            <span className="text-xs text-gray-400 font-medium mr-1">Vista previa:</span>
            {["A","B","C","D","E","F","G","H","I","J"].map((v) => (
              <button
                key={v}
                onClick={() => setActiveVariant(v)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  activeVariant === v
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-400"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* A — Banner cinematográfico con imagen */}
            {activeVariant === "A" && (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80" alt="Portfolio" className="w-full h-56 md:h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/75 to-transparent flex items-center px-8 md:px-14">
                  <div className="text-white max-w-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-300 mb-1">{language === 'es' ? 'Nuestro trabajo' : 'Our work'}</p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{language === 'es' ? '¿Cómo luce en la práctica?' : 'What does it look like in practice?'}</h3>
                    <Link to={createPageUrl("Portafolio")}>
                      <Button className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">{language === 'es' ? 'Ver Portafolio' : 'View Portfolio'}<ExternalLink className="ml-2 w-4 h-4" /></Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* B — Card oscura con íconos */}
            {activeVariant === "B" && (
              <Card className="bg-gradient-to-br from-indigo-900 to-blue-900 border-0 shadow-2xl text-white overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span className="text-sm font-medium text-blue-100">{language === 'es' ? 'Resultados reales' : 'Real results'}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">{language === 'es' ? 'Primero mira, luego decide' : 'See first, then decide'}</h3>
                      <p className="text-blue-200 mb-6">{language === 'es' ? 'Antes de elegir un plan, conoce el nivel de calidad que entregamos.' : 'Before choosing a plan, see the quality we deliver.'}</p>
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-blue-200 mb-6">
                        <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{language === 'es' ? 'Diseños reales' : 'Real designs'}</span>
                        <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" />{language === 'es' ? 'Múltiples industrias' : 'Multiple industries'}</span>
                        <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" />{language === 'es' ? 'Alta calidad' : 'High quality'}</span>
                      </div>
                      <Link to={createPageUrl("Portafolio")}>
                        <Button className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-5 text-base">{language === 'es' ? 'Explorar Portafolio' : 'Explore Portfolio'}<ArrowRight className="ml-2 w-5 h-5" /></Button>
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
            )}

            {/* C — Fila minimalista */}
            {activeVariant === "C" && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-blue-100 rounded-2xl px-8 py-7 bg-blue-50/50">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">{language === 'es' ? '¿Dudas sobre la calidad?' : 'Wondering about quality?'}</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">{language === 'es' ? 'Conoce nuestros proyectos antes de decidir' : 'See our projects before you decide'}</h3>
                </div>
                <Link to={createPageUrl("Portafolio")} className="flex-shrink-0">
                  <Button size="lg" className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold px-8 whitespace-nowrap">{language === 'es' ? 'Ver Portafolio' : 'View Portfolio'}<ArrowRight className="ml-2 w-4 h-4" /></Button>
                </Link>
              </div>
            )}

            {/* D — Split con imagen a la derecha */}
            {activeVariant === "D" && (
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
                <div className="flex-1 p-8 md:p-12 bg-white flex flex-col justify-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit">{language === 'es' ? 'Portafolio' : 'Portfolio'}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{language === 'es' ? 'El trabajo habla por sí solo' : 'The work speaks for itself'}</h3>
                  <p className="text-gray-500 mb-6">{language === 'es' ? 'Proyectos reales, clientes reales, resultados medibles.' : 'Real projects, real clients, measurable results.'}</p>
                  <Link to={createPageUrl("Portafolio")} className="w-fit">
                    <Button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold">{language === 'es' ? 'Ver proyectos' : 'See projects'}<ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </Link>
                </div>
                <div className="md:w-56 h-48 md:h-auto flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80" alt="Portfolio" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* E — Glassmorphism sobre gradiente vibrante */}
            {activeVariant === "E" && (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 p-px">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-8 md:p-12 text-white text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                    <Monitor className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{language === 'es' ? 'Diseño que convierte visitantes en clientes' : 'Design that converts visitors into clients'}</h3>
                  <p className="text-white/80 mb-8 max-w-md mx-auto">{language === 'es' ? 'Cada proyecto es una historia de éxito. Mira la nuestra.' : 'Every project is a success story. See ours.'}</p>
                  <Link to={createPageUrl("Portafolio")}>
                    <Button className="bg-white text-violet-700 hover:bg-white/90 font-bold px-10 py-5 text-base shadow-xl">{language === 'es' ? 'Descubrir Portafolio' : 'Discover Portfolio'}<Sparkles className="ml-2 w-4 h-4" /></Button>
                  </Link>
                </div>
              </div>
            )}

            {/* F — Tres tarjetas de stats + CTA */}
            {activeVariant === "F" && (
              <div className="rounded-2xl border-2 border-gray-100 bg-white shadow-lg p-8 md:p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{language === 'es' ? 'Números que respaldan nuestro trabajo' : 'Numbers that back our work'}</h3>
                  <p className="text-gray-500">{language === 'es' ? 'Resultados reales de proyectos reales.' : 'Real results from real projects.'}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { num: "30+", label: language === 'es' ? 'Proyectos' : 'Projects', icon: <Layers className="w-5 h-5" /> },
                    { num: "98%", label: language === 'es' ? 'Satisfacción' : 'Satisfaction', icon: <Star className="w-5 h-5" /> },
                    { num: "5★", label: language === 'es' ? 'Calificación' : 'Rating', icon: <Zap className="w-5 h-5" /> },
                  ].map((s) => (
                    <div key={s.num} className="text-center p-4 rounded-xl bg-blue-50">
                      <div className="text-blue-600 flex justify-center mb-1">{s.icon}</div>
                      <div className="text-2xl font-black text-gray-900">{s.num}</div>
                      <div className="text-xs text-gray-500">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link to={createPageUrl("Portafolio")}>
                    <Button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-10">{language === 'es' ? 'Ver todos los proyectos' : 'View all projects'}<ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </Link>
                </div>
              </div>
            )}

            {/* G — Neon dark con borde brillante */}
            {activeVariant === "G" && (
              <div className="rounded-2xl bg-gray-950 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 border border-cyan-400/40 rounded-full px-4 py-1.5 mb-6">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest">{language === 'es' ? 'En vivo' : 'Live'}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-3">{language === 'es' ? 'Mira lo que somos capaces' : 'See what we are capable of'}</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">{language === 'es' ? 'Sitios reales, funcionales y en producción ahora mismo.' : 'Real, functional sites running in production right now.'}</p>
                  <Link to={createPageUrl("Portafolio")}>
                    <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-10 py-5 text-base">{language === 'es' ? 'Ver Portafolio' : 'View Portfolio'}<Play className="ml-2 w-4 h-4 fill-current" /></Button>
                  </Link>
                </div>
              </div>
            )}

            {/* H — Checklist de confianza */}
            {activeVariant === "H" && (
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">{language === 'es' ? 'Antes de comprar, verifica nuestra calidad' : 'Before buying, verify our quality'}</h3>
                  <ul className="space-y-3">
                    {(language === 'es'
                      ? ['Diseño moderno y responsivo', 'Velocidad y rendimiento optimizado', 'Código limpio y escalable', 'Proyectos entregados a tiempo']
                      : ['Modern, responsive design', 'Optimized speed and performance', 'Clean, scalable code', 'Projects delivered on time']
                    ).map((item) => (
                      <li key={item} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0 text-center">
                  <Link to={createPageUrl("Portafolio")}>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8">{language === 'es' ? 'Ver Evidencia' : 'See Evidence'}<ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </Link>
                  <p className="text-xs text-gray-400 mt-2">{language === 'es' ? 'Sin compromisos' : 'No commitments'}</p>
                </div>
              </div>
            )}

            {/* I — Banner con logo flotante y texto centrado */}
            {activeVariant === "I" && (
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" alt="Portfolio" className="w-full h-56 md:h-64 object-cover" />
                <div className="absolute inset-0 bg-blue-950/80 flex flex-col items-center justify-center text-center px-6">
                  <Globe className="w-10 h-10 text-white/60 mb-3" />
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{language === 'es' ? 'Presencia digital de nivel mundial' : 'World-class digital presence'}</h3>
                  <p className="text-blue-200 text-sm mb-6 max-w-sm">{language === 'es' ? 'Nuestros proyectos están en línea y generando resultados.' : 'Our projects are live and generating results.'}</p>
                  <Link to={createPageUrl("Portafolio")}>
                    <Button className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10">{language === 'es' ? 'Ver Portafolio' : 'View Portfolio'}<ExternalLink className="ml-2 w-4 h-4" /></Button>
                  </Link>
                </div>
              </div>
            )}

            {/* J — Dual tone con franja lateral de color */}
            {activeVariant === "J" && (
              <div className="rounded-2xl overflow-hidden shadow-xl flex border border-gray-100">
                <div className="w-3 bg-gradient-to-b from-red-600 to-red-400 flex-shrink-0" />
                <div className="flex-1 bg-white p-8 md:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-red-600 text-xs font-bold uppercase tracking-widest">{language === 'es' ? '¿Listo para ver resultados?' : 'Ready to see results?'}</span>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mt-1 mb-2">{language === 'es' ? 'Nuestro portafolio lo dice todo' : 'Our portfolio says it all'}</h3>
                    <p className="text-gray-500 text-sm">{language === 'es' ? 'Explora proyectos de distintas industrias y niveles de complejidad.' : 'Explore projects across industries and complexity levels.'}</p>
                  </div>
                  <Link to={createPageUrl("Portafolio")} className="flex-shrink-0">
                    <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 whitespace-nowrap shadow-lg">{language === 'es' ? 'Ver Portafolio' : 'View Portfolio'}<ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <PlanComparisonTable />

      {/* CTA Asesoría — al final, justo antes del footer */}
      <div className="py-12 bg-white">
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