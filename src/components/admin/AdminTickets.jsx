import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Filter,
  ChevronDown,
} from "lucide-react";
import moment from "moment";
import TicketChat from "@/components/support/TicketChat";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ticketsData, user] = await Promise.all([
        base44.entities.SupportTicket.list("-created_date"),
        base44.auth.me()
      ]);
      setTickets(ticketsData);
      setCurrentUser(user);
    } catch (error) {
      console.error("Error loading data:", error);
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

  const openChatDialog = (ticket) => {
    setSelectedTicket(ticket);
    setDialogOpen(true);
  };

  const handleMessageSent = () => {
    loadData(); // Refresh tickets
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
                  onOpenChat={openChatDialog}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[85vh]">
          {selectedTicket && currentUser && (
            <TicketChat 
              ticket={selectedTicket}
              currentUser={currentUser}
              isAdmin={true}
              onMessageSent={handleMessageSent}
              onClose={() => setDialogOpen(false)}
              onStatusChange={(ticket, newStatus) => {
                handleStatusChange(ticket, newStatus);
                setSelectedTicket({ ...ticket, status: newStatus });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TicketCard({ ticket, onStatusChange, onOpenChat }) {
  const status = statusConfig[ticket.status] || statusConfig.open;
  const priority = priorityConfig[ticket.priority] || priorityConfig.medium;
  const StatusIcon = status.icon;

  return (
    <div 
      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white cursor-pointer relative"
      onClick={() => onOpenChat(ticket)}
    >
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
            </div>
          </div>
        </div>

        <div className="flex items-start" onClick={(e) => e.stopPropagation()}>
          {/* Status Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.color} hover:opacity-80 transition-opacity`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {status.label}
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => onStatusChange(ticket, "open")}
                disabled={ticket.status === "open"}
              >
                <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                Abierto
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(ticket, "in_progress")}
                disabled={ticket.status === "in_progress"}
              >
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                En Proceso
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(ticket, "resolved")}
                disabled={ticket.status === "resolved"}
              >
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                Resuelto
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(ticket, "closed")}
                disabled={ticket.status === "closed"}
              >
                <XCircle className="w-4 h-4 mr-2 text-gray-600" />
                Cerrado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Chat Button - Bottom Right (Absolute) */}
      <div className="absolute bottom-4 right-4" onClick={(e) => e.stopPropagation()}>
        <Button
          size="sm"
          onClick={() => onOpenChat(ticket)}
          className="bg-blue-900 hover:bg-blue-800"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Chat
        </Button>
      </div>
    </div>
  );
}