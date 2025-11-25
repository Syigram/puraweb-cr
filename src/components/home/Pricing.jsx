import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Pricing({ onGetStarted }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language].pricing;
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (planName) => {
    navigate(createPageUrl(`Checkout?plan=${encodeURIComponent(planName)}`));
  };

  const handleCardClick = (planName) => {
    setSelectedPlan(planName);
  };

  const plans = t.plans || [];

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />

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
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.recommended ? "md:-mt-4" : ""}
            >
              <Card
                onClick={() => handleCardClick(plan.name)}
                className={`relative h-full transition-all duration-300 cursor-pointer ${
                  selectedPlan === plan.name
                    ? "border-2 border-blue-600 shadow-2xl scale-105 ring-4 ring-blue-100"
                    : plan.recommended
                    ? "border-2 border-red-600 shadow-2xl scale-105"
                    : "border-gray-200 hover:shadow-xl hover:scale-102"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1 text-sm flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {t.mostPopular}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  {plan.description && (
                    <p className="text-gray-600 text-sm mb-6">
                      {plan.description}
                    </p>
                  )}
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">{t.perMonth}</span>
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.recommended
                            ? "bg-red-100"
                            : "bg-blue-100"
                        }`}>
                          <Check className={`w-3 h-3 ${
                            plan.recommended ? "text-red-600" : "text-blue-900"
                          }`} />
                        </div>
                        <span className="text-gray-700 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanSelect(plan.name)}
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
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            {t.additionalInfo}
          </p>
        </motion.div>
      </div>
    </section>
  );
}