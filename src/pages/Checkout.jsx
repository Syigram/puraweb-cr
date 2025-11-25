import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ShieldCheck, Loader2, AlertCircle, Lock } from "lucide-react";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planName = searchParams.get("plan") || "Básico";
  
  // State
  const [paymentMode, setPaymentMode] = useState("subscription"); // subscription | onetime
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [error, setError] = useState(null);
  
  // Customer Info State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // Configuration for plans (in CRC)
  // Note: These are for display. Real validation happens on backend.
  const plans = {
    "Básico": { fullPrice: 60000, name: "Web Design 1", stripePriceId: "price_1SUE0bFA0Fkjjug3eDCGxI4G" },
    "Estándar": { fullPrice: 100000, name: "Web Design 2", stripePriceId: "price_1SUE2DFA0Fkjjug3euWqaW5c" },
    "Premium": { fullPrice: 150000, name: "Web Design 3", stripePriceId: "price_1SUE32FA0Fkjjug3khKfal6N" },
    "Basic": { fullPrice: 60000, name: "Web Design 1", stripePriceId: "price_1SUE0bFA0Fkjjug3eDCGxI4G" },
    "Standard": { fullPrice: 100000, name: "Web Design 2", stripePriceId: "price_1SUE2DFA0Fkjjug3euWqaW5c" },
  };

  const selectedPlan = plans[planName] || plans["Básico"];
  
  // Calculate amounts
  const subscriptionAmount = selectedPlan.fullPrice;
  const oneTimeAmount = selectedPlan.fullPrice * 0.5;
  const currentAmount = paymentMode === "subscription" ? subscriptionAmount : oneTimeAmount;

  // Load User Info on mount
  useEffect(() => {
    const init = async () => {
      try {
        const user = await base44.auth.me().catch(() => null);
        if (user) {
          setEmail(user.email);
          setName(user.full_name || "");
        }
      } catch (e) {
        console.error(e);
      }
    };
    init();
  }, []);

  // RE-IMPLEMENTING THE STIPE LOADER AND INTENT CREATION
  useEffect(() => {
    let isMounted = true;

    const loadStripeAndIntent = async () => {
      // 1. Load Stripe JS
      if (!window.Stripe) {
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/";
        script.async = true;
        await new Promise((resolve) => {
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      // 2. Get Config
      const { data: configData } = await base44.functions.invoke("stripe", { action: "getConfig" });
      
      if (!isMounted) return;
      
      const stripeInstance = window.Stripe(configData.publishableKey);
      setStripe(stripeInstance);

      if (!email) return; // Wait for email to be entered if not auth

      // 3. Create Payment Intent
      setLoading(true);
      try {
        const { data: intentData } = await base44.functions.invoke("stripe", {
          action: "createPaymentIntent",
          planName,
          paymentMode,
          email,
          name
        });

        if (intentData.error) throw new Error(intentData.error);
        setClientSecret(intentData.clientSecret);
        setError(null);
      } catch (err) {
        console.error(err);
        // Don't show error immediately if it's just missing email
        if (email) setError(err.message || "Error configurando el pago");
      } finally {
        // Do not set loading to false here to prevent mounting before the element is ready
        // We will handle mounting in the other effect
      }
    };

    // Debounce intent creation for email typing
    const timer = setTimeout(() => {
      if (email && email.includes("@")) {
        loadStripeAndIntent();
      }
    }, 800);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [paymentMode, planName, email]); // Re-run when these change

  // Mount Elements
  useEffect(() => {
    if (!clientSecret || !stripe) return;

    // Once we have the client secret and stripe, we can stop loading to render the container div
    setLoading(false);

    // Use a small timeout to allow the DOM to update and render the #payment-element div
    const timer = setTimeout(() => {
      const element = document.getElementById("payment-element");
      if (!element) {
        console.error("Payment element container not found");
        return;
      }

      const appearance = {
        theme: 'stripe',
        variables: {
          colorPrimary: '#002B7F',
          borderRadius: '8px',
        },
      };
      const options = {
        clientSecret,
        appearance,
      };

      const newElements = stripe.elements(options);
      const paymentElement = newElements.create("payment", {
        layout: 'tabs'
      });
      paymentElement.mount("#payment-element");
      setElements(newElements);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [clientSecret, stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: new URL(createPageUrl("PaymentSuccess"), window.location.origin).toString(),
        payment_method_data: {
          billing_details: {
            name: name,
            email: email
          }
        }
      },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent && (paymentIntent.status === "succeeded" || paymentIntent.status === "processing")) {
      navigate(createPageUrl("PaymentSuccess") + `?payment_intent_client_secret=${paymentIntent.client_secret}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        
        {/* Left Column: Order Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Finalizar Compra</h1>
            <p className="text-gray-600">
              Completa tus datos para comenzar a transformar tu negocio con PuraWeb CR.
            </p>
          </div>

          <Card className="border-t-4 border-t-blue-900 shadow-lg overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b pb-6">
              <div className="flex justify-between items-start">
                <div>
                   <CardTitle className="text-xl text-blue-900">{selectedPlan.name}</CardTitle>
                   <CardDescription className="mt-1">Plan {planName}</CardDescription>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-bold text-gray-900">
                    ₡{selectedPlan.fullPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">precio total / mes</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-900">Modo de Pago</span>
                  <span className="text-sm font-bold text-blue-700">
                    {paymentMode === 'subscription' ? 'Suscripción Mensual' : 'Pago Inicial 50%'}
                  </span>
                </div>
                <p className="text-sm text-blue-700/80 leading-relaxed">
                  {paymentMode === 'subscription' 
                    ? "Acceso completo inmediato. Facturación recurrente automática cada mes." 
                    : "Pago del 50% para iniciar el desarrollo. El restante se abona contra entrega."}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₡{currentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Impuestos</span>
                  <span>₡0</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="font-bold text-lg">Total a Pagar Hoy</span>
                  <span className="font-bold text-3xl text-blue-900">
                    ₡{currentAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Transacción encriptada de 256-bits</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Datos seguros y confidenciales</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Form */}
        <div className="space-y-6">
          <Card className="shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <Tabs value={paymentMode} onValueChange={setPaymentMode} className="w-full mb-8">
                <TabsList className="grid w-full grid-cols-2 h-12">
                  <TabsTrigger value="subscription" className="text-sm">Suscripción</TabsTrigger>
                  <TabsTrigger value="onetime" className="text-sm">Pago Único (50%)</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4 mb-8">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="tu@email.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Juan Pérez" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-3 border border-red-100">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-lg border border-dashed">
                  <Loader2 className="w-10 h-10 animate-spin mb-3 text-blue-900" />
                  <p className="font-medium">Preparando pasarela segura...</p>
                  {!email && <p className="text-xs mt-2">Ingresa tu correo para continuar</p>}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div id="payment-element" className="min-h-[250px]" />
                  
                  <Button 
                    type="submit" 
                    disabled={!stripe || !elements || processing}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all mt-4"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Procesando Pago...
                      </>
                    ) : (
                      `Pagar ₡${currentAmount.toLocaleString()}`
                    )}
                  </Button>
                </form>
              )}
              
              <div className="mt-6 flex justify-center space-x-4 opacity-50 grayscale">
                {/* Simple placeholders for card logos if needed, or just text */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-6" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}