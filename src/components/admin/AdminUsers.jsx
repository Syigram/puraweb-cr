import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Loader2, 
  MoreVertical, 
  Mail, 
  Shield, 
  User,
  Calendar,
  CreditCard
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PLAN_LABELS } from "@/components/paymentConstants";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, paymentsData] = await Promise.all([
          base44.entities.User.list(),
          base44.entities.Payment.list()
        ]);
        setUsers(usersData);
        setPayments(paymentsData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getUserPayments = (email) => {
    return payments.filter(p => p.customer_email === email);
  };

  const getUserActivePlan = (email) => {
    const userPayments = getUserPayments(email);
    const successfulPayment = userPayments.find(p => p.status === "succeeded");
    return successfulPayment?.plan_id || null;
  };

  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5" />
            Gestión de Usuarios ({users.length})
          </CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="sm:hidden space-y-4">
          {filteredUsers.map((user) => (
            <UserCardMobile 
              key={user.id} 
              user={user} 
              activePlan={getUserActivePlan(user.email)}
              paymentsCount={getUserPayments(user.email).length}
            />
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Plan Activo</TableHead>
                <TableHead>Pagos</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.full_name || "Sin nombre"}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.role === "admin" ? "default" : "secondary"}
                      className={user.role === "admin" ? "bg-blue-900" : ""}
                    >
                      {user.role === "admin" ? (
                        <><Shield className="w-3 h-3 mr-1" /> Admin</>
                      ) : (
                        <><User className="w-3 h-3 mr-1" /> Usuario</>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getUserActivePlan(user.email) ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {PLAN_LABELS.es[getUserActivePlan(user.email)] || getUserActivePlan(user.email)}
                      </Badge>
                    ) : (
                      <span className="text-gray-400 text-sm">Sin plan</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {getUserPayments(user.email).length} transacciones
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {user.created_date 
                      ? format(new Date(user.created_date), "dd MMM yyyy", { locale: es })
                      : "N/A"
                    }
                  </TableCell>
                  <TableCell>
                    <UserActions user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron usuarios
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function UserCardMobile({ user, activePlan, paymentsCount }) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium">{user.full_name || "Sin nombre"}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <UserActions user={user} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={user.role === "admin" ? "default" : "secondary"}
          className={user.role === "admin" ? "bg-blue-900" : ""}
        >
          {user.role === "admin" ? "Admin" : "Usuario"}
        </Badge>
        {activePlan && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {PLAN_LABELS.es[activePlan] || activePlan}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <CreditCard className="w-4 h-4" />
          {paymentsCount} pagos
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {user.created_date 
            ? format(new Date(user.created_date), "dd/MM/yy")
            : "N/A"
          }
        </span>
      </div>
    </div>
  );
}

function UserActions({ user }) {
  const handleSendEmail = () => {
    window.location.href = `mailto:${user.email}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleSendEmail}>
          <Mail className="w-4 h-4 mr-2" />
          Enviar Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}