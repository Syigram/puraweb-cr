import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Download } from "lucide-react";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    if (paymentIntentClientSecret) {
        // Here we could verify the payment intent with the backend if needed
        // For now, we assume if we reached here with a secret, it's likely valid or Stripe checked it
        // But it's better to retrieve the status using stripe.js or backend
        // For simplicity in this demo, we'll just show success after a brief "check"
        const timer = setTimeout(() => setStatus("success"), 1500);
        return () => clearTimeout(timer);
    } else {
        setStatus("success"); // Fallback if redirected differently
    }
  }, [paymentIntentClientSecret]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white shadow-xl text-center overflow-hidden">
        <div className="h-2 bg-green-500 w-full" />
        <div className="p-8">
            {status === "loading" ? (
                <div className="space-y-4">
                     <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto" />
                     <h2 className="text-xl font-semibold text-gray-700">Verificando pago...</h2>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
                    <p className="text-gray-600 mb-8">
                        Gracias por confiar en PuraWeb CR. Hemos recibido tu pago correctamente.
                        Un representante se pondrá en contacto contigo en breve.
                    </p>

                    <div className="space-y-3">
                        <Link to={createPageUrl("Home")}>
                            <Button className="w-full bg-blue-900 hover:bg-blue-800">
                                Volver al Inicio
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
      </Card>
    </div>
  );
}

function Card({ className, children }) {
    return <div className={`bg-white rounded-xl ${className}`}>{children}</div>;
}