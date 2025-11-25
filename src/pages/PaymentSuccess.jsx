import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/components/LanguageContext";

const STATUS_CONFIG = {
  loading: {
    color: "blue",
    icon: null,
    barColor: "bg-blue-500"
  },
  succeeded: {
    color: "green",
    icon: CheckCircle2,
    barColor: "bg-green-500"
  },
  processing: {
    color: "yellow",
    icon: Clock,
    barColor: "bg-yellow-500"
  },
  requires_payment_method: {
    color: "red",
    icon: XCircle,
    barColor: "bg-red-500"
  },
  requires_action: {
    color: "yellow",
    icon: AlertTriangle,
    barColor: "bg-yellow-500"
  },
  canceled: {
    color: "red",
    icon: XCircle,
    barColor: "bg-red-500"
  },
  failed: {
    color: "red",
    icon: XCircle,
    barColor: "bg-red-500"
  },
  error: {
    color: "red",
    icon: XCircle,
    barColor: "bg-red-500"
  }
};

const translations = {
  es: {
    verifying: "Verificando pago con Stripe...",
    succeeded: {
      title: "¡Pago Confirmado!",
      message: "Tu pago ha sido verificado exitosamente con Stripe. Nuestro equipo te contactará pronto para iniciar el proceso."
    },
    processing: {
      title: "Pago en Proceso",
      message: "Tu pago está siendo procesado. Te notificaremos por correo cuando se confirme."
    },
    requires_action: {
      title: "Acción Requerida",
      message: "Tu pago requiere una acción adicional. Por favor completa la verificación."
    },
    requires_payment_method: {
      title: "Pago No Completado",
      message: "El método de pago no fue aceptado. Por favor intenta con otro método."
    },
    canceled: {
      title: "Pago Cancelado",
      message: "El pago fue cancelado. Si esto fue un error, puedes intentarlo nuevamente."
    },
    failed: {
      title: "Pago Fallido",
      message: "Hubo un problema con tu pago. Por favor verifica tu método de pago e intenta nuevamente."
    },
    error: {
      title: "Error de Verificación",
      message: "No pudimos verificar el estado de tu pago. Por favor contacta a soporte."
    },
    backHome: "Volver al Inicio",
    tryAgain: "Intentar Nuevamente",
    contactSupport: "Contactar Soporte"
  },
  en: {
    verifying: "Verifying payment with Stripe...",
    succeeded: {
      title: "Payment Confirmed!",
      message: "Your payment has been successfully verified with Stripe. Our team will contact you soon to start the process."
    },
    processing: {
      title: "Payment Processing",
      message: "Your payment is being processed. We'll notify you by email when it's confirmed."
    },
    requires_action: {
      title: "Action Required",
      message: "Your payment requires additional action. Please complete the verification."
    },
    requires_payment_method: {
      title: "Payment Not Completed",
      message: "The payment method was not accepted. Please try a different method."
    },
    canceled: {
      title: "Payment Canceled",
      message: "The payment was canceled. If this was an error, you can try again."
    },
    failed: {
      title: "Payment Failed",
      message: "There was a problem with your payment. Please check your payment method and try again."
    },
    error: {
      title: "Verification Error",
      message: "We couldn't verify your payment status. Please contact support."
    },
    backHome: "Back to Home",
    tryAgain: "Try Again",
    contactSupport: "Contact Support"
  }
};

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const verifyPayment = async () => {
      const clientSecret = searchParams.get("payment_intent_client_secret");
      
      if (!clientSecret) {
        setPaymentStatus("error");
        return;
      }

      // Extraer el payment_intent_id del client_secret
      // Format: pi_xxxxx_secret_xxxxx
      const paymentIntentId = clientSecret.split("_secret_")[0];

      try {
        const { data } = await base44.functions.invoke("stripe", {
          action: "verifyPayment",
          paymentIntentId
        });

        setPaymentDetails(data);
        setPaymentStatus(data.status || "error");
      } catch (error) {
        console.error("Error verifying payment:", error);
        setPaymentStatus("error");
      }
    };

    verifyPayment();
  }, [searchParams]);

  const config = STATUS_CONFIG[paymentStatus] || STATUS_CONFIG.error;
  const Icon = config.icon;
  const statusText = t[paymentStatus] || t.error;
  const isSuccess = paymentStatus === "succeeded";
  const isProcessing = paymentStatus === "processing";
  const isFailed = ["requires_payment_method", "canceled", "failed", "error"].includes(paymentStatus);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white shadow-xl text-center overflow-hidden">
        <div className={`h-2 ${config.barColor} w-full`} />
        <div className="p-8">
          {paymentStatus === "loading" ? (
            <div className="space-y-4 py-8">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto" />
              <h2 className="text-xl font-semibold text-gray-700">{t.verifying}</h2>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className={`w-20 h-20 bg-${config.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                {Icon && <Icon className={`w-10 h-10 text-${config.color}-600`} />}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{statusText.title}</h1>
              <p className="text-gray-600 mb-8">
                {statusText.message}
              </p>

              {paymentDetails && isSuccess && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-500">
                    {language === 'es' ? 'Monto pagado:' : 'Amount paid:'}{" "}
                    <span className="font-semibold text-gray-900">
                      ₡{(paymentDetails.amount / 100).toLocaleString()}
                    </span>
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {isSuccess || isProcessing ? (
                  <Link to={createPageUrl("Home")} className="block">
                    <Button className="w-full bg-blue-900 hover:bg-blue-800 h-12 text-lg">
                      {t.backHome}
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to={createPageUrl("Planes")} className="block">
                      <Button className="w-full bg-blue-900 hover:bg-blue-800 h-12 text-lg">
                        {t.tryAgain}
                      </Button>
                    </Link>
                    <Link to={createPageUrl("Home") + "#contact"} className="block">
                      <Button variant="outline" className="w-full h-12 text-lg">
                        {t.contactSupport}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
}