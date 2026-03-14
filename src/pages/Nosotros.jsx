import React, { useEffect, memo, useMemo, useCallback, useState } from "react";
import { 
  Sparkles, Target, Eye, 
  CheckCircle2, ArrowRight, Heart, Rocket, Users, Award, X
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import HeroSelector from "@/components/home/HeroSelector";
import heroVariants from "@/components/home/NosotrosHeroVariants";

// Animation variants matching Servicios page
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

const Nosotros = memo(function Nosotros() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = useMemo(() => translations[language].about, [language]);
  // Memoize manifesto translations to avoid re-accessing on each render
  const manifestoT = useMemo(() => translations[language].manifesto, [language]);
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = `${t.title} - PuraWeb CR`;
    window.scrollTo(0, 0);
    // Delay animation start to ensure smooth initial render
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, [t.title]);

  const handleContactClick = useCallback(() => {
    navigate(createPageUrl("Home") + "#contact");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section with animations matching Servicios */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Static Background Elements - Optimized for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-red-400/15 to-orange-400/15 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <motion.div 
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        {/* Static Geometric Shapes - Optimized */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div 
            className="absolute top-32 right-1/4 w-32 h-32 border-4 border-blue-900/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div 
            className="absolute bottom-40 left-1/4 w-24 h-24 border-4 border-red-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-900/10 to-transparent rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>

        <motion.div 
          className="max-w-7xl mx-auto relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
        >
          <div className="text-center">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-blue-100 text-blue-900 px-6 py-2 text-sm">
                <Heart className="w-4 h-4 mr-2" />
                {language === 'es' ? 'Hecho con pasión en Costa Rica' : 'Made with passion in Costa Rica'}
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                {t.heroTitle}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {t.heroSubtitle}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Team Image Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6901cf191d3736d23a1ebf19/0f67e6504_tec5.jpg" 
                alt="Equipo de trabajo colaborando"
                className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-2xl"
                loading="lazy"
              />
            </div>
            
            <div className="space-y-6">
              <Badge className="bg-blue-100 text-blue-900 px-6 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                {language === 'es' ? 'Nuestro Equipo' : 'Our Team'}
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                {language === 'es' ? 'Profesionales Comprometidos con tu Éxito' : 'Professionals Committed to Your Success'}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {language === 'es' 
                  ? 'Mi nombre es Alejandro González, fundador y líder técnico de este equipo. Graduado de Ingeniería en Computadores en el TEC y con más de 10 años en la industria. Mi compromiso es garantizar la seguridad de sus datos y la estabilidad de su negocio. Con nosotros, su infraestructura digital está en manos expertas, permitiéndole a usted enfocarse en lo que mejor sabe hacer: crecer su empresa.'
                  : 'My name is Alejandro González, founder and technical leader of this team. Graduated in Computer Engineering from TEC with over 10 years in the industry. My commitment is to ensure the security of your data and the stability of your business. With us, your digital infrastructure is in expert hands, allowing you to focus on what you do best: growing your company.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Card className="h-full border-2 border-blue-100 hover:border-blue-200 transition-all hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {t.missionTitle}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {t.missionText}
                  </p>
                </CardContent>
                </Card>
                </div>

                <div>
                <Card className="h-full border-2 border-red-100 hover:border-red-200 transition-all hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {t.visionTitle}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {t.visionText}
                  </p>
                </CardContent>
                </Card>
                </div>
                </div>
                </div>
                </section>

                {/* Core Values */}
                <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                {t.valuesTitle}
                </span>
                </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                {t.values.map((value, index) => (
                <div key={index}>
                <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-blue-200">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                        </div>
                        </div>
                        </CardContent>
                        </Card>
                        </div>
                        ))}
                        </div>
                        </div>
                        </section>

                        {/* Against Section - What we fight */}
                        <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
                        <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                        {manifestoT.againstTitle}
                        </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {manifestoT.againstSubtitle}
                        </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {manifestoT.against.map((item, index) => (
                        <div key={index}>
                <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-red-400 group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-red-700/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700/40 transition-all">
                    <X className="w-7 h-7 text-red-700" />
                  </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    </CardContent>
                    </Card>
                    </div>
                    ))}
                    </div>
                    </div>
                    </section>

                    {/* Process */}
                    <section className="py-20 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                    {t.processTitle}
                    </span>
                    </h2>
                    <p className="text-xl text-gray-600">{t.processSubtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.processSteps.map((step, index) => (
                    <div key={index} className="relative">
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="text-6xl font-bold text-blue-100 mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                {index < t.processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-blue-200" />
                </div>
                )}
                </div>
                ))}
                </div>

                {/* CTA to Guide */}
                <div className="mt-16 text-center">
                  <p className="text-lg text-gray-600 mb-4">
                    {language === 'es' 
                      ? '¿Querés conocer en detalle cómo es colaborar con PuraWeb CR?' 
                      : 'Want to learn more about what it\'s like to work with PuraWeb CR?'}
                  </p>
                  <Button
                    onClick={() => navigate(createPageUrl("GuiaBienvenida"))}
                    variant="outline"
                    className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50"
                  >
                    {language === 'es' ? 'Leer nuestra Guía' : 'Read our Guide'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                </div>
                </section>

                {/* Guarantees */}
                <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100 px-6 py-2 text-sm cursor-default">
                <Award className="w-4 h-4 mr-2" />
                {language === 'es' ? 'Garantizado' : 'Guaranteed'}
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                {t.guaranteeTitle}
                </span>
                </h2>
                </div>

                <div>
            <Card className="border-2 border-green-100">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {t.guarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 leading-relaxed">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </div>
            </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-6 sm:p-12 shadow-2xl text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="relative z-10">
              <Rocket className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t.ctaTitle}
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                {t.ctaSubtitle}
              </p>
              <Button
                onClick={handleContactClick}
                className="bg-white text-blue-900 hover:bg-gray-100 w-full sm:w-auto px-8 py-6 text-lg font-semibold shadow-xl"
              >
                {t.ctaButton}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Nosotros;