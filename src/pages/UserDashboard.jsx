import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Loader2 } from "lucide-react";
import UserProfile from "@/components/user/UserProfile";
import UserSubscriptions from "@/components/user/UserSubscriptions";
import UserTransactions from "@/components/user/UserTransactions";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, [navigate]);

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mi Panel
              </h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white border shadow-sm w-full sm:w-auto grid grid-cols-3 sm:flex">
            <TabsTrigger value="profile" className="text-sm">
              Perfil
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="text-sm">
              Suscripciones
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-sm">
              Transacciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile user={user} onUpdate={setUser} />
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