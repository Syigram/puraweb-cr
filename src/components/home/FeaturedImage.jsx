import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

export default function FeaturedImage() {
  const { language } = useLanguage();
  
  const text = {
    es: {
      caption: "Diseñamos experiencias digitales que transforman negocios"
    },
    en: {
      caption: "We design digital experiences that transform businesses"
    }
  };

  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Image container with creative frame */}
          <div className="relative group">
            {/* Background decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500" />
            
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6901cf191d3736d23a1ebf19/cb980264e_unnamed.jpg"
                alt="Team collaboration on web design"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
              
              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
              >
                <p className="text-white text-lg md:text-2xl font-semibold text-center drop-shadow-lg">
                  {text[language].caption}
                </p>
              </motion.div>
            </div>
            
            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-blue-900 rounded-tl-xl opacity-60" />
            <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-red-600 rounded-br-xl opacity-60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}