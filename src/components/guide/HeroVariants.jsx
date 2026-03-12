import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Sparkles, Zap, Heart, Shield, Lightbulb, 
  ArrowRight, Star, Flame, Compass, Crown, Target 
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

export const heroVariants = [
  // 1. Classic Gradient
  {
    id: 1,
    name: 'Classic Gradient',
    render: (t, language) => (
      <motion.div 
        className="relative pt-24 pb-16 overflow-hidden"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-red-900/5" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div variants={fadeInUp} className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-2xl">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-red-700 bg-clip-text text-transparent"
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-center text-gray-600 font-medium mb-8"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 2. Minimal Dark
  {
    id: 2,
    name: 'Minimal Dark',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 text-white"
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-center text-gray-300 font-light mb-8"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 3. Neon Glow
  {
    id: 3,
    name: 'Neon Glow',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-purple-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl shadow-blue-500/50">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400"
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-center text-cyan-200 font-medium"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 4. Premium Gold
  {
    id: 4,
    name: 'Premium Gold',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-2xl">
              <Crown className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-yellow-700"
          >
            {t.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-32 h-1 bg-gradient-to-r from-amber-400 to-yellow-600 mx-auto mb-8"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-center text-amber-900 font-medium"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 5. Abstract Shapes
  {
    id: 5,
    name: 'Abstract Shapes',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="100" r="150" fill="url(#grad1)" />
          <polygon points="900,50 1050,200 800,250" fill="url(#grad2)" />
          <rect x="50" y="400" width="250" height="250" fill="url(#grad3)" opacity="0.3" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:0.8}} />
              <stop offset="100%" style={{stopColor:'#1e40af', stopOpacity:0.8}} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#ef4444', stopOpacity:0.8}} />
              <stop offset="100%" style={{stopColor:'#dc2626', stopOpacity:0.8}} />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:0.6}} />
              <stop offset="100%" style={{stopColor:'#6366f1', stopOpacity:0.6}} />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-gray-900"
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 6. Glassmorphism
  {
    id: 6,
    name: 'Glassmorphism',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden min-h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center font-medium">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 7. Bold Typography
  {
    id: 7,
    name: 'Bold Typography',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 text-center leading-tight mb-8"
          >
            {t.title.split(' ').map((word, idx) => (
              <div key={idx} className="block">
                {word}
              </div>
            ))}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-red-600" />
            <p className="text-lg md:text-xl text-gray-700 font-semibold">
              {t.subtitle}
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-red-600 to-blue-900" />
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 8. Animated Gradient
  {
    id: 8,
    name: 'Animated Gradient',
    render: (t, language) => (
      <motion.div 
        className="relative pt-24 pb-16 overflow-hidden"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: '100% 50%' }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{
          background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
          backgroundSize: '400% 400%'
        }}
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              {t.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 9. Split Layout
  {
    id: 9,
    name: 'Split Layout',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6 lg:py-32 lg:px-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <div className="w-16 h-1 bg-white mb-6" />
            <p className="text-lg text-white/90">
              {t.subtitle}
            </p>
          </motion.div>
          
          {/* Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 bg-gradient-to-br from-red-600 to-red-500 py-20 px-6 lg:py-32 lg:px-12 flex items-center justify-center"
          >
            <div className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center">
              <Zap className="w-24 h-24 text-white" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 10. Card Stack
  {
    id: 10,
    name: 'Card Stack',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="space-y-4"
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-xl border-l-8 border-blue-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t.title}
              </h1>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-red-600 ml-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-lg md:text-xl text-gray-700 font-medium">
                {t.subtitle}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 11. Particles Effect
  {
    id: 11,
    name: 'Particles Effect',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [1, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-blue-300 font-medium"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 12. Neumorphic
  {
    id: 12,
    name: 'Neumorphic',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 shadow-2xl"
            style={{
              boxShadow: '9px 9px 16px #bebebe, -9px -9px 16px #ffffff'
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 13. Wave Background
  {
    id: 13,
    name: 'Wave Background',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#1e3a8a'}} />
              <stop offset="100%" style={{stopColor:'#dc2626'}} />
            </linearGradient>
          </defs>
          <path d="M 0 300 Q 300 200, 600 300 T 1200 300 L 1200 600 L 0 600 Z" fill="url(#waveGrad)" />
        </svg>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-white/90 font-medium"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 14. Cyberpunk
  {
    id: 14,
    name: 'Cyberpunk',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(0,255,255,0.3) 0px, transparent 1px, transparent 2px, rgba(255,0,255,0.3) 3px)`
        }} />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-cyan-400 mb-6 uppercase tracking-wider"
            style={{textShadow: '0 0 20px rgba(0, 255, 255, 0.8)'}}
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-magenta-400 font-bold uppercase"
            style={{textShadow: '0 0 10px rgba(255, 0, 255, 0.6)'}}
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 15. Luxury Dark
  {
    id: 15,
    name: 'Luxury Dark',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="border-l-4 border-amber-500 pl-8 py-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 16. Colorful Blocks
  {
    id: 16,
    name: 'Colorful Blocks',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              'bg-blue-500',
              'bg-purple-500',
              'bg-pink-500',
              'bg-red-500',
              'bg-yellow-500',
              'bg-green-500'
            ].map((color, idx) => (
              <motion.div
                key={idx}
                className={`${color} h-20 rounded-xl`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              />
            ))}
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 17. Floating Elements
  {
    id: 17,
    name: 'Floating Elements',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Floating elements */}
        {[Rocket, Sparkles, Heart, Zap].map((Icon, idx) => (
          <motion.div
            key={idx}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 4 + idx,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + idx * 20}%`,
              top: `${10 + idx * 15}%`,
              opacity: 0.1
            }}
          >
            <Icon className="w-32 h-32 text-blue-900" />
          </motion.div>
        ))}
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-700"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // 18. Data Visualization Style
  {
    id: 18,
    name: 'Data Viz',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute w-px bg-blue-900" style={{
              height: `${Math.random() * 200 + 50}px`,
              left: `${i * 10}%`,
              top: '50%',
              transform: 'translateY(-50%)'
            }} />
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-2">
              {t.title}
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-900 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // 19. 3D Tilt Effect
  {
    id: 19,
    name: '3D Tilt',
    render: (t, language) => (
      <motion.div 
        className="relative pt-24 pb-16 overflow-hidden"
        style={{perspective: '1000px'}}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black" />
        
        <motion.div 
          initial={{ opacity: 0, rotateY: -20 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.7 }}
          style={{transformStyle: 'preserve-3d'}}
          className="max-w-5xl mx-auto px-6 relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-purple-200 text-center font-medium">
            {t.subtitle}
          </p>
        </motion.div>
      </motion.div>
    )
  },

  // 20. Minimal Modern
  {
    id: 20,
    name: 'Minimal Modern',
    render: (t, language) => (
      <motion.div className="relative pt-24 pb-16 overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="w-16 h-1 bg-blue-900" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-tight">
              {t.title}
            </h1>
            <div className="w-24 h-1 bg-red-600" />
            <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  }
];

export default heroVariants;