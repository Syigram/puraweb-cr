import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Loader2, UserCircle, CreditCard, Receipt } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import UserProfile from "@/components/user/UserProfile";
import UserSubscriptions from "@/components/user/UserSubscriptions";
import UserTransactions from "@/components/user/UserTransactions";
import UserDashboardSummary from "@/components/user/UserDashboardSummary";

const translations = {
  es: {
    title: "Mi Panel",
    subtitle: "Gestiona tu perfil, suscripciones y transacciones.",
    tabs: {
      profile: "Perfil",
      subscriptions: "Suscripciones",
      transactions: "Transacciones"
    }
  },
  en: {
    title: "My Dashboard",
    subtitle: "Manage your profile, subscriptions and transactions.",
    tabs: {
      profile: "Profile",
      subscriptions: "Subscriptions",
      transactions: "Transactions"
    }
  }
};

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        base44.auth.redirectToLogin(createPageUrl("UserDashboard"));
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {t.title}
              </h1>
              <p className="text-blue-200 mt-1">{t.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Summary */}
        <UserDashboardSummary user={user} />

        {/* Tabs */}
        <Tabs defaultValue="subscriptions" className="space-y-6">
          <TabsList className="bg-white border-0 shadow-lg w-full p-1.5 rounded-xl grid grid-cols-3 gap-1 h-auto">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <UserCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.profile}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="subscriptions" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.subscriptions}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tabs.transactions}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile user={user} onUserUpdate={setUser} />
          </TabsContent>

          <TabsContent value="subscriptions">
            <UserSubscriptions user={user} />
          </TabsContent>

          <TabsContent value="transactions">
            <UserTransactions user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}