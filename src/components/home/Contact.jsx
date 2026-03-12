import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/components/animations/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/components/utils/sanitize";

const VALID_SERVICE_OPTIONS = ["web_development", "ecommerce", "both", "custom"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+()\-\s]{8,20}$/;

function getFieldState(field, value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "default";
  }

  switch (field) {
    case "name":
      return trimmedValue.length >= 2 ? "valid" : "invalid";
    case "email":
      return EMAIL_REGEX.test(trimmedValue) ? "valid" : "invalid";
    case "company":
      return trimmedValue.length >= 2 ? "valid" : "invalid";
    case "phone":
      return PHONE_REGEX.test(trimmedValue) ? "valid" : "invalid";
    case "message":
      return trimmedValue.length >= 10 ? "valid" : "invalid";
    case "service_interest":
      return VALID_SERVICE_OPTIONS.includes(value) ? "valid" : "default";
    default:
      return "default";
  }
}

function getValidationClass(state) {
  if (state === "valid") {
    return "border-green-500 focus-visible:ring-green-500";
  }

  if (state === "invalid") {
    return "border-red-500 focus-visible:ring-red-500";
  }

  return "border-gray-300";
}

const contactFadeReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }
};

const Contact = memo(function Contact({ transparent = false }) {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language].contact, [language]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service_interest: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const inputRefs = useRef({});
  const autofillTimeoutsRef = useRef([]);
  const nativeFormRef = useRef(null);

  const fieldStates = useMemo(() => ({
    name: getFieldState("name", formData.name),
    email: getFieldState("email", formData.email),
    company: getFieldState("company", formData.company),
    phone: getFieldState("phone", formData.phone),
    message: getFieldState("message", formData.message),
    service_interest: getFieldState("service_interest", formData.service_interest)
  }), [formData]);

  const syncAutofilledValues = useCallback(() => {
    setFormData((current) => {
      const nextValues = {
        name: inputRefs.current.name?.value ?? current.name,
        email: inputRefs.current.email?.value ?? current.email,
        company: inputRefs.current.company?.value ?? current.company,
        phone: inputRefs.current.phone?.value ?? current.phone,
        message: inputRefs.current.message?.value ?? current.message
      };

      const hasChanges = Object.entries(nextValues).some(([key, value]) => value !== current[key]);
      return hasChanges ? { ...current, ...nextValues } : current;
    });
  }, []);

  const clearAutofillTimeouts = useCallback(() => {
    autofillTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    autofillTimeoutsRef.current = [];
  }, []);

  const scheduleAutofillSync = useCallback((delays = [0, 120, 350, 800, 1500]) => {
    clearAutofillTimeouts();
    autofillTimeoutsRef.current = delays.map((delay) => window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        syncAutofilledValues();
      }
    }, delay));
  }, [clearAutofillTimeouts, syncAutofilledValues]);

  useEffect(() => {
    const handleWindowResume = () => scheduleAutofillSync([0, 120, 350, 800]);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleAutofillSync([0, 120, 350]);
      }
    };

    scheduleAutofillSync();
    window.addEventListener("focus", handleWindowResume);
    window.addEventListener("pageshow", handleWindowResume);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearAutofillTimeouts();
      window.removeEventListener("focus", handleWindowResume);
      window.removeEventListener("pageshow", handleWindowResume);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [clearAutofillTimeouts, scheduleAutofillSync]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Sanitize inputs on client side before sending
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeEmail(formData.email),
        company: sanitizeInput(formData.company),
        phone: sanitizePhone(formData.phone),
        service_interest: formData.service_interest,
        message: sanitizeInput(formData.message)
      };

      // Send to backend function which performs server-side sanitization
      const response = await base44.functions.invoke('sanitizeContact', sanitizedData);
      
      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      if (nativeFormRef.current?.contains(document.activeElement)) {
        document.activeElement.blur();
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service_interest: "",
        message: ""
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(t.form.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { ref: formRef, isInView: formInView } = useScrollReveal();
  const { ref: infoRef, isInView: infoInView } = useScrollReveal();

  return (
    <section id="contact" className={`py-16 ${transparent ? 'bg-transparent' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {!transparent && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                {t.title}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>
        )}
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            ref={formRef}
            variants={contactFadeReveal}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
          >
            <Card className="border-0 shadow-xl [transform:none]">
              <CardContent className="p-8">
                {isSuccess && (
                  <Alert className="mb-6 bg-green-50 border-green-200">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {t.form.successMessage}
                    </AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form ref={nativeFormRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.form.name} *</Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={100}
                        value={formData.name}
                        ref={(node) => { inputRefs.current.name = node; }}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nombre Completo"
                        aria-invalid={fieldStates.name === "invalid"}
                        className={getValidationClass(fieldStates.name)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.form.email} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={150}
                        value={formData.email}
                        ref={(node) => { inputRefs.current.email = node; }}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nombre@example.com"
                        aria-invalid={fieldStates.email === "invalid"}
                        className={getValidationClass(fieldStates.email)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">{t.form.company}</Label>
                      <Input
                        id="company"
                        name="company"
                        autoComplete="organization"
                        minLength={2}
                        maxLength={100}
                        value={formData.company}
                        ref={(node) => { inputRefs.current.company = node; }}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={language === 'es' ? 'Tu Empresa' : 'Your Company'}
                        aria-invalid={fieldStates.company === "invalid"}
                        className={getValidationClass(fieldStates.company)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.form.phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        pattern="[0-9+()\-\s]{8,20}"
                        maxLength={20}
                        value={formData.phone}
                        ref={(node) => { inputRefs.current.phone = node; }}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+506 8402 7214"
                        aria-invalid={fieldStates.phone === "invalid"}
                        className={getValidationClass(fieldStates.phone)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">{t.form.service}</Label>
                    <Select
                      value={formData.service_interest}
                      onValueChange={(value) => setFormData({ ...formData, service_interest: value })}
                    >
                      <SelectTrigger className={getValidationClass(fieldStates.service_interest)}>

                        <SelectValue placeholder={t.form.selectService} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web_development">{t.form.webDevelopment}</SelectItem>
                        <SelectItem value="ecommerce">{t.form.ecommerce}</SelectItem>
                        <SelectItem value="both">{t.form.both}</SelectItem>
                        <SelectItem value="custom">{t.form.custom}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.form.message} * <span className="text-gray-400 font-normal text-sm">({formData.message.length}/2000)</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      autoComplete="on"
                      required
                      minLength={10}
                      maxLength={2000}
                      value={formData.message}
                      ref={(node) => { inputRefs.current.message = node; }}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.form.messagePlaceholder}
                      rows={5}
                      aria-invalid={fieldStates.message === "invalid"}
                      className={`${getValidationClass(fieldStates.message)} resize-none`}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-lg py-6"
                  >
                    {isSubmitting ? (
                      t.form.sending
                    ) : (
                      <>
                        {t.form.send}
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <a
                    href="https://wa.me/50684027214"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg py-6 rounded-md font-medium transition-all duration-200"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {language === 'es' ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}
                  </a>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            ref={infoRef}
            className="space-y-8"
            variants={contactFadeReveal}
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.getInTouch}</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {t.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.info.email}</h4>
                  <p className="text-gray-600">purawebsoluciones@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-red-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.info.phone}</h4>
                  <p className="text-gray-600">+506 8402 7214</p>
                  <p className="text-gray-600">{t.info.phoneAvailable}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.info.location}</h4>
                  <p className="text-gray-600">{t.info.locationCity}</p>
                  <p className="text-gray-600">{t.info.locationServing}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Contact;