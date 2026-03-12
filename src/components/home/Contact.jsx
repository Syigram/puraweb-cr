import React, { useState, memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useScrollReveal, slideInLeft, slideInRight } from "@/components/animations/useScrollReveal";
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
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            ref={formRef}
            variants={slideInLeft}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
          >
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
                        minLength={2}
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nombre Completo"
                        className="contact-field border-gray-300"
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
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nombre@example.com"
                        className="contact-field border-gray-300"
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
                        maxLength={100}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={language === 'es' ? 'Tu Empresa' : 'Your Company'}
                        className="contact-field border-gray-300"
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
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+506 8402 7214"
                        className="contact-field border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">{t.form.service}</Label>
                    <Select
                      value={formData.service_interest}
                      onValueChange={(value) => setFormData({ ...formData, service_interest: value })}
                    >
                      <SelectTrigger className={formData.service_interest ? "border-green-500 focus:ring-green-500" : "border-gray-300"}>
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
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.form.messagePlaceholder}
                      rows={5}
                      className="contact-field border-gray-300 resize-none"
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
          </motion.div>

          {/* Contact Info */}
          <motion.div
            ref={infoRef}
            className="space-y-8"
            variants={slideInRight}
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