import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  CreditCard,
  Settings,
  HelpCircle,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const translations = {
  es: {
    title: "Envíanos un Mensaje",
    subtitle: "¿No encontraste la respuesta? Escríbenos y te responderemos pronto.",
    name: "Nombre",
    namePlaceholder: "Tu nombre completo",
    email: "Correo electrónico",
    emailPlaceholder: "tu@email.com",
    category: "Categoría",
    categoryPlaceholder: "Selecciona una categoría",
    categories: {
      billing: "Facturación y Pagos",
      technical: "Soporte Técnico",
      general: "Consulta General",
      feature_request: "Sugerencia de Mejora"
    },
    subject: "Asunto",
    subjectPlaceholder: "¿En qué podemos ayudarte?",
    message: "Mensaje",
    messagePlaceholder: "Describe tu consulta con el mayor detalle posible...",
    submit: "Enviar Mensaje",
    sending: "Enviando...",
    successTitle: "¡Mensaje Enviado!",
    successMessage: "Hemos recibido tu mensaje. Te responderemos en las próximas 24-48 horas.",
    sendAnother: "Enviar otro mensaje",
    required: "Este campo es requerido"
  },
  en: {
    title: "Send Us a Message",
    subtitle: "Didn't find the answer? Write to us and we'll respond soon.",
    name: "Name",
    namePlaceholder: "Your full name",
    email: "Email",
    emailPlaceholder: "you@email.com",
    category: "Category",
    categoryPlaceholder: "Select a category",
    categories: {
      billing: "Billing & Payments",
      technical: "Technical Support",
      general: "General Inquiry",
      feature_request: "Feature Request"
    },
    subject: "Subject",
    subjectPlaceholder: "How can we help you?",
    message: "Message",
    messagePlaceholder: "Describe your inquiry in as much detail as possible...",
    submit: "Send Message",
    sending: "Sending...",
    successTitle: "Message Sent!",
    successMessage: "We have received your message. We will respond within 24-48 hours.",
    sendAnother: "Send another message",
    required: "This field is required"
  }
};

const categoryIcons = {
  billing: CreditCard,
  technical: Settings,
  general: HelpCircle,
  feature_request: Sparkles
};

export default function SupportContactForm({ user }) {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: user?.full_name || "",
    email: user?.email || "",
    category: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t.required;
    if (!formData.email.trim()) newErrors.email = t.required;
    if (!formData.category) newErrors.category = t.required;
    if (!formData.subject.trim()) newErrors.subject = t.required;
    if (!formData.message.trim()) newErrors.message = t.required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await base44.entities.SupportTicket.create({
        subject: formData.subject,
        message: formData.message,
        category: formData.category,
        user_email: formData.email,
        user_name: formData.name,
        status: "open",
        priority: "medium"
      });

      // Enviar email de confirmación
      await base44.integrations.Core.SendEmail({
        to: formData.email,
        subject: language === 'es' 
          ? `Hemos recibido tu mensaje: ${formData.subject}`
          : `We received your message: ${formData.subject}`,
        body: language === 'es'
          ? `Hola ${formData.name},\n\nGracias por contactarnos. Hemos recibido tu mensaje y te responderemos en las próximas 24-48 horas.\n\nResumen de tu consulta:\nCategoría: ${t.categories[formData.category]}\nAsunto: ${formData.subject}\n\nSaludos,\nEl equipo de PuraWeb CR`
          : `Hi ${formData.name},\n\nThank you for contacting us. We have received your message and will respond within 24-48 hours.\n\nSummary of your inquiry:\nCategory: ${t.categories[formData.category]}\nSubject: ${formData.subject}\n\nBest regards,\nThe PuraWeb CR Team`
      });

      setSuccess(true);
    } catch (error) {
      console.error("Error submitting ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: user?.full_name || "",
      email: user?.email || "",
      category: "",
      subject: "",
      message: ""
    });
    setSuccess(false);
    setErrors({});
  };

  if (success) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t.successTitle}
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {t.successMessage}
          </p>
          <Button onClick={handleReset} variant="outline">
            {t.sendAnother}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-900" />
          {t.title}
        </CardTitle>
        <p className="text-gray-500 text-sm">{t.subtitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t.category}</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder={t.categoryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.categories).map(([key, label]) => {
                  const Icon = categoryIcons[key];
                  return (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{t.subject}</Label>
            <Input
              id="subject"
              placeholder={t.subjectPlaceholder}
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && (
              <p className="text-red-500 text-xs">{errors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t.message}</Label>
            <Textarea
              id="message"
              placeholder={t.messagePlaceholder}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 h-12"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.sending}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}