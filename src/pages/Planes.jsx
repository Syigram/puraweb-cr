import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import Pricing from "@/components/home/Pricing";
import PlanComparisonTable from "@/components/pricing/PlanComparisonTable";

export default function Planes() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    document.title = "Planes - PuraWeb CR";
  }, []);

  const handleContactClick = () => {
    navigate(createPageUrl("Home") + "#contact");
  };

  return (
    <div className="pt-20">
      <Pricing />
      
      {/* CTA Section */}
      <div className="pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {language === 'es' 
                        ? '¿Necesita asesoría personalizada?' 
                        : 'Need personalized advice?'}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg">
                      {language === 'es'
                        ? 'Nuestro equipo está listo para ayudarle a elegir el plan perfecto para su negocio.'
                        : 'Our team is ready to help you choose the perfect plan for your business.'}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <Button
                      onClick={handleContactClick}
                      className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      {language === 'es' ? 'Contáctanos' : 'Contact Us'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <PlanComparisonTable />
    </div>
  );
}