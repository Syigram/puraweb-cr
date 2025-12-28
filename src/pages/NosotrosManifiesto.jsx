import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, Zap, Users, TrendingUp, Target, AlertTriangle, 
  CheckCircle2, ArrowRight, Flame, Lock, Clock, Code2, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function NosotrosManifiesto() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language].manifesto;

  useEffect(() => {
    document.title = `${t.title} - PuraWeb CR`;
    window.scrollTo(0, 0);
  }, [t.title]);

  const handleContactClick = () => {
    navigate(createPageUrl("Home") + "#contact");
  };

  const pillarIcons = [Shield, Zap, Target, Users];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Bold & Dramatic */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-blue-950/20" />
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-red-600/20 text-red-400 border border-red-600/30 px-6 py-2 text-sm">
              <Flame className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Declaración de Principios' : 'Declaration of Principles'}
            </Badge>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                {t.heroTitle}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Intro */}
      <section className="py-12 px-6 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                {t.manifestoTitle}
              </span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              {t.manifestoIntro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* The 4 Pillars */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {t.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 hover:border-red-600/50 transition-all group">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {pillar.title}
                          </h3>
                          <p className="text-red-400 text-sm font-semibold">
                            {pillar.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Against Section - What we fight */}
      <section className="py-20 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950 opacity-50" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-red-600/20 text-red-400 border border-red-600/30 px-6 py-2 text-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Nuestra Guerra' : 'Our War'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {t.againstTitle}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.againstSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.against.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-gradient-to-br from-red-950/30 to-black border-2 border-red-900/30 hover:border-red-600 transition-all group">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/30 transition-all">
                      <X className="w-7 h-7 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {t.promiseTitle}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-blue-950/30 to-black border-2 border-blue-800/30">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-6">
                  {t.promises.map((promise, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300 leading-relaxed text-lg">
                        {promise}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {t.whyUsTitle}
            </h2>
            <p className="text-xl text-gray-400">
              {t.whyUsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.whyReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 hover:border-blue-600/50 transition-all">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Powerful */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-3xl blur-xl" />
            
            <Card className="relative bg-gradient-to-br from-red-950/50 via-gray-900 to-blue-950/50 border-2 border-red-600/30 overflow-hidden">
              <CardContent className="p-12 md:p-16 text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <Flame className="w-20 h-20 text-red-500 mx-auto mb-6" />
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {t.ctaTitle}
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    {t.ctaSubtitle}
                  </p>
                  <Button
                    onClick={handleContactClick}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-red-900/50 transition-all"
                  >
                    {t.ctaButton}
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}