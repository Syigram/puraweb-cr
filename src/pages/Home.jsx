import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
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

  useEffect(() => {
    document.title = "PuraWeb - Costa Rica venta aplicaciones y páginas Web";
  }, []);

  const scrollToContact = useCallback(() => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
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
      <div className="py-12 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {language === 'es' 
              ? '¿Necesitas más detalles sobre nuestros planes?' 
              : 'Need more details about our plans?'}
          </h3>
          <p className="text-blue-100 mb-8 text-lg">
            {language === 'es'
              ? 'Compara todas las características y encuentra el plan perfecto para tu negocio'
              : 'Compare all features and find the perfect plan for your business'}
          </p>
          <Button
            onClick={() => navigate(createPageUrl("Planes"))}
            size="lg"
            className="bg-white text-blue-900 hover:bg-gray-100 font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {language === 'es' ? 'Ver Planes Completos' : 'View Full Plans'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <Suspense fallback={<SectionLoader />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </div>
  );
}