import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search, Phone, IdCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { calcAge, initials } from "@/lib/format";
import { format } from "date-fns";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/_authenticated/patients/")({
  validateSearch: (s) => searchSchema.parse(s),
  component: PatientsList,
});

function usePatients(q: string) {
  return useQuery({
    queryKey: ["patients", q],
    queryFn: async () => {
      let query = supabase
        .from("patients")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (q.trim()) {
        const term = `%${q.trim()}%`;
        query = query.or(`full_name.ilike.${term},cnic.ilike.${term},phone.ilike.${term}`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

function PatientsList() {
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  const { data, isLoading } = usePatients(q);
  const patients = useMemo(() => data ?? [], [data]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Patient Records</h1>
          <p className="text-sm text-muted-foreground">
            {patients.length} {patients.length === 1 ? "patient" : "patients"} shown
          </p>
        </div>
        <Button asChild>
          <Link to="/patients/new">
            <UserPlus className="mr-2 h-4 w-4" /> Add patient
          </Link>
        </Button>
      </header>

      <Card className="card-shadow border-border/60 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, CNIC, or mobile…"
            className="h-11 pl-9"
          />
        </div>
      </Card>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-40 animate-pulse border-border/60 bg-muted/40" />
          ))}
        </div>
      ) : patients.length === 0 ? (
        <Card className="card-shadow border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            No patients found. Try a different search or add a new patient.
          </p>
          <Button asChild className="mt-4">
            <Link to="/patients/new">Add patient</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {patients.map((p) => {
            const age = calcAge(p.date_of_birth);
            return (
              <Link key={p.id} to="/patients/$id" params={{ id: p.id }} className="group">
                <Card className="card-shadow h-full border-border/60 p-5 transition hover:border-primary/40 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl med-gradient text-base font-bold text-white">
                      {initials(p.full_name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold group-hover:text-primary">
                        {p.full_name}
                      </h3>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        {age !== null && <span>{age} yr</span>}
                        {p.gender && (
                          <>
                            <span>·</span>
                            <span className="capitalize">{p.gender}</span>
                          </>
                        )}
                        {p.blood_group && (
                          <Badge variant="outline" className="ml-auto h-5 px-1.5 text-[10px]">
                            {p.blood_group}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-3 space-y-1 text-xs">
                        {p.cnic && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <IdCard className="h-3 w-3" />
                            {p.cnic}
                          </div>
                        )}
                        {p.phone && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {p.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {p.summary && (
                    <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{p.summary}</p>
                  )}
                  <div className="mt-3 text-[11px] text-muted-foreground">
                    Registered {format(new Date(p.created_at), "PP")}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
