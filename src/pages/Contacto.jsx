import React, { useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Contact from "@/components/home/Contact";

export default function Contacto() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === 'es' 
      ? "Contacto - PuraWeb CR" 
      : "Contact - PuraWeb CR";
    window.scrollTo(0, 0);
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              {language === 'es' ? 'Contáctanos' : 'Contact Us'}
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'es' 
              ? '¿Tienes un proyecto en mente? Nos encantaría escucharte. Completa el formulario y te responderemos en menos de 24 horas.'
              : 'Have a project in mind? We\'d love to hear from you. Fill out the form and we\'ll get back to you within 24 hours.'}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <Contact />
    </div>
  );
}