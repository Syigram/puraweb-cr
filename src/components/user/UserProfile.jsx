import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Shield, 
  Calendar,
  Save,
  Loader2,
  CheckCircle2,
  LogOut
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";

const translations = {
  es: {
    title: "Información Personal",
    subtitle: "Gestiona tu información de perfil",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Tu nombre completo",
    email: "Correo Electrónico",
    emailReadOnly: "El correo no se puede modificar",
    role: "Rol",
    roleAdmin: "Administrador",
    roleUser: "Usuario",
    memberSince: "Miembro desde",
    saveChanges: "Guardar Cambios",
    saving: "Guardando...",
    saved: "¡Guardado!",
    logout: "Cerrar Sesión",
    logoutConfirm: "¿Estás seguro de que deseas cerrar sesión?"
  },
  en: {
    title: "Personal Information",
    subtitle: "Manage your profile information",
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    email: "Email Address",
    emailReadOnly: "Email cannot be modified",
    role: "Role",
    roleAdmin: "Administrator",
    roleUser: "User",
    memberSince: "Member since",
    saveChanges: "Save Changes",
    saving: "Saving...",
    saved: "Saved!",
    logout: "Log Out",
    logoutConfirm: "Are you sure you want to log out?"
  }
};

export default function UserProfile({ user, onUserUpdate }) {
  const [fullName, setFullName] = useState(user.full_name || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === "es" ? es : enUS;

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await base44.auth.updateMe({ full_name: fullName });
      onUserUpdate({ ...user, full_name: fullName });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm(t.logoutConfirm)) {
      base44.auth.logout();
    }
  };

  const hasChanges = fullName !== (user.full_name || "");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-blue-900" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">{t.fullName}</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.fullNamePlaceholder}
              className="max-w-md"
            />
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {t.email}
            </Label>
            <Input
              id="email"
              value={user.email}
              disabled
              className="max-w-md bg-gray-50"
            />
            <p className="text-xs text-gray-500">{t.emailReadOnly}</p>
          </div>

          {/* Role & Member Since */}
          <div className="flex flex-wrap gap-6 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Shield className="w-4 h-4" />
                {t.role}
              </p>
              <Badge 
                variant={user.role === "admin" ? "default" : "secondary"}
                className={user.role === "admin" ? "bg-blue-900" : ""}
              >
                {user.role === "admin" ? t.roleAdmin : t.roleUser}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {t.memberSince}
              </p>
              <p className="font-medium">
                {user.created_date 
                  ? format(new Date(user.created_date), "dd MMMM yyyy", { locale: dateLocale })
                  : "N/A"
                }
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-3 pt-4">
            <Button 
              onClick={handleSave} 
              disabled={saving || !hasChanges}
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

      {/* Logout Card */}
      <Card className="border-red-100">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">{t.logout}</p>
              <p className="text-sm text-gray-500">{t.logoutConfirm}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t.logout}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}