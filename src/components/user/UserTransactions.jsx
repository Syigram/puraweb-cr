import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, 
  Loader2, 
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Calendar,
  CreditCard
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";
import { PLAN_LABELS, PAYMENT_MODE_LABELS, PAYMENT_STATUS } from "@/components/paymentConstants";

const translations = {
  es: {
    title: "Historial de Transacciones",
    subtitle: "Todos tus pagos y transacciones",
    noTransactions: {
      title: "Sin Transacciones",
      description: "Aún no has realizado ninguna transacción."
    },
    status: {
      succeeded: "Exitoso",
      pending: "Pendiente",
      failed: "Fallido",
      canceled: "Cancelado"
    },
    plan: "Plan",
    type: "Tipo",
    date: "Fecha",
    amount: "Monto"
  },
  en: {
    title: "Transaction History",
    subtitle: "All your payments and transactions",
    noTransactions: {
      title: "No Transactions",
      description: "You haven't made any transactions yet."
    },
    status: {
      succeeded: "Succeeded",
      pending: "Pending",
      failed: "Failed",
      canceled: "Canceled"
    },
    plan: "Plan",
    type: "Type",
    date: "Date",
    amount: "Amount"
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
  const dateLocale = language === "es" ? es : enUS;

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
      <Card className="border-dashed">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t.noTransactions.title}
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            {t.noTransactions.description}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Receipt className="w-5 h-5 text-blue-900" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionCard 
              key={transaction.id} 
              transaction={transaction} 
              language={language}
              t={t}
              dateLocale={dateLocale}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionCard({ transaction, language, t, dateLocale }) {
  const statusConfig = STATUS_CONFIG[transaction.status] || STATUS_CONFIG[PAYMENT_STATUS.PENDING];
  const StatusIcon = statusConfig.icon;

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Side - Plan & Status */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-blue-900" />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {PLAN_LABELS[language][transaction.plan_id] || transaction.plan_id || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              {PAYMENT_MODE_LABELS[language][transaction.payment_mode] || transaction.payment_mode}
            </p>
          </div>
        </div>

        {/* Right Side - Amount & Status */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <Badge variant="outline" className={statusConfig.className}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {t.status[transaction.status] || transaction.status}
          </Badge>
          <div className="text-right">
            <p className="font-bold text-gray-900">
              ₡{((transaction.amount || 0) / 100).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
              <Calendar className="w-3 h-3" />
              {transaction.created_date 
                ? format(new Date(transaction.created_date), "dd MMM yyyy", { locale: dateLocale })
                : "N/A"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}