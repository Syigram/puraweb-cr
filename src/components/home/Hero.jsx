import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Globe, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";

export default function Hero({ onGetStarted }) {
  const { language } = useLanguage();
  const t = translations[language].hero;
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-10 w-96 h-96 bg-blue-900 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t.badge}</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                {t.title1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                {t.title2}
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              {t.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
              >
                {t.getStarted}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => {
                  const el = document.getElementById("pricing");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                size="lg"
                variant="outline"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 text-lg px-8 py-6"
              >
                {t.viewPlans}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-900 mb-1">150+</div>
                <div className="text-sm text-gray-600">{t.stat1}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900 mb-1">98%</div>
                <div className="text-sm text-gray-600">{t.stat2}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900 mb-1">24/7</div>
                <div className="text-sm text-gray-600">{t.stat3}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform"
              >
                <Globe className="w-12 h-12 text-blue-900 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">
                  {translations[language].services.webDev.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'es' ? 'Sitios responsivos personalizados' : 'Custom responsive sites'}
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-0 left-0 bg-white rounded-2xl shadow-2xl p-6 transform -rotate-3 hover:rotate-0 transition-transform"
              >
                <ShoppingCart className="w-12 h-12 text-red-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">
                  {translations[language].services.ecommerce.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'es' ? 'Tiendas en línea poderosas' : 'Powerful online stores'}
                </p>
              </motion.div>

              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-900 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center">
                  <Sparkles className="w-20 h-20 text-blue-900" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-blue-900 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-blue-900 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}