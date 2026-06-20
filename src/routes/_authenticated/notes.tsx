import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export const Route = createFileRoute("/_authenticated/notes")({
  component: NotesPage,
});

function NotesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["all-notes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("visits")
        .select("id,visit_date,doctor_notes,diagnosis,patient:patients(id,full_name)")
        .not("doctor_notes", "is", null)
        .neq("doctor_notes", "")
        .order("visit_date", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Doctor Notes</h1>
        <p className="text-sm text-muted-foreground">Clinical notes from every appointment.</p>
      </header>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : !data || data.length === 0 ? (
        <Card className="border-dashed p-12 text-center text-sm text-muted-foreground">No notes yet.</Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((v: any) => (
            <Card key={v.id} className="card-shadow border-border/60 p-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{format(new Date(v.visit_date), "PPpp")}</span>
                {v.diagnosis && <Badge variant="outline">{v.diagnosis}</Badge>}
              </div>
              {v.patient && (
                <Link to="/patients/$id" params={{ id: v.patient.id }} className="mt-1 block font-display font-semibold hover:text-primary">
                  {v.patient.full_name}
                </Link>
              )}
              <p className="mt-2 whitespace-pre-wrap text-sm">{v.doctor_notes}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
