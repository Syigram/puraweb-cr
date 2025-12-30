import React, { useEffect, lazy, Suspense, useCallback } from "react";
import Hero from "../components/home/Hero";
import LazySection from "@/components/ui/LazySection";

// Lazy load below-the-fold components
const Services = lazy(() => import("../components/home/Services"));
const Pricing = lazy(() => import("../components/home/Pricing"));
const Benefits = lazy(() => import("../components/home/Benefits"));
const Contact = lazy(() => import("../components/home/Contact"));

// Loading placeholder
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
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
      
      {/* Lazy load sections below the fold */}
      <LazySection minHeight="600px" rootMargin="200px">
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
      </LazySection>
      
      <LazySection minHeight="700px" rootMargin="200px">
        <Suspense fallback={<SectionLoader />}>
          <Pricing onGetStarted={scrollToContact} />
        </Suspense>
      </LazySection>
      
      <LazySection minHeight="500px" rootMargin="200px">
        <Suspense fallback={<SectionLoader />}>
          <Benefits />
        </Suspense>
      </LazySection>
      
      <LazySection minHeight="600px" rootMargin="200px">
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </LazySection>
    </div>
  );
}