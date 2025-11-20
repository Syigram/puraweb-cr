import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Award, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";

export default function Benefits() {
  const { language } = useLanguage();
  const t = translations[language].benefits;

  const benefits = [
    {
      icon: Target,
      title: t.resultsDriven.title,
      description: t.resultsDriven.description
    },
    {
      icon: Users,
      title: t.dedicatedTeam.title,
      description: t.dedicatedTeam.description
    },
    {
      icon: Award,
      title: t.quality.title,
      description: t.quality.description
    },
    {
      icon: TrendingUp,
      title: t.scalable.title,
      description: t.scalable.description
    }
  ];
  return (
    <section id="benefits" className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-blue-200 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              5+
            </div>
            <div className="text-blue-200">{t.years}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              150+
            </div>
            <div className="text-blue-200">{t.clients}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              200+
            </div>
            <div className="text-blue-200">{t.projects}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-blue-200">{t.satisfaction}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}