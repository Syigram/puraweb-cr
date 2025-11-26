import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Receipt,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";
import { PLAN_LABELS, PAYMENT_MODE_LABELS, PAYMENT_STATUS } from "@/components/paymentConstants";

const translations = {
  es: {
    title: "Historial de Transacciones",
    noTransactions: "No tienes transacciones aún",
    noTransactionsDesc: "Cuando realices un pago, aparecerá aquí.",
    date: "Fecha",
    description: "Descripción",
    type: "Tipo",
    amount: "Monto",
    status: "Estado",
    statuses: {
      succeeded: "Exitoso",
      pending: "Pendiente",
      failed: "Fallido",
      canceled: "Cancelado"
    }
  },
  en: {
    title: "Transaction History",
    noTransactions: "You don't have any transactions yet",
    noTransactionsDesc: "When you make a payment, it will appear here.",
    date: "Date",
    description: "Description",
    type: "Type",
    amount: "Amount",
    status: "Status",
    statuses: {
      succeeded: "Succeeded",
      pending: "Pending",
      failed: "Failed",
      canceled: "Canceled"
    }
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

export default function UserTransactions({ user }) {
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === "es" ? es : enUS;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const payments = await base44.entities.Payment.filter(
          { customer_email: user.email },
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
  }, [user.email]);

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
          <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t.noTransactions}
          </h3>
          <p className="text-gray-500">{t.noTransactionsDesc}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="sm:hidden space-y-4">
          {transactions.map((transaction) => (
            <TransactionCardMobile
              key={transaction.id}
              transaction={transaction}
              language={language}
              dateLocale={dateLocale}
              t={t}
            />
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.date}</TableHead>
                <TableHead>{t.description}</TableHead>
                <TableHead>{t.type}</TableHead>
                <TableHead>{t.amount}</TableHead>
                <TableHead>{t.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-gray-500 text-sm">
                    {transaction.created_date
                      ? format(new Date(transaction.created_date), "dd MMM yyyy", { locale: dateLocale })
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {transaction.subscription_name || PLAN_LABELS[language][transaction.plan_id] || transaction.plan_id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {PLAN_LABELS[language][transaction.plan_id] || transaction.plan_id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {PAYMENT_MODE_LABELS[language][transaction.payment_mode] || transaction.payment_mode}
                  </TableCell>
                  <TableCell className="font-medium">
                    ₡{((transaction.amount || 0) / 100).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <TransactionStatusBadge status={transaction.status} t={t} />
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

function TransactionStatusBadge({ status, t }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG[PAYMENT_STATUS.PENDING];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {t.statuses[status] || status}
    </Badge>
  );
}

function TransactionCardMobile({ transaction, language, dateLocale, t }) {
  const config = STATUS_CONFIG[transaction.status] || STATUS_CONFIG[PAYMENT_STATUS.PENDING];

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium">
            {transaction.subscription_name || PLAN_LABELS[language][transaction.plan_id] || transaction.plan_id}
          </p>
          <p className="text-sm text-gray-500">
            {PLAN_LABELS[language][transaction.plan_id] || transaction.plan_id}
          </p>
        </div>
        <TransactionStatusBadge status={transaction.status} t={t} />
      </div>
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="text-sm text-gray-500">
          <p>{transaction.created_date
            ? format(new Date(transaction.created_date), "dd MMM yyyy", { locale: dateLocale })
            : "N/A"}</p>
          <p>{PAYMENT_MODE_LABELS[language][transaction.payment_mode] || transaction.payment_mode}</p>
        </div>
        <p className="font-bold text-lg">
          ₡{((transaction.amount || 0) / 100).toLocaleString()}
        </p>
      </div>
    </div>
  );
}