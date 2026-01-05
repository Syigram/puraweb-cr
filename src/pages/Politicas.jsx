import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Shield, Lock, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

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
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export default function Politicas() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'es' ? 'Políticas y Términos | PuraWeb CR' : 'Policies and Terms | PuraWeb CR';
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  const content = {
    es: {
      title: "Políticas y Términos",
      subtitle: "Transparencia total en nuestra relación con nuestros clientes",
      cards: [
        {
          icon: Lock,
          title: "Política de Privacidad",
          description: "Conoce cómo protegemos y manejamos tu información personal. Seguridad de nivel bancario y transparencia total.",
          link: "PoliticasPrivacidad",
          buttonText: "Ver Política de Privacidad",
          color: "green"
        },
        {
          icon: FileText,
          title: "Términos y Condiciones",
          description: "Las reglas claras y justas para usar nuestros servicios. Sin letra pequeña ni sorpresas.",
          link: "TerminosCondiciones",
          buttonText: "Ver Términos y Condiciones",
          color: "blue"
        }
      ],
      commitment: {
        title: "Nuestro Compromiso con la Transparencia",
        items: [
          "Sin costos ocultos ni letra pequeña",
          "Cancela cuando quieras, sin penalización",
          "Tus datos son tuyos, siempre",
          "Respuesta garantizada en 24 horas"
        ]
      }
    },
    en: {
      title: "Policies and Terms",
      subtitle: "Total transparency in our relationship with our clients",
      cards: [
        {
          icon: Lock,
          title: "Privacy Policy",
          description: "Learn how we protect and handle your personal information. Bank-level security and total transparency.",
          link: "PoliticasPrivacidad",
          buttonText: "View Privacy Policy",
          color: "green"
        },
        {
          icon: FileText,
          title: "Terms and Conditions",
          description: "Clear and fair rules for using our services. No fine print or surprises.",
          link: "TerminosCondiciones",
          buttonText: "View Terms and Conditions",
          color: "blue"
        }
      ],
      commitment: {
        title: "Our Commitment to Transparency",
        items: [
          "No hidden costs or fine print",
          "Cancel anytime, no penalty",
          "Your data is yours, always",
          "Guaranteed response within 24 hours"
        ]
      }
    }
  };

  const t = content[language];

  return (
    <>
      <SEO
        title={t.title}
        description={t.subtitle}
        canonical={`https://puraweb.cr/${language === 'es' ? 'politicas' : 'policies'}`}
        language={language}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                {language === 'es' ? 'Transparencia Total' : 'Total Transparency'}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                  {t.title}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Policy Cards */}
        <section className="pb-16 px-6">
          <motion.div
            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {t.cards.map((card, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => navigate(createPageUrl(card.link))}>
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl ${card.color === 'green' ? 'bg-green-100' : 'bg-blue-100'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <card.icon className={`w-8 h-8 ${card.color === 'green' ? 'text-green-600' : 'text-blue-600'}`} />
                    </div>
                    <CardTitle className="text-2xl mb-2">{card.title}</CardTitle>
                    <CardDescription className="text-base">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className={`w-full ${card.color === 'green' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(createPageUrl(card.link));
                      }}
                    >
                      {card.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Commitment Section */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{t.commitment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {t.commitment.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <div className="mt-8 p-6 bg-white rounded-xl border shadow-sm text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {language === 'es' ? '¿Preguntas sobre nuestras políticas?' : 'Questions about our policies?'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'es' 
                  ? 'Estamos aquí para responder todas tus dudas de forma clara y transparente.'
                  : 'We are here to answer all your questions clearly and transparently.'}
              </p>
              <a 
                href="mailto:info@puraweb.cr" 
                className="text-blue-600 hover:text-blue-800 font-medium underline text-lg"
              >
                info@puraweb.cr
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}