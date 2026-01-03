import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
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

  useEffect(() => {
    document.title = "PuraWeb - Costa Rica venta aplicaciones y páginas Web";
  }, []);

  const scrollToContact = useCallback(() => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleViewPlans = useCallback(() => {
    navigate(createPageUrl("Planes"));
  }, [navigate]);

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
      
      {/* CTA to view detailed plans */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-700 mb-4">
            ¿Quieres ver más detalles sobre nuestros planes?
          </p>
          <button
            onClick={handleViewPlans}
            className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:text-red-600 transition-colors text-lg group"
          >
            Ver comparación completa de planes
            <svg 
              className="w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      <Suspense fallback={<SectionLoader />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </div>
  );
}