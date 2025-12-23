import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import { Mail, Search, Calendar, Building2, Phone, User, MessageSquare, CheckCircle, Clock, XCircle } from "lucide-react";
import { format } from "date-fns";

const STATUS_CONFIG = {
  new: { label: "Nuevo", color: "bg-blue-100 text-blue-800", icon: Clock },
  contacted: { label: "Contactado", color: "bg-yellow-100 text-yellow-800", icon: MessageSquare },
  in_progress: { label: "En Progreso", color: "bg-purple-100 text-purple-800", icon: Clock },
  closed: { label: "Cerrado", color: "bg-green-100 text-green-800", icon: CheckCircle }
};

const SERVICE_LABELS = {
  web_development: "Desarrollo Web",
  ecommerce: "E-Commerce",
  both: "Ambos",
  custom: "Solución Personalizada"
};

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, statusFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await base44.entities.ContactRequest.list("-created_date", 100);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(msg =>
        msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }

    setFilteredMessages(filtered);
  };

  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      await base44.entities.ContactRequest.update(messageId, { status: newStatus });
      await fetchMessages();
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const getStatusStats = () => {
    return {
      total: messages.length,
      new: messages.filter(m => m.status === "new").length,
      contacted: messages.filter(m => m.status === "contacted").length,
      in_progress: messages.filter(m => m.status === "in_progress").length,
      closed: messages.filter(m => m.status === "closed").length
    };
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-gray-500">Cargando mensajes...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <div className="text-sm text-gray-600">Nuevos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
            <div className="text-sm text-gray-600">Contactados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.in_progress}</div>
            <div className="text-sm text-gray-600">En Progreso</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.closed}</div>
            <div className="text-sm text-gray-600">Cerrados</div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Mensajes de Contacto
          </CardTitle>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nombre, email, empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="new">Nuevo</SelectItem>
                <SelectItem value="contacted">Contactado</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="closed">Cerrado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No se encontraron mensajes
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onStatusChange={updateMessageStatus}
                  onClick={() => setSelectedMessage(message)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Details Dialog */}
      {selectedMessage && (
        <MessageDetailsDialog
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onStatusChange={updateMessageStatus}
        />
      )}
    </div>
  );
}

function MessageCard({ message, onStatusChange, onClick }) {
  const statusConfig = STATUS_CONFIG[message.status] || STATUS_CONFIG.new;
  const StatusIcon = statusConfig.icon;

  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 truncate">{message.name}</h3>
            <Badge className={statusConfig.color}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig.label}
            </Badge>
            {message.service_interest && (
              <Badge variant="outline" className="text-xs">
                {SERVICE_LABELS[message.service_interest] || message.service_interest}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {message.email}
            </span>
            {message.company && (
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {message.company}
              </span>
            )}
            {message.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {message.phone}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
            <Calendar className="w-3 h-3" />
            {format(new Date(message.created_date), "d MMM yyyy, HH:mm")}
          </div>
        </div>
        <div className="flex justify-start sm:shrink-0">
          <Select
            value={message.status}
            onValueChange={(value) => {
              onStatusChange(message.id, value);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Nuevo</SelectItem>
              <SelectItem value="contacted">Contactado</SelectItem>
              <SelectItem value="in_progress">En Progreso</SelectItem>
              <SelectItem value="closed">Cerrado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function MessageDetailsDialog({ message, onClose, onStatusChange }) {
  const statusConfig = STATUS_CONFIG[message.status] || STATUS_CONFIG.new;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Mensaje</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className={statusConfig.color}>
              {statusConfig.label}
            </Badge>
            {message.service_interest && (
              <Badge variant="outline">
                {SERVICE_LABELS[message.service_interest] || message.service_interest}
              </Badge>
            )}
          </div>

          <DetailRow label="Nombre" value={message.name} icon={User} />
          <DetailRow label="Email" value={message.email} icon={Mail} />
          {message.company && <DetailRow label="Empresa" value={message.company} icon={Building2} />}
          {message.phone && <DetailRow label="Teléfono" value={message.phone} icon={Phone} />}
          <DetailRow
            label="Fecha"
            value={format(new Date(message.created_date), "d MMMM yyyy, HH:mm")}
            icon={Calendar}
          />

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Mensaje
            </h4>
            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
          </div>

          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cambiar Estado
            </label>
            <Select
              value={message.status}
              onValueChange={(value) => {
                onStatusChange(message.id, value);
                onClose();
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Nuevo</SelectItem>
                <SelectItem value="contacted">Contactado</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="closed">Cerrado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button
              onClick={() => window.open(`mailto:${message.email}`, '_blank')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              Enviar Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-gray-400 mt-0.5" />
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="font-medium text-gray-900">{value}</div>
      </div>
    </div>
  );
}