import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/components/LanguageContext";

const Chatbot = memo(function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { language } = useLanguage();

  // Memoized scroll function
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Only scroll when messages change AND chat is open
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

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

PLANES Y PRECIOS:
1. Plan Básico - ₡100,000/mes
   - Sitio Web Responsive
   - SEO Básico
   - Hasta 5 Páginas
   - Formulario de Contacto
   - Soporte por Email

2. Plan Profesional - ₡150,000/mes (MÁS POPULAR)
   - Todo lo del Básico
   - CMS Autoadministrable
   - Hasta 10 Páginas
   - Optimización de Velocidad
   - Integración de Redes Sociales
   - Soporte Prioritario

3. Plan Empresa - ₡250,000/mes
   - Todo lo del Profesional
   - E-commerce Completo
   - Páginas Ilimitadas
   - Pasarela de Pagos (Stripe)
   - Integraciones Personalizadas
   - Soporte 24/7 Dedicado

TODOS LOS PLANES INCLUYEN:
- Hosting premium
- Dominio personalizado
- Certificado SSL
- Soporte técnico
- Backups automáticos
- Actualizaciones de seguridad
- Mantenimiento continuo
- Cancelación sin costo

SERVICIOS:
- Desarrollo Web personalizado
- Soluciones E-Commerce con Stripe
- Diseño Mobile-First responsive
- Optimización de rendimiento y SEO
- Seguridad y soporte continuo
- Integración de pagos seguros

PROCESO DE COTIZACIÓN:
1. Consulta inicial sin compromiso
2. Propuesta transparente con alcance y costos definidos
3. Diseño y desarrollo con actualizaciones constantes
4. Lanzamiento y capacitación con soporte continuo

CONTACTO:
- Email: info@webcraftcr.com
- Teléfono: +506 1234 5678
- Ubicación: San José, Costa Rica
- Respuesta en menos de 24 horas

INSTRUCCIONES:
- Sé amable, profesional y conciso
- Responde en español
- Si te preguntan sobre precios, menciona los planes y sus características
- Si necesitan más detalles, invítalos a contactar al equipo o ver la página de Planes
- No inventes información que no esté aquí
- Si no sabes algo, recomienda contactar directamente al equipo` 
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
});

export default Chatbot;