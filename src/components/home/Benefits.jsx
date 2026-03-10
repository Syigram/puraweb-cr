import React, { memo, useMemo } from "react";
import { Target, Users, Award, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { useScrollReveal } from "@/components/useScrollReveal";

const BenefitCard = memo(({ icon: Icon, title, description, index, isVisible }) => (
  <div
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
    }}
  >
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-200">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-blue-200 leading-relaxed">{description}</p>
    </div>
  </div>
));

const Benefits = memo(function Benefits() {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language].benefits, [language]);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal(0.2);
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.1);

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
        <div
          ref={headingRef}
          className="text-center mb-16"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} isVisible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Benefits;