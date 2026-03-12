import React, { useState, memo, useMemo, useCallback } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUp, staggerContainer, cardReveal } from "@/components/animations/useScrollReveal";

const PricingCard = memo(({ plan, isSelected, onSelect, onNavigate, mostPopularText, hasUserSelected, promoLabel }) => {
  const isHighlighted = isSelected || (plan.recommended && !hasUserSelected);
  
  return (
    <div className="h-full transition-all duration-300 ease-out" style={{ marginTop: isHighlighted ? '-16px' : '0' }}>
      <Card
        onClick={() => onSelect(plan.name)}
        className={`relative h-full cursor-pointer transition-all duration-300 ease-out ${
          isHighlighted
            ? "border-2 border-red-600 shadow-2xl"
            : "border-gray-200 hover:shadow-xl"
        }`}
        style={{ transform: isHighlighted ? 'scale(1.05)' : 'scale(1)', minHeight: '460px' }}
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
            <div className="flex items-center gap-2">
              <span className="text-xl text-gray-400 line-through">₡{plan.originalPrice}</span>
              <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                {promoLabel}
              </Badge>
            </div>
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

  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal();
  const { ref: featuresRef, isInView: featuresInView } = useScrollReveal();

  const handlePlanSelect = useCallback((planId) => {
    navigate(createPageUrl(`Checkout?plan=${planId}`));
  }, [navigate]);

  const handleCardClick = useCallback((planName) => {
    setSelectedPlan(planName);
  }, []);

  const plans = t.plans || [];

  return (
    <section id="pricing" className="pt-20 pb-8 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6">

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
          <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={gridRef}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={cardReveal} className="h-full">
              <PricingCard
                plan={plan}
                isSelected={selectedPlan === plan.name}
                onSelect={handleCardClick}
                onNavigate={handlePlanSelect}
                mostPopularText={t.mostPopular}
                hasUserSelected={selectedPlan !== null}
                promoLabel={t.promoLabel}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Common features */}
        <motion.div
          ref={featuresRef}
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
      </div>
    </section>
  );
});

export default Pricing;