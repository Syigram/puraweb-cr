import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      
      {/* CTA Section - Ver Planes */}
      <div className="pb-8 bg-white">
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
                      <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {language === 'es' 
                        ? '¿Quieres más información sobre los planes?' 
                        : 'Want more information about our plans?'}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg">
                      {language === 'es'
                        ? 'Explora todos los detalles, características y comparaciones entre nuestros planes.'
                        : 'Explore all the details, features and comparisons between our plans.'}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <Button
                      onClick={handleViewPlansClick}
                      className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      {language === 'es' ? 'Ver Planes' : 'View Plans'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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