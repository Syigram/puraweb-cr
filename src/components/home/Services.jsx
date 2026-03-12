import React, { memo, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, ShoppingCart, Smartphone, Zap, ShieldCheck, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { useScrollReveal, fadeUp, staggerContainer, cardReveal } from "@/components/animations/useScrollReveal";

const ServiceCard = memo(({ icon: Icon, title, description, color }) => (
  <motion.div variants={cardReveal}>
    <Card className="service-card group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-white">
      <CardContent className="p-8">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-6`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
));

function equalizeCardHeights(container) {
  if (!container) return;
  const cards = container.querySelectorAll('.service-card');
  // Reset heights first
  cards.forEach(card => { card.style.minHeight = ''; });
  // Measure tallest
  let tallest = 0;
  cards.forEach(card => {
    tallest = Math.max(tallest, card.offsetHeight);
  });
  // Apply tallest to all
  if (tallest > 0) {
    cards.forEach(card => { card.style.minHeight = tallest + 'px'; });
  }
}

const Services = memo(function Services() {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language].services, [language]);
  const gridContainerRef = useRef(null);

  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal();

  const services = useMemo(() => [
    { icon: Globe, title: t.webDev.title, description: t.webDev.description, color: "from-blue-900 to-blue-700" },
    { icon: ShoppingCart, title: t.ecommerce.title, description: t.ecommerce.description, color: "from-red-600 to-red-700" },
    { icon: Smartphone, title: t.mobile.title, description: t.mobile.description, color: "from-blue-800 to-blue-600" },
    { icon: Zap, title: t.performance.title, description: t.performance.description, color: "from-red-700 to-red-800" },
    { icon: CreditCard, title: t.payments.title, description: t.payments.description, color: "from-purple-600 to-purple-800" },
    { icon: ShieldCheck, title: t.securitySupport.title, description: t.securitySupport.description, color: "from-blue-700 to-blue-500" }
  ], [t]);

  // Equalize after render and on resize/language change
  useEffect(() => {
    const container = gridContainerRef.current;
    // Delay to let framer-motion animations settle
    const timeout = setTimeout(() => equalizeCardHeights(container), 600);

    const handleResize = () => equalizeCardHeights(container);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [language]);

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              {t.title}
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={(el) => { gridRef.current = el; gridContainerRef.current = el; }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer(0.09)}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default Services;