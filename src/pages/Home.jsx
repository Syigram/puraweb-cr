import React, { useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import Hero from "../components/home/Hero";

// Lazy load below-the-fold components for faster initial render
const Services = lazy(() => import("../components/home/Services"));
const Pricing = lazy(() => import("../components/home/Pricing"));
const Benefits = lazy(() => import("../components/home/Benefits"));
const Contact = lazy(() => import("../components/home/Contact"));

// Minimal loading placeholder
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const scrollToContact = useCallback(() => {
    const element = document.getElementById("pricing");
    if (element) {
      const navHeight = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const seoTitle = language === 'es' 
    ? 'Desarrollo Web y E-Commerce en Costa Rica'
    : 'Web Development & E-Commerce in Costa Rica';
  
  const seoDescription = language === 'es'
    ? 'Creamos sitios web profesionales y tiendas online con tecnología premium. Planes desde ₡100,000/mes con hosting, SSL, soporte 24/7 y mantenimiento incluido. Stripe integrado.'
    : 'We create professional websites and online stores with premium technology. Plans from ₡100,000/month with hosting, SSL, 24/7 support and maintenance included. Stripe integrated.';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PuraWeb CR",
    "url": "https://puraweb.cr",
    "description": seoDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://puraweb.cr/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PuraWeb CR",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6901cf191d3736d23a1ebf19/d19c70359_logo5.png"
      }
    }
  };

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical="https://puraweb.cr"
        structuredData={structuredData}
        language={language}
      />
      <div>
      {/* Hero loads immediately - critical for FCP/LCP */}
      <Hero onGetStarted={scrollToContact} />
      
      {/* Below-fold sections lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Pricing onGetStarted={scrollToContact} />
      </Suspense>
      
      {/* CTA para ver planes completos */}
      <div className="py-8 bg-white border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {language === 'es' 
              ? '¿Necesitas más detalles sobre nuestros planes?' 
              : 'Need more details about our plans?'}
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            {language === 'es'
              ? 'Compara todas las características y encuentra el plan perfecto para tu negocio'
              : 'Compare all features and find the perfect plan for your business'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate(createPageUrl("Planes?scroll=comparacion-detallada"))}
              size="lg"
              className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {language === 'es' ? 'Ver Planes Completos' : 'View Full Plans'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link to={createPageUrl("Contacto")}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 font-semibold px-8 py-6 text-lg transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                {language === 'es' ? 'Contáctanos' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Suspense fallback={<SectionLoader />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      </div>
      </>
      );
      }