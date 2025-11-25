import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Calendar, Loader2, Check, LogOut } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";

const translations = {
  es: {
    title: "Información Personal",
    subtitle: "Administra tu información de perfil",
    nameLabel: "Nombre Completo",
    emailLabel: "Correo Electrónico",
    emailReadonly: "El correo no se puede modificar",
    memberSince: "Miembro desde",
    saveButton: "Guardar Cambios",
    saving: "Guardando...",
    saved: "¡Guardado!",
    logoutButton: "Cerrar Sesión"
  },
  en: {
    title: "Personal Information",
    subtitle: "Manage your profile information",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    emailReadonly: "Email cannot be modified",
    memberSince: "Member since",
    saveButton: "Save Changes",
    saving: "Saving...",
    saved: "Saved!",
    logoutButton: "Log Out"
  }
};

export default function UserProfile({ user, onUserUpdate }) {
  const [name, setName] = useState(user.full_name || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const handleSave = async () => {
    setSaving(true);
    await base44.auth.updateMe({ full_name: name });
    onUserUpdate({ ...user, full_name: name });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    base44.auth.logout("/");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t.nameLabel}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.emailLabel}</Label>
              <div className="relative">
                <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="h-11 bg-gray-50 pr-10"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">{t.emailReadonly}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              {t.memberSince}: {user.created_date 
                ? format(new Date(user.created_date), "d 'de' MMMM, yyyy", { locale: es })
                : "N/A"
              }
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              onClick={handleSave} 
              disabled={saving || name === user.full_name}
              className="bg-blue-900 hover:bg-blue-800"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.saving}
                </>
              ) : saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  {t.saved}
                </>
              ) : (
                t.saveButton
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t.logoutButton}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}