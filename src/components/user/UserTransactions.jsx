import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Loader2, 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  Receipt
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PLAN_LABELS, PAYMENT_MODE_LABELS, PAYMENT_STATUS } from "@/components/paymentConstants";

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

export default function UserTransactions({ user }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const payments = await base44.entities.Payment.filter(
        { user_id: user.id },
        "-created_date",
        50
      );
      setTransactions(payments);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user.id]);

  const filteredTransactions = transactions.filter(t => {
    const term = searchTerm.toLowerCase();
    return (
      t.project_name?.toLowerCase().includes(term) ||
      t.plan_id?.toLowerCase().includes(term) ||
      PLAN_LABELS.es[t.plan_id]?.toLowerCase().includes(term)
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Historial de Transacciones ({transactions.length})
            </CardTitle>
            <Button variant="outline" size="sm" onClick={fetchTransactions}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por proyecto o plan..."
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
          {filteredTransactions.map((transaction) => (
            <TransactionCardMobile key={transaction.id} transaction={transaction} />
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-gray-500 text-sm">
                    {format(new Date(transaction.created_date), "dd MMM yyyy", { locale: es })}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.project_name || "Sin nombre"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {PLAN_LABELS.es[transaction.plan_id] || transaction.plan_id}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {PAYMENT_MODE_LABELS.es[transaction.payment_mode]}
                  </TableCell>
                  <TableCell className="font-medium">
                    ₡{((transaction.amount || 0) / 100).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={transaction.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "No se encontraron transacciones" : "No tienes transacciones aún"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG[PAYMENT_STATUS.PENDING];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
}

function TransactionCardMobile({ transaction }) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium">{transaction.project_name || "Sin nombre"}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(transaction.created_date), "dd MMM yyyy", { locale: es })}
          </p>
        </div>
        <StatusBadge status={transaction.status} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            {PLAN_LABELS.es[transaction.plan_id]}
          </Badge>
          <span className="text-sm text-gray-500">
            {PAYMENT_MODE_LABELS.es[transaction.payment_mode]}
          </span>
        </div>
        <p className="font-bold text-lg">
          ₡{((transaction.amount || 0) / 100).toLocaleString()}
        </p>
      </div>
    </div>
  );
}