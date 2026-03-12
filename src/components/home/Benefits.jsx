import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Target, Users, Award, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { useScrollReveal, fadeUp, staggerContainer, cardReveal } from "@/components/animations/useScrollReveal";

const BenefitCard = memo(({ icon: Icon, title, description }) => (
  <motion.div variants={cardReveal} className="h-full">
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-200 h-full flex flex-col">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center mb-6 flex-shrink-0">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-blue-200 leading-relaxed flex-grow">{description}</p>
    </div>
  </motion.div>
));

const Benefits = memo(function Benefits() {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language].benefits, [language]);

  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal();

  const benefits = useMemo(() => [
    { icon: Target, title: t.resultsDriven.title, description: t.resultsDriven.description },
    { icon: Users, title: t.dedicatedTeam.title, description: t.dedicatedTeam.description },
    { icon: Award, title: t.quality.title, description: t.quality.description },
    { icon: TrendingUp, title: t.scalable.title, description: t.scalable.description }
  ], [t]);

  return (
    <section id="benefits" className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">{t.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-blue-200 max-w-2xl mx-auto">{t.subtitle}</motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr"
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default Benefits;