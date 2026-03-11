import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, Send, MessageCircle, Loader2, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/components/LanguageContext";
import { buildKnowledgeBasePrompt } from "@/components/chatbot/buildKnowledgeBasePrompt";

const Chatbot = memo(function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { language } = useLanguage();

  const { data: knowledgeBaseEntries = [], isLoading: isKnowledgeBaseLoading } = useQuery({
    queryKey: ["chatbot-knowledge-base", language],
    queryFn: async () => {
      const entries = await base44.entities.KnowledgeBaseEntry.filter({
        language,
        is_published: true
      });

      return [...entries].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    },
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const welcomeMessage = useMemo(() => {
    return language === "es"
      ? "¡Hola! 👋 Soy el asistente virtual de PuraWeb CR. Respondo usando la base de conocimiento actual del sitio. ¿En qué puedo ayudarte hoy?"
      : "Hello! 👋 I’m the PuraWeb CR virtual assistant. I answer using the website’s current knowledge base. How can I help you today?";
  }, [language]);

  const isChatReady = knowledgeBaseEntries.length > 0;

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: "assistant", content: welcomeMessage }]);
    }
  }, [isOpen, messages.length, welcomeMessage]);

  useEffect(() => {
    if (!isKnowledgeBaseLoading && isOpen && !isChatReady) {
      const fallbackMessage = language === "es"
        ? "La base de conocimiento aún no tiene contenido publicado. Un administrador puede cargarla desde el panel de administración."
        : "The knowledge base does not have published content yet. An administrator can load it from the admin panel.";

      setMessages((prev) => {
        if (prev.some((message) => message.content === fallbackMessage)) {
          return prev;
        }
        return [...prev, { role: "assistant", content: fallbackMessage }];
      });
    }
  }, [isKnowledgeBaseLoading, isOpen, isChatReady, language]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading || !isChatReady) return;

    const userMessage = inputValue.trim();
    const roleUser = language === "es" ? "Usuario" : "User";
    const roleAssistant = language === "es" ? "Asistente" : "Assistant";
    const conversationHistory = messages
      .map((message) => `${message.role === "user" ? roleUser : roleAssistant}: ${message.content}`)
      .join("\n");

    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const prompt = buildKnowledgeBasePrompt({
        language,
        knowledgeBaseEntries,
        conversationHistory,
        userMessage
      });

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: false
      });

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      const errorMessage = language === "es"
        ? "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo."
        : "Sorry, there was an error processing your message. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, isChatReady, knowledgeBaseEntries, language, messages]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const inputPlaceholder = isKnowledgeBaseLoading
    ? language === "es"
      ? "Cargando knowledge base..."
      : "Loading knowledge base..."
    : !isChatReady
      ? language === "es"
        ? "Knowledge base no disponible"
        : "Knowledge base unavailable"
      : language === "es"
        ? "Escribe tu pregunta..."
        : "Type your question...";

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 shadow-2xl z-50 flex items-center justify-center"
          aria-label={language === "es" ? "Abrir chat" : "Open chat"}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed inset-x-3 bottom-3 top-20 flex flex-col overflow-hidden rounded-2xl shadow-2xl z-50 max-h-[calc(100vh-5.75rem)] sm:inset-x-auto sm:top-auto sm:bottom-6 sm:right-6 sm:w-full sm:max-w-md sm:h-[600px]">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-t-2xl sm:rounded-t-lg">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold truncate">PuraWeb CR</h3>
                <div className="flex items-center gap-1 text-xs text-blue-100">
                  <Database className="w-3 h-3" />
                  <span className="truncate">
                    {language === "es" ? "Asistente conectado al Knowledge Base" : "Assistant connected to the Knowledge Base"}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-blue-900 text-white"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {(isLoading || isKnowledgeBaseLoading) && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-lg p-3 shadow-sm">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 sm:p-4 border-t bg-white rounded-b-2xl sm:rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={inputPlaceholder}
                className="flex-1"
                disabled={isLoading || isKnowledgeBaseLoading || !isChatReady}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading || isKnowledgeBaseLoading || !isChatReady}
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