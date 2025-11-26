import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ShieldCheck, Loader2, AlertCircle, Lock, Check } from "lucide-react";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { PAYMENT_MODES, PLAN_IDS } from "@/components/paymentConstants";

export default function Checkout() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { language } = useLanguage();
    const planId = searchParams.get("plan") || PLAN_IDS.BASIC;
    const initialPaymentMode = searchParams.get("mode") || PAYMENT_MODES.SUBSCRIPTION;

    // State - usando constantes estandarizadas
    const [paymentMode, setPaymentMode] = useState(initialPaymentMode);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [error, setError] = useState(null);
  
  // Customer Info State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  
  // Subscription Name State
  const defaultSubscriptionName = selectedPlan.displayName[language] || selectedPlan.displayName.es;
  const [subscriptionName, setSubscriptionName] = useState(defaultSubscriptionName);

  // Configuration for plans using plan IDs estandarizados
  // Stripe stores amounts in smallest currency unit (centavos for CRC)
  // Display prices: 60,000 / 100,000 / 150,000 CRC
  const plans = {
    [PLAN_IDS.BASIC]: { 
      fullPrice: 60000, 
      displayName: { es: "Plan Básico", en: "Basic Plan" },
      description: { 
        es: "Perfecto para pequeños negocios que inician su presencia digital", 
        en: "Perfect for small businesses starting their digital journey" 
      },
      features: {
        es: ["Sitio Web Responsive", "SEO Básico", "Hasta 5 Páginas", "Formulario de Contacto", "Soporte por Email"],
        en: ["Responsive Website", "Basic SEO", "Up to 5 Pages", "Contact Form", "Email Support"]
      }
    },
    [PLAN_IDS.PROFESSIONAL]: { 
      fullPrice: 100000, 
      displayName: { es: "Plan Profesional", en: "Professional Plan" },
      description: { 
        es: "Ideal para empresas en crecimiento que necesitan más potencia", 
        en: "Ideal for growing companies needing more power and flexibility" 
      },
      features: {
        es: ["Todo lo del Básico", "CMS Autoadministrable", "Hasta 10 Páginas", "Optimización de Velocidad", "Integración de Redes Sociales", "Soporte Prioritario"],
        en: ["Everything in Basic", "Self-managed CMS", "Up to 10 Pages", "Speed Optimization", "Social Media Integration", "Priority Support"]
      }
    },
    [PLAN_IDS.BUSINESS]: { 
      fullPrice: 150000, 
      displayName: { es: "Plan Empresa", en: "Business Plan" },
      description: { 
        es: "Solución completa para negocios establecidos y tiendas online", 
        en: "Complete solution for established businesses and online stores" 
      },
      features: {
        es: ["Todo lo del Profesional", "E-commerce Completo", "Páginas Ilimitadas", "Pasarela de Pagos", "Integraciones Personalizadas", "Soporte 24/7 Dedicado"],
        en: ["Everything in Professional", "Full E-commerce", "Unlimited Pages", "Payment Gateway", "Custom Integrations", "24/7 Dedicated Support"]
      }
    },
  };

  const selectedPlan = plans[planId] || plans[PLAN_IDS.BASIC];
  const displayName = selectedPlan.displayName[language] || selectedPlan.displayName.es;
  const t = translations[language].checkout;
  
  // Calculate amounts
  const subscriptionAmount = selectedPlan.fullPrice;
  const oneTimeAmount = selectedPlan.fullPrice * 0.5;
  const currentAmount = paymentMode === PAYMENT_MODES.SUBSCRIPTION ? subscriptionAmount : oneTimeAmount;

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
          planId, // Usando planId estandarizado
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
  }, [paymentMode, planId, email]); // Re-run when these change

  // Track previous language to detect changes and control remounting
  const [prevLanguage, setPrevLanguage] = useState(language);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  // Handle language change - reset payment element with loading animation
  useEffect(() => {
    if (prevLanguage !== language && clientSecret && stripe) {
      setIsChangingLanguage(true);
      setLoading(true);
      setElements(null);
      setPrevLanguage(language);
    }
  }, [language, prevLanguage, clientSecret, stripe]);

  // Mount Elements
  useEffect(() => {
    if (!clientSecret || !stripe) return;

    // If changing language, add a delay for the loading animation
    const initialDelay = isChangingLanguage ? 800 : 0;

    const mountTimer = setTimeout(() => {
      // Once we have the client secret and stripe, we can stop loading to render the container div
      setLoading(false);
      setIsChangingLanguage(false);

      // Use a small timeout to allow the DOM to update and render the #payment-element div
      const elementTimer = setTimeout(() => {
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
          locale: language, // 'es' or 'en' based on user selection
        };

        const newElements = stripe.elements(options);
        const paymentElement = newElements.create("payment", {
          layout: 'tabs'
        });
        paymentElement.mount("#payment-element");
        setElements(newElements);
      }, 100);

      return () => clearTimeout(elementTimer);
    }, initialDelay);

    return () => {
      clearTimeout(mountTimer);
    };
  }, [clientSecret, stripe, language, isChangingLanguage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const successUrl = new URL(createPageUrl("PaymentSuccess"), window.location.origin);
    successUrl.searchParams.set("subscription_name", subscriptionName);
    successUrl.searchParams.set("plan_id", planId);
    successUrl.searchParams.set("payment_mode", paymentMode);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: successUrl.toString(),
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
        const successParams = new URLSearchParams({
          payment_intent_client_secret: paymentIntent.client_secret,
          subscription_name: subscriptionName,
          plan_id: planId,
          payment_mode: paymentMode
        });
        navigate(createPageUrl("PaymentSuccess") + `?${successParams.toString()}`);
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* Left Column: Order Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-gray-600">
              {t.subtitle}
            </p>
          </div>

          <Card className="border-t-4 border-t-blue-900 shadow-lg overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b pb-6">
              <div className="flex justify-between items-start">
                <div>
                   <CardTitle className="text-xl text-blue-900">{displayName}</CardTitle>
                   <CardDescription className="mt-1">{selectedPlan.description[language]}</CardDescription>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-bold text-gray-900">
                    ₡{selectedPlan.fullPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">{t.totalPriceLabel}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* Plan Features */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">{t.includedFeatures}</h4>
                <ul className="space-y-2">
                  {selectedPlan.features[language].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-600 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-900">{t.paymentMode}</span>
                    <span className="text-sm font-bold text-blue-700">
                      {paymentMode === PAYMENT_MODES.SUBSCRIPTION ? t.subscriptionMode : t.onetimeMode}
                    </span>
                  </div>
                  <p className="text-sm text-blue-700/80 leading-relaxed">
                    {paymentMode === PAYMENT_MODES.SUBSCRIPTION 
                      ? t.subscriptionDescription 
                      : t.onetimeDescription}
                  </p>
                </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.subtotal}</span>
                  <span>₡{currentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.taxes}</span>
                  <span>₡0</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="font-bold text-lg">{t.totalToday}</span>
                  <span className="font-bold text-3xl text-blue-900">
                    ₡{currentAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                    <span>{t.encryptedTransaction}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>{t.secureData}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Form */}
        <div className="space-y-6">
          <Card className="shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <Tabs value={paymentMode} onValueChange={(value) => {
                    setPaymentMode(value);
                    setLoading(true);
                    setElements(null);
                    // Delay clearing clientSecret to show loading animation first
                    setTimeout(() => setClientSecret(""), 100);
                  }} className="w-full mb-8">
                    <TabsList className="grid w-full grid-cols-2 h-12">
                      <TabsTrigger value={PAYMENT_MODES.SUBSCRIPTION} className="text-sm">{t.subscriptionTab}</TabsTrigger>
                      <TabsTrigger value={PAYMENT_MODES.ONETIME} className="text-sm">{t.onetimeTab}</TabsTrigger>
                    </TabsList>
                  </Tabs>

              <div className="space-y-4 mb-8">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t.emailLabel}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={t.emailPlaceholder} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">{t.nameLabel}</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder={t.namePlaceholder} 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subscriptionName">{t.subscriptionNameLabel}</Label>
                    <Input 
                      id="subscriptionName" 
                      type="text" 
                      placeholder={t.subscriptionNamePlaceholder} 
                      value={subscriptionName} 
                      onChange={(e) => setSubscriptionName(e.target.value)}
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500">{t.subscriptionNameHint}</p>
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
                                          <p className="font-medium">{t.preparingGateway}</p>
                                          {!email && (
                                            <div className="text-center mt-3">
                                              <p className="text-xs mb-3">{t.enterEmailToContinue}</p>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                  const returnUrl = `${createPageUrl("Checkout")}?plan=${planId}&mode=${paymentMode}`;
                                                  base44.auth.redirectToLogin(returnUrl);
                                                }}
                                                className="text-blue-900 border-blue-900 hover:bg-blue-50"
                                              >
                                                {t.loginButton}
                                              </Button>
                                            </div>
                                          )}
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
                        {t.processing}
                      </>
                    ) : (
                      `${t.payButton} ₡${currentAmount.toLocaleString()}`
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