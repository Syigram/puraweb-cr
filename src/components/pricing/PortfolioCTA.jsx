import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Sparkles, Eye, Star, Layers, Zap, Award, Globe, Monitor } from "lucide-react";

// ── Variant 1: Banner horizontal degradado azul-marino ──────────────────────
function Variant1({ t }) {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1 text-center md:text-left">
        <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">{t.eyebrow}</p>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">{t.title}</h3>
        <p className="text-blue-100 text-base md:text-lg">{t.subtitle}</p>
      </div>
      <Link to={createPageUrl("Portafolio")} className="flex-shrink-0">
        <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-6 text-base shadow-xl">
          {t.cta} <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}

// ── Variant 2: Tarjeta con imagen de fondo y overlay ────────────────────────
function Variant2({ t }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-center"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ef4444 0%, transparent 40%)" }}
      />
      <div className="relative z-10 w-full p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0">
          <Eye className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 text-center md:text-left text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{t.title}</h3>
          <p className="text-gray-300">{t.subtitle}</p>
        </div>
        <Link to={createPageUrl("Portafolio")} className="flex-shrink-0">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-base">
            {t.cta} <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ── Variant 3: Card minimalista blanca con borde izquierdo rojo ──────────────
function Variant3({ t }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border-l-4 border-l-red-600">
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
          <Star className="w-3 h-3" /> {t.eyebrow}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.title}</h3>
        <p className="text-gray-500 text-base">{t.subtitle}</p>
      </div>
      <Link to={createPageUrl("Portafolio")} className="flex-shrink-0 w-full md:w-auto">
        <Button size="lg" className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-6 text-base">
          {t.cta} <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}

// ── Variant 4: Dos columnas con stats ───────────────────────────────────────
function Variant4({ t }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-6 h-6 text-blue-400" />
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">{t.eyebrow}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{t.title}</h3>
          <p className="text-gray-300 mb-6">{t.subtitle}</p>
          <Link to={createPageUrl("Portafolio")}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3">
              {t.cta} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[["20+", t.statProjects], ["5⭐", t.statRating], ["100%", t.statSatisfaction], ["3+", t.statYears]].map(([val, label]) => (
            <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{val}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Variant 5: Split con mockup ilustrativo ──────────────────────────────────
function Variant5({ t }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-shrink-0 hidden md:flex flex-col gap-2">
        {["bg-red-500", "bg-blue-900", "bg-gray-800"].map((c, i) => (
          <div key={i} className={`${c} rounded-lg`} style={{ width: 60 + i * 10, height: 40 }} />
        ))}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.title}</h3>
        <p className="text-gray-600 mb-6">{t.subtitle}</p>
        <Link to={createPageUrl("Portafolio")}>
          <Button size="lg" className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-bold px-8 py-6 text-base shadow-lg">
            {t.cta} <Monitor className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ── Variant 6: Centrado con iconos de categorías ─────────────────────────────
function Variant6({ t }) {
  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-xl p-8 md:p-12 text-center">
      <div className="flex justify-center gap-4 mb-6">
        {[Globe, Monitor, Zap, Award].map((Icon, i) => (
          <div key={i} className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-700" />
          </div>
        ))}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{t.title}</h3>
      <p className="text-gray-500 max-w-xl mx-auto mb-8">{t.subtitle}</p>
      <Link to={createPageUrl("Portafolio")}>
        <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-10 py-6 text-base shadow-lg">
          {t.cta} <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}

// ── Variant 7: Fondo de puntos con badge animado ─────────────────────────────
function Variant7({ t }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center gap-6"
      style={{ background: "#f8faff", backgroundImage: "radial-gradient(#c7d7f0 1px, transparent 1px)", backgroundSize: "20px 20px" }}
    >
      <div className="flex-1 text-center md:text-left">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-2 bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" /> {t.eyebrow}
        </motion.div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.title}</h3>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>
      <Link to={createPageUrl("Portafolio")} className="flex-shrink-0 w-full md:w-auto">
        <Button size="lg" className="w-full md:w-auto bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-6 text-base shadow-lg">
          {t.cta} <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}

// ── Variant 8: Costa Rica themed ────────────────────────────────────────────
function Variant8({ t }) {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900" />
      <div className="bg-white border border-gray-200 shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">🇨🇷 {t.eyebrow}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.title}</h3>
          <p className="text-gray-500">{t.subtitle}</p>
        </div>
        <Link to={createPageUrl("Portafolio")} className="flex-shrink-0 w-full md:w-auto">
          <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold px-8 py-6 text-base shadow-lg hover:shadow-xl">
            {t.cta} <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
      <div className="h-2 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900" />
    </div>
  );
}

// ── Variant 9: Glassmorphism dark ────────────────────────────────────────────
function Variant9({ t }) {
  return (
    <div
      className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-6"
      style={{ background: "linear-gradient(135deg, rgba(0,43,127,0.95) 0%, rgba(206,17,38,0.85) 100%)" }}
    >
      <div className="flex-1 text-center md:text-left">
        <div className="inline-block bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          {t.eyebrow}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t.title}</h3>
        <p className="text-white/80">{t.subtitle}</p>
      </div>
      <Link to={createPageUrl("Portafolio")} className="flex-shrink-0 w-full md:w-auto">
        <Button size="lg" className="w-full md:w-auto bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-6 text-base shadow-xl">
          {t.cta} <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}

// ── Variant 10: Timeline / proceso ───────────────────────────────────────────
function Variant10({ t }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.title}</h3>
        <p className="text-gray-500">{t.subtitle}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        {[t.step1, t.step2, t.step3].map((step, i) => (
          <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-1">
            <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {i + 1}
            </div>
            <span className="text-gray-700 text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link to={createPageUrl("Portafolio")}>
          <Button size="lg" className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-bold px-10 py-6 text-base shadow-lg">
            {t.cta} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

const VARIANTS = [Variant1, Variant2, Variant3, Variant4, Variant5, Variant6, Variant7, Variant8, Variant9, Variant10];

const VARIANT_NAMES = [
  "1 · Banner Azul",
  "2 · Dark Overlay",
  "3 · Borde Rojo",
  "4 · Stats Grid",
  "5 · Split Bloques",
  "6 · Iconos",
  "7 · Puntos Animado",
  "8 · Costa Rica",
  "9 · Gradiente CR",
  "10 · Pasos",
];

function PortfolioCTA({ showSelector = false, variantIndex = 0, onVariantChange }) {
  const { language } = useLanguage();

  const t = {
    eyebrow: language === 'es' ? 'Nuestro Trabajo' : 'Our Work',
    title: language === 'es'
      ? '¿Nuestro trabajo habla por nosotros?'
      : 'Does our work speak for itself?',
    subtitle: language === 'es'
      ? 'Explora los proyectos que hemos desarrollado para empresas costarricenses y descubre el nivel de calidad que podríamos llevar a tu negocio.'
      : 'Explore the projects we have developed for Costa Rican businesses and discover the level of quality we could bring to yours.',
    cta: language === 'es' ? 'Ver Portafolio' : 'View Portfolio',
    statProjects: language === 'es' ? 'Proyectos' : 'Projects',
    statRating: language === 'es' ? 'Calificación' : 'Rating',
    statSatisfaction: language === 'es' ? 'Satisfacción' : 'Satisfaction',
    statYears: language === 'es' ? 'Años' : 'Years',
    step1: language === 'es' ? 'Explorás el portafolio' : 'Browse portfolio',
    step2: language === 'es' ? 'Identificás tu estilo' : 'Find your style',
    step3: language === 'es' ? 'Contactás al equipo' : 'Contact the team',
  };

  const ActiveVariant = VARIANTS[variantIndex] || VARIANTS[0];

  return (
    <div className="pb-8 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {showSelector && (
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            {VARIANT_NAMES.map((name, i) => (
              <button
                key={i}
                onClick={() => onVariantChange?.(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  variantIndex === i
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-700"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
        <motion.div
          key={variantIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ActiveVariant t={t} />
        </motion.div>
      </div>
    </div>
  );
}

export default memo(PortfolioCTA);