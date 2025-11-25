import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Calendar, Save, Loader2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/components/LanguageContext";

const translations = {
  es: {
    title: "Información Personal",
    description: "Administra tu información de perfil",
    fullName: "Nombre Completo",
    email: "Correo Electrónico",
    emailReadOnly: "El correo no se puede modificar",
    memberSince: "Miembro desde",
    role: "Tipo de cuenta",
    roleUser: "Usuario",
    roleAdmin: "Administrador",
    saveChanges: "Guardar Cambios",
    saving: "Guardando...",
    saved: "¡Guardado!"
  },
  en: {
    title: "Personal Information",
    description: "Manage your profile information",
    fullName: "Full Name",
    email: "Email Address",
    emailReadOnly: "Email cannot be modified",
    memberSince: "Member since",
    role: "Account type",
    roleUser: "User",
    roleAdmin: "Administrator",
    saveChanges: "Save Changes",
    saving: "Saving...",
    saved: "Saved!"
  }
};

export default function UserProfile({ user, onUpdate }) {
  const [fullName, setFullName] = useState(user.full_name || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const dateLocale = language === 'es' ? es : enUS;

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await base44.auth.updateMe({ full_name: fullName });
      onUpdate({ ...user, full_name: fullName });
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
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t.fullName}</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              value={user.email}
              disabled
              className="h-11 bg-gray-50"
            />
            <p className="text-xs text-gray-500">{t.emailReadOnly}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{t.memberSince}</p>
              <p className="font-medium">
                {user.created_date 
                  ? format(new Date(user.created_date), "MMMM yyyy", { locale: dateLocale })
                  : "N/A"
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{t.role}</p>
              <p className="font-medium">
                {user.role === "admin" ? t.roleAdmin : t.roleUser}
              </p>
            </div>
          </div>
        </div>

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