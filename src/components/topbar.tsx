import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, LogOut, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQueryClient } from "@tanstack/react-query";

export function TopBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user } = useCurrentUser();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/patients", search: { q } as never });
  };

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const email = user?.email ?? "";
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur md:px-6">
      <SidebarTrigger />
      <form onSubmit={onSearch} className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search patients by name, CNIC or phone…"
          className="h-10 rounded-full border-border/70 bg-background pl-9"
        />
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 gap-2 rounded-full pl-1 pr-3">
            <Avatar className="h-8 w-8"><AvatarFallback className="med-gradient text-white text-xs font-semibold">{initials || "DR"}</AvatarFallback></Avatar>
            <span className="hidden text-sm font-medium sm:inline">{email || "Doctor"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
            <User className="mr-2 h-4 w-4" /> Profile & settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
