import React, { memo } from "react";
import { motion } from "framer-motion";
import { Heart, Target, Eye, Sparkles, Users, Rocket, Award, Shield, Network, Zap, Lightbulb, Handshake, TrendingUp, CheckCircle2, Code, Palette } from "lucide-react";

// Animación base compartida
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// Variantes de Hero Sections
const heroVariants = {
  // 1. Clásico Elegante (Azul Dominante)
  1: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div className="text-center">
          <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" variants={fadeInUp}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
            {t.heroSubtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  )),

  // 2. Minimalista Rojo
  2: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-60 -mr-48" />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div className="max-w-2xl">
          <motion.div className="w-2 h-16 bg-red-600 mb-8" variants={fadeInUp} />
          <motion.h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" variants={fadeInUp}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="text-lg text-gray-600 leading-relaxed" variants={fadeInUp}>
            {t.heroSubtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  )),

  // 3. Gradient Moderno (Azul a Morado)
  3: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 4. Con Iconos Flotantes
  4: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Heart, Target, Sparkles, Users].map((Icon, i) => (
          <motion.div 
            key={i}
            className="absolute text-blue-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.3, y: [0, 30, 0] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
            style={{ top: `${20 + i * 15}%`, left: `${10 + i * 20}%` }}
          >
            <Icon className="w-12 h-12" />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 5. Split Layout (Texto + Ilustración)
  5: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div>
          <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="text-lg text-gray-600 leading-relaxed" variants={fadeInUp}>
            {t.heroSubtitle}
          </motion.p>
        </div>
        
        <motion.div 
          className="hidden lg:flex justify-center items-center"
          variants={fadeInUp}
        >
          <div className="w-64 h-64 bg-gradient-to-br from-blue-900 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Heart className="w-32 h-32 text-white" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )),

  // 6. Fondo de Patrón Geométrico
  6: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
        backgroundSize: '60px 60px',
        backgroundPosition: '0 0, 30px 30px'
      }} />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 7. Con Línea Divisoria
  7: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
              {t.heroTitle}
            </motion.h1>
            <motion.p className="text-lg text-gray-600 leading-relaxed" variants={fadeInUp}>
              {t.heroSubtitle}
            </motion.p>
          </div>
          
          <motion.div className="hidden lg:block" variants={fadeInUp}>
            <div className="w-1 h-64 bg-gradient-to-b from-blue-900 to-red-600 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )),

  // 8. Badges + Contenido
  8: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.div className="flex flex-wrap justify-center gap-3 mb-8" variants={fadeInUp}>
          {[language === 'es' ? 'Premium' : 'Premium', language === 'es' ? 'Profesional' : 'Professional', language === 'es' ? 'Confiable' : 'Trusted'].map((badge, i) => (
            <span key={i} className="px-4 py-2 bg-blue-900 text-white rounded-full text-sm font-medium">
              {badge}
            </span>
          ))}
        </motion.div>
        
        <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 9. Fondo Oscuro con Accent Rojo
  9: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-900 to-gray-900">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-20 -mr-48" />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.div className="inline-block mb-6 px-6 py-3 bg-red-600/20 border border-red-500 rounded-full" variants={fadeInUp}>
          <span className="text-red-500 font-semibold">{language === 'es' ? 'Innovación' : 'Innovation'}</span>
        </motion.div>
        
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 10. Diagonal Split
  10: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-100 clip-path-polygon" style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)' }} />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div className="max-w-2xl">
          <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="text-lg text-gray-600 leading-relaxed" variants={fadeInUp}>
            {t.heroSubtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  )),

  // 11. Card Flotante Central
  11: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 text-center border-2 border-blue-100"
          variants={fadeInUp}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" variants={fadeInUp}>
            {t.heroSubtitle}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )),

  // 12. Con Línea Animada
  12: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.div 
          className="h-1 w-24 bg-red-600 mx-auto mb-8 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        
        <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 13. Fondo de Ondas
  13: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-700">
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <path d="M 0,50 Q 300,30 600,50 T 1200,50 L 1200,120 L 0,120 Z" fill="white" />
      </svg>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 14. Números + Contenido
  14: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <div className="text-7xl font-bold text-red-600 mb-4">+10</div>
            <p className="text-gray-600 text-lg">{language === 'es' ? 'Años de experiencia' : 'Years of experience'}</p>
          </motion.div>
          
          <div>
            <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
              {t.heroTitle}
            </motion.h1>
            <motion.p className="text-lg text-gray-600 leading-relaxed" variants={fadeInUp}>
              {t.heroSubtitle}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  )),

  // 15. Glassmorphism
  15: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-pink-400/10" />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.div 
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 md:p-16 text-center"
          variants={fadeInUp}
        >
          <motion.h1 className="text-5xl md:text-6xl font-bold text-white mb-6" variants={fadeInUp}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
            {t.heroSubtitle}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )),

  // 16. Cita Inspiradora
  16: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <motion.div 
        className="max-w-4xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.div className="text-6xl text-red-600 mb-6" variants={fadeInUp}>
          "
        </motion.div>
        
        <motion.h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-relaxed italic" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.h1>
        
        <motion.p className="text-xl text-gray-600" variants={fadeInUp}>
          — {t.heroTitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 17. Con Elementos Flotantes Complejos
  17: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <motion.div className="absolute top-20 left-1/4 w-40 h-40 bg-blue-200 rounded-full blur-2xl opacity-50" animate={{ y: [0, 30, 0] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.div className="absolute bottom-20 right-1/4 w-48 h-48 bg-red-200 rounded-full blur-2xl opacity-40" animate={{ y: [0, -40, 0] }} transition={{ duration: 5, repeat: Infinity }} />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 18. Con Iconos en Columnas
  18: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[Heart, Target, Sparkles].map((Icon, i) => (
            <motion.div key={i} className="flex justify-center" variants={fadeInUp}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
            {t.heroSubtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  )),

  // 19. Fondo Radial Gradiente
  19: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white" style={{
      background: 'radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)'
    }}>
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 20. Foto de Fondo con Overlay
  20: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden h-[500px] flex items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(30, 58, 138, 0.85) 0%, rgba(220, 38, 38, 0.75) 100%), url("https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <motion.div 
        className="max-w-7xl mx-auto text-center text-white"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 21. Estilo Corporativo Limpio
  21: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div className="inline-block mb-6" variants={fadeInUp}>
              <span className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-semibold">
                {language === 'es' ? 'ACERCA DE NOSOTROS' : 'ABOUT US'}
              </span>
            </motion.div>
            
            <motion.h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" variants={fadeInUp}>
              {t.heroTitle}
            </motion.h1>
            <motion.p className="text-lg text-gray-600 leading-relaxed" variants={fadeInUp}>
              {t.heroSubtitle}
            </motion.p>
          </div>
          
          <motion.div className="hidden lg:block" variants={fadeInUp}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-red-600 rounded-3xl transform rotate-6 opacity-60" />
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <Award className="w-24 h-24 text-blue-900 mx-auto" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )),

  // 22. Con Línea de Tiempo Visual
  22: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div className="flex items-center gap-8 flex-col md:flex-row">
          <motion.div className="flex-1" variants={fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.heroSubtitle}
            </p>
          </motion.div>
          
          <motion.div className="flex-1 hidden md:block" variants={fadeInUp}>
            <div className="flex justify-around">
              {[2010, 2015, 2020, 2024].map((year, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center mx-auto mb-2 font-bold">
                    {year % 10}
                  </div>
                  <p className="text-sm text-gray-600">{year}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )),

  // 23. Neon Style
  23: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-pink-500/20" />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.6)' }}
          variants={fadeInUp}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-pink-400">
            {t.heroTitle}
          </span>
        </motion.h1>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  )),

  // 24. Con Testimonial Visual
  24: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <div className="text-center mb-12">
          <motion.h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6" variants={fadeInUp}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto" variants={fadeInUp}>
            {t.heroSubtitle}
          </motion.p>
        </div>
        
        <motion.div className="grid md:grid-cols-3 gap-6" variants={fadeInUp}>
          {[
            { number: language === 'es' ? '500+' : '500+', label: language === 'es' ? 'Proyectos' : 'Projects' },
            { number: language === 'es' ? '10+' : '10+', label: language === 'es' ? 'Años' : 'Years' },
            { number: language === 'es' ? '100%' : '100%', label: language === 'es' ? 'Satisfacción' : 'Satisfaction' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="text-4xl font-bold text-red-600">{stat.number}</div>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )),

  // 25. Ultra Minimalista
  25: memo(({ isVisible, prefersReducedMotion, t, language }) => (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white">
      <motion.div 
        className="max-w-5xl mx-auto relative z-10 text-center space-y-8"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
      >
        <motion.div 
          className="w-1 h-20 bg-red-600 mx-auto rounded-full"
          initial={{ height: 0 }}
          whileInView={{ height: 80 }}
          viewport={{ once: true }}
        />
        
        <motion.h1 className="text-6xl md:text-7xl font-bold text-blue-900 leading-tight" variants={fadeInUp}>
          {t.heroTitle}
        </motion.h1>
        
        <motion.p className="text-lg text-gray-500 max-w-2xl mx-auto" variants={fadeInUp}>
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  ))
};

export default heroVariants;