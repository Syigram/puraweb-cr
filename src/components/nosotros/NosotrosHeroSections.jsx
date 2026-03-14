import React from "react";
import { motion } from "framer-motion";
import {
  Heart, Rocket, Users, Award, Shield, Star, Globe, Zap, Code, TrendingUp,
  Target, Eye, Cpu, Layers, CheckCircle2, ArrowRight, Sparkles, MapPin,
  Building2, Lightbulb
} from "lucide-react";

// --- Shared fade variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

// ─── 1. Línea roja vertical (Signature) ────────────────────────────────────
export function Hero1({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-12">
        <div className="flex-1">
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex items-center gap-3 mb-6">
            <div className="w-1 h-14 bg-red-600 rounded-full" />
            <span className="text-red-600 text-sm font-semibold uppercase tracking-widest">
              {language === 'es' ? 'Ingeniería Costarricense' : 'Costa Rican Engineering'}
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            {t.heroSubtitle}
          </motion.p>
        </div>
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="hidden lg:flex items-center justify-center w-64 h-64 rounded-3xl bg-gradient-to-br from-blue-900 to-blue-700 shadow-2xl flex-shrink-0">
          <Heart className="w-28 h-28 text-white opacity-90" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. Fondo azul navy + texto blanco ─────────────────────────────────────
export function Hero2({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-blue-900">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8">
          <MapPin className="w-4 h-4 text-red-400" />
          <span className="text-white text-sm font-medium">
            {language === 'es' ? 'San José, Costa Rica' : 'San José, Costa Rica'}
          </span>
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}

// ─── 3. Split con imagen stock ──────────────────────────────────────────────
export function Hero3({ t, language }) {
  return (
    <section className="pt-24 pb-0 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center gap-0">
        <div className="flex-1 py-16 lg:py-20">
          <motion.span variants={fadeIn} initial="hidden" animate="visible"
            className="inline-block bg-red-50 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {language === 'es' ? 'Sobre Nosotros' : 'About Us'}
          </motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-xl leading-relaxed">
            {t.heroSubtitle}
          </motion.p>
        </div>
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="hidden lg:block flex-1 h-[420px] rounded-tl-3xl rounded-bl-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
            alt="Equipo" className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── 4. Gradiente sutil gris-blanco ────────────────────────────────────────
export function Hero4({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex justify-center mb-8">
          <div className="flex -space-x-2">
            {[Users, Rocket, Award].map((Icon, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-blue-900 border-2 border-white flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}

// ─── 5. Acento rojo con línea divisora ─────────────────────────────────────
export function Hero5({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div variants={fadeIn} initial="hidden" animate="visible"
              className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-red-600 text-sm font-semibold uppercase tracking-widest">PuraWeb CR</span>
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-4">
              {t.heroTitle}
            </motion.h1>
            <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
              className="w-20 h-1 bg-red-600 rounded-full mb-6" />
            <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.15 }}
              className="text-lg text-gray-500 leading-relaxed">
              {t.heroSubtitle}
            </motion.p>
          </div>
          <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { icon: Shield, label: language === 'es' ? 'Seguridad' : 'Security', color: 'from-blue-900 to-blue-700' },
              { icon: Zap, label: language === 'es' ? 'Rapidez' : 'Speed', color: 'from-red-600 to-red-500' },
              { icon: Users, label: language === 'es' ? 'Equipo' : 'Team', color: 'from-blue-700 to-blue-500' },
              { icon: Star, label: language === 'es' ? 'Calidad' : 'Quality', color: 'from-red-700 to-red-500' },
            ].map(({ icon: Icon, label, color }, i) => (
              <div key={i} className={`rounded-2xl bg-gradient-to-br ${color} p-6 flex flex-col items-center justify-center gap-3 text-white`}>
                <Icon className="w-8 h-8" />
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. Círculo decorativo + texto centrado ─────────────────────────────────
export function Hero6({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-50 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible"
          className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Globe className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 leading-relaxed">
          {t.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}

// ─── 7. Tipografía enorme + badge flotante ─────────────────────────────────
export function Hero7({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeIn} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-8">
          <Heart className="w-3.5 h-3.5 text-red-600" />
          {language === 'es' ? 'Hecho con pasión' : 'Made with passion'}
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl md:text-7xl font-black text-blue-900 leading-none mb-8 max-w-4xl">
          {t.heroTitle}
        </motion.h1>
        <div className="flex flex-col md:flex-row md:items-end gap-8">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-lg leading-relaxed flex-1">
            {t.heroSubtitle}
          </motion.p>
          <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
            className="flex gap-2 flex-shrink-0">
            {['#TEC', '#Costa Rica', '#Web'].map(tag => (
              <span key={tag} className="bg-red-50 text-red-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-red-100">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 8. Dos columnas con stats ──────────────────────────────────────────────
export function Hero8({ t, language }) {
  const stats = [
    { value: '10+', label: language === 'es' ? 'Años de exp.' : 'Years exp.' },
    { value: '100%', label: language === 'es' ? 'Satisfacción' : 'Satisfaction' },
    { value: 'TEC', label: language === 'es' ? 'Graduados' : 'Graduates' },
  ];
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 leading-relaxed">
            {t.heroSubtitle}
          </motion.p>
        </div>
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-blue-100">
              <div className="text-3xl font-black text-blue-900 mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 9. Borde izquierdo con imagen de fondo difuminada ─────────────────────
export function Hero9({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="max-w-7xl mx-auto relative z-10 flex gap-10 items-center">
        <div className="hidden lg:block w-1.5 h-32 rounded-full bg-gradient-to-b from-blue-900 to-red-600 flex-shrink-0" />
        <div className="flex-1">
          <motion.span variants={fadeIn} initial="hidden" animate="visible"
            className="text-red-600 text-sm font-bold uppercase tracking-widest mb-4 block">
            {language === 'es' ? 'Ingeniería de clase mundial' : 'World-class engineering'}
          </motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            {t.heroSubtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ─── 10. Tarjeta flotante sobre fondo azul claro ────────────────────────────
export function Hero10({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-blue-50">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="bg-white rounded-3xl shadow-xl p-10 md:p-14 text-center border border-blue-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-4">
            {t.heroTitle}
          </h1>
          <div className="w-16 h-1 bg-red-600 rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 11. Minimalista con número decorativo ──────────────────────────────────
export function Hero11({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-8 items-center">
        <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
          <span className="text-9xl font-black text-blue-50 select-none leading-none">CR</span>
        </div>
        <div className="lg:col-span-4">
          <motion.div variants={fadeIn} initial="hidden" animate="visible"
            className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-red-600" />
            <span className="text-red-600 text-sm font-semibold uppercase tracking-widest">
              {language === 'es' ? 'Quiénes somos' : 'Who we are'}
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            {t.heroSubtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ─── 12. Fondo pattern puntos ───────────────────────────────────────────────
export function Hero12({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle, #bfdbfe 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible"
          className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Target className="w-8 h-8 text-white" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 leading-relaxed">
          {t.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}

// ─── 13. Timeline visual horizontal ────────────────────────────────────────
export function Hero13({ t, language }) {
  const items = [
    { icon: Lightbulb, label: language === 'es' ? 'Innovación' : 'Innovation' },
    { icon: Code, label: language === 'es' ? 'Desarrollo' : 'Development' },
    { icon: Shield, label: language === 'es' ? 'Seguridad' : 'Security' },
    { icon: TrendingUp, label: language === 'es' ? 'Crecimiento' : 'Growth' },
  ];
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-4">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.08 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
          {t.heroSubtitle}
        </motion.p>
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-0">
          {items.map(({ icon: Icon, label }, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center shadow-md">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
              {i < items.length - 1 && (
                <div className="w-px h-8 sm:w-12 sm:h-px bg-blue-200 my-1 sm:my-0 sm:mx-1" />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 14. Fondo imagen con overlay ──────────────────────────────────────────
export function Hero14({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=70" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-900/85" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8">
          <Building2 className="w-4 h-4 text-red-400" />
          <span className="text-white text-sm font-medium">PuraWeb CR</span>
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}

// ─── 15. Bloque de color rojo izquierdo ────────────────────────────────────
export function Hero15({ t, language }) {
  return (
    <section className="pt-24 pb-0 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-0">
        <motion.div variants={fadeIn} initial="hidden" animate="visible"
          className="hidden lg:flex w-48 xl:w-64 bg-red-600 rounded-r-3xl items-center justify-center flex-shrink-0 min-h-[340px]">
          <Rocket className="w-20 h-20 text-white opacity-90" />
        </motion.div>
        <div className="flex-1 py-16 lg:py-20 lg:pl-16">
          <motion.span variants={fadeIn} initial="hidden" animate="visible"
            className="text-red-600 text-sm font-bold uppercase tracking-widest mb-4 block">
            {language === 'es' ? 'Sobre Nosotros' : 'About Us'}
          </motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-xl leading-relaxed">
            {t.heroSubtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ─── 16. Degradado suave azul → blanco centrado ────────────────────────────
export function Hero16({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-blue-900 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-8">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mx-auto">
            <Star className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}

// ─── 17. Grid de íconos de fondo + texto superpuesto ───────────────────────
export function Hero17({ t, language }) {
  const bgIcons = [Code, Shield, Zap, Globe, Star, Award, Users, Target, Rocket, Layers, Eye, TrendingUp];
  return (
    <section className="pt-32 pb-20 px-6 bg-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-8 p-8 pointer-events-none opacity-10">
        {bgIcons.map((Icon, i) => (
          <div key={i} className="flex items-center justify-center">
            <Icon className="w-8 h-8 text-blue-900" />
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 leading-relaxed">
          {t.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}

// ─── 18. Línea de check + bullet points ────────────────────────────────────
export function Hero18({ t, language }) {
  const bullets = [
    language === 'es' ? 'Graduados del TEC' : 'TEC Graduates',
    language === 'es' ? '+10 años de experiencia' : '+10 years experience',
    language === 'es' ? 'Comprometidos con su crecimiento' : 'Committed to your growth',
  ];
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 leading-relaxed mb-8">
            {t.heroSubtitle}
          </motion.p>
          <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
            className="space-y-3">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{b}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="hidden lg:block rounded-3xl overflow-hidden shadow-2xl h-80">
          <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80" alt="Work" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── 19. Estilo editorial texto grande ─────────────────────────────────────
export function Hero19({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex-shrink-0">
            <span className="text-7xl md:text-9xl font-black text-blue-50 leading-none select-none">01</span>
          </motion.div>
          <div className="flex-1">
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              {t.heroTitle}
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
              className="text-xl text-gray-500 max-w-xl leading-relaxed">
              {t.heroSubtitle}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 20. Bento grid ────────────────────────────────────────────────────────
export function Hero20({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-4">
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="lg:col-span-2 bg-blue-900 rounded-3xl p-10 flex flex-col justify-end min-h-[280px]">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {t.heroTitle}
          </h1>
          <p className="text-blue-200 text-base leading-relaxed">{t.heroSubtitle}</p>
        </motion.div>
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.15 }}
          className="flex flex-col gap-4">
          <div className="bg-red-600 rounded-3xl p-8 flex items-center justify-center flex-1">
            <Rocket className="w-16 h-16 text-white" />
          </div>
          <div className="bg-blue-50 rounded-3xl p-6 flex-1 flex flex-col justify-center">
            <span className="text-3xl font-black text-blue-900">TEC</span>
            <span className="text-sm text-gray-500 mt-1">{language === 'es' ? 'Graduados' : 'Graduates'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 21. Semicírculo decorativo ────────────────────────────────────────────
export function Hero21({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white overflow-hidden relative">
      <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-50 to-transparent translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div variants={fadeIn} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-red-700 text-xs font-bold uppercase tracking-widest">
              {language === 'es' ? 'En Línea' : 'Online'}
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 leading-relaxed">
            {t.heroSubtitle}
          </motion.p>
        </div>
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="hidden lg:flex items-center justify-center">
          <div className="relative w-72 h-72">
            <div className="absolute inset-0 rounded-full border-2 border-blue-100" />
            <div className="absolute inset-4 rounded-full border border-red-100" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center shadow-2xl">
                <Award className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 22. Fondo de rayas sutiles ─────────────────────────────────────────────
export function Hero22({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, #dbeafe, #dbeafe 1px, transparent 1px, transparent 40px)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div variants={fadeIn} initial="hidden" animate="visible"
          className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-lg">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 h-px bg-blue-100" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          {t.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}

// ─── 23. Stack de tarjetas / profundidad ───────────────────────────────────
export function Hero23({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-blue-50">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute top-4 left-4 right-4 h-full bg-blue-200/40 rounded-3xl -z-10" />
        <div className="absolute top-2 left-2 right-2 h-full bg-blue-100/60 rounded-3xl -z-10" />
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="bg-white rounded-3xl p-10 md:p-14 text-center shadow-xl border border-blue-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 24. Botones CTA sutiles ────────────────────────────────────────────────
export function Hero24({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible"
          className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Eye className="w-7 h-7 text-white" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
          {t.heroSubtitle}
        </motion.p>
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center">
          <div className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-full font-semibold text-sm">
            <Users className="w-4 h-4" />
            {language === 'es' ? 'Conózcanos' : 'Meet us'}
          </div>
          <div className="inline-flex items-center gap-2 border border-blue-200 text-blue-900 px-6 py-3 rounded-full font-semibold text-sm">
            {language === 'es' ? 'Nuestros servicios' : 'Our services'}
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 25. Firma personal / humana ────────────────────────────────────────────
export function Hero25({ t, language }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.15 }}
          className="hidden lg:block order-last lg:order-first rounded-3xl overflow-hidden shadow-2xl h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
            alt="Alejandro González" className="w-full h-full object-cover object-top"
          />
        </motion.div>
        <div>
          <motion.div variants={fadeIn} initial="hidden" animate="visible"
            className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-gray-400 text-sm">{language === 'es' ? 'Fundador & Líder Técnico' : 'Founder & Tech Lead'}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 leading-relaxed mb-6">
            {t.heroSubtitle}
          </motion.p>
          <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
            className="flex items-center gap-3 pt-6 border-t border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-sm">AG</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Alejandro González</div>
              <div className="text-xs text-gray-400">{language === 'es' ? 'Ing. Computadores, TEC' : 'Computer Eng., TEC'}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Hero map ──────────────────────────────────────────────────────────────
export const HERO_SECTIONS = [
  { id: 1,  label: 'Línea roja',         Component: Hero1  },
  { id: 2,  label: 'Navy oscuro',         Component: Hero2  },
  { id: 3,  label: 'Split imagen',        Component: Hero3  },
  { id: 4,  label: 'Iconos agrupados',    Component: Hero4  },
  { id: 5,  label: 'Cuadrícula valores',  Component: Hero5  },
  { id: 6,  label: 'Círculo glob.',       Component: Hero6  },
  { id: 7,  label: 'Tipografía grande',   Component: Hero7  },
  { id: 8,  label: 'Stats métricas',      Component: Hero8  },
  { id: 9,  label: 'Borde + imagen BG',   Component: Hero9  },
  { id: 10, label: 'Tarjeta flotante',    Component: Hero10 },
  { id: 11, label: 'Número decorativo',   Component: Hero11 },
  { id: 12, label: 'Pattern puntos',      Component: Hero12 },
  { id: 13, label: 'Timeline iconos',     Component: Hero13 },
  { id: 14, label: 'Imagen overlay',      Component: Hero14 },
  { id: 15, label: 'Bloque rojo lado',    Component: Hero15 },
  { id: 16, label: 'Degradado → blanco',  Component: Hero16 },
  { id: 17, label: 'Grid íconos fondo',   Component: Hero17 },
  { id: 18, label: 'Check bullets',       Component: Hero18 },
  { id: 19, label: 'Editorial número',    Component: Hero19 },
  { id: 20, label: 'Bento grid',          Component: Hero20 },
  { id: 21, label: 'Semicírculo deco.',   Component: Hero21 },
  { id: 22, label: 'Rayas sutiles',       Component: Hero22 },
  { id: 23, label: 'Stack tarjetas',      Component: Hero23 },
  { id: 24, label: 'CTAs sutiles',        Component: Hero24 },
  { id: 25, label: 'Firma personal',      Component: Hero25 },
];