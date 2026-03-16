import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone, Mail, MapPin, Globe, Share2, Building2,
  Save, Loader2, CheckCircle2, Clock
} from "lucide-react";

const SECTIONS = ["contact", "general", "social"];

function useSettingsRecord(section, allRecords) {
  return allRecords?.find(r => r.section === section) ?? null;
}

function FieldGroup({ label, icon: FieldIcon, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {FieldIcon && <FieldIcon className="w-4 h-4 text-blue-700" />}
        {label}
      </Label>
      {children}
    </div>
  );
}

function SectionForm({ section, record, onSave, isSaving, saved }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (record) {
      setForm(record);
    } else {
      setForm({ section });
    }
  }, [record, section]);

  const set = useCallback((key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (section === "contact") {
    return (
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <FieldGroup label="Correo electrónico" icon={Mail}>
            <Input value={form.contact_email || ""} onChange={e => set("contact_email", e.target.value)} placeholder="info@puraweb.cr" type="email" />
          </FieldGroup>
          <FieldGroup label="Teléfono" icon={Phone}>
            <Input value={form.contact_phone || ""} onChange={e => set("contact_phone", e.target.value)} placeholder="+506 1234 5678" />
          </FieldGroup>
          <FieldGroup label="WhatsApp (formato internacional)" icon={Phone}>
            <Input value={form.whatsapp_number || ""} onChange={e => set("whatsapp_number", e.target.value)} placeholder="50612345678" />
          </FieldGroup>
          <FieldGroup label="Ciudad / Ubicación" icon={MapPin}>
            <Input value={form.location_city || ""} onChange={e => set("location_city", e.target.value)} placeholder="San José, Costa Rica" />
          </FieldGroup>
          <FieldGroup label="Horario de atención" icon={Clock}>
            <Input value={form.business_hours || ""} onChange={e => set("business_hours", e.target.value)} placeholder="Lun-Vie 9am-5pm" />
          </FieldGroup>
        </div>
        <SaveButton isSaving={isSaving} saved={saved} />
      </form>
    );
  }

  if (section === "general") {
    return (
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <FieldGroup label="Nombre de la empresa" icon={Building2}>
            <Input value={form.company_name || ""} onChange={e => set("company_name", e.target.value)} placeholder="PuraWeb CR" />
          </FieldGroup>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <FieldGroup label="Tagline (Español)" icon={Globe}>
            <Textarea value={form.company_tagline_es || ""} onChange={e => set("company_tagline_es", e.target.value)} placeholder="Ingeniería costarricense de clase mundial..." rows={2} />
          </FieldGroup>
          <FieldGroup label="Tagline (English)" icon={Globe}>
            <Textarea value={form.company_tagline_en || ""} onChange={e => set("company_tagline_en", e.target.value)} placeholder="World-class Costa Rican engineering..." rows={2} />
          </FieldGroup>
          <FieldGroup label="Meta Description SEO (Español)" icon={Globe}>
            <Textarea value={form.meta_description_es || ""} onChange={e => set("meta_description_es", e.target.value)} placeholder="Descripción para motores de búsqueda..." rows={3} />
          </FieldGroup>
          <FieldGroup label="Meta Description SEO (English)" icon={Globe}>
            <Textarea value={form.meta_description_en || ""} onChange={e => set("meta_description_en", e.target.value)} placeholder="Description for search engines..." rows={3} />
          </FieldGroup>
        </div>
        <SaveButton isSaving={isSaving} saved={saved} />
      </form>
    );
  }

  if (section === "social") {
    const socials = [
      { key: "facebook_url", label: "Facebook URL" },
      { key: "instagram_url", label: "Instagram URL" },
      { key: "linkedin_url", label: "LinkedIn URL" },
      { key: "twitter_url", label: "Twitter / X URL" },
      { key: "tiktok_url", label: "TikTok URL" },
    ];
    return (
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          {socials.map(({ key, label }) => (
            <FieldGroup key={key} label={label} icon={Share2}>
              <Input value={form[key] || ""} onChange={e => set(key, e.target.value)} placeholder="https://..." type="url" />
            </FieldGroup>
          ))}
        </div>
        <SaveButton isSaving={isSaving} saved={saved} />
      </form>
    );
  }

  return null;
}

function SaveButton({ isSaving, saved }) {
  return (
    <div className="flex items-center gap-3">
      <Button type="submit" disabled={isSaving} className="bg-blue-900 hover:bg-blue-800 text-white">
        {isSaving ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...</>
        ) : (
          <><Save className="w-4 h-4 mr-2" /> Guardar Cambios</>
        )}
      </Button>
      {saved && (
        <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" /> Guardado
        </span>
      )}
    </div>
  );
}

export default function AdminSiteSettings() {
  const queryClient = useQueryClient();
  const [savingSection, setSavingSection] = useState(null);
  const [savedSection, setSavedSection] = useState(null);

  const { data: records = [], isLoading } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: () => base44.entities.SiteSettings.list(),
  });

  const mutation = useMutation({
    mutationFn: async (form) => {
      const existing = records.find(r => r.section === form.section);
      if (existing) {
        return base44.entities.SiteSettings.update(existing.id, form);
      } else {
        return base44.entities.SiteSettings.create(form);
      }
    },
    onSuccess: (_, form) => {
      queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
      setSavedSection(form.section);
      setTimeout(() => setSavedSection(null), 2500);
    },
    onSettled: () => setSavingSection(null),
  });

  const handleSave = (form) => {
    setSavingSection(form.section);
    mutation.mutate(form);
  };

  const tabConfig = [
    { value: "contact", label: "Contacto", icon: Phone },
    { value: "general", label: "General", icon: Building2 },
    { value: "social", label: "Redes Sociales", icon: Share2 },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-7 h-7 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Globe className="w-5 h-5 text-blue-900" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Configuración del Sitio</h2>
          <p className="text-sm text-gray-500">Gestiona la información centralizada de contacto y datos generales del sitio.</p>
        </div>
      </div>

      <Tabs defaultValue="contact" className="space-y-4">
        <TabsList className="bg-white border shadow-sm w-full p-1 rounded-xl grid grid-cols-3 h-auto gap-1">
          {tabConfig.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="data-[state=active]:bg-blue-900 data-[state=active]:text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm transition-all"
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {SECTIONS.map(section => (
          <TabsContent key={section} value={section}>
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-base text-gray-800">
                  {section === "contact" && "Información de Contacto"}
                  {section === "general" && "Información General de la Empresa"}
                  {section === "social" && "Redes Sociales"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SectionForm
                  section={section}
                  record={useSettingsRecord(section, records)}
                  onSave={handleSave}
                  isSaving={savingSection === section}
                  saved={savedSection === section}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}