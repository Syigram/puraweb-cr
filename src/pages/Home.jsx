import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const handleViewPlansClick = () => {
    navigate(createPageUrl("Planes"));
  };

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
      
      {/* Ver Planes Button */}
      <div className="pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Button
            onClick={handleViewPlansClick}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {language === 'es' ? 'Ver Planes' : 'View Plans'}
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