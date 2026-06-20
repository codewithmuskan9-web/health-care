import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { HeartPulse, Activity, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) throw redirect({ to: "/dashboard" });
  },
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = "Sign in — MediCare"; }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tab === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account created. Welcome!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden p-12 text-white med-gradient lg:flex">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <HeartPulse className="h-6 w-6" />
          </div>
          <div className="font-display text-xl font-bold">MediCare</div>
        </div>
        <div className="relative space-y-8">
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight">
              Patient records,<br />reimagined for modern clinics.
            </h1>
            <p className="mt-4 max-w-md text-white/80">
              Manage histories, prescriptions, lab reports and visits — all from one secure dashboard.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { Icon: Activity, t: "Visit timelines", d: "Track treatment progress at a glance." },
              { Icon: Shield, t: "Secure by default", d: "Row-level access. Only you see your patients." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur">
                <Icon className="mt-0.5 h-5 w-5" />
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-white/75">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-white/60">© {new Date().getFullYear()} MediCare</div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-12">
        <Card className="w-full max-w-md card-shadow border-border/70 p-8">
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl med-gradient text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div className="font-display text-lg font-bold">MediCare</div>
          </div>
          <h2 className="font-display text-2xl font-bold">
            {tab === "signin" ? "Welcome back, Doctor" : "Create your account"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {tab === "signin" ? "Sign in to access your dashboard." : "Start managing your patients today."}
          </p>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")} className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value={tab} forceMount>
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                {tab === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="fn">Full name</Label>
                    <Input id="fn" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Dr. Sara Khan" required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="em">Email</Label>
                  <Input id="em" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pw">Password</Label>
                  <Input id="pw" type="password" autoComplete={tab === "signin" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                </div>
                <Button type="submit" disabled={loading} className="h-11 w-full text-base font-semibold">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {tab === "signin" ? "Sign in" : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
