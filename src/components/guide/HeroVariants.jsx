import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Handshake, CheckCircle, Lock, Users, Star, Award, Zap, FileText, Globe, Heart } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

export const heroVariants = [

  // 1. Wave Background - Azul/Rojo (PRESERVADO, colores originales)
  {
    id: 1,
    name: 'Waves: Azul & Rojo',
    render: (t) => (
      <motion.div className="relative pt-28 pb-24 overflow-hidden bg-white">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1e3a8a' }} />
              <stop offset="100%" style={{ stopColor: '#dc2626' }} />
            </linearGradient>
          </defs>
          <path d="M 0 300 Q 300 200, 600 300 T 1200 300 L 1200 600 L 0 600 Z" fill="url(#waveGrad1)" />
          <path d="M 0 350 Q 300 260, 600 340 T 1200 340 L 1200 600 L 0 600 Z" fill="rgba(30,58,138,0.3)" />
        </svg>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 2. Wave Background - Azul profundo
  {
    id: 2,
    name: 'Waves: Azul Profundo',
    render: (t) => (
      <motion.div className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-blue-900" />
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.15 }} />
              <stop offset="50%" style={{ stopColor: '#bfdbfe', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,80 C360,160 1080,0 1440,80 L1440,200 L0,200 Z" fill="url(#waveGrad2)" />
          <path d="M0,120 C400,40 1040,160 1440,100 L1440,200 L0,200 Z" fill="rgba(255,255,255,0.07)" />
        </svg>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-500/40 text-blue-200 text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <Shield className="w-4 h-4" />
            {t.subtitle?.split('.')[0]}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 3. Wave Background - Rojo corporativo
  {
    id: 3,
    name: 'Waves: Rojo Corporativo',
    render: (t) => (
      <motion.div className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-red-800" />
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path d="M0,60 C480,140 960,20 1440,80 L1440,180 L0,180 Z" fill="rgba(255,255,255,0.12)" />
          <path d="M0,100 C360,30 1080,130 1440,60 L1440,180 L0,180 Z" fill="rgba(255,255,255,0.06)" />
        </svg>
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            {t.title}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1 bg-white/60 mx-auto mb-6 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-red-100 max-w-3xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 4. Wave Background - Blanco y Azul marino (elegante)
  {
    id: 4,
    name: 'Waves: Marino & Blanco',
    render: (t) => (
      <motion.div className="relative pt-28 pb-24 overflow-hidden bg-slate-50">
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#002B7F' }} />
              <stop offset="100%" style={{ stopColor: '#1e3a8a' }} />
            </linearGradient>
          </defs>
          <path d="M0,0 L1440,0 L1440,120 C1080,200 360,40 0,140 Z" fill="url(#waveGrad4)" />
        </svg>
        <div className="max-w-5xl mx-auto px-6 relative z-10 pt-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 5. Clean Split — azul oscuro a blanco
  {
    id: 5,
    name: 'Split Claro',
    render: (t) => (
      <motion.div className="relative overflow-hidden" variants={staggerContainer} initial="initial" animate="animate">
        <div className="flex flex-col md:flex-row min-h-[340px]">
          <motion.div
            variants={fadeInUp}
            className="w-full md:w-3/5 bg-gradient-to-br from-blue-950 to-blue-800 flex items-center px-8 md:px-16 py-16 pt-28 md:pt-20"
          >
            <div>
              <div className="w-10 h-1 bg-red-400 mb-6 rounded-full" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {t.title}
              </h1>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="w-full md:w-2/5 bg-white flex items-center px-8 md:px-12 py-12 md:py-20"
          >
            <div>
              <Eye className="w-10 h-10 text-blue-900 mb-4" />
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 6. Corporate Minimal — línea roja + texto izquierda
  {
    id: 6,
    name: 'Corporativo Mínimal',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 bg-white overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-blue-900" />
        <div className="max-w-5xl mx-auto px-8 md:px-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-widest text-red-600 mb-4"
          >
            {t.subtitle?.split(' ').slice(0, 4).join(' ')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 7. Glassmorphism sobre fondo azul
  {
    id: 7,
    name: 'Glassmorphism Azul',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-red-500/10 rounded-full blur-2xl" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="backdrop-blur-xl bg-white/10 rounded-3xl p-10 md:p-14 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <Shield className="w-8 h-8 text-blue-300" />
              <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">PuraWeb CR</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              {t.title}
            </h1>
            <p className="text-lg text-blue-100/90 max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 8. Línea de tiempo / Timeline Header
  {
    id: 8,
    name: 'Timeline Header',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 bg-gray-50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center shadow-xl"
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-3"
              >
                {[CheckCircle, CheckCircle, CheckCircle].map((Icon, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
                    <Icon className="w-5 h-5 text-blue-600" />
                  </motion.div>
                ))}
                <span className="text-sm text-gray-500 font-medium">Transparencia · Claridad · Compromiso</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-3"
              >
                {t.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base md:text-lg text-gray-600"
              >
                {t.subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    )
  },

  // 9. Diagonal Split
  {
    id: 9,
    name: 'Diagonal Split',
    render: (t) => (
      <motion.div className="relative overflow-hidden min-h-[360px]">
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-950 to-blue-800"
          style={{ clipPath: 'polygon(0 0, 65% 0, 45% 100%, 0 100%)' }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 400">
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
          <rect width="800" height="400" fill="url(#dots)" />
        </svg>
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {t.title}
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="w-10 h-1 bg-red-600 mb-4 rounded-full" />
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  },

  // 10. Card centrada sobre fondo con puntos
  {
    id: 10,
    name: 'Tarjeta Central',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl border-t-8 border-red-600"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <div className="w-3 h-3 rounded-full bg-blue-900" />
              <div className="w-3 h-3 rounded-full bg-gray-300" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              {t.title}
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 11. Borde izquierdo rojo, fondo gris suave
  {
    id: 11,
    name: 'Acento Rojo',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-red-50 to-transparent" />
        <div className="max-w-5xl mx-auto px-8 md:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="border-l-4 border-red-600 pl-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-3">
              Cómo Trabajamos
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 12. Gradiente oscuro + ícono grande centrado
  {
    id: 12,
    name: 'Ícono Prominente',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 overflow-hidden" variants={staggerContainer} initial="initial" animate="animate">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-950" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '30px 30px' }}
        />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-2xl shadow-red-900/50">
              <Handshake className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
          >
            {t.title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 13. Minimal línea azul + tipografía limpia
  {
    id: 13,
    name: 'Línea Azul',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5 }}
            className="w-20 h-1 bg-blue-900 mx-auto mb-7 rounded-full"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="w-10 h-1 bg-red-600 mx-auto mt-7 rounded-full"
          />
        </div>
      </motion.div>
    )
  },

  // 14. Fondo oscuro con borde dorado / premium
  {
    id: 14,
    name: 'Premium Oscuro',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="border border-white/10 rounded-3xl p-10 md:p-14 bg-white/5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400/80 text-xs font-bold uppercase tracking-widest">PuraWeb CR — Claridad Total</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              {t.title}
            </h1>
            <div className="w-16 h-0.5 bg-yellow-400/60 mb-5" />
            <p className="text-lg text-gray-300 max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 15. Fondo blanco con patrón de rejilla y acento rojo
  {
    id: 15,
    name: 'Rejilla Moderna',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#002B7F 1px, transparent 1px), linear-gradient(90deg, #002B7F 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="md:col-span-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                {t.title}
              </h1>
              <p className="text-lg text-gray-600">
                {t.subtitle}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex justify-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-xl">
                <Globe className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  },

  // 16. Gradiente horizontal azul a blanco
  {
    id: 16,
    name: 'Gradiente Horizontal',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-white" />
        <div className="max-w-5xl mx-auto px-6 md:px-16 relative z-10">
          <motion.h1
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight max-w-3xl"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-blue-100 max-w-xl"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 17. Fondo con círculos concentricos azul
  {
    id: 17,
    name: 'Círculos Concéntricos',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 overflow-hidden bg-blue-950">
        {[280, 200, 130, 70].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{ width: `${size * 2}px`, height: `${size * 2}px`, top: `calc(50% - ${size}px)`, right: `-${size * 0.3}px` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          />
        ))}
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-300 text-xs font-bold uppercase tracking-widest">Transparencia & Confianza</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 max-w-3xl">
              {t.title}
            </h1>
            <p className="text-lg text-blue-200 max-w-xl">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 18. Azul y rojo, bloques de color
  {
    id: 18,
    name: 'Bloques Bicolor',
    render: (t) => (
      <motion.div className="relative overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="w-full md:w-2/3 bg-blue-950 px-8 md:px-16 pt-28 pb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t.title}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-1/3 bg-red-600 flex items-center px-8 md:px-10 py-10 md:pt-28 md:pb-12"
          >
            <p className="text-white text-base md:text-lg leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 19. Fondo textura sutil + tipografía grande centrada
  {
    id: 19,
    name: 'Tipografía Grande',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #002B7F 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold px-4 py-2 rounded-full mb-7 uppercase tracking-widest"
          >
            <Users className="w-4 h-4" /> Para nuestros clientes
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 20. Fondo suave + barra de progreso / indicadores de confianza
  {
    id: 20,
    name: 'Indicadores de Confianza',
    render: (t) => (
      <motion.div className="relative pt-28 pb-16 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden" variants={staggerContainer} initial="initial" animate="animate">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-5"
              >
                {t.title}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-600">
                {t.subtitle}
              </motion.p>
            </div>
            <motion.div variants={fadeInUp} className="space-y-4">
              {[
                { label: 'Transparencia', value: 100, color: 'bg-blue-900' },
                { label: 'Compromiso', value: 100, color: 'bg-red-600' },
                { label: 'Soporte', value: 100, color: 'bg-blue-600' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                    <span>{item.label}</span><span>{item.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${item.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }
];

export default heroVariants;