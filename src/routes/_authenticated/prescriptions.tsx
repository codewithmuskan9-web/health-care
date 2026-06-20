import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/_authenticated/prescriptions")({
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["all-prescriptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prescriptions")
        .select("*, patient:patients(id,full_name,cnic)")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Prescription Management</h1>
        <p className="text-sm text-muted-foreground">All medicines prescribed across patients.</p>
      </header>

      <Card className="card-shadow border-border/60 p-5">
        {isLoading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
        ) : !data || data.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No prescriptions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="pb-3">Patient</th><th className="pb-3">Medicine</th>
                  <th className="pb-3">Dosage</th><th className="pb-3">Frequency</th>
                  <th className="pb-3">Duration</th><th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.map((rx: any) => (
                  <tr key={rx.id} className="hover:bg-muted/40">
                    <td className="py-3">
                      {rx.patient ? (
                        <Link to="/patients/$id" params={{ id: rx.patient.id }} className="font-medium hover:text-primary">
                          {rx.patient.full_name}
                        </Link>
                      ) : "—"}
                    </td>
                    <td className="py-3"><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /><span className="font-medium">{rx.medicine_name}</span></div></td>
                    <td className="py-3">{rx.dosage || "—"}</td>
                    <td className="py-3">{rx.frequency || "—"}</td>
                    <td className="py-3">{rx.duration ? <Badge variant="secondary">{rx.duration}</Badge> : "—"}</td>
                    <td className="py-3 text-muted-foreground">{format(new Date(rx.created_at), "PP")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
