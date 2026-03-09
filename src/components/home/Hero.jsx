import React, { useState, useEffect, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Globe, ShoppingCart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";

// ─── Responsive desktop detection ───────────────────────────────────────────
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    let timeout;
    const handler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsDesktop(window.innerWidth >= 1024), 150);
    };
    window.addEventListener("resize", handler, { passive: true });
    return () => { window.removeEventListener("resize", handler); clearTimeout(timeout); };
  }, []);
  return isDesktop;
}

// ─── Typewriter ─────────────────────────────────────────────────────────────
const Typewriter = memo(function Typewriter({ words }) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (!started || !words?.length) return;
    const current = words[wordIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 60);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      if (words.length === 1) return;
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 35);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
  }, [started, charIdx, deleting, wordIdx, words]);

  return <>{displayed}<span className="animate-pulse">|</span></>;
});

// ─── Desktop floating cards (only rendered on lg+) ───────────────────────────
const DesktopHeroVisual = memo(function DesktopHeroVisual({ language }) {
  const isDesktop = useIsDesktop();
  if (!isDesktop) return null;

  return (
    <div className="relative hidden lg:block">
      <div className="relative w-full h-96 lg:h-[500px]">
        {/* Main mockup card */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="flex-1 ml-2 bg-white/20 rounded px-3 py-1 text-white/70 text-xs">
                puraweb.cr
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-8 bg-white/20 rounded-lg w-3/4" />
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-5/6" />
              <div className="h-10 bg-red-500 rounded-lg w-1/3 mt-4" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-white/10 rounded-xl" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          className="absolute -left-8 top-16 bg-white rounded-xl shadow-lg p-4 w-40"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-blue-900" />
            <span className="text-xs font-semibold text-gray-700">
              {language === "es" ? "Visitas" : "Visits"}
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-900">+2.4k</div>
          <div className="text-xs text-green-600 mt-1">↑ 18%</div>
        </motion.div>

        <motion.div
          className="absolute -right-6 bottom-20 bg-white rounded-xl shadow-lg p-4 w-44"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-4 h-4 text-red-600" />
            <span className="text-xs font-semibold text-gray-700">
              {language === "es" ? "Ventas" : "Sales"}
            </span>
          </div>
          <div className="text-2xl font-bold text-red-600">₡1.2M</div>
          <div className="text-xs text-green-600 mt-1">↑ 32%</div>
        </motion.div>
      </div>
    </div>
  );
});

// ─── Hero animation variants ─────────────────────────────────────────────────
// PERFORMANCE NOTE: filter:blur is intentionally removed.
// Animating blur on a full-viewport element forces the browser to repaint
// a massive GPU layer on every frame — extremely expensive on mobile GPUs
// (S25+, iPhone 13, etc.) and causes visible jank at the end of the animation.
// opacity + translateY are pure compositor-thread properties (S-Tier) and
// remain smooth even on constrained hardware.
const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    }
  }
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

// ─── Main Hero ───────────────────────────────────────────────────────────────
const Hero = memo(function Hero({ onGetStarted }) {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language].hero, [language]);
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Background blobs — static, no animation cost */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 w-full"
        variants={prefersReducedMotion ? undefined : heroContainer}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={prefersReducedMotion ? undefined : "visible"}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 bg-white/75 backdrop-blur-md text-blue-900 px-4 py-2 rounded-full mb-6 shadow-sm ring-1 ring-blue-900/10"
              variants={prefersReducedMotion ? undefined : heroItem}
              style={{ willChange: "transform, opacity" }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t.badge}</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
              variants={prefersReducedMotion ? undefined : heroItem}
              style={{ willChange: "transform, opacity" }}
            >
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                {t.title1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent min-h-[1.2em] block">
                <Typewriter words={t.typewriterWords || [t.title2]} />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
              variants={prefersReducedMotion ? undefined : heroItem}
              style={{ willChange: "transform, opacity" }}
            >
              {t.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12"
              variants={prefersReducedMotion ? undefined : heroItem}
              style={{ willChange: "transform, opacity" }}
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-xl hover:shadow-2xl transition-shadow"
              >
                {t.getStarted}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-blue-900/20 bg-white/80 backdrop-blur-md text-blue-900 hover:bg-blue-50 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-sm"
              >
                <Link to={createPageUrl("Portafolio")}>
                  {t.portfolioCta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-4 md:gap-6"
              variants={prefersReducedMotion ? undefined : heroItem}
              style={{ willChange: "transform, opacity" }}
            >
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
            </motion.div>
          </div>

          <motion.div
            variants={prefersReducedMotion ? undefined : heroItem}
            style={{ willChange: "transform, opacity" }}
          >
            <DesktopHeroVisual language={language} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? undefined : { delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="w-6 h-10 border-2 border-blue-900/70 rounded-full flex items-start justify-center p-2 bg-white/30 backdrop-blur-sm">
          <div className="w-1 h-2 bg-blue-900 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
});

export default Hero;