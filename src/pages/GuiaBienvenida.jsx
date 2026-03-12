import React, { useState, useMemo, useCallback, useEffect, memo } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { 
  ChevronDown, Sparkles, Zap, Heart, Rocket, Shield, TrendingUp, 
  Code, Award, Users, Target, Eye, ArrowRight, BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Hero Styles - 20 Versiones Diferentes
const heroStyles = [
  // 1. Gradient Minimal
  {
    id: 1,
    name: "Gradient Minimal",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <p className="text-white/80 text-sm font-medium">{lang === 'es' ? '✨ Bienvenido a PuraWeb CR' : '✨ Welcome to PuraWeb CR'}</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {lang === 'es' ? 'Nuestra Guía de Valores y Principios' : 'Our Values & Principles Guide'}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              {lang === 'es' 
                ? 'Descubre cómo trabajamos y por qué cada decisión que tomamos está alineada con tu éxito.'
                : 'Discover how we work and why every decision we make is aligned with your success.'}
            </p>
            <Button className="bg-white text-blue-900 hover:bg-white/90 px-8 py-6 text-lg">
              {lang === 'es' ? 'Comienza el Viaje' : 'Begin the Journey'} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    )
  },

  // 2. Glass Morphism
  {
    id: 2,
    name: "Glass Morphism",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7 }}
            className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-12 md:p-16 shadow-2xl"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-400 mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {lang === 'es' ? 'Transparencia Total' : 'Total Transparency'}
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                {lang === 'es'
                  ? 'La base de nuestra relación contigo es la claridad absoluta. Sin sorpresas, sin letra pequeña.'
                  : 'The foundation of our relationship with you is absolute clarity. No surprises, no fine print.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },

  // 3. Animated Grid
  {
    id: 3,
    name: "Animated Grid",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
              {lang === 'es' ? 'Más que Código' : 'More Than Code'}
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
              {lang === 'es'
                ? 'Creamos soluciones digitales que transforman negocio.'
                : 'We create digital solutions that transform your business.'}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-6 text-lg">
                {lang === 'es' ? 'Explorar' : 'Explore'}
              </Button>
              <Button variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg">
                {lang === 'es' ? 'Aprender Más' : 'Learn More'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },

  // 4. Dark Asymmetric
  {
    id: 4,
    name: "Dark Asymmetric",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gradient-to-r from-gray-900 to-black flex items-center overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 w-full md:w-1/2">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-600/20 rounded-lg text-blue-400 text-sm font-semibold">BIENVENIDA</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              {lang === 'es' ? 'Tu Aliado Digital' : 'Your Digital Ally'}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {lang === 'es'
                ? 'Construimos el futuro digital de Costa Rica con pasión y precisión.'
                : 'We build Costa Rica\'s digital future with passion and precision.'}
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-6 text-lg">
              {lang === 'es' ? 'Comenzar Ahora' : 'Start Now'} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    )
  },

  // 5. Neon Glow
  {
    id: 5,
    name: "Neon Glow",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-lg" style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}>
              {lang === 'es' ? 'Futura Digital' : 'Digital Future'}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              {lang === 'es'
                ? 'Donde la tecnología y la pasión se encuentran para crear experiencias excepcionales.'
                : 'Where technology and passion meet to create exceptional experiences.'}
            </p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg">
              {lang === 'es' ? 'Descubre Más' : 'Discover More'}
            </Button>
          </motion.div>
        </div>
      </div>
    )
  },

  // 6. Minimalist Clean
  {
    id: 6,
    name: "Minimalist Clean",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="mb-8 inline-block">
              <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              {lang === 'es' ? 'Hecho con Amor' : 'Made with Love'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Cada proyecto es un compromiso hacia la excelencia y la satisfacción de nuestros clientes.'
                : 'Every project is a commitment to excellence and customer satisfaction.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 7. Bold Typography
  {
    id: 7,
    name: "Bold Typography",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute text-gray-700 text-9xl font-black opacity-10 top-10 left-0">PURA</div>
          <div className="absolute text-gray-700 text-9xl font-black opacity-10 bottom-10 right-0">WEB</div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight"
          >
            {lang === 'es' ? 'Valor Real' : 'Real Value'}
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Inversión inteligente en tu futuro digital.'
              : 'Smart investment in your digital future.'}
          </p>
        </div>
      </div>
    )
  },

  // 8. Dual Tone Split
  {
    id: 8,
    name: "Dual Tone Split",
    component: (t, lang) => (
      <div className="relative min-h-screen flex overflow-hidden">
        <div className="w-1/2 bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center hidden md:flex">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="text-center text-white px-8">
            <Code className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-4xl font-bold">{lang === 'es' ? 'Tecnología' : 'Technology'}</h2>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="text-center px-8 max-w-xl">
            <Heart className="w-16 h-16 text-blue-900 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {lang === 'es' ? 'Pasión Tica' : 'Costa Rican Passion'}
            </h1>
            <p className="text-lg text-gray-600">
              {lang === 'es'
                ? 'La combinación perfecta para tu negocio.'
                : 'The perfect combination for your business.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 9. Particle Effect
  {
    id: 9,
    name: "Particle Effect",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            initial={{ x: Math.random() * 1000 - 500, y: Math.random() * 1000 - 500, opacity: 0 }}
            animate={{ 
              x: Math.random() * 1000 - 500, 
              y: Math.random() * 1000 - 500,
              opacity: [0, 0.8, 0]
            }}
            transition={{ duration: 20 + Math.random() * 10, repeat: Infinity }}
          />
        ))}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              {lang === 'es' ? 'Innovación Constante' : 'Constant Innovation'}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'En movimiento hacia el futuro.'
                : 'Moving towards the future.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 10. Glitch Effect
  {
    id: 10,
    name: "Glitch Effect",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white relative"
          >
            <div className="inline-block relative">
              {lang === 'es' ? 'Código Limpio' : 'Clean Code'}
              <motion.div
                className="absolute inset-0 text-blue-500/50 font-black"
                animate={{ x: [0, 2, -2, 0] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              >
                {lang === 'es' ? 'Código Limpio' : 'Clean Code'}
              </motion.div>
            </div>
          </motion.h1>
          <p className="text-xl text-gray-400 mt-8 max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Arquitectura de siguiente nivel.'
              : 'Next-level architecture.'}
          </p>
        </div>
      </div>
    )
  },

  // 11. Cards Showcase
  {
    id: 11,
    name: "Cards Showcase",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 py-32">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold text-white text-center mb-12"
          >
            {lang === 'es' ? 'Valores en Acción' : 'Values in Action'}
          </motion.h1>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: lang === 'es' ? 'Excelencia' : 'Excellence' },
              { icon: Shield, title: lang === 'es' ? 'Seguridad' : 'Security' },
              { icon: Rocket, title: lang === 'es' ? 'Velocidad' : 'Speed' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 text-center hover:border-blue-500 transition-all"
              >
                <item.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  },

  // 12. Radial Gradient
  {
    id: 12,
    name: "Radial Gradient",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/20 via-transparent to-transparent" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              {lang === 'es' ? 'Centro del Universo' : 'Center of Universe'}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Tu negocio en el epicentro de la transformación digital.'
                : 'Your business at the epicenter of digital transformation.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 13. Wave Animation
  {
    id: 13,
    name: "Wave Animation",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-white flex items-center justify-center overflow-hidden">
        <svg className="absolute bottom-0 left-0 right-0 h-40" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="white"
            animate={{ d: "M0,60 Q300,10 600,60 T1200,60 L1200,120 L0,120 Z" }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              {lang === 'es' ? 'Flujo Natural' : 'Natural Flow'}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Procesos simples, resultados extraordinarios.'
                : 'Simple processes, extraordinary results.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 14. Holographic
  {
    id: 14,
    name: "Holographic",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-cyan-500/30 rounded-3xl" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity }} />
          <motion.div className="absolute top-1/3 right-1/4 w-80 h-80 border-2 border-purple-500/30 rounded-full" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              {lang === 'es' ? 'Futuro Hoy' : 'Future Today'}
            </h1>
            <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Tecnología que transforma realidades.'
                : 'Technology that transforms realities.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 15. Stacked Text
  {
    id: 15,
    name: "Stacked Text",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-32">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="space-y-4 mb-8">
              <h1 className="text-7xl md:text-8xl font-black text-gray-900">
                {lang === 'es' ? 'PURA' : 'PURE'}
              </h1>
              <h1 className="text-6xl md:text-7xl font-black text-blue-900">
                {lang === 'es' ? 'EXCELENCIA' : 'EXCELLENCE'}
              </h1>
              <h1 className="text-5xl md:text-6xl font-black text-gray-500">
                {lang === 'es' ? 'DIGITAL' : 'DIGITAL'}
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Tres palabras que definen nuestro compromiso.'
                : 'Three words that define our commitment.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 16. Mesh Gradient
  {
    id: 16,
    name: "Mesh Gradient",
    component: (t, lang) => (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)'
      }}>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              {lang === 'es' ? 'Colores de Éxito' : 'Colors of Success'}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              {lang === 'es'
                ? 'Diversidad de soluciones, un mismo compromiso.'
                : 'Diversity of solutions, same commitment.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 17. Floating Elements
  {
    id: 17,
    name: "Floating Elements",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center overflow-hidden">
        {[Sparkles, Code, Award].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ y: 0, x: 0 }}
            animate={{ y: [-50, 50, -50], x: [-30, 30, -30] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity }}
            style={{ left: `${20 + i * 35}%`, top: `${20 + i * 10}%`, opacity: 0.1 }}
          >
            <Icon className="w-40 h-40 text-blue-500" />
          </motion.div>
        ))}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              {lang === 'es' ? 'En Movimiento' : 'In Motion'}
            </h1>
            <p className="text-xl text-gray-400">
              {lang === 'es'
                ? 'Siempre evolucionando por ti.'
                : 'Always evolving for you.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 18. Brutalist Design
  {
    id: 18,
    name: "Brutalist Design",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 py-32">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="border-8 border-black p-12 md:p-16 bg-white">
              <h1 className="text-7xl md:text-8xl font-black text-black mb-6 leading-none">
                {lang === 'es' ? 'SIN FILTROS' : 'NO FILTERS'}
              </h1>
              <div className="h-1 w-32 bg-black mb-8" />
              <p className="text-xl text-black font-bold max-w-2xl">
                {lang === 'es'
                  ? 'Diseño honesto. Tecnología pura. Resultados reales.'
                  : 'Honest design. Pure technology. Real results.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },

  // 19. Cyberpunk
  {
    id: 19,
    name: "Cyberpunk",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03) 0px, rgba(0, 255, 255, 0.03) 1px, transparent 1px, transparent 2px)'
      }}>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="border-4 border-cyan-400 p-12 relative"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400" />
            <h1 className="text-6xl md:text-7xl font-black text-cyan-400 mb-6" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}>
              {lang === 'es' ? '> FUTURO' : '> FUTURE'}
            </h1>
            <p className="text-cyan-300 text-lg">
              {lang === 'es'
                ? '[ CARGANDO INNOVACIÓN ]'
                : '[ LOADING INNOVATION ]'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  },

  // 20. Aurora Borealis
  {
    id: 20,
    name: "Aurora Borealis",
    component: (t, lang) => (
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              {lang === 'es' ? 'Luces del Éxito' : 'Lights of Success'}
            </h1>
            <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Iluminando el camino hacia tu transformación digital.'
                : 'Lighting the path to your digital transformation.'}
            </p>
          </motion.div>
        </div>
      </div>
    )
  }
];

const GuiaBienvenidaHeroSelector = memo(function GuiaBienvenidaHeroSelector() {
  const { language } = useLanguage();
  const [selectedHero, setSelectedHero] = useState(0);
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    document.title = `${language === 'es' ? 'Guía de Bienvenida' : 'Welcome Guide'} - PuraWeb CR`;
  }, [language]);

  const CurrentHero = heroStyles[selectedHero].component;

  return (
    <div className="relative min-h-screen">
      {/* Hero Selector */}
      <div className="fixed top-32 right-6 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2 bg-white text-gray-900 hover:bg-gray-100 shadow-xl border-2 border-blue-900">
              <Sparkles className="w-5 h-5" />
              <span className="hidden md:inline">{heroStyles[selectedHero].name}</span>
              <span className="md:hidden">{selectedHero + 1}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
            {heroStyles.map((style, index) => (
              <DropdownMenuItem
                key={style.id}
                onClick={() => setSelectedHero(index)}
                className={`cursor-pointer ${selectedHero === index ? 'bg-blue-100 text-blue-900 font-semibold' : ''}`}
              >
                <span className="font-mono text-sm">{index + 1}.</span>
                <span className="ml-2">{style.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Current Hero */}
      <CurrentHero t={t} lang={language} />

      {/* Hero Counter - Bottom */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 shadow-lg">
          <p className="text-sm font-semibold text-gray-900">
            {selectedHero + 1} / {heroStyles.length}
          </p>
        </div>
      </div>
    </div>
  );
});

export default GuiaBienvenidaHeroSelector;