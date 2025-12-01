import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  Search,
  MoreVertical,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Send,
  Mail,
  Filter,
} from "lucide-react";
import moment from "moment";

const statusConfig = {
  open: { label: "Abierto", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  in_progress: { label: "En Proceso", color: "bg-blue-100 text-blue-800", icon: Clock },
  resolved: { label: "Resuelto", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  closed: { label: "Cerrado", color: "bg-gray-100 text-gray-800", icon: XCircle },
};

const priorityConfig = {
  low: { label: "Baja", color: "bg-gray-100 text-gray-700" },
  medium: { label: "Media", color: "bg-yellow-100 text-yellow-700" },
  high: { label: "Alta", color: "bg-red-100 text-red-700" },
};

const categoryLabels = {
  billing: "Facturación",
  technical: "Técnico",
  general: "General",
  feature_request: "Solicitud",
};

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [responding, setResponding] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await base44.entities.SupportTicket.list("-created_date");
      setTickets(data);
    } catch (error) {
      console.error("Error loading tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (ticket, newStatus) => {
    try {
      await base44.entities.SupportTicket.update(ticket.id, { status: newStatus });
      setTickets(tickets.map(t => t.id === ticket.id ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePriorityChange = async (ticket, newPriority) => {
    try {
      await base44.entities.SupportTicket.update(ticket.id, { priority: newPriority });
      setTickets(tickets.map(t => t.id === ticket.id ? { ...t, priority: newPriority } : t));
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const openResponseDialog = (ticket) => {
    setSelectedTicket(ticket);
    setResponseText(ticket.admin_response || "");
    setDialogOpen(true);
  };

  const handleSendResponse = async () => {
    if (!responseText.trim() || !selectedTicket) return;

    setResponding(true);
    try {
      // Update ticket with response
      await base44.entities.SupportTicket.update(selectedTicket.id, {
        admin_response: responseText,
        responded_at: new Date().toISOString(),
        status: "in_progress",
      });

      // Send email notification
      await base44.integrations.Core.SendEmail({
        to: selectedTicket.user_email,
        subject: `Respuesta a tu ticket: ${selectedTicket.subject}`,
        body: `
          <h2>Hola ${selectedTicket.user_name || ""},</h2>
          <p>Hemos respondido a tu ticket de soporte:</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Asunto:</strong> ${selectedTicket.subject}</p>
            <p><strong>Nuestra respuesta:</strong></p>
            <p>${responseText}</p>
          </div>
          <p>Si tienes más preguntas, no dudes en contactarnos.</p>
          <p>Saludos,<br>Equipo PuraWeb CR</p>
        `,
      });

      // Update local state
      setTickets(tickets.map(t => 
        t.id === selectedTicket.id 
          ? { ...t, admin_response: responseText, responded_at: new Date().toISOString(), status: "in_progress" }
          : t
      ));

      setDialogOpen(false);
      setSelectedTicket(null);
      setResponseText("");
    } catch (error) {
      console.error("Error sending response:", error);
    } finally {
      setResponding(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ticketCounts = {
    open: tickets.filter(t => t.status === "open").length,
    in_progress: tickets.filter(t => t.status === "in_progress").length,
    resolved: tickets.filter(t => t.status === "resolved").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">Abiertos</p>
              <p className="text-2xl font-bold text-yellow-800">{ticketCounts.open}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">En Proceso</p>
              <p className="text-2xl font-bold text-blue-800">{ticketCounts.in_progress}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Resueltos</p>
              <p className="text-2xl font-bold text-green-800">{ticketCounts.resolved}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Tickets de Soporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por asunto, email o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="open">Abiertos</SelectItem>
                <SelectItem value="in_progress">En Proceso</SelectItem>
                <SelectItem value="resolved">Resueltos</SelectItem>
                <SelectItem value="closed">Cerrados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tickets List */}
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No se encontraron tickets</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onStatusChange={handleStatusChange}
                  onPriorityChange={handlePriorityChange}
                  onRespond={openResponseDialog}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Responder Ticket</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{selectedTicket.subject}</p>
                    <p className="text-sm text-gray-500">
                      De: {selectedTicket.user_name} ({selectedTicket.user_email})
                    </p>
                  </div>
                  <Badge className={categoryLabels[selectedTicket.category] ? "bg-gray-100 text-gray-700" : ""}>
                    {categoryLabels[selectedTicket.category] || selectedTicket.category}
                  </Badge>
                </div>
                <p className="text-gray-700 mt-3">{selectedTicket.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tu respuesta</label>
                <Textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  rows={6}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSendResponse}
              disabled={!responseText.trim() || responding}
              className="bg-blue-900 hover:bg-blue-800"
            >
              {responding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Respuesta
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TicketCard({ ticket, onStatusChange, onPriorityChange, onRespond }) {
  const status = statusConfig[ticket.status] || statusConfig.open;
  const priority = priorityConfig[ticket.priority] || priorityConfig.medium;
  const StatusIcon = status.icon;

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${status.color}`}>
              <StatusIcon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{ticket.subject}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {ticket.user_name} • {ticket.user_email}
              </p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{ticket.message}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge variant="outline" className={priority.color}>
                  {priority.label}
                </Badge>
                <Badge variant="outline">
                  {categoryLabels[ticket.category] || ticket.category}
                </Badge>
                <span className="text-xs text-gray-400">
                  {moment(ticket.created_date).fromNow()}
                </span>
              </div>
              {ticket.admin_response && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-600 font-medium mb-1">Última respuesta:</p>
                  <p className="text-sm text-blue-800 line-clamp-2">{ticket.admin_response}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
          <Button
            size="sm"
            onClick={() => onRespond(ticket)}
            className="bg-blue-900 hover:bg-blue-800"
          >
            <Mail className="w-4 h-4 mr-1" />
            Responder
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => onStatusChange(ticket, "open")}
                disabled={ticket.status === "open"}
              >
                <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                Marcar como Abierto
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(ticket, "in_progress")}
                disabled={ticket.status === "in_progress"}
              >
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                Marcar En Proceso
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(ticket, "resolved")}
                disabled={ticket.status === "resolved"}
              >
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                Marcar como Resuelto
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(ticket, "closed")}
                disabled={ticket.status === "closed"}
              >
                <XCircle className="w-4 h-4 mr-2 text-gray-600" />
                Cerrar Ticket
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}