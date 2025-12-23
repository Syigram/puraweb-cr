import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Loader2, 
  User, 
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const translations = {
  es: {
    typeMessage: "Escribe tu mensaje...",
    send: "Enviar",
    sending: "Enviando...",
    you: "Tú",
    support: "Soporte",
    ticketClosed: "Este ticket está cerrado",
    noMessages: "Inicia la conversación enviando un mensaje",
    changeStatus: "Cambiar estado",
    status: {
      open: "Abierto",
      in_progress: "En Progreso",
      resolved: "Resuelto",
      closed: "Cerrado"
    }
  },
  en: {
    typeMessage: "Type your message...",
    send: "Send",
    sending: "Sending...",
    you: "You",
    support: "Support",
    ticketClosed: "This ticket is closed",
    noMessages: "Start the conversation by sending a message",
    changeStatus: "Change status",
    status: {
      open: "Open",
      in_progress: "In Progress",
      resolved: "Resolved",
      closed: "Closed"
    }
  }
};

const statusConfig = {
  open: { icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  in_progress: { icon: AlertCircle, color: "bg-blue-100 text-blue-700" },
  resolved: { icon: CheckCircle2, color: "bg-green-100 text-green-700" },
  closed: { icon: XCircle, color: "bg-gray-100 text-gray-700" }
};

export default function TicketChat({ 
  ticket, 
  currentUser, 
  isAdmin = false,
  onMessageSent,
  onClose,
  onStatusChange
}) {
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === "es" ? es : enUS;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (ticket?.id) {
      loadMessages();
    }
  }, [ticket?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const data = await base44.entities.TicketMessage.filter(
        { ticket_id: ticket.id },
        "created_date"
      );
      
      // Add original ticket message as first message if no messages exist
      const allMessages = [];
      
      // Original ticket message
      allMessages.push({
        id: "original",
        ticket_id: ticket.id,
        sender_type: "user",
        sender_email: ticket.user_email,
        sender_name: ticket.user_name,
        message: ticket.message,
        created_date: ticket.created_date
      });
      
      // Add conversation messages
      allMessages.push(...data);
      
      // Add legacy admin response if exists and no other admin messages
      if (ticket.admin_response && !data.some(m => m.sender_type === "admin")) {
        allMessages.push({
          id: "legacy-response",
          ticket_id: ticket.id,
          sender_type: "admin",
          sender_email: "soporte@puraweb.cr",
          sender_name: "Equipo de Soporte",
          message: ticket.admin_response,
          created_date: ticket.responded_at || ticket.updated_date
        });
      }
      
      setMessages(allMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const messageData = {
        ticket_id: ticket.id,
        sender_type: isAdmin ? "admin" : "user",
        sender_email: currentUser.email,
        sender_name: currentUser.full_name || currentUser.email.split("@")[0],
        message: newMessage.trim()
      };

      const created = await base44.entities.TicketMessage.create(messageData);
      
      // Update ticket status if admin responds
      if (isAdmin && ticket.status === "open") {
        await base44.entities.SupportTicket.update(ticket.id, { 
          status: "in_progress",
          admin_response: newMessage.trim(),
          responded_at: new Date().toISOString()
        });
      }
      
      // If user responds to a resolved ticket, reopen it
      if (!isAdmin && ticket.status === "resolved") {
        await base44.entities.SupportTicket.update(ticket.id, { status: "in_progress" });
      }

      setMessages([...messages, { ...messageData, id: created.id, created_date: new Date().toISOString() }]);
      setNewMessage("");
      
      if (onMessageSent) {
        onMessageSent();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isClosed = ticket?.status === "closed";
  const status = statusConfig[ticket?.status] || statusConfig.open;
  const StatusIcon = status.icon;

  return (
    <div className="flex flex-col h-full max-h-[90vh]">
      {/* Header - Mobile Optimized */}
      <div className="border-b bg-gray-50 px-3 sm:px-4 py-3 sm:pr-16">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">{ticket?.subject}</h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
              {ticket?.user_name}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {ticket?.user_email}
            </p>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:mr-0">
            {isAdmin && onStatusChange ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium ${status.color} hover:opacity-80 transition-opacity whitespace-nowrap`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="hidden sm:inline">{t.status[ticket?.status]}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(ticket, "open")}
                    disabled={ticket?.status === "open"}
                  >
                    <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                    {t.status.open}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(ticket, "in_progress")}
                    disabled={ticket?.status === "in_progress"}
                  >
                    <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
                    {t.status.in_progress}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(ticket, "resolved")}
                    disabled={ticket?.status === "resolved"}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                    {t.status.resolved}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(ticket, "closed")}
                    disabled={ticket?.status === "closed"}
                  >
                    <XCircle className="w-4 h-4 mr-2 text-gray-600" />
                    {t.status.closed}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Badge className={`${status.color} text-xs`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">{t.status[ticket?.status]}</span>
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Messages - Mobile Optimized */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50 to-white"
           style={{ minHeight: '300px', maxHeight: 'calc(90vh - 200px)' }}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-blue-900" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            {t.noMessages}
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => {
              const isUserMessage = msg.sender_type === "user";
              const isCurrentUser = msg.sender_email === currentUser?.email;
              const showOnRight = isAdmin ? !isUserMessage : isUserMessage;

              return (
                <motion.div
                  key={msg.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${showOnRight ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-end gap-1.5 sm:gap-2 max-w-[85%] sm:max-w-[80%] ${showOnRight ? "flex-row-reverse" : ""}`}>
                    {/* Avatar */}
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isUserMessage 
                        ? "bg-blue-100 text-blue-600" 
                        : "bg-green-100 text-green-600"
                    }`}>
                      {isUserMessage ? (
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${
                      showOnRight
                        ? "bg-blue-900 text-white rounded-br-md"
                        : "bg-white border shadow-sm rounded-bl-md"
                    }`}>
                      <div className={`text-xs mb-1 font-medium ${showOnRight ? "text-blue-200" : "text-gray-500"}`}>
                        {isUserMessage 
                          ? (isCurrentUser ? t.you : msg.sender_name) 
                          : t.support}
                      </div>
                      <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">{msg.message}</p>
                      <div className={`text-xs mt-1 ${showOnRight ? "text-blue-300" : "text-gray-400"}`}>
                        {msg.created_date && format(
                          new Date(msg.created_date), 
                          "dd MMM, HH:mm", 
                          { locale: dateLocale }
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Mobile Optimized */}
      {isClosed ? (
        <div className="border-t bg-gray-100 px-3 sm:px-4 py-3 text-center text-xs sm:text-sm text-gray-500">
          {t.ticketClosed}
        </div>
      ) : (
        <div className="border-t bg-white p-3 sm:p-4">
          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.typeMessage}
              className="resize-none min-h-[44px] max-h-[120px] text-sm sm:text-base"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim() || sending}
              className="bg-blue-900 hover:bg-blue-800 shrink-0 h-11 w-11 sm:h-12 sm:w-12 p-0"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}