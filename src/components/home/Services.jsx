import React, { memo, useMemo } from "react";
import { Globe, ShoppingCart, Smartphone, Zap, ShieldCheck, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { useScrollReveal } from "@/components/useScrollReveal";

const ServiceCard = memo(({ icon: Icon, title, description, color, index, isVisible }) => (
  <div
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
    }}
  >
    <Card className="group hover:shadow-2xl transition-shadow duration-200 border-0 h-full bg-white">
      <CardContent className="p-8">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-6`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  </div>
));

const Services = memo(function Services() {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language].services, [language]);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal(0.2);
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.1);

  const services = useMemo(() => [
    { icon: Globe, title: t.webDev.title, description: t.webDev.description, color: "from-blue-900 to-blue-700" },
    { icon: ShoppingCart, title: t.ecommerce.title, description: t.ecommerce.description, color: "from-red-600 to-red-700" },
    { icon: Smartphone, title: t.mobile.title, description: t.mobile.description, color: "from-blue-800 to-blue-600" },
    { icon: Zap, title: t.performance.title, description: t.performance.description, color: "from-red-700 to-red-800" },
    { icon: CreditCard, title: t.payments.title, description: t.payments.description, color: "from-purple-600 to-purple-800" },
    { icon: ShieldCheck, title: t.securitySupport.title, description: t.securitySupport.description, color: "from-blue-700 to-blue-500" }
  ], [t]);

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading reveal */}
        <div
          ref={headingRef}
          className="text-center mb-16"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Cards stagger reveal */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} isVisible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Services;