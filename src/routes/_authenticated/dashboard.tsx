import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Users, CalendarCheck, FileText, FlaskConical, UserPlus, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, startOfDay } from "date-fns";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from "recharts";
import { initials } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const since = subDays(new Date(), 30).toISOString();
      const [patientsAll, patientsRecent, visitsAll, visitsRecent, prescriptions, labs, recentPatients, recentVisits] = await Promise.all([
        supabase.from("patients").select("id", { count: "exact", head: true }),
        supabase.from("patients").select("id", { count: "exact", head: true }).gte("created_at", since),
        supabase.from("visits").select("id", { count: "exact", head: true }),
        supabase.from("visits").select("visit_date").gte("visit_date", since),
        supabase.from("prescriptions").select("id", { count: "exact", head: true }),
        supabase.from("lab_reports").select("id", { count: "exact", head: true }),
        supabase.from("patients").select("id,full_name,cnic,phone,photo_url,created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("visits").select("id,visit_date,chief_complaint,diagnosis,patient:patients(id,full_name,photo_url)").order("visit_date", { ascending: false }).limit(6),
      ]);
      const byDay = new Map<string, number>();
      for (let i = 13; i >= 0; i--) {
        const d = format(subDays(new Date(), i), "MMM d");
        byDay.set(d, 0);
      }
      (visitsRecent.data ?? []).forEach((v) => {
        const k = format(startOfDay(new Date(v.visit_date)), "MMM d");
        if (byDay.has(k)) byDay.set(k, (byDay.get(k) ?? 0) + 1);
      });
      const chart = Array.from(byDay, ([day, visits]) => ({ day, visits }));
      return {
        patientsCount: patientsAll.count ?? 0,
        patientsNew30: patientsRecent.count ?? 0,
        visitsCount: visitsAll.count ?? 0,
        rxCount: prescriptions.count ?? 0,
        labsCount: labs.count ?? 0,
        chart,
        recentPatients: recentPatients.data ?? [],
        recentVisits: recentVisits.data ?? [],
      };
    },
  });
}

function Stat({ label, value, sub, Icon, tone = "primary" }: { label: string; value: number | string; sub?: string; Icon: any; tone?: "primary" | "accent" | "success" | "warning" }) {
  const toneMap = {
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent/20 text-accent-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
  } as const;
  return (
    <Card className="card-shadow border-border/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-muted-foreground">{label}</div>
          <div className="mt-2 font-display text-3xl font-bold tabular-nums">{value}</div>
          {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
        </div>
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${toneMap[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function Dashboard() {
  const { data, isLoading } = useDashboard();
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your clinic activity.</p>
        </div>
        <Button asChild className="h-10"><Link to="/patients/new"><UserPlus className="mr-2 h-4 w-4" /> New patient</Link></Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total patients" value={isLoading ? "—" : data!.patientsCount} sub={data ? `${data.patientsNew30} new in 30 days` : undefined} Icon={Users} tone="primary" />
        <Stat label="Total visits" value={isLoading ? "—" : data!.visitsCount} Icon={CalendarCheck} tone="accent" />
        <Stat label="Prescriptions" value={isLoading ? "—" : data!.rxCount} Icon={FileText} tone="success" />
        <Stat label="Lab reports" value={isLoading ? "—" : data!.labsCount} Icon={FlaskConical} tone="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="card-shadow lg:col-span-2 border-border/60 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold">Visits — last 14 days</h3>
              <p className="text-xs text-muted-foreground">Daily appointment volume</p>
            </div>
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.chart ?? []} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Area type="monotone" dataKey="visits" stroke="var(--primary)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="card-shadow border-border/60 p-5">
          <h3 className="font-display font-semibold">Recent patients</h3>
          <div className="mt-4 space-y-3">
            {(data?.recentPatients ?? []).map((p) => (
              <Link key={p.id} to="/patients/$id" params={{ id: p.id }} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full med-gradient text-sm font-semibold text-white">
                  {initials(p.full_name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{p.full_name}</div>
                  <div className="truncate text-xs text-muted-foreground">{p.cnic || p.phone}</div>
                </div>
              </Link>
            ))}
            {data?.recentPatients.length === 0 && <p className="text-sm text-muted-foreground">No patients yet.</p>}
          </div>
        </Card>
      </div>

      <Card className="card-shadow border-border/60 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold">Recent visits</h3>
          <Link to="/patients" className="text-sm font-medium text-primary hover:underline">View all patients →</Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="pb-3 font-medium">Patient</th><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">Complaint</th><th className="pb-3 font-medium">Diagnosis</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(data?.recentVisits ?? []).map((v: any) => (
                <tr key={v.id} className="hover:bg-muted/40">
                  <td className="py-3">
                    {v.patient ? (
                      <Link to="/patients/$id" params={{ id: v.patient.id }} className="flex items-center gap-2 font-medium hover:text-primary">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">{initials(v.patient.full_name)}</div>
                        {v.patient.full_name}
                      </Link>
                    ) : "—"}
                  </td>
                  <td className="py-3 text-muted-foreground">{format(new Date(v.visit_date), "PP")}</td>
                  <td className="py-3">{v.chief_complaint || <span className="text-muted-foreground">—</span>}</td>
                  <td className="py-3">{v.diagnosis ? <Badge variant="secondary">{v.diagnosis}</Badge> : <span className="text-muted-foreground">—</span>}</td>
                </tr>
              ))}
              {data?.recentVisits.length === 0 && (
                <tr><td colSpan={4} className="py-8 text-center text-sm text-muted-foreground">No visits recorded yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
