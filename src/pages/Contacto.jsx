import React, { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import Contact from "@/components/home/Contact";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export default function Contacto() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = language === 'es' 
      ? "Contacto - PuraWeb CR" 
      : "Contact - PuraWeb CR";
    window.scrollTo(0, 0);
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              {language === 'es' ? 'Contáctanos' : 'Contact Us'}
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            {language === 'es' 
              ? '¿Tienes un proyecto en mente? Nos encantaría escucharte. Completa el formulario y te responderemos en menos de 24 horas.'
              : 'Have a project in mind? We\'d love to hear from you. Fill out the form and we\'ll get back to you within 24 hours.'}
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <Contact />
    </div>
  );
}