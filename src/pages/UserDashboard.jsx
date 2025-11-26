import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  CreditCard, 
  Box, 
  Loader2, 
  LogOut, 
  Calendar, 
  CheckCircle2, 
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PLAN_LABELS } from "@/components/paymentConstants";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // Profile state
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await base44.auth.me();
        if (!currentUser) {
          navigate(createPageUrl("Home"));
          return;
        }
        setUser(currentUser);
        setFullName(currentUser.full_name || "");

        // Fetch User Data
        const [subs, pays] = await Promise.all([
            base44.entities.Subscription.list({ user_id: currentUser.id }),
            base44.entities.Payment.list({ user_id: currentUser.id }, "-created_date")
        ]);

        setSubscriptions(subs);
        setPayments(pays);

      } catch (error) {
        console.error(error);
        navigate(createPageUrl("Home"));
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await base44.auth.updateMe({ full_name: fullName });
      alert("Perfil actualizado: Tu nombre ha sido guardado.");
    } catch (error) {
      alert("Error: No se pudo actualizar el perfil.");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await base44.auth.logout(createPageUrl("Home"));
  };

  const handleCancelSubscription = async (subscriptionId) => {
    if (!confirm("¿Estás seguro de que deseas cancelar esta suscripción? Perderás el acceso al final del periodo actual.")) return;
    
    setUpdating(true);
    try {
        const res = await base44.functions.invoke("stripe", { 
            action: "cancelSubscription", 
            subscriptionId 
        });

        if (res.data.error) throw new Error(res.data.error);

        alert("Suscripción cancelada: Se ha programado la cancelación.");
        
        // Refresh list
        const subs = await base44.entities.Subscription.list({ user_id: user.id });
        setSubscriptions(subs);

    } catch (error) {
        alert("Error: " + (error.message || "No se pudo cancelar."));
    } finally {
        setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi Cuenta</h1>
            <p className="text-gray-600">Gestiona tus proyectos y suscripciones</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-white p-1 border shadow-sm rounded-lg grid grid-cols-3 h-auto">
            <TabsTrigger value="projects" className="py-2">
                <Box className="w-4 h-4 mr-2" />
                Suscripciones
            </TabsTrigger>
            <TabsTrigger value="history" className="py-2">
                <CreditCard className="w-4 h-4 mr-2" />
                Historial
            </TabsTrigger>
            <TabsTrigger value="profile" className="py-2">
                <User className="w-4 h-4 mr-2" />
                Perfil
            </TabsTrigger>
          </TabsList>

          {/* --- SUBSCRIPTIONS TAB --- */}
          <TabsContent value="projects">
            <div className="grid gap-6">
                {subscriptions.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Box className="w-6 h-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No tienes suscripciones activas</h3>
                            <p className="text-gray-500 mb-6">Comienza un nuevo proyecto web con nosotros.</p>
                            <Button onClick={() => navigate(createPageUrl("Planes"))}>
                                Ver Planes
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    subscriptions.map((sub) => (
                        <Card key={sub.id} className="overflow-hidden">
                            <div className={`h-2 w-full ${sub.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-xl mb-1">
                                        {sub.project_name || "Sin nombre"}
                                    </CardTitle>
                                    <CardDescription>
                                        {PLAN_LABELS.es[sub.plan_id] || sub.plan_id}
                                    </CardDescription>
                                </div>
                                <StatusBadge status={sub.status} />
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t">
                                    <div className="text-sm text-gray-500">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Renovación: {sub.current_period_end ? format(new Date(sub.current_period_end), "d 'de' MMM, yyyy", { locale: es }) : 'N/A'}</span>
                                        </div>
                                        <div className="text-xs opacity-70">
                                            ID: {sub.stripe_subscription_id}
                                        </div>
                                    </div>
                                    
                                    {sub.status === 'active' && (
                                        <Button 
                                            variant="destructive" 
                                            size="sm" 
                                            disabled={updating}
                                            onClick={() => handleCancelSubscription(sub.stripe_subscription_id)}
                                        >
                                            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cancelar Suscripción"}
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
          </TabsContent>

          {/* --- HISTORY TAB --- */}
          <TabsContent value="history">
            <Card>
                <CardHeader>
                    <CardTitle>Historial de Transacciones</CardTitle>
                    <CardDescription>Todos tus pagos y facturas</CardDescription>
                </CardHeader>
                <CardContent>
                    {payments.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No hay pagos registrados.</p>
                    ) : (
                        <div className="space-y-4">
                            {payments.map((payment) => (
                                <div key={payment.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${
                                            payment.status === 'succeeded' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {payment.status === 'succeeded' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {payment.project_name || "Pago"}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {format(new Date(payment.created_date), "d MMM yyyy, HH:mm", { locale: es })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">
                                            ₡{((payment.amount || 0) / 100).toLocaleString()}
                                        </p>
                                        <span className="text-xs text-gray-500 uppercase">
                                            {payment.payment_mode}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
          </TabsContent>

          {/* --- PROFILE TAB --- */}
          <TabsContent value="profile">
            <Card>
                <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tus datos básicos</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" value={user?.email || ""} disabled className="bg-gray-100" />
                            <p className="text-xs text-gray-500">El correo no se puede cambiar.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nombre Completo</Label>
                            <Input 
                                id="fullName" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)} 
                            />
                        </div>
                        <Button type="submit" disabled={updating}>
                            {updating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Guardar Cambios
                        </Button>
                    </form>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
    const styles = {
        active: "bg-green-100 text-green-800 border-green-200",
        canceled: "bg-red-100 text-red-800 border-red-200",
        past_due: "bg-yellow-100 text-yellow-800 border-yellow-200",
        incomplete: "bg-gray-100 text-gray-800 border-gray-200"
    };

    const labels = {
        active: "Activa",
        canceled: "Cancelada",
        past_due: "Pago Pendiente",
        incomplete: "Incompleta"
    };

    return (
        <Badge variant="outline" className={styles[status] || styles.incomplete}>
            {labels[status] || status}
        </Badge>
    );
}