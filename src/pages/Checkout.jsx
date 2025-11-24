import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planName = searchParams.get("plan") || "Básico";
  const [paymentMode, setPaymentMode] = useState("subscription"); // subscription | onetime
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [error, setError] = useState(null);

  // Configuration for plans (in CRC)
  const plans = {
    "Básico": { fullPrice: 60000, name: "Web Design 1" },
    "Estándar": { fullPrice: 100000, name: "Web Design 2" },
    "Premium": { fullPrice: 150000, name: "Web Design 3" },
    // English fallbacks
    "Basic": { fullPrice: 60000, name: "Web Design 1" },
    "Standard": { fullPrice: 100000, name: "Web Design 2" },
  };

  const selectedPlan = plans[planName] || plans["Básico"];
  
  // Calculate amounts
  const subscriptionAmount = selectedPlan.fullPrice;
  const oneTimeAmount = selectedPlan.fullPrice * 0.5;
  const currentAmount = paymentMode === "subscription" ? subscriptionAmount : oneTimeAmount;

  // Load Stripe.js
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.async = true;
    script.onload = () => {
      // Initialize Stripe with the publishable key (we'll get it from env in a real app, 
      // but since we can't access frontend env easily without build args, 
      // we might need to fetch it from backend or assume the user provides it or we hardcode a placeholder until secrets are set)
      // For now, we will fetch the config from backend to be secure and dynamic
      fetchStripeConfig();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchStripeConfig = async () => {
    try {
      // We will implement 'getStripeConfig' function later to return the publishable key
      const { data } = await base44.functions.invoke("getStripeConfig");
      if (window.Stripe && data.publishableKey) {
        setStripe(window.Stripe(data.publishableKey));
      }
    } catch (err) {
      console.error("Error loading Stripe config", err);
    }
  };

  // Create Payment Intent or Subscription when Stripe is ready and dependencies change
  useEffect(() => {
    if (!stripe) return;

    const initPayment = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await base44.functions.invoke("createPaymentIntent", {
          planName,
          paymentMode,
          amount: currentAmount, // Backend should verify this, but sending for reference
          currency: "crc"
        });
        
        if (data.error) throw new Error(data.error);
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message || "Error iniciando el pago");
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [stripe, paymentMode, planName]);

  // Mount Elements
  useEffect(() => {
    if (!clientSecret || !stripe) return;

    const appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: '#002B7F',
      },
    };
    const options = {
      clientSecret,
      appearance,
    };

    const newElements = stripe.elements(options);
    const paymentElement = newElements.create("payment");
    paymentElement.mount("#payment-element");
    setElements(newElements);

    return () => {
      paymentElement.unmount();
    };
  }, [clientSecret, stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + createPageUrl("PaymentSuccess"),
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    }
    // If success, Stripe redirects, so no need to setProcessing(false)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Order Summary */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Resumen del Pedido</h1>
            <p className="text-gray-600">Estás a un paso de transformar tu presencia digital.</p>
          </div>

          <Card className="border-l-4 border-l-blue-900 shadow-md">
            <CardHeader>
              <CardTitle className="text-blue-900 flex justify-between items-center">
                <span>Plan {planName}</span>
                {paymentMode === "subscription" && <span className="text-sm px-2 py-1 bg-blue-100 rounded-full">Mensual</span>}
              </CardTitle>
              <CardDescription>{selectedPlan.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Precio Regular</span>
                <span className="font-medium">₡{selectedPlan.fullPrice.toLocaleString()} / mes</span>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total a Pagar</span>
                  <span className="font-bold text-2xl text-blue-900">
                    ₡{currentAmount.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {paymentMode === "subscription" 
                    ? "Facturación recurrente mensual" 
                    : "Pago único del 50% para iniciar"}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span>Pagos procesados de forma segura por Stripe</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Garantía de satisfacción</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Soporte inmediato tras la compra</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Tabs value={paymentMode} onValueChange={setPaymentMode} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="subscription">Suscripción</TabsTrigger>
                <TabsTrigger value="onetime">Pago Único (50%)</TabsTrigger>
              </TabsList>
            </Tabs>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <p>Cargando pasarela de pago...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div id="payment-element" className="min-h-[200px]" />
                
                <Button 
                  type="submit" 
                  disabled={!stripe || !elements || processing}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-6 text-lg"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Procesando...
                    </>
                  ) : (
                    `Pagar ₡${currentAmount.toLocaleString()}`
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  Al confirmar, aceptas nuestros términos de servicio y política de privacidad.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}