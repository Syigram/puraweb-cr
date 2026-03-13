import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Handshake, CheckCircle, Lock, Users, Star, Award, Zap, FileText, Globe, Heart, Sparkles, BadgeCheck, Network } from 'lucide-react';

// ─── Shared animation presets ───────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }
});

// ─── Color palette ───────────────────────────────────────────────────────────
// Primary blue : #002B7F  →  blue-900 approx
// Accent red   : #CE1126  →  red-700 approx
// Light surface: slate-50 / blue-50 / white

export const heroVariants = [

  // 1. Línea lateral azul · fondo blanco puro
  {
    id: 1,
    name: '1 · Línea lateral azul',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        {/* Thin blue left bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-700 via-blue-900 to-blue-700" />
        <div className="max-w-4xl mx-auto">
          <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 mb-4">
            Cómo Trabajamos · PuraWeb CR
          </motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 2. Fondo azul marino muy suave · pill badge · centrado
  {
    id: 2,
    name: '2 · Suave Azul Centrado',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-blue-100 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl opacity-60 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...scaleIn(0)} className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-800 text-xs font-semibold px-4 py-2 rounded-full mb-7 shadow-sm">
            <Shield className="w-3.5 h-3.5" />
            Transparencia Total
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-5">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 3. Acento rojo · texto oscuro izquierda · fondo blanco
  {
    id: 3,
    name: '3 · Acento Rojo Elegante',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            {/* Text column */}
            <div className="flex-1">
              <motion.div {...fadeIn(0)} className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-red-700 flex items-center justify-center">
                  <BadgeCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-red-700 text-sm font-semibold uppercase tracking-widest">Claridad & Compromiso</span>
              </motion.div>
              <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
                {t.title}
              </motion.h1>
              <motion.div {...fadeIn(0.14)} className="w-16 h-0.5 bg-red-600 mb-6" />
              <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
                {t.subtitle}
              </motion.p>
            </div>

            {/* Icon column — visible only on large screens */}
            <motion.div
              {...scaleIn(0.2)}
              className="hidden lg:flex flex-shrink-0 items-center justify-center w-72 xl:w-80"
            >
              <div className="relative flex items-center justify-center w-64 h-64 xl:w-72 xl:h-72">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-100" />
                {/* Mid ring */}
                <div className="absolute inset-6 rounded-full border border-red-100" />
                {/* Center icon */}
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center shadow-2xl">
                  <Network className="w-14 h-14 text-white" />
                </div>
                {/* Satellite dots */}
                {[
                  { top: '6%',  left: '50%', color: 'bg-blue-900', size: 'w-4 h-4' },
                  { top: '50%', left: '6%',  color: 'bg-red-600',  size: 'w-3 h-3' },
                  { top: '50%', left: '88%', color: 'bg-blue-400', size: 'w-3 h-3' },
                  { top: '88%', left: '50%', color: 'bg-red-300',  size: 'w-2 h-2' },
                ].map((dot, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${dot.size} ${dot.color} rounded-full -translate-x-1/2 -translate-y-1/2`}
                    style={{ top: dot.top, left: dot.left }}
                    {...fadeIn(0.3 + i * 0.08)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },

  // 4. Split dos columnas · azul / blanco
  {
    id: 4,
    name: '4 · Split Dos Columnas',
    render: (t) => (
      <div className="relative overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[320px]">
          <motion.div {...fadeIn(0)} className="w-full md:w-1/2 bg-blue-900 flex items-center px-10 md:px-16 pt-32 md:pt-24 pb-14">
            <div>
              <div className="w-8 h-0.5 bg-red-400 mb-6" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {t.title}
              </h1>
            </div>
          </motion.div>
          <motion.div {...fadeIn(0.12)} className="w-full md:w-1/2 bg-slate-50 flex items-center px-10 md:px-14 py-12 md:pt-24 md:pb-14">
            <div>
              <Eye className="w-8 h-8 text-blue-700 mb-5" />
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },

  // 5. Tarjeta flotante centrada · fondo azul suave
  {
    id: 5,
    name: '5 · Tarjeta Flotante',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            {...scaleIn(0)}
            className="bg-white rounded-3xl shadow-xl border border-blue-100 px-10 md:px-14 py-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-900" />
              <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-300" />
            </div>
            <motion.h1 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight mb-5">
              {t.title}
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="text-base md:text-lg text-slate-500 leading-relaxed">
              {t.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 6. Gradiente azul claro · tipografía grande centrada · sin bordes
  {
    id: 6,
    name: '6 · Degradado Suave',
    render: (t) => (
      <div className="relative pt-32 pb-24 px-6 bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/3 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-600/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.p {...fadeIn(0)} className="text-blue-200 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            PuraWeb CR · Políticas & Transparencia
          </motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-blue-100 leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 7. Glassmorphism sobre azul claro
  {
    id: 7,
    name: '7 · Glassmorphism Claro',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-blue-100 via-blue-50 to-white overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-56 h-56 bg-red-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            {...scaleIn(0)}
            className="backdrop-blur-xl bg-white/70 border border-white/80 rounded-3xl px-10 md:px-14 py-12 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-7 h-7 text-blue-800" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">Cómo Trabajamos</span>
            </div>
            <motion.h1 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight mb-5">
              {t.title}
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="text-base md:text-lg text-slate-500 leading-relaxed">
              {t.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 8. Borde superior azul grueso · blanco · centrado
  {
    id: 8,
    name: '8 · Borde Superior',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...scaleIn(0)} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <CheckCircle className="w-3.5 h-3.5 text-blue-700" />
            Guía de operación
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 9. Ícono grande · fondo slate suavísimo
  {
    id: 9,
    name: '9 · Ícono Prominente',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-slate-50 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div {...scaleIn(0)} className="w-16 h-16 rounded-2xl bg-blue-900 flex items-center justify-center mb-8 shadow-lg">
            <Handshake className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 10. Dos líneas decorativas · texto derecha
  {
    id: 10,
    name: '10 · Líneas Decorativas',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        {/* Decorative vertical lines */}
        <div className="absolute left-0 top-0 bottom-0 flex gap-1 pointer-events-none opacity-20">
          <div className="w-1 bg-blue-900" />
          <div className="w-0.5 bg-red-600 ml-2" />
        </div>
        <div className="max-w-4xl mx-auto md:pl-10 relative z-10">
          <motion.p {...fadeIn(0)} className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 mb-4">
            Claridad · Confianza · Compromiso
          </motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 11. Fondo rojo muy suave · badge azul · centrado
  {
    id: 11,
    name: '11 · Suave Rojo Centrado',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-red-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-100/50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...scaleIn(0)} className="inline-flex items-center gap-2 bg-white border border-red-200 text-red-700 text-xs font-semibold px-4 py-2 rounded-full mb-7 shadow-sm">
            <Heart className="w-3.5 h-3.5" />
            Para nuestros clientes
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 12. Dots pattern sutil · pill + divider rojo
  {
    id: 12,
    name: '12 · Patrón de Puntos',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #002B7F 1px, transparent 0)', backgroundSize: '22px 22px' }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div {...fadeIn(0)} className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-blue-700" />
            <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">PuraWeb CR</span>
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-4">
            {t.title}
          </motion.h1>
          <motion.div {...scaleIn(0.14)} className="w-14 h-0.5 bg-red-600 mb-5" />
          <motion.p {...fadeUp(0.2)} className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 13. Grid sutil azul · ícono rojo · texto izquierda
  {
    id: 13,
    name: '13 · Grid Moderno',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#002B7F 1px, transparent 1px), linear-gradient(90deg, #002B7F 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <motion.div {...fadeUp(0)} className="md:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">Cómo Trabajamos</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-5">
                {t.title}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                {t.subtitle}
              </p>
            </motion.div>
            <motion.div {...scaleIn(0.15)} className="hidden md:flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-red-700 flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },

  // 14. Fondo azul sólido · divider blanco · texto centrado
  {
    id: 14,
    name: '14 · Azul Sólido Premium',
    render: (t) => (
      <div className="relative pt-32 pb-24 px-6 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...scaleIn(0)} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold px-4 py-2 rounded-full mb-7">
            <Award className="w-3.5 h-3.5" />
            Transparencia & Claridad
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            {t.title}
          </motion.h1>
          <motion.div {...scaleIn(0.16)} className="w-16 h-0.5 bg-red-400 mx-auto mb-6" />
          <motion.p {...fadeUp(0.2)} className="text-lg md:text-xl text-blue-200 leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 15. Pill roja · título grande · fondo blanco · pill badge icono
  {
    id: 15,
    name: '15 · Pill Roja + Título',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span {...scaleIn(0)} className="inline-flex items-center gap-1.5 bg-red-700 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-7">
            <Sparkles className="w-3 h-3" />
            Nuestra Forma de Trabajar
          </motion.span>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 16. Tres chips de valores · título · fondo azul muy suave
  {
    id: 16,
    name: '16 · Chips de Valores',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-blue-50 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn(0)} className="flex flex-wrap justify-center gap-2 mb-8">
            {['Transparencia', 'Confianza', 'Compromiso'].map((label, i) => (
              <motion.span
                key={label}
                {...scaleIn(i * 0.07)}
                className="bg-white border border-blue-200 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
              >
                {label}
              </motion.span>
            ))}
          </motion.div>
          <motion.h1 {...fadeUp(0.18)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.28)} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 17. Diagonal suave azul → blanco
  {
    id: 17,
    name: '17 · Diagonal Suave',
    render: (t) => (
      <div className="relative overflow-hidden min-h-[320px] bg-white">
        <div
          className="absolute inset-0 bg-blue-900"
          style={{ clipPath: 'polygon(0 0, 55% 0, 40% 100%, 0 100%)' }}
        />
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.h1 {...fadeUp(0)} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t.title}
            </motion.h1>
            <motion.div {...fadeUp(0.14)}>
              <div className="w-10 h-0.5 bg-red-600 mb-5" />
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                {t.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },

  // 18. Borde inferior degradado · centrado · fondo blanco
  {
    id: 18,
    name: '18 · Borde Inferior',
    render: (t) => (
      <div className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-700 to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...scaleIn(0)} className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-7">
            <Lock className="w-6 h-6 text-blue-800" />
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

  // 19. Fondo bicolor suave · azul arriba / blanco abajo · centrado
  {
    id: 19,
    name: '19 · Bicolor Suave',
    render: (t) => (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-900 pointer-events-none" style={{ height: '55%' }} />
        <div className="absolute bottom-0 left-0 right-0 bg-white pointer-events-none" style={{ top: '55%' }} />
        <div className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p {...fadeIn(0)} className="text-blue-200 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Cómo Trabajamos · PuraWeb CR
            </motion.p>
            <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              {t.title}
            </motion.h1>
            <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </motion.p>
          </div>
        </div>
      </div>
    )
  },

  // 20. Stars / puntos de luz · fondo azul muy suave · minimalista
  {
    id: 20,
    name: '20 · Minimalista Estrellado',
    render: (t) => (
      <div className="relative pt-32 pb-24 px-6 bg-blue-50 overflow-hidden">
        {/* Subtle star dots */}
        {[
          { top: '18%', left: '8%', size: 3 },
          { top: '35%', left: '92%', size: 2 },
          { top: '70%', left: '5%', size: 2 },
          { top: '55%', right: '12%', left: undefined, size: 3 },
          { top: '25%', left: '75%', size: 2 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{ top: pos.top, left: pos.left, right: pos.right, width: pos.size, height: pos.size }}
            {...fadeIn(i * 0.12)}
          />
        ))}
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...scaleIn(0)} className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-7 shadow-sm">
            <Star className="w-3.5 h-3.5 text-red-600" />
            Nuestro compromiso contigo
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            {t.title}
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    )
  },

];

export default heroVariants;