import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/components/utils/sanitize";

const initialFormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service_interest: "",
  message: ""
};

const initialTouchedFields = {
  name: false,
  email: false,
  company: false,
  phone: false,
  service_interest: false,
  message: false
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getFieldClasses = (state) => {
  if (state === "valid") {
    return "border-green-500 focus-visible:ring-green-500/30";
  }

  if (state === "invalid") {
    return "border-red-500 focus-visible:ring-red-500/30";
  }

  return "border-gray-300 focus-visible:ring-blue-900/30";
};

const Contact = memo(function Contact({ transparent = false }) {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language].contact, [language]);
  const [formData, setFormData] = useState(initialFormData);
  const [touchedFields, setTouchedFields] = useState(initialTouchedFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const fieldRefs = useRef({});
  const formDataRef = useRef(initialFormData);
  const touchedFieldsRef = useRef(initialTouchedFields);

  const fieldValidation = useMemo(() => {
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmailValue = sanitizeEmail(formData.email);
    const sanitizedCompany = sanitizeInput(formData.company);
    const sanitizedPhoneValue = sanitizePhone(formData.phone);
    const phoneDigits = sanitizedPhoneValue.replace(/\D/g, "");
    const sanitizedMessage = sanitizeInput(formData.message);

    return {
      name: sanitizedName.length >= 2,
      email: emailRegex.test(sanitizedEmailValue),
      company: formData.company.trim() === "" ? null : sanitizedCompany.length >= 2,
      phone: formData.phone.trim() === "" ? null : phoneDigits.length >= 8,
      service_interest: formData.service_interest === "" ? null : true,
      message: sanitizedMessage.length >= 10
    };
  }, [formData]);

  const getFieldState = (fieldName) => {
    if (!touchedFields[fieldName]) return "neutral";

    const value = fieldValidation[fieldName];
    if (value === true) return "valid";
    if (value === false) return "invalid";
    return "neutral";
  };

  const markFieldAsTouched = (fieldName) => {
    setTouchedFields((prev) => (prev[fieldName] ? prev : { ...prev, [fieldName]: true }));
  };

  useEffect(() => {
    formDataRef.current = formData;
    touchedFieldsRef.current = touchedFields;
  }, [formData, touchedFields]);

  const syncAutofilledFields = useCallback(() => {
    const nextData = {};
    const nextTouched = {};

    ["name", "email", "company", "phone", "message"].forEach((fieldName) => {
      const element = fieldRefs.current[fieldName];
      if (!element) return;

      const domValue = element.value || "";
      if (domValue && domValue !== formDataRef.current[fieldName]) {
        nextData[fieldName] = domValue;
        nextTouched[fieldName] = true;
      }
    });

    if (Object.keys(nextData).length > 0) {
      setFormData((prev) => ({ ...prev, ...nextData }));
    }

    if (Object.keys(nextTouched).length > 0) {
      setTouchedFields((prev) => ({ ...prev, ...nextTouched }));
    }
  }, []);

  const queueAutofillSync = useCallback(() => {
    requestAnimationFrame(() => {
      syncAutofilledFields();
      setTimeout(syncAutofilledFields, 120);
    });
  }, [syncAutofilledFields]);

  const handleAutofillStart = useCallback((e) => {
    if (e.animationName === "autofill-start") {
      queueAutofillSync();
    }
  }, [queueAutofillSync]);

  useEffect(() => {
    queueAutofillSync();

    const timeouts = [250, 800, 1600].map((delay) =>
      setTimeout(queueAutofillSync, delay)
    );

    window.addEventListener("focus", queueAutofillSync);
    window.addEventListener("pageshow", queueAutofillSync);

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener("focus", queueAutofillSync);
      window.removeEventListener("pageshow", queueAutofillSync);
    };
  }, [queueAutofillSync]);

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

      setIsSuccess(true);
      setFormData(initialFormData);
      setTouchedFields(initialTouchedFields);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(t.form.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-16 ${transparent ? 'bg-transparent' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <style>{`
        @keyframes autofill-start {
          from {}
          to {}
        }

        input:-webkit-autofill,
        textarea:-webkit-autofill {
          animation-name: autofill-start;
          animation-duration: 0.01s;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="border-0 shadow-xl">
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.form.name} *</Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        maxLength={100}
                        value={formData.name}
                        ref={(node) => {
                          fieldRefs.current.name = node;
                        }}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={queueAutofillSync}
                        onAnimationStart={handleAutofillStart}
                        onBlur={() => markFieldAsTouched("name")}
                        aria-invalid={getFieldState("name") === "invalid"}
                        placeholder="Nombre Completo"
                        className={getFieldClasses(getFieldState("name"))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.form.email} *</Label>
                      <Input
                        id="email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        required
                        maxLength={150}
                        value={formData.email}
                        ref={(node) => {
                          fieldRefs.current.email = node;
                        }}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={queueAutofillSync}
                        onAnimationStart={handleAutofillStart}
                        onBlur={() => markFieldAsTouched("email")}
                        aria-invalid={getFieldState("email") === "invalid"}
                        placeholder="nombre@example.com"
                        className={getFieldClasses(getFieldState("email"))}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">{t.form.company}</Label>
                      <Input
                        id="company"
                        name="organization"
                        autoComplete="organization"
                        maxLength={100}
                        value={formData.company}
                        ref={(node) => {
                          fieldRefs.current.company = node;
                        }}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={queueAutofillSync}
                        onAnimationStart={handleAutofillStart}
                        onBlur={() => markFieldAsTouched("company")}
                        aria-invalid={getFieldState("company") === "invalid"}
                        placeholder={language === 'es' ? 'Tu Empresa' : 'Your Company'}
                        className={getFieldClasses(getFieldState("company"))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.form.phone}</Label>
                      <Input
                        id="phone"
                        name="tel"
                        autoComplete="tel"
                        type="tel"
                        maxLength={20}
                        value={formData.phone}
                        ref={(node) => {
                          fieldRefs.current.phone = node;
                        }}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={queueAutofillSync}
                        onAnimationStart={handleAutofillStart}
                        onBlur={() => markFieldAsTouched("phone")}
                        aria-invalid={getFieldState("phone") === "invalid"}
                        placeholder="+506 8402 7214"
                        className={getFieldClasses(getFieldState("phone"))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">{t.form.service}</Label>
                    <Select
                      value={formData.service_interest}
                      onValueChange={(value) => {
                        setFormData({ ...formData, service_interest: value });
                        markFieldAsTouched("service_interest");
                      }}
                    >
                      <SelectTrigger
                        aria-invalid={getFieldState("service_interest") === "invalid"}
                        className={getFieldClasses(getFieldState("service_interest"))}
                      >
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
                      autoComplete="off"
                      required
                      maxLength={2000}
                      value={formData.message}
                      ref={(node) => {
                        fieldRefs.current.message = node;
                      }}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={queueAutofillSync}
                      onAnimationStart={handleAutofillStart}
                      onBlur={() => markFieldAsTouched("message")}
                      aria-invalid={getFieldState("message") === "invalid"}
                      placeholder={t.form.messagePlaceholder}
                      rows={5}
                      className={`${getFieldClasses(getFieldState("message"))} resize-none`}
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
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
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
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;