import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { patientSchema, normalizeCnic, normalizePhone } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/patients/new")({
  component: NewPatient,
});

const blood = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function NewPatient() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState({
    full_name: "",
    cnic: "",
    phone: "",
    gender: "" as "" | "male" | "female" | "other",
    date_of_birth: "",
    blood_group: "",
    address: "",
    allergies: "",
    summary: "",
  });
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = patientSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const payload = {
        ...parsed.data,
        doctor_id: u.user!.id,
        gender: parsed.data.gender || null,
        date_of_birth: parsed.data.date_of_birth || null,
      };
      const { data, error } = await supabase.from("patients").insert(payload).select("id").single();
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["patients"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Patient registered");
      nav({ to: "/patients/$id", params: { id: data.id } });
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to register patient");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/patients"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to patients
      </Link>
      <header>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Register new patient</h1>
        <p className="text-sm text-muted-foreground">
          Fill out at least CNIC or phone to register a patient.
        </p>
      </header>

      <Card className="card-shadow border-border/60 p-6 md:p-8">
        <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fn">Full name *</Label>
            <Input
              id="fn"
              value={form.full_name}
              onChange={(e) => set("full_name", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cnic">CNIC</Label>
            <Input
              id="cnic"
              placeholder="35202-1234567-1"
              value={form.cnic}
              onChange={(e) => set("cnic", normalizeCnic(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ph">Phone</Label>
            <Input
              id="ph"
              placeholder="+923001234567"
              value={form.phone}
              onChange={(e) => set("phone", normalizePhone(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={form.gender} onValueChange={(v) => set("gender", v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of birth</Label>
            <Input
              id="dob"
              type="date"
              value={form.date_of_birth}
              onChange={(e) => set("date_of_birth", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Blood group</Label>
            <Select value={form.blood_group} onValueChange={(v) => set("blood_group", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {blood.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="addr">Address</Label>
            <Input
              id="addr"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="al">Known allergies</Label>
            <Input
              id="al"
              placeholder="e.g. Penicillin, peanuts"
              value={form.allergies}
              onChange={(e) => set("allergies", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="sum">Medical history summary</Label>
            <Textarea
              id="sum"
              rows={3}
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              placeholder="Chronic conditions, surgeries, ongoing treatments…"
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => nav({ to: "/patients" })}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save patient
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
