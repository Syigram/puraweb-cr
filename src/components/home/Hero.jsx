import React, { useState, useEffect, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
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
  const longestWord = useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), ''),
    [words]
  );
  const reservedWidth = useMemo(
    () => `${Math.max(...words.map((word) => word.length), 0) + 2}ch`,
    [words]
  );

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
    <span className="relative inline-block align-top whitespace-nowrap" style={{ minWidth: reservedWidth }}>
      <span className="invisible select-none">{longestWord || '\u00A0'}</span>
      <span className="absolute inset-0 inline-flex items-center whitespace-nowrap">
        <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">{text || '\u00A0'}</span>
        <span className="border-r-2 border-red-600 ml-1 inline-block animate-pulse">&nbsp;</span>
      </span>
    </span>
  );
});

// Floating cards animation - smooth infinite float (opposite directions)
const floatAnimationUp = {
  y: [0, -100, 0],
  transition: {
    duration: 1.8,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const floatAnimationDown = {
  y: [0, 100, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
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
            animate={floatAnimationUp}
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
            animate={floatAnimationDown}
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

// Stagger variants para la entrada del Hero — solo desktop
const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.1 }
  }
};

const heroItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const heroVisualVariant = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }
  }
};

// CSS-only fade-in for mobile (no JS animation cost)
const mobileFadeInStyle = {
  animation: "heroFadeIn 0.6s ease-out both"
};

// Memoized Hero component for maximum performance
const Hero = memo(function Hero({ onGetStarted }) {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language].hero, [language]);
  const isDesktop = useIsDesktop();

  // Mobile: pure CSS fade-in, no Framer Motion overhead
  if (!isDesktop) {
    return (
      <>
        <style>{`
          @keyframes heroFadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-900 rounded-full blur-2xl opacity-10" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-2xl opacity-10" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-24" style={mobileFadeInStyle}>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t.badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                {t.title1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent min-h-[1.2em] block">
                <Typewriter words={t.typewriterWords || [t.title2]} />
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              {t.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-base px-6 py-5 shadow-xl"
              >
                {t.getStarted}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-blue-900/20 bg-white/80 text-blue-900 hover:bg-blue-50 text-base px-6 py-5 shadow-sm"
              >
                <Link to={createPageUrl("Portafolio")}>
                  {t.portfolioCta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-900 mb-1">150+</div>
                <div className="text-xs text-gray-600">{t.stat1}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900 mb-1">98%</div>
                <div className="text-xs text-gray-600">{t.stat2}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900 mb-1">24/7</div>
                <div className="text-xs text-gray-600">{t.stat3}</div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Desktop: full Framer Motion animations
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Static background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-900 rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — stagger en cascada al montar */}
          <motion.div variants={heroContainer} initial="hidden" animate="visible">
            <motion.div variants={heroItem} className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t.badge}</span>
            </motion.div>

            <motion.h1 variants={heroItem} className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                {t.title1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent min-h-[1.2em] block">
                <Typewriter words={t.typewriterWords || [t.title2]} />
              </span>
            </motion.h1>

            <motion.p variants={heroItem} className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              {t.description}
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-row gap-4 mb-12">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-shadow"
              >
                {t.getStarted}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-blue-900/20 bg-white/80 text-blue-900 hover:bg-blue-50 text-lg px-8 py-6 shadow-sm"
              >
                <Link to={createPageUrl("Portafolio")}>
                  {t.portfolioCta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={heroItem} className="grid grid-cols-3 gap-6">
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
            </motion.div>
          </motion.div>

          {/* RIGHT — entra desde la derecha con delay */}
          <motion.div variants={heroVisualVariant} initial="hidden" animate="visible">
            <DesktopHeroVisual language={language} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-6 h-10 border-2 border-blue-900 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-blue-900 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
});

export default Hero;