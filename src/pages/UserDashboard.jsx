import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import UserProfile from "@/components/user/UserProfile";
import UserSubscriptions from "@/components/user/UserSubscriptions";
import UserPaymentHistory from "@/components/user/UserPaymentHistory";

const translations = {
  es: {
    title: "Mi Panel",
    subtitle: "Gestiona tu perfil, suscripciones y pagos.",
    tabs: {
      profile: "Perfil",
      subscriptions: "Suscripciones",
      payments: "Historial"
    }
  },
  en: {
    title: "My Dashboard",
    subtitle: "Manage your profile, subscriptions and payments.",
    tabs: {
      profile: "Profile",
      subscriptions: "Subscriptions",
      payments: "History"
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t.title}
              </h1>
              <p className="text-gray-600 text-sm">
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="subscriptions" className="space-y-6">
          <TabsList className="bg-white border shadow-sm w-full grid grid-cols-3">
            <TabsTrigger value="profile" className="text-sm">
              {t.tabs.profile}
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="text-sm">
              {t.tabs.subscriptions}
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-sm">
              {t.tabs.payments}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile user={user} onUserUpdate={setUser} />
          </TabsContent>

          <TabsContent value="subscriptions">
            <UserSubscriptions user={user} />
          </TabsContent>

          <TabsContent value="payments">
            <UserPaymentHistory user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}