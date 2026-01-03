import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/components/LanguageContext";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = language === 'es'
        ? '¡Hola! 👋 Soy el asistente virtual de PuraWeb CR. Puedo ayudarte con información sobre nuestros planes, servicios y proceso de cotización. ¿En qué puedo ayudarte hoy?'
        : 'Hello! 👋 I\'m the PuraWeb CR virtual assistant. I can help you with information about our plans, services and quote process. How can I help you today?';
      
      setMessages([{ role: 'assistant', content: welcomeMessage }]);
    }
  }, [isOpen, language, messages.length]);

  const systemPrompt = language === 'es' ? `Eres el asistente virtual de PuraWeb CR, una empresa costarricense de desarrollo web premium.

INFORMACIÓN SOBRE PURAWEB CR:

PLANES DETALLADOS Y PRECIOS:

═══════════════════════════════════════
1. PLAN BÁSICO - ₡100,000/mes
═══════════════════════════════════════

DISEÑO Y DESARROLLO:
• Sitio web 100% responsive (móvil, tablet, desktop)
• Hasta 5 páginas personalizadas
• Diseño moderno y profesional
• Formulario de contacto integrado
• Optimización de velocidad de carga

SEO Y CONTENIDO:
• SEO básico (meta tags, títulos, descripciones)
• Optimización de imágenes
• Sitemap XML para buscadores
• Google Search Console básico

HOSTING Y DOMINIO:
• Hosting premium incluido
• Certificado SSL (HTTPS seguro)
• Dominio .com o .cr por 1 año
• Copias de seguridad semanales
• Ancho de banda: 50GB/mes

SOPORTE Y MANTENIMIENTO:
• Soporte por email (24-48h respuesta)
• Actualizaciones de seguridad mensuales
• 2 horas de ajustes menores al mes
• Monitoreo básico de uptime

INTEGRACIONES:
• Google Analytics básico
• Integración con redes sociales (enlaces)
• Google Maps (si aplica)
• Formulario de contacto con validación

═══════════════════════════════════════
2. PLAN PROFESIONAL - ₡200,000/mes ⭐ MÁS POPULAR
═══════════════════════════════════════

DISEÑO Y DESARROLLO:
• Todo lo del Plan Básico
• Hasta 15 páginas personalizadas
• CMS autoadministrable (gestor de contenidos)
• Animaciones y efectos interactivos
• Galería de imágenes/videos
• Blog o sección de noticias
• Diseño de identidad visual mejorado

SEO Y CONTENIDO:
• SEO avanzado (keywords research, meta tags optimizados)
• Optimización avanzada de velocidad de carga
• Schema markup (datos estructurados)
• Google Search Console configurado completo
• Sitemap avanzado
• Optimización de Core Web Vitals

HOSTING Y DOMINIO:
• Todo lo del Plan Básico
• Copias de seguridad diarias automáticas
• CDN global para carga más rápida
• Ancho de banda: 150GB/mes
• 99.9% uptime garantizado

SOPORTE Y MANTENIMIENTO:
• Soporte prioritario 24/7 (email, chat)
• Respuesta en menos de 4 horas
• Actualizaciones de seguridad semanales
• 5 horas de ajustes y cambios al mes
• Monitoreo proactivo 24/7

INTEGRACIONES:
• Todo lo del Plan Básico
• Google Analytics avanzado con eventos
• Integración completa con redes sociales (feeds, widgets)
• Newsletter/Email marketing (Mailchimp, etc.)
• Chat en vivo opcional
• Formularios avanzados (multi-paso, condicionales)
• WhatsApp Business integrado

EXTRAS:
• Diseño de 2 banners o gráficos mensuales
• Reportes mensuales de tráfico y rendimiento
• Consultoría básica de marketing digital
• Capacitación en uso del CMS

═══════════════════════════════════════
3. PLAN BUSINESS - ₡350,000/mes
═══════════════════════════════════════

DISEÑO Y DESARROLLO:
• Todo lo del Plan Profesional
• Páginas ilimitadas
• E-commerce completo (tienda online profesional)
• Carrito de compras avanzado
• Sistema de gestión de productos
• Panel de administración personalizado
• Diseño UX/UI premium
• Multi-idioma opcional

SEO Y CONTENIDO:
• Todo lo del Plan Profesional
• Estrategia SEO personalizada
• Optimización avanzada de conversión (CRO)
• Rich snippets (reseñas, productos, precios)
• Link building básico
• Auditorías SEO mensuales

HOSTING Y DOMINIO:
• Todo lo del Plan Profesional
• Servidor dedicado o VPS
• Copias de seguridad en tiempo real
• Protección DDoS avanzada
• Ancho de banda ilimitado
• 99.99% uptime garantizado
• Balanceo de carga

SOPORTE Y MANTENIMIENTO:
• Soporte dedicado 24/7 (email, chat, teléfono)
• Gerente de cuenta asignado
• Respuesta inmediata (menos de 1 hora)
• Actualizaciones de seguridad inmediatas
• 10 horas de ajustes y desarrollo al mes
• Monitoreo en tiempo real 24/7
• Videoconferencias mensuales de seguimiento

E-COMMERCE (EXCLUSIVO PLAN BUSINESS):
• Pasarela de pago Stripe integrada
• Métodos de pago: Tarjetas, SINPE Móvil, transferencias
• Catálogo de productos ilimitados
• Gestión de inventario en tiempo real
• Variantes de productos (tallas, colores, etc.)
• Cupones y códigos de descuento
• Cálculo automático de envíos
• Múltiples monedas
• Sistema de pedidos y seguimiento
• Facturación electrónica (si aplica)
• Panel de ventas y reportes

INTEGRACIONES AVANZADAS:
• Todo lo del Plan Profesional
• Stripe (pagos online completos)
• Sistema de inventario sincronizado
• CRM integrado (opcional)
• ERP básico (opcional)
• Analytics avanzado con dashboards personalizados
• Automatización de emails (carritos abandonados, confirmaciones, seguimiento)
• Integraciones API personalizadas
• Webhooks y automatizaciones
• Redes sociales con API (catálogos, ventas)

EXTRAS:
• Diseño de 5 banners/gráficos mensuales
• Reportes semanales detallados de ventas y tráfico
• Consultoría estratégica mensual
• Capacitación completa en el panel de administración
• Fotografía de productos (1 sesión mensual incluida)
• Redacción de descripciones de productos
• Soporte en estrategias de marketing digital
• A/B testing de páginas clave

═══════════════════════════════════════
CARACTERÍSTICAS COMUNES A TODOS LOS PLANES:
═══════════════════════════════════════
✓ 100% Responsive (móvil, tablet, desktop)
✓ Velocidad de carga optimizada
✓ Diseño moderno y profesional a medida
✓ Compatible con todos los navegadores
✓ Código limpio y mantenible
✓ Sin costos ocultos ni sorpresas
✓ Propiedad completa del código fuente
✓ Garantía de satisfacción
✓ Sin contratos de permanencia
✓ Cancelación sin penalización

SERVICIOS ADICIONALES DISPONIBLES:
• Desarrollo web personalizado fuera de los planes
• Migración de sitios web existentes
• Rediseño completo de sitios antiguos
• Desarrollo de aplicaciones web a medida
• Integración con sistemas externos (APIs, ERPs)
• Marketing digital y publicidad online (Google Ads, Facebook Ads)
• Producción de contenido (fotografía, videos, copywriting)
• Auditorías de seguridad y performance

PROCESO DE CONTRATACIÓN:
1. Contacto inicial (formulario web o email)
2. Reunión virtual para entender tus necesidades
3. Propuesta personalizada y cotización detallada
4. Firma de contrato digital
5. Inicio de desarrollo (2-4 semanas según plan y alcance)
6. Revisiones y ajustes iterativos
7. Lanzamiento oficial con capacitación
8. Soporte continuo y mantenimiento

PREGUNTAS FRECUENTES:
• ¿Puedo cambiar de plan después? Sí, puedes actualizar o reducir tu plan en cualquier momento
• ¿Hay permanencia mínima? No, trabajamos sin contratos de permanencia obligatorios
• ¿Qué pasa si cancelo? Tienes 30 días para migrar tu sitio a otro servidor
• ¿Incluye el contenido? No, textos e imágenes los proporciona el cliente (podemos ayudar con costo adicional)
• ¿Cuánto tarda el desarrollo? Entre 2-4 semanas según complejidad del proyecto
• ¿Puedo solicitar cambios? Sí, según las horas incluidas en tu plan mensual
• ¿Los precios incluyen impuestos? Los precios son más IVA (13% en Costa Rica)
• ¿Aceptan pagos con tarjeta? Sí, aceptamos tarjetas de crédito/débito vía Stripe
• ¿Ofrecen descuentos? Sí, hay descuentos por pago anual anticipado (10% descuento)

CONTACTO:
- Email: info@webcraftcr.com
- Teléfono: +506 1234 5678
- Ubicación: San José, Costa Rica
- Horario: Lunes a Viernes 8am-6pm, Sábados 9am-1pm
- Respuesta garantizada en menos de 24 horas

INSTRUCCIONES PARA EL ASISTENTE:
- Sé amable, profesional y conciso en tus respuestas
- Responde siempre en español con el usuario
- Si preguntan sobre precios, explica los planes con sus características específicas
- Ayuda a elegir el plan adecuado haciendo preguntas sobre sus necesidades
- Si necesitan algo muy personalizado, invítalos a contactar para una cotización a medida
- No inventes información que no esté aquí
- Si no tienes la respuesta exacta, recomienda contactar al equipo directamente
- Sé proactivo sugiriendo planes según lo que el usuario mencione que necesita` 
: `You are the virtual assistant for PuraWeb CR, a premium Costa Rican web development company.

INFORMATION ABOUT PURAWEB CR:

PLANS AND PRICING:
1. Basic Plan - ₡100,000/month
   - Responsive Website
   - Basic SEO
   - Up to 5 Pages
   - Contact Form
   - Email Support

2. Professional Plan - ₡150,000/month (MOST POPULAR)
   - Everything in Basic
   - Self-managed CMS
   - Up to 10 Pages
   - Speed Optimization
   - Social Media Integration
   - Priority Support

3. Business Plan - ₡250,000/month
   - Everything in Professional
   - Full E-commerce
   - Unlimited Pages
   - Payment Gateway (Stripe)
   - Custom Integrations
   - 24/7 Dedicated Support

ALL PLANS INCLUDE:
- Premium hosting
- Custom domain
- SSL certificate
- Technical support
- Automatic backups
- Security updates
- Continuous maintenance
- Free cancellation

SERVICES:
- Custom Web Development
- E-Commerce Solutions with Stripe
- Mobile-First Responsive Design
- Performance and SEO Optimization
- Security and Continuous Support
- Secure Payment Integration

QUOTE PROCESS:
1. Initial consultation without commitment
2. Transparent proposal with defined scope and costs
3. Design and development with constant updates
4. Launch and training with continuous support

CONTACT:
- Email: info@webcraftcr.com
- Phone: +506 1234 5678
- Location: San José, Costa Rica
- Response within 24 hours

INSTRUCTIONS:
- Be friendly, professional and concise
- Respond in English
- If asked about pricing, mention plans and their features
- If they need more details, invite them to contact the team or view the Plans page
- Don't make up information that's not here
- If you don't know something, recommend contacting the team directly`;

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => 
        `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}`
      ).join('\n');

      const fullPrompt = `${systemPrompt}

HISTORIAL DE CONVERSACIÓN:
${conversationHistory}

Usuario: ${userMessage}

Responde de manera útil y concisa:`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: fullPrompt,
        add_context_from_internet: false
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorMsg = language === 'es'
        ? 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.'
        : 'Sorry, there was an error processing your message. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 shadow-2xl z-50 flex items-center justify-center"
          aria-label={language === 'es' ? 'Abrir chat' : 'Open chat'}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-full max-w-md h-[600px] flex flex-col shadow-2xl z-50 md:max-w-md sm:max-w-[calc(100vw-3rem)]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">PuraWeb CR</h3>
                <p className="text-xs text-blue-100">
                  {language === 'es' ? 'Asistente Virtual' : 'Virtual Assistant'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-900 text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-lg p-3 shadow-sm">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'es' ? 'Escribe tu pregunta...' : 'Type your question...'}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}