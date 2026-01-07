import React, { useState, useEffect, memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Globe, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";

// Custom hook to detect desktop screens with throttled resize
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  
  useEffect(() => {
    let timeoutId = null;
    const checkDesktop = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setIsDesktop(window.innerWidth >= 1024);
        timeoutId = null;
      }, 150);
    };
    window.addEventListener('resize', checkDesktop);
    return () => {
      window.removeEventListener('resize', checkDesktop);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  return isDesktop;
};

// Lightweight typewriter - deferred to not block FCP/LCP
const Typewriter = memo(({ words }) => {
  const [text, setText] = useState(words[0] || '');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Defer typewriter animation until after initial paint
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 30 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, isReady]);

  return (
    <span>
      {text}
      <span className="border-r-2 border-red-600 ml-1 inline-block animate-pulse">&nbsp;</span>
    </span>
  );
});

// Floating cards animation - smooth infinite float
const floatAnimation = {
  y: [0, -50, 0],
  transition: {
    duration: 1.8,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const floatAnimationDelayed = {
  y: [0, 50, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
    delay: 0.3
  }
};

// Floating cards component - only rendered on desktop
const DesktopHeroVisual = memo(({ language }) => {
  const isDesktop = useIsDesktop();
  
  // Don't render anything on mobile/tablet - saves memory and CPU
  if (!isDesktop) return null;
  
  return (
    <div className="hidden lg:block relative">
      <div className="relative">
        {/* Web Development Card - floating animation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-0 right-0"
        >
          <motion.div
            animate={floatAnimation}
            className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300"
          >
            <Globe className="w-12 h-12 text-blue-900 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">
              {translations[language].services.webDev.title}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'es' ? 'Sitios responsivos personalizados' : 'Custom responsive sites'}
            </p>
          </motion.div>
        </motion.div>

        {/* E-commerce Card - floating animation (opposite direction) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-0 left-0"
        >
          <motion.div
            animate={floatAnimationDelayed}
            className="bg-white rounded-2xl shadow-2xl p-6 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300"
          >
            <ShoppingCart className="w-12 h-12 text-red-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">
              {translations[language].services.ecommerce.title}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'es' ? 'Tiendas en línea poderosas' : 'Powerful online stores'}
            </p>
          </motion.div>
        </motion.div>

        {/* Central circle */}
        <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-900 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
          <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center">
            <Sparkles className="w-20 h-20 text-blue-900" />
          </div>
        </div>
      </div>
    </div>
  );
});

// Memoized Hero component for maximum performance
const Hero = memo(function Hero({ onGetStarted }) {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language].hero, [language]);
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Static background - no animation for faster FCP/LCP */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 md:w-96 h-72 md:h-96 bg-blue-900 rounded-full blur-2xl md:blur-3xl opacity-10" />
        <div className="absolute bottom-20 left-10 w-72 md:w-96 h-72 md:h-96 bg-red-600 rounded-full blur-2xl md:blur-3xl opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t.badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                {t.title1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent min-h-[1.2em] block">
                <Typewriter words={t.typewriterWords || [t.title2]} />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              {t.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-xl hover:shadow-2xl transition-shadow"
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
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
              >
                {t.viewPlans}
              </Button>
            </div>

            {/* Static stats - no CountUp animation for faster render */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-900 mb-1">150+</div>
                <div className="text-xs md:text-sm text-gray-600">{t.stat1}</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-900 mb-1">98%</div>
                <div className="text-xs md:text-sm text-gray-600">{t.stat2}</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-900 mb-1">24/7</div>
                <div className="text-xs md:text-sm text-gray-600">{t.stat3}</div>
              </div>
            </div>
          </div>

          {/* Desktop visual with animations - only renders on lg+ screens */}
          <DesktopHeroVisual language={language} />
        </div>
      </div>

      {/* Simplified scroll indicator with CSS animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-blue-900 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-blue-900 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
});

export default Hero;