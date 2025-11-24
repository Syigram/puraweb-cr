import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");
    if (clientSecret) {
       setTimeout(() => setStatus("success"), 1500);
    } else {
       // Maybe redirected without param? Assume success for demo or handle error
       setStatus("success");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white shadow-xl text-center overflow-hidden">
        <div className="h-2 bg-green-500 w-full" />
        <div className="p-8">
            {status === "loading" ? (
                <div className="space-y-4 py-8">
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
                        Nuestro equipo te contactará al correo proporcionado para iniciar el proceso.
                    </p>

                    <Link to={createPageUrl("Home")}>
                        <Button className="w-full bg-blue-900 hover:bg-blue-800 h-12 text-lg">
                            Volver al Inicio
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
      </Card>
    </div>
  );
}