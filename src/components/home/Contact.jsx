import React, { useState, memo, useMemo, useCallback } from "react";
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

const Contact = memo(function Contact() {
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
      await base44.entities.ContactRequest.create(formData);
      
      // Send email notification (non-blocking)
      const serviceLabels = {
        web_development: "Desarrollo Web",
        ecommerce: "E-Commerce",
        both: "Desarrollo Web y E-Commerce",
        custom: "Solución Personalizada"
      };

      base44.integrations.Core.SendEmail({
        to: "purawebsoluciones@gmail.com",
        from_name: formData.name,
        subject: `Consulta de ${formData.name}${formData.company ? ` - ${formData.company}` : ''}`,
        body: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #002B7F 0%, #0052CC 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
    .field { margin-bottom: 20px; }
    .label { font-weight: 600; color: #002B7F; margin-bottom: 5px; display: block; }
    .value { color: #374151; }
    .message-box { background: white; padding: 20px; border-left: 4px solid #002B7F; border-radius: 4px; margin-top: 10px; }
    .footer { background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 Nueva Consulta de Cliente</h1>
    </div>
    
    <div class="content">
      <div class="field">
        <span class="label">👤 Nombre:</span>
        <span class="value">${formData.name}</span>
      </div>
      
      <div class="field">
        <span class="label">✉️ Correo Electrónico:</span>
        <span class="value"><a href="mailto:${formData.email}">${formData.email}</a></span>
      </div>
      
      ${formData.company ? `
      <div class="field">
        <span class="label">🏢 Empresa:</span>
        <span class="value">${formData.company}</span>
      </div>
      ` : ''}
      
      ${formData.phone ? `
      <div class="field">
        <span class="label">📱 Teléfono:</span>
        <span class="value"><a href="tel:${formData.phone}">${formData.phone}</a></span>
      </div>
      ` : ''}
      
      ${formData.service_interest ? `
      <div class="field">
        <span class="label">💼 Servicio de Interés:</span>
        <span class="value">${serviceLabels[formData.service_interest] || formData.service_interest}</span>
      </div>
      ` : ''}
      
      <div class="field">
        <span class="label">💬 Mensaje:</span>
        <div class="message-box">${formData.message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    
    <div class="footer">
      Formulario de contacto - PuraWeb CR
    </div>
  </div>
</body>
</html>
        `
      }).catch(err => console.error("Error sending email notification:", err));

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

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

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
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nombre Completo"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.form.email} *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nombre@example.com"
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">{t.form.company}</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={language === 'es' ? 'Tu Empresa' : 'Your Company'}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.form.phone}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+506 8402 7214"
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">{t.form.service}</Label>
                    <Select
                      value={formData.service_interest}
                      onValueChange={(value) => setFormData({ ...formData, service_interest: value })}
                    >
                      <SelectTrigger className="border-gray-300">
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
                    <Label htmlFor="message">{t.form.message} *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.form.messagePlaceholder}
                      rows={5}
                      className="border-gray-300 resize-none"
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