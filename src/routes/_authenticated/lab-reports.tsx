import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { FlaskConical, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/lab-reports")({
  component: LabReports,
});

function LabReports() {
  const { data, isLoading } = useQuery({
    queryKey: ["all-labs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lab_reports")
        .select("*, patient:patients(id,full_name)")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
  });
  const open = async (path: string) => {
    const { data, error } = await supabase.storage.from("patient-files").createSignedUrl(path, 600);
    if (error) return toast.error(error.message);
    window.open(data.signedUrl, "_blank");
  };
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Laboratory Reports</h1>
        <p className="text-sm text-muted-foreground">All uploaded reports and medical images.</p>
      </header>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : !data || data.length === 0 ? (
        <Card className="border-dashed p-12 text-center text-sm text-muted-foreground">No reports uploaded yet.</Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((l: any) => (
            <Card key={l.id} className="card-shadow border-border/60 p-4">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/20 text-accent-foreground">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{l.title}</div>
                  {l.patient && (
                    <Link to="/patients/$id" params={{ id: l.patient.id }} className="text-xs text-primary hover:underline">{l.patient.full_name}</Link>
                  )}
                  <div className="text-xs text-muted-foreground">{format(new Date(l.created_at), "PP")}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => open(l.file_path)}>
                <ExternalLink className="mr-2 h-4 w-4" /> Open file
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
