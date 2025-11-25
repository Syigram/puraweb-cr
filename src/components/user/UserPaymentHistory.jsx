import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, 
  Loader2, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle,
  Folder,
  Calendar
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";
import { PLAN_LABELS, PAYMENT_MODE_LABELS, PAYMENT_STATUS } from "@/components/paymentConstants";

const translations = {
  es: {
    title: "Historial de Pagos",
    subtitle: "Todas tus transacciones",
    noPayments: "No hay pagos registrados",
    noPaymentsDesc: "Tus transacciones aparecerán aquí",
    unnamedProject: "Sin nombre de proyecto",
    statusLabels: {
      succeeded: "Exitoso",
      pending: "Pendiente",
      failed: "Fallido",
      canceled: "Cancelado"
    }
  },
  en: {
    title: "Payment History",
    subtitle: "All your transactions",
    noPayments: "No payments recorded",
    noPaymentsDesc: "Your transactions will appear here",
    unnamedProject: "Unnamed project",
    statusLabels: {
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

export default function UserPaymentHistory({ user }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === 'es' ? es : enUS;

  useEffect(() => {
    const fetchPayments = async () => {
      const data = await base44.entities.Payment.filter(
        { customer_email: user.email },
        "-created_date",
        50
      );
      setPayments(data);
      setLoading(false);
    };
    fetchPayments();
  }, [user.email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      {payments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Receipt className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noPayments}</h3>
            <p className="text-gray-500">{t.noPaymentsDesc}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => {
            const statusConfig = STATUS_CONFIG[payment.status] || STATUS_CONFIG[PAYMENT_STATUS.PENDING];
            const StatusIcon = statusConfig.icon;
            const planLabel = PLAN_LABELS[language]?.[payment.plan_id] || PLAN_LABELS.es[payment.plan_id] || payment.plan_id;
            const modeLabel = PAYMENT_MODE_LABELS[language]?.[payment.payment_mode] || PAYMENT_MODE_LABELS.es[payment.payment_mode] || payment.payment_mode;

            return (
              <Card key={payment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={statusConfig.className}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {t.statusLabels[payment.status]}
                        </Badge>
                        <Badge variant="secondary">{planLabel}</Badge>
                        <Badge variant="outline" className="hidden sm:inline-flex">
                          {modeLabel}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-700">
                        <Folder className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-medium truncate">
                          {payment.project_name || t.unnamedProject}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>
                          {payment.created_date 
                            ? format(new Date(payment.created_date), "d 'de' MMMM, yyyy - HH:mm", { locale: dateLocale })
                            : "N/A"
                          }
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        ₡{((payment.amount || 0) / 100).toLocaleString()}
                      </span>
                      <p className="text-xs text-gray-500 uppercase">{payment.currency || "CRC"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}