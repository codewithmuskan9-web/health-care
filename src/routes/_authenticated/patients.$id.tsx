import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft, Calendar, FileText, FlaskConical, StickyNote, Printer,
  Plus, Trash2, Upload, Loader2, Phone, IdCard, MapPin, AlertCircle, Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { calcAge, initials } from "@/lib/format";
import { format } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/patients/$id")({
  component: PatientDetail,
});

function usePatient(id: string) {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const [patient, visits, rx, labs] = await Promise.all([
        supabase.from("patients").select("*").eq("id", id).single(),
        supabase.from("visits").select("*").eq("patient_id", id).order("visit_date", { ascending: false }),
        supabase.from("prescriptions").select("*").eq("patient_id", id).order("created_at", { ascending: false }),
        supabase.from("lab_reports").select("*").eq("patient_id", id).order("created_at", { ascending: false }),
      ]);
      if (patient.error) throw patient.error;
      return {
        patient: patient.data,
        visits: visits.data ?? [],
        prescriptions: rx.data ?? [],
        labs: labs.data ?? [],
      };
    },
  });
}

function PatientDetail() {
  const { id } = Route.useParams();
  const { data, isLoading } = usePatient(id);
  const navigate = useNavigate();
  const qc = useQueryClient();

  if (isLoading) return <div className="p-8 text-muted-foreground">Loading patient…</div>;
  if (!data) return <div className="p-8">Patient not found.</div>;
  const { patient: p, visits, prescriptions, labs } = data;
  const age = calcAge(p.date_of_birth);

  const remove = async () => {
    if (!confirm("Delete this patient and all their records? This cannot be undone.")) return;
    const { error } = await supabase.from("patients").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Patient deleted");
    qc.invalidateQueries({ queryKey: ["patients"] });
    navigate({ to: "/patients" });
  };

  return (
    <div className="space-y-6">
      <Link to="/patients" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to patients
      </Link>

      <Card className="card-shadow border-border/60 overflow-hidden">
        <div className="med-gradient h-20" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex flex-wrap items-end gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-4 border-card med-gradient text-2xl font-bold text-white shadow-lg">
              {initials(p.full_name)}
            </div>
            <div className="min-w-0 flex-1 pt-2">
              <h1 className="font-display text-2xl font-bold md:text-3xl">{p.full_name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                {age !== null && <span>{age} years</span>}
                {p.gender && <span className="capitalize">· {p.gender}</span>}
                {p.blood_group && <Badge variant="secondary">{p.blood_group}</Badge>}
                <Badge variant="outline">Patient since {format(new Date(p.created_at), "MMM yyyy")}</Badge>
              </div>
            </div>
            <Button variant="outline" onClick={remove} className="text-destructive hover:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {p.cnic && <Info Icon={IdCard} label="CNIC" value={p.cnic} />}
            {p.phone && <Info Icon={Phone} label="Phone" value={p.phone} />}
            {p.address && <Info Icon={MapPin} label="Address" value={p.address} />}
            {p.allergies && <Info Icon={AlertCircle} label="Allergies" value={p.allergies} tone="warning" />}
          </div>

          {p.summary && (
            <Card className="mt-6 border-border/60 bg-muted/40 p-4 text-sm">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Medical history summary</div>
              {p.summary}
            </Card>
          )}
        </div>
      </Card>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-4">
          <TabsTrigger value="timeline"><Calendar className="mr-2 h-4 w-4" />Visits</TabsTrigger>
          <TabsTrigger value="rx"><FileText className="mr-2 h-4 w-4" />Prescriptions</TabsTrigger>
          <TabsTrigger value="labs"><FlaskConical className="mr-2 h-4 w-4" />Lab reports</TabsTrigger>
          <TabsTrigger value="notes"><StickyNote className="mr-2 h-4 w-4" />Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline"><VisitsTab patient={p} visits={visits} /></TabsContent>
        <TabsContent value="rx"><PrescriptionsTab patient={p} visits={visits} prescriptions={prescriptions} /></TabsContent>
        <TabsContent value="labs"><LabsTab patient={p} visits={visits} labs={labs} /></TabsContent>
        <TabsContent value="notes"><NotesTab visits={visits} /></TabsContent>
      </Tabs>
    </div>
  );
}

function Info({ Icon, label, value, tone }: { Icon: any; label: string; value: string; tone?: "warning" }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-muted/30 p-3">
      <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${tone === "warning" ? "bg-warning/20 text-warning-foreground" : "bg-primary-soft text-primary"}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="truncate font-medium">{value}</div>
      </div>
    </div>
  );
}

// ---------------- Visits Tab ----------------
function VisitsTab({ patient, visits }: { patient: any; visits: any[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="card-shadow border-border/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold">Visit timeline</h3>
          <p className="text-xs text-muted-foreground">{visits.length} {visits.length === 1 ? "visit" : "visits"}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> New visit</Button></DialogTrigger>
          <NewVisitDialog patient={patient} onClose={() => setOpen(false)} />
        </Dialog>
      </div>

      {visits.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No visits recorded yet.</p>
      ) : (
        <ol className="relative space-y-5 border-l-2 border-border/70 pl-6">
          {visits.map((v) => (
            <li key={v.id} className="relative">
              <span className="absolute -left-[31px] top-1.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-4 ring-background">
                <Activity className="h-3 w-3" />
              </span>
              <Card className="border-border/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold">{format(new Date(v.visit_date), "PPpp")}</div>
                  {v.diagnosis && <Badge>{v.diagnosis}</Badge>}
                </div>
                {v.chief_complaint && (
                  <div className="mt-2 text-sm"><span className="text-muted-foreground">Complaint: </span>{v.chief_complaint}</div>
                )}
                {v.doctor_notes && (
                  <div className="mt-1 text-sm"><span className="text-muted-foreground">Notes: </span>{v.doctor_notes}</div>
                )}
              </Card>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}

function NewVisitDialog({ patient, onClose }: { patient: any; onClose: () => void }) {
  const qc = useQueryClient();
  const [f, setF] = useState({ chief_complaint: "", diagnosis: "", doctor_notes: "" });
  const [saving, setSaving] = useState(false);
  const save = async () => {
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from("visits").insert({
        patient_id: patient.id, doctor_id: u.user!.id, ...f,
      });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["patient", patient.id] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Visit recorded");
      onClose();
    } catch (e: any) { toast.error(e.message); } finally { setSaving(false); }
  };
  return (
    <DialogContent>
      <DialogHeader><DialogTitle>New visit for {patient.full_name}</DialogTitle></DialogHeader>
      <div className="space-y-3">
        <div><Label>Chief complaint</Label><Input value={f.chief_complaint} onChange={(e) => setF({ ...f, chief_complaint: e.target.value })} placeholder="e.g. Persistent cough for 5 days" /></div>
        <div><Label>Diagnosis</Label><Input value={f.diagnosis} onChange={(e) => setF({ ...f, diagnosis: e.target.value })} placeholder="e.g. Acute bronchitis" /></div>
        <div><Label>Doctor's notes</Label><Textarea rows={4} value={f.doctor_notes} onChange={(e) => setF({ ...f, doctor_notes: e.target.value })} /></div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={save} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save visit</Button>
      </DialogFooter>
    </DialogContent>
  );
}

// ---------------- Prescriptions ----------------
function PrescriptionsTab({ patient, visits, prescriptions }: { patient: any; visits: any[]; prescriptions: any[] }) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const print = () => window.print();

  const remove = async (id: string) => {
    const { error } = await supabase.from("prescriptions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["patient", patient.id] });
  };

  return (
    <Card className="card-shadow border-border/60 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 no-print">
        <div>
          <h3 className="font-display font-semibold">Prescriptions</h3>
          <p className="text-xs text-muted-foreground">{prescriptions.length} total</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={print}><Printer className="mr-2 h-4 w-4" /> Print</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Add medicine</Button></DialogTrigger>
            <NewRxDialog patient={patient} visits={visits} onClose={() => setOpen(false)} />
          </Dialog>
        </div>
      </div>

      <div className="hidden print:mb-6 print:block">
        <h2 className="text-xl font-bold">Prescription — {patient.full_name}</h2>
        <p className="text-sm">{patient.cnic} · {patient.phone}</p>
      </div>

      {prescriptions.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No prescriptions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="pb-3">Medicine</th><th className="pb-3">Dosage</th><th className="pb-3">Frequency</th><th className="pb-3">Duration</th><th className="pb-3">Date</th><th className="pb-3 no-print"></th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {prescriptions.map((rx) => (
                <tr key={rx.id}>
                  <td className="py-3 font-medium">{rx.medicine_name}{rx.instructions && <div className="text-xs font-normal text-muted-foreground">{rx.instructions}</div>}</td>
                  <td className="py-3">{rx.dosage || "—"}</td>
                  <td className="py-3">{rx.frequency || "—"}</td>
                  <td className="py-3">{rx.duration || "—"}</td>
                  <td className="py-3 text-muted-foreground">{format(new Date(rx.created_at), "PP")}</td>
                  <td className="py-3 text-right no-print">
                    <Button variant="ghost" size="icon" onClick={() => remove(rx.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function NewRxDialog({ patient, visits, onClose }: { patient: any; visits: any[]; onClose: () => void }) {
  const qc = useQueryClient();
  const [f, setF] = useState({
    medicine_name: "", dosage: "", frequency: "", duration: "", instructions: "", visit_id: visits[0]?.id ?? "",
  });
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (!f.medicine_name.trim()) { toast.error("Medicine name is required"); return; }
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from("prescriptions").insert({
        patient_id: patient.id, doctor_id: u.user!.id,
        medicine_name: f.medicine_name, dosage: f.dosage, frequency: f.frequency,
        duration: f.duration, instructions: f.instructions,
        visit_id: f.visit_id || null,
      });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["patient", patient.id] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Prescription added"); onClose();
    } catch (e: any) { toast.error(e.message); } finally { setSaving(false); }
  };
  return (
    <DialogContent>
      <DialogHeader><DialogTitle>Add prescription</DialogTitle></DialogHeader>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2"><Label>Medicine *</Label><Input value={f.medicine_name} onChange={(e) => setF({ ...f, medicine_name: e.target.value })} placeholder="e.g. Amoxicillin 500mg" /></div>
        <div><Label>Dosage</Label><Input value={f.dosage} onChange={(e) => setF({ ...f, dosage: e.target.value })} placeholder="1 tablet" /></div>
        <div><Label>Frequency</Label><Input value={f.frequency} onChange={(e) => setF({ ...f, frequency: e.target.value })} placeholder="3x daily" /></div>
        <div><Label>Duration</Label><Input value={f.duration} onChange={(e) => setF({ ...f, duration: e.target.value })} placeholder="7 days" /></div>
        <div><Label>Instructions</Label><Input value={f.instructions} onChange={(e) => setF({ ...f, instructions: e.target.value })} placeholder="After meals" /></div>
      </div>
      <DialogFooter><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={save} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Add</Button></DialogFooter>
    </DialogContent>
  );
}

// ---------------- Labs ----------------
function LabsTab({ patient, visits, labs }: { patient: any; visits: any[]; labs: any[] }) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const openFile = async (path: string) => {
    const { data, error } = await supabase.storage.from("patient-files").createSignedUrl(path, 60 * 10);
    if (error) return toast.error(error.message);
    window.open(data.signedUrl, "_blank");
  };
  const remove = async (lab: any) => {
    if (!confirm("Delete this lab report?")) return;
    await supabase.storage.from("patient-files").remove([lab.file_path]);
    const { error } = await supabase.from("lab_reports").delete().eq("id", lab.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["patient", patient.id] });
    qc.invalidateQueries({ queryKey: ["dashboard"] });
    toast.success("Deleted");
  };

  return (
    <Card className="card-shadow border-border/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold">Laboratory reports</h3>
          <p className="text-xs text-muted-foreground">{labs.length} files</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Upload className="mr-2 h-4 w-4" /> Upload</Button></DialogTrigger>
          <NewLabDialog patient={patient} visits={visits} onClose={() => setOpen(false)} />
        </Dialog>
      </div>
      {labs.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No lab reports uploaded.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((l) => (
            <Card key={l.id} className="border-border/60 p-4">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/20 text-accent-foreground">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{l.title}</div>
                  <div className="text-xs text-muted-foreground">{format(new Date(l.created_at), "PP")}</div>
                  {l.description && <p className="mt-1 line-clamp-2 text-xs">{l.description}</p>}
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => openFile(l.file_path)}>View</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(l)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}

function NewLabDialog({ patient, visits, onClose }: { patient: any; visits: any[]; onClose: () => void }) {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [visitId, setVisitId] = useState(visits[0]?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (!file || !title.trim()) { toast.error("Pick a file and add a title"); return; }
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user!.id;
      const path = `${uid}/${patient.id}/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
      const up = await supabase.storage.from("patient-files").upload(path, file, { contentType: file.type });
      if (up.error) throw up.error;
      const { error } = await supabase.from("lab_reports").insert({
        patient_id: patient.id, doctor_id: uid, visit_id: visitId || null,
        title, description: desc, file_url: path, file_path: path, file_type: file.type,
      });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["patient", patient.id] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Uploaded"); onClose();
    } catch (e: any) { toast.error(e.message); } finally { setSaving(false); }
  };
  return (
    <DialogContent>
      <DialogHeader><DialogTitle>Upload lab report</DialogTitle></DialogHeader>
      <div className="space-y-3">
        <div><Label>Title *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="CBC, X-ray Chest, MRI…" /></div>
        <div><Label>Description</Label><Textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
        <div><Label>File *</Label><Input type="file" accept="image/*,.pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
      </div>
      <DialogFooter><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={save} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Upload</Button></DialogFooter>
    </DialogContent>
  );
}

// ---------------- Notes ----------------
function NotesTab({ visits }: { visits: any[] }) {
  const noted = visits.filter((v) => v.doctor_notes?.trim());
  return (
    <Card className="card-shadow border-border/60 p-5">
      <h3 className="font-display font-semibold">Doctor notes</h3>
      <p className="text-xs text-muted-foreground">Notes captured during each visit</p>
      {noted.length === 0 ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">No notes yet.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {noted.map((v) => (
            <Card key={v.id} className="border-border/60 p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{format(new Date(v.visit_date), "PPpp")}</span>
                {v.diagnosis && <Badge variant="outline">{v.diagnosis}</Badge>}
              </div>
              <p className="mt-2 text-sm">{v.doctor_notes}</p>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
