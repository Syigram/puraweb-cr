import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, Calendar, Save, Loader2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";

const translations = {
  es: {
    title: "Información del Perfil",
    fullName: "Nombre Completo",
    email: "Correo Electrónico",
    role: "Rol",
    memberSince: "Miembro Desde",
    saveChanges: "Guardar Cambios",
    saving: "Guardando...",
    saved: "Guardado",
    admin: "Administrador",
    user: "Usuario",
    emailNote: "El correo electrónico no puede ser modificado."
  },
  en: {
    title: "Profile Information",
    fullName: "Full Name",
    email: "Email Address",
    role: "Role",
    memberSince: "Member Since",
    saveChanges: "Save Changes",
    saving: "Saving...",
    saved: "Saved",
    admin: "Administrator",
    user: "User",
    emailNote: "Email address cannot be modified."
  }
};

export default function UserProfile({ user, onUserUpdate }) {
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === "es" ? es : enUS;

  const [fullName, setFullName] = useState(user.full_name || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await base44.auth.updateMe({ full_name: fullName });
      onUserUpdate({ ...user, full_name: fullName });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-5 h-5" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">{t.fullName}</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.fullName}
            />
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                value={user.email}
                disabled
                className="pl-9 bg-gray-50"
              />
            </div>
            <p className="text-xs text-gray-500">{t.emailNote}</p>
          </div>
        </div>

        {/* Role and Member Since */}
        <div className="flex flex-wrap gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">{t.role}:</span>
            <Badge variant={user.role === "admin" ? "default" : "secondary"}>
              {user.role === "admin" ? t.admin : t.user}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">{t.memberSince}:</span>
            <span className="text-sm font-medium">
              {user.created_date
                ? format(new Date(user.created_date), "d MMMM yyyy", { locale: dateLocale })
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            disabled={saving || fullName === user.full_name}
            className="bg-blue-900 hover:bg-blue-800"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.saving}
              </>
            ) : saved ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t.saved}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t.saveChanges}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}