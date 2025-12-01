import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Ticket,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ChevronRight,
  Inbox,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";
import TicketChat from "./TicketChat";

const translations = {
  es: {
    title: "Mis Tickets de Soporte",
    noTickets: "No tienes tickets aún",
    noTicketsDesc: "Cuando envíes una consulta, aparecerá aquí.",
    viewDetails: "Ver detalles",
    status: {
      open: "Abierto",
      in_progress: "En Progreso",
      resolved: "Resuelto",
      closed: "Cerrado"
    },
    categories: {
      billing: "Facturación",
      technical: "Técnico",
      general: "General",
      feature_request: "Sugerencia"
    }
  },
  en: {
    title: "My Support Tickets",
    noTickets: "You don't have any tickets yet",
    noTicketsDesc: "When you submit an inquiry, it will appear here.",
    viewDetails: "View details",
    status: {
      open: "Open",
      in_progress: "In Progress",
      resolved: "Resolved",
      closed: "Closed"
    },
    categories: {
      billing: "Billing",
      technical: "Technical",
      general: "General",
      feature_request: "Feature Request"
    }
  }
};

const statusConfig = {
  open: {
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 border-yellow-200"
  },
  in_progress: {
    icon: AlertCircle,
    className: "bg-blue-100 text-blue-700 border-blue-200"
  },
  resolved: {
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border-green-200"
  },
  closed: {
    icon: XCircle,
    className: "bg-gray-100 text-gray-700 border-gray-200"
  }
};

export default function UserTickets({ user }) {
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === "es" ? es : enUS;

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, [user.email]);

  const fetchTickets = async () => {
    try {
      const data = await base44.entities.SupportTicket.filter(
        { user_email: user.email },
        "-created_date",
        20
      );
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSent = () => {
    fetchTickets(); // Refresh tickets list
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Inbox className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t.noTickets}
          </h3>
          <p className="text-gray-500">{t.noTicketsDesc}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            {t.title}
            <Badge variant="secondary" className="ml-2">
              {tickets.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tickets.map((ticket) => {
            const status = statusConfig[ticket.status] || statusConfig.open;
            const StatusIcon = status.icon;
            return (
              <div
                key={ticket.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {ticket.subject}
                      </h3>
                      <MessageSquare className="w-4 h-4 text-blue-600 shrink-0" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge
                        variant="outline"
                        className={status.className}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {t.status[ticket.status]}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {t.categories[ticket.category]}
                      </Badge>
                      <span className="text-gray-400 text-xs">
                        {ticket.created_date &&
                          format(new Date(ticket.created_date), "dd MMM yyyy", {
                            locale: dateLocale
                          })}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Ticket Chat Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
                    <DialogContent className="sm:max-w-lg p-0 overflow-hidden max-h-[85vh] w-[92vw] left-[4vw] translate-x-0 sm:left-[50%] sm:translate-x-[-50%] sm:w-full">
          {selectedTicket && (
            <TicketChat 
              ticket={selectedTicket}
              currentUser={user}
              isAdmin={false}
              onMessageSent={handleMessageSent}
              onClose={() => setSelectedTicket(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}