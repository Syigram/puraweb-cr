import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Loader2, 
  Receipt, 
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { 
  PLAN_LABELS, 
  PAYMENT_MODE_LABELS, 
  PAYMENT_STATUS 
} from "@/components/paymentConstants";
import { useLanguage } from "@/components/LanguageContext";

const translations = {
  es: {
    title: "Historial de Transacciones",
    description: "Todas tus transacciones y pagos realizados",
    noTransactions: "No tienes transacciones aún",
    noTransactionsDesc: "Cuando realices un pago, aparecerá aquí.",
    date: "Fecha",
    service: "Servicio",
    plan: "Plan",
    type: "Tipo",
    amount: "Monto",
    status: "Estado",
    succeeded: "Exitoso",
    pending: "Pendiente",
    failed: "Fallido",
    canceled: "Cancelado",
    unnamed: "Sin nombre"
  },
  en: {
    title: "Transaction History",
    description: "All your transactions and payments made",
    noTransactions: "You have no transactions yet",
    noTransactionsDesc: "When you make a payment, it will appear here.",
    date: "Date",
    service: "Service",
    plan: "Plan",
    type: "Type",
    amount: "Amount",
    status: "Status",
    succeeded: "Succeeded",
    pending: "Pending",
    failed: "Failed",
    canceled: "Canceled",
    unnamed: "Unnamed"
  }
};

const STATUS_CONFIG = {
  [PAYMENT_STATUS.SUCCEEDED]: {
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border-green-200"
  },
  [PAYMENT_STATUS.PENDING]: {
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 border-yellow-200"
  },
  [PAYMENT_STATUS.FAILED]: {
    icon: XCircle,
    className: "bg-red-100 text-red-700 border-red-200"
  },
  [PAYMENT_STATUS.CANCELED]: {
    icon: AlertCircle,
    className: "bg-gray-100 text-gray-700 border-gray-200"
  }
};

export default function UserTransactions({ userEmail }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === 'es' ? es : enUS;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const payments = await base44.entities.Payment.filter(
          { customer_email: userEmail },
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
    fetchTransactions();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noTransactions}</h3>
          <p className="text-gray-500">{t.noTransactionsDesc}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="sm:hidden space-y-4">
          {transactions.map((tx) => (
            <TransactionCardMobile 
              key={tx.id} 
              transaction={tx} 
              t={t}
              language={language}
              dateLocale={dateLocale}
            />
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.date}</TableHead>
                <TableHead>{t.service}</TableHead>
                <TableHead>{t.plan}</TableHead>
                <TableHead>{t.type}</TableHead>
                <TableHead>{t.amount}</TableHead>
                <TableHead>{t.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-gray-500 text-sm">
                    {tx.created_date 
                      ? format(new Date(tx.created_date), "dd MMM yyyy", { locale: dateLocale })
                      : "N/A"
                    }
                  </TableCell>
                  <TableCell className="font-medium">
                    {tx.service_name || t.unnamed}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {PLAN_LABELS[language][tx.plan_id] || tx.plan_id || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {PAYMENT_MODE_LABELS[language][tx.payment_mode] || tx.payment_mode}
                  </TableCell>
                  <TableCell className="font-medium">
                    ₡{((tx.amount || 0) / 100).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={tx.status} t={t} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status, t }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG[PAYMENT_STATUS.PENDING];
  const Icon = config.icon;
  const label = t[status] || status;
  
  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
}

function TransactionCardMobile({ transaction, t, language, dateLocale }) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium">{transaction.service_name || t.unnamed}</p>
          <p className="text-sm text-gray-500">
            {PLAN_LABELS[language][transaction.plan_id] || transaction.plan_id}
          </p>
        </div>
        <StatusBadge status={transaction.status} t={t} />
      </div>
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="text-sm text-gray-500">
          <p>{transaction.created_date 
            ? format(new Date(transaction.created_date), "dd MMM yyyy", { locale: dateLocale })
            : "N/A"
          }</p>
          <p>{PAYMENT_MODE_LABELS[language][transaction.payment_mode]}</p>
        </div>
        <p className="text-lg font-bold">
          ₡{((transaction.amount || 0) / 100).toLocaleString()}
        </p>
      </div>
    </div>
  );
}