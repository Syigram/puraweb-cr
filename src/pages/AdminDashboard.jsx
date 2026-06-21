import React, { useEffect, useState, lazy, Suspense } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Loader2, BarChart3, Users, CreditCard, Mail, HelpCircle, BookOpen, Settings, Tags } from "lucide-react";

// Lazy load admin components
const AdminStats = lazy(() => import("@/components/admin/AdminStats"));
const AdminUsers = lazy(() => import("@/components/admin/AdminUsers"));
const AdminPayments = lazy(() => import("@/components/admin/AdminPayments"));
const AdminTickets = lazy(() => import("@/components/admin/AdminTickets"));
const AdminContactMessages = lazy(() => import("@/components/admin/AdminContactMessages"));
const AdminKnowledgeBase = lazy(() => import("@/components/admin/AdminKnowledgeBase"));
const AdminSiteSettings = lazy(() => import("@/components/admin/AdminSiteSettings"));
const AdminPlanConfig = lazy(() => import("@/components/admin/AdminPlanConfig"));

const TabLoader = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
  </div>
);

const ADMIN_TAB_KEY = "adminDashboardTab";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem(ADMIN_TAB_KEY) || "stats";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        
        if (currentUser.role === "admin") {
          setAuthorized(true);
        } else {
          navigate(createPageUrl("Home"));
        }
      } catch (error) {
        navigate(createPageUrl("Home"));
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem(ADMIN_TAB_KEY, value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Panel de Administración
              </h1>
              <p className="text-blue-200 mt-1">
                Gestiona usuarios, pagos, mensajes y la base de conocimiento del asistente.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="bg-white border-0 shadow-lg w-full p-1.5 rounded-xl grid grid-cols-4 sm:grid-cols-8 gap-1 h-auto">
            <TabsTrigger 
              value="stats" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Estadísticas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Usuarios</span>
            </TabsTrigger>
            <TabsTrigger 
              value="payments" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Pagos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tickets" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Tickets</span>
            </TabsTrigger>
            <TabsTrigger 
              value="messages" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Mensajes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="knowledge" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Knowledge Base</span>
            </TabsTrigger>
            <TabsTrigger 
              value="plans" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Tags className="w-4 h-4" />
              <span className="hidden sm:inline">Planes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Sitio</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <Suspense fallback={<TabLoader />}>
              <AdminStats />
            </Suspense>
          </TabsContent>

          <TabsContent value="users">
            <Suspense fallback={<TabLoader />}>
              <AdminUsers />
            </Suspense>
          </TabsContent>

          <TabsContent value="payments">
            <Suspense fallback={<TabLoader />}>
              <AdminPayments />
            </Suspense>
          </TabsContent>

          <TabsContent value="tickets">
            <Suspense fallback={<TabLoader />}>
              <AdminTickets />
            </Suspense>
          </TabsContent>

          <TabsContent value="messages">
            <Suspense fallback={<TabLoader />}>
              <AdminContactMessages />
            </Suspense>
          </TabsContent>

          <TabsContent value="knowledge">
            <Suspense fallback={<TabLoader />}>
              <AdminKnowledgeBase />
            </Suspense>
          </TabsContent>

          <TabsContent value="plans">
            <Suspense fallback={<TabLoader />}>
              <AdminPlanConfig />
            </Suspense>
          </TabsContent>

          <TabsContent value="settings">
            <Suspense fallback={<TabLoader />}>
              <AdminSiteSettings />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}