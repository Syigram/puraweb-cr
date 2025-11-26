import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Ticket,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ChevronRight,
  Inbox
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";

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
    },
    yourMessage: "Tu mensaje",
    response: "Respuesta del equipo",
    respondedOn: "Respondido el",
    awaitingResponse: "Esperando respuesta",
    close: "Cerrar"
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
    },
    yourMessage: "Your message",
    response: "Team response",
    respondedOn: "Responded on",
    awaitingResponse: "Awaiting response",
    close: "Close"
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
    icon: CheckCircle2,
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
                      {ticket.admin_response && (
                        <MessageSquare className="w-4 h-4 text-green-600 shrink-0" />
                      )}
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

      {/* Ticket Detail Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pr-8">{selectedTicket?.subject}</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={statusConfig[selectedTicket.status]?.className}
                >
                  {t.status[selectedTicket.status]}
                </Badge>
                <Badge variant="secondary">
                  {t.categories[selectedTicket.category]}
                </Badge>
                <span className="text-sm text-gray-400">
                  {selectedTicket.created_date &&
                    format(new Date(selectedTicket.created_date), "dd MMMM yyyy, HH:mm", {
                      locale: dateLocale
                    })}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">{t.yourMessage}</p>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                  {selectedTicket.message}
                </div>
              </div>

              {selectedTicket.admin_response ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-600 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    {t.response}
                  </p>
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-gray-700">
                    {selectedTicket.admin_response}
                  </div>
                  {selectedTicket.responded_at && (
                    <p className="text-xs text-gray-400">
                      {t.respondedOn}{" "}
                      {format(new Date(selectedTicket.responded_at), "dd MMMM yyyy, HH:mm", {
                        locale: dateLocale
                      })}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-center">
                  <Clock className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-yellow-700">{t.awaitingResponse}</p>
                </div>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelectedTicket(null)}
              >
                {t.close}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}