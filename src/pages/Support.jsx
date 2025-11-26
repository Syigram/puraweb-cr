import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, MessageSquare, Ticket, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import FAQSection from "@/components/support/FAQSection";
import SupportContactForm from "@/components/support/SupportContactForm";
import UserTickets from "@/components/support/UserTickets";

const translations = {
  es: {
    title: "Centro de Soporte",
    subtitle: "Estamos aquí para ayudarte. Encuentra respuestas o contáctanos.",
    tabs: {
      faq: "Preguntas Frecuentes",
      contact: "Contactar",
      tickets: "Mis Tickets"
    }
  },
  en: {
    title: "Support Center",
    subtitle: "We're here to help. Find answers or contact us.",
    tabs: {
      faq: "FAQ",
      contact: "Contact",
      tickets: "My Tickets"
    }
  }
};

export default function Support() {
  const { language } = useLanguage();
  const t = translations[language];
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <HelpCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
              <p className="text-blue-200 mt-1">{t.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="bg-white border-0 shadow-lg w-full p-1.5 rounded-xl grid grid-cols-3 gap-1 h-auto">
            <TabsTrigger
              value="faq"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.faq}</span>
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.contact}</span>
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.tickets}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <FAQSection />
          </TabsContent>

          <TabsContent value="contact">
            <SupportContactForm user={user} />
          </TabsContent>

          <TabsContent value="tickets">
            {user ? (
              <UserTickets user={user} />
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <Ticket className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  {language === 'es' 
                    ? 'Inicia sesión para ver tus tickets' 
                    : 'Log in to view your tickets'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}