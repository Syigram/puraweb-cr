import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Search, 
  Loader2, 
  CreditCard, 
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { 
  PLAN_LABELS, 
  PAYMENT_MODE_LABELS, 
  PAYMENT_STATUS 
} from "@/components/paymentConstants";

const STATUS_CONFIG = {
  [PAYMENT_STATUS.SUCCEEDED]: {
    label: "Exitoso",
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border-green-200"
  },
  [PAYMENT_STATUS.PENDING]: {
    label: "Pendiente",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 border-yellow-200"
  },
  [PAYMENT_STATUS.FAILED]: {
    label: "Fallido",
    icon: XCircle,
    className: "bg-red-100 text-red-700 border-red-200"
  },
  [PAYMENT_STATUS.CANCELED]: {
    label: "Cancelado",
    icon: AlertCircle,
    className: "bg-gray-100 text-gray-700 border-gray-200"
  }
};

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Payment.list("-created_date", 100);
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(payment => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      payment.customer_email?.toLowerCase().includes(term) ||
      payment.customer_name?.toLowerCase().includes(term) ||
      payment.stripe_payment_intent_id?.toLowerCase().includes(term);
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Historial de Pagos ({payments.length})
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchPayments}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por email, nombre o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value={PAYMENT_STATUS.SUCCEEDED}>Exitosos</SelectItem>
                  <SelectItem value={PAYMENT_STATUS.PENDING}>Pendientes</SelectItem>
                  <SelectItem value={PAYMENT_STATUS.FAILED}>Fallidos</SelectItem>
                  <SelectItem value={PAYMENT_STATUS.CANCELED}>Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="sm:hidden space-y-4">
            {filteredPayments.map((payment) => (
              <PaymentCardMobile 
                key={payment.id} 
                payment={payment}
                onViewDetails={() => setSelectedPayment(payment)}
              />
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="text-gray-500 text-sm">
                      {payment.created_date 
                        ? format(new Date(payment.created_date), "dd MMM yyyy HH:mm", { locale: es })
                        : "N/A"
                      }
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.customer_name || "N/A"}</p>
                        <p className="text-sm text-gray-500">{payment.customer_email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {PLAN_LABELS.es[payment.plan_id] || payment.plan_id || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {PAYMENT_MODE_LABELS.es[payment.payment_mode] || payment.payment_mode || "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">
                      ₡{((payment.amount || 0) / 100).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={payment.status} />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron pagos
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      <PaymentDetailsDialog 
        payment={selectedPayment}
        open={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </>
  );
}

function PaymentStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG[PAYMENT_STATUS.PENDING];
  const Icon = config.icon;
  
  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
}

function PaymentCardMobile({ payment, onViewDetails }) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium">{payment.customer_name || "N/A"}</p>
          <p className="text-sm text-gray-500">{payment.customer_email}</p>
        </div>
        <PaymentStatusBadge status={payment.status} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            {PLAN_LABELS.es[payment.plan_id] || payment.plan_id || "N/A"}
          </Badge>
          <span className="text-sm text-gray-500">
            {PAYMENT_MODE_LABELS.es[payment.payment_mode] || payment.payment_mode}
          </span>
        </div>
        <p className="font-bold text-lg">
          ₡{((payment.amount || 0) / 100).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center justify-between pt-2 border-t">
        <span className="text-sm text-gray-500">
          {payment.created_date 
            ? format(new Date(payment.created_date), "dd/MM/yy HH:mm")
            : "N/A"
          }
        </span>
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          Ver Detalles
        </Button>
      </div>
    </div>
  );
}

function PaymentDetailsDialog({ payment, open, onClose }) {
  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalles del Pago</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Estado</span>
            <PaymentStatusBadge status={payment.status} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Monto</span>
            <span className="font-bold text-xl">
              ₡{((payment.amount || 0) / 100).toLocaleString()}
            </span>
          </div>
          <div className="border-t pt-4 space-y-3">
            <DetailRow label="Cliente" value={payment.customer_name || "N/A"} />
            <DetailRow label="Email" value={payment.customer_email || "N/A"} />
            <DetailRow 
              label="Plan" 
              value={PLAN_LABELS.es[payment.plan_id] || payment.plan_id || "N/A"} 
            />
            <DetailRow 
              label="Tipo de Pago" 
              value={PAYMENT_MODE_LABELS.es[payment.payment_mode] || payment.payment_mode || "N/A"} 
            />
            <DetailRow 
              label="Fecha" 
              value={payment.created_date 
                ? format(new Date(payment.created_date), "dd MMMM yyyy, HH:mm", { locale: es })
                : "N/A"
              } 
            />
          </div>
          {payment.stripe_payment_intent_id && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-1">Stripe Payment Intent ID</p>
              <code className="text-xs bg-gray-100 p-2 rounded block break-all">
                {payment.stripe_payment_intent_id}
              </code>
            </div>
          )}
          {payment.stripe_subscription_id && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Stripe Subscription ID</p>
              <code className="text-xs bg-gray-100 p-2 rounded block break-all">
                {payment.stripe_subscription_id}
              </code>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}