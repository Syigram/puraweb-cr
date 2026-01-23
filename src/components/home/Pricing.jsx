import React, { useState, memo, useMemo, useCallback, useEffect } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, useReducedMotion } from "framer-motion";

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

const PricingCard = memo(({ plan, isSelected, onSelect, onNavigate, mostPopularText, hasUserSelected }) => {
  const isHighlighted = isSelected || (plan.recommended && !hasUserSelected);
  
  return (
    <div className="transition-all duration-300 ease-out" style={{ marginTop: isHighlighted ? '-16px' : '0' }}>
      <Card
        onClick={() => onSelect(plan.name)}
        className={`relative h-full cursor-pointer transition-all duration-300 ease-out ${
          isHighlighted
            ? "border-2 border-red-600 shadow-2xl"
            : "border-gray-200 hover:shadow-xl"
        }`}
        style={{ transform: isHighlighted ? 'scale(1.05)' : 'scale(1)' }}
      >
      {plan.recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1 text-sm flex items-center gap-1">
            <Star className="w-3 h-3" />
            {mostPopularText}
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-8 pt-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        {plan.description && (
          <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
        )}
        <div className="flex flex-col items-center gap-1">
          {plan.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₡{plan.originalPrice}
            </span>
          )}
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              ₡{plan.price}
            </span>
            <span className="text-gray-600">/mes</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-8">
        <ul className="space-y-4 mb-8">
          {plan.features?.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                plan.recommended ? "bg-red-100" : "bg-blue-100"
              }`}>
                <Check className={`w-3 h-3 ${plan.recommended ? "text-red-600" : "text-blue-900"}`} />
              </div>
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(plan.id);
          }}
          className={`w-full text-lg py-6 ${
            plan.recommended
              ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
              : "bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white"
          }`}
        >
          {plan.cta_text || "Get Started"}
        </Button>
      </CardContent>
    </Card>
  </div>
);
});

const Pricing = memo(function Pricing({ onGetStarted, compact = false }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = useMemo(() => translations[language].pricing, [language]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handlePlanSelect = useCallback((planId) => {
    navigate(createPageUrl(`Checkout?plan=${planId}`));
  }, [navigate]);

  const handleCardClick = useCallback((planName) => {
    setSelectedPlan(planName);
  }, []);

  const plans = t.plans || [];

  return (
    <section id="pricing" className={`${compact ? 'pt-20 pb-8' : 'pt-20 pb-8'} bg-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible && !prefersReducedMotion ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              {t.title}
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isSelected={selectedPlan === plan.name}
              onSelect={handleCardClick}
              onNavigate={handlePlanSelect}
              mostPopularText={t.mostPopular}
              hasUserSelected={selectedPlan !== null}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 font-medium mb-4">{t.additionalInfo}</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 max-w-4xl mx-auto">
            {t.commonFeatures?.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-gray-600 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Pricing;