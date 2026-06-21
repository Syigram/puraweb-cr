import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tags, Loader2, Save, CheckCircle2, DollarSign, Percent } from "lucide-react";

function PlanRow({ plan, onSave, isSaving, saved }) {
  const [form, setForm] = useState(plan);

  useEffect(() => { setForm(plan); }, [plan]);

  const set = useCallback((key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      total_price_crc: Number(form.total_price_crc) || 0,
      deposit_percentage: Number(form.deposit_percentage) || 0,
    });
  };

  const depositPct = Math.round((Number(form.deposit_percentage) || 0) * 100);
  const depositAmount = Math.round((Number(form.total_price_crc) || 0) * (Number(form.deposit_percentage) || 0));

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between text-gray-800">
          <span>{form.display_name || form.plan_id}</span>
          <span className="text-xs font-normal text-gray-400 uppercase">{form.plan_id}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Nombre visible
              </Label>
              <Input value={form.display_name || ""} onChange={e => set("display_name", e.target.value)} placeholder="Plan Básico" />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Stripe Price ID
              </Label>
              <Input value={form.stripe_price_id || ""} onChange={e => set("stripe_price_id", e.target.value)} placeholder="price_..." />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4 text-blue-700" />
                Precio total (CRC)
              </Label>
              <Input type="number" min="0" value={form.total_price_crc ?? ""} onChange={e => set("total_price_crc", e.target.value)} placeholder="100000" />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Percent className="w-4 h-4 text-blue-700" />
                Depósito (0.0 - 1.0)
              </Label>
              <Input type="number" min="0" max="1" step="0.05" value={form.deposit_percentage ?? ""} onChange={e => set("deposit_percentage", e.target.value)} placeholder="0.5" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <span>Depósito: <strong>{depositPct}%</strong></span>
            <span className="text-blue-300">•</span>
            <span>Cobro inicial (pago único): <strong>₡{depositAmount.toLocaleString()}</strong></span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Switch checked={form.is_active !== false} onCheckedChange={(v) => set("is_active", v)} />
              <span className="text-sm text-gray-600">{form.is_active !== false ? "Plan activo" : "Plan inactivo"}</span>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Guardado
                </span>
              )}
              <Button type="submit" disabled={isSaving} className="bg-blue-900 hover:bg-blue-800 text-white">
                {isSaving ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...</>
                ) : (
                  <><Save className="w-4 h-4 mr-2" /> Guardar</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function AdminPlanConfig() {
  const queryClient = useQueryClient();
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["planConfig"],
    queryFn: () => base44.entities.PlanConfig.list("sort_order"),
  });

  const mutation = useMutation({
    mutationFn: (form) => base44.entities.PlanConfig.update(form.id, form),
    onSuccess: (_, form) => {
      queryClient.invalidateQueries({ queryKey: ["planConfig"] });
      setSavedId(form.id);
      setTimeout(() => setSavedId(null), 2500);
    },
    onSettled: () => setSavingId(null),
  });

  const handleSave = (form) => {
    setSavingId(form.id);
    mutation.mutate(form);
  };

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
          <Tags className="w-5 h-5 text-blue-900" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Precios de Planes</h2>
          <p className="text-sm text-gray-500">Administra el precio total, el porcentaje de depósito y el Stripe Price ID de cada plan. Es la fuente única de verdad para los cobros.</p>
        </div>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <PlanRow
            key={plan.id}
            plan={plan}
            onSave={handleSave}
            isSaving={savingId === plan.id}
            saved={savedId === plan.id}
          />
        ))}
      </div>
    </div>
  );
}