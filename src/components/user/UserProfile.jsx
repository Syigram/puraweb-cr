import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Shield, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function UserProfile({ user, onUpdate }) {
  const [fullName, setFullName] = useState(user.full_name || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await base44.auth.updateMe({ full_name: fullName });
      onUpdate({ ...user, full_name: fullName });
      setMessage({ type: "success", text: "Perfil actualizado correctamente" });
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar el perfil" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Información Personal
          </CardTitle>
          <CardDescription>
            Administra tu información de perfil
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <Alert variant={message.type === "error" ? "destructive" : "default"}>
              {message.type === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <p className="text-xs text-gray-500">
                El correo electrónico no puede ser modificado
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Rol</Label>
              <div>
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                  className={user.role === "admin" ? "bg-blue-900" : ""}
                >
                  {user.role === "admin" ? (
                    <>
                      <Shield className="w-3 h-3 mr-1" />
                      Administrador
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 mr-1" />
                      Usuario
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSave}
              disabled={saving || fullName === user.full_name}
              className="w-full sm:w-auto"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}