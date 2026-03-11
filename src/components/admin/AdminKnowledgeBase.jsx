import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Eye, EyeOff, Loader2, Pencil, Plus, Save, Sparkles, X } from "lucide-react";
import { getKnowledgeBaseSeedEntries, KNOWLEDGE_BASE_CATEGORIES } from "@/components/admin/knowledgeBaseSeed";

const emptyForm = {
  title: "",
  slug: "",
  language: "es",
  category: "custom",
  summary: "",
  content: "",
  source_page: "",
  sort_order: 0,
  is_published: true,
  keywords: ""
};

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toForm(entry) {
  return {
    ...entry,
    keywords: Array.isArray(entry.keywords) ? entry.keywords.join(", ") : ""
  };
}

function toPayload(form) {
  return {
    title: form.title.trim(),
    slug: (form.slug || form.title).trim() ? slugify(form.slug || form.title) : "",
    language: form.language,
    category: form.category,
    summary: form.summary.trim(),
    content: form.content.trim(),
    source_page: form.source_page.trim(),
    sort_order: Number(form.sort_order) || 0,
    is_published: !!form.is_published,
    keywords: form.keywords
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  };
}

export default function AdminKnowledgeBase() {
  const queryClient = useQueryClient();
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [editingEntry, setEditingEntry] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [hasBootstrapped, setHasBootstrapped] = useState(false);

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["admin-knowledge-base"],
    queryFn: async () => {
      const data = await base44.entities.KnowledgeBaseEntry.list();
      return [...data].sort((a, b) => {
        if ((a.sort_order || 0) !== (b.sort_order || 0)) {
          return (a.sort_order || 0) - (b.sort_order || 0);
        }
        return a.title.localeCompare(b.title);
      });
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  });

  const seedMutation = useMutation({
    mutationFn: () => base44.entities.KnowledgeBaseEntry.bulkCreate(getKnowledgeBaseSeedEntries()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-knowledge-base"] });
    }
  });

  useEffect(() => {
    if (!isLoading && entries.length === 0 && !hasBootstrapped) {
      setHasBootstrapped(true);
      seedMutation.mutate();
    }
  }, [entries.length, hasBootstrapped, isLoading, seedMutation]);

  const saveMutation = useMutation({
    mutationFn: (payload) => {
      if (editingEntry) {
        return base44.entities.KnowledgeBaseEntry.update(editingEntry.id, payload);
      }
      return base44.entities.KnowledgeBaseEntry.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-knowledge-base"] });
      setEditingEntry(null);
      setForm(emptyForm);
    }
  });

  const publishMutation = useMutation({
    mutationFn: (entry) => base44.entities.KnowledgeBaseEntry.update(entry.id, {
      is_published: !entry.is_published
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-knowledge-base"] });
    }
  });

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => selectedLanguage === "all" || entry.language === selectedLanguage);
  }, [entries, selectedLanguage]);

  const publishedCount = useMemo(() => entries.filter((entry) => entry.is_published).length, [entries]);

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setForm(toForm(entry));
  };

  const handleCreate = () => {
    setEditingEntry(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(toPayload(form));
  };

  const isBusy = isLoading || seedMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Entradas totales</p>
                <p className="text-3xl font-bold text-gray-900">{entries.length}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Publicadas</p>
                <p className="text-3xl font-bold text-gray-900">{publishedCount}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Fuente del asistente</p>
                <p className="text-lg font-semibold text-gray-900">Base de datos live</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle>Knowledge Base</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                El asistente consulta estas entradas publicadas para responder con información actualizada.
              </p>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm"
              >
                <option value="all">Todos</option>
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
              <Button onClick={handleCreate} className="bg-blue-900 hover:bg-blue-800">
                <Plus className="w-4 h-4 mr-2" />
                Nueva
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {isBusy && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
              </div>
            )}

            {!isBusy && filteredEntries.map((entry) => (
              <div key={entry.id} className="border rounded-xl p-4 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{entry.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 uppercase">
                        {entry.language}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {entry.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${entry.is_published ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                        {entry.is_published ? "Publicada" : "Oculta"}
                      </span>
                    </div>
                    {entry.summary && (
                      <p className="text-sm text-gray-600 mb-2">{entry.summary}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      Fuente: {entry.source_page || "Manual"} • Orden: {entry.sort_order || 0}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(entry)}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => publishMutation.mutate(entry)}
                      disabled={publishMutation.isPending}
                    >
                      {entry.is_published ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />Ocultar
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />Publicar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{editingEntry ? "Editar entrada" : "Crear entrada"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Título"
                  required
                />
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="slug-opcional"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={form.language}
                  onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))}
                  className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
                <select
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm"
                >
                  {KNOWLEDGE_BASE_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                value={form.summary}
                onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
                placeholder="Resumen corto"
              />

              <Textarea
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Contenido completo"
                className="min-h-[220px]"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  value={form.source_page}
                  onChange={(e) => setForm((prev) => ({ ...prev, source_page: e.target.value }))}
                  placeholder="Página de origen"
                />
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm((prev) => ({ ...prev, sort_order: e.target.value }))}
                  placeholder="Orden"
                />
              </div>

              <Input
                value={form.keywords}
                onChange={(e) => setForm((prev) => ({ ...prev, keywords: e.target.value }))}
                placeholder="Palabras clave separadas por coma"
              />

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm((prev) => ({ ...prev, is_published: e.target.checked }))}
                />
                Publicar esta entrada para el asistente
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" disabled={saveMutation.isPending} className="bg-blue-900 hover:bg-blue-800">
                  {saveMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Guardar
                </Button>
                <Button type="button" variant="outline" onClick={handleCreate}>
                  <X className="w-4 h-4 mr-2" />
                  Limpiar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}