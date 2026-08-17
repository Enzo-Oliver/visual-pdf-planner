import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, mounted, toggleTheme } = useTheme();

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-2.5 py-1.5 text-xs text-muted-foreground",
        className,
      )}
      suppressHydrationWarning
    >
      <Sun className={cn("h-3.5 w-3.5", !isDark && "text-primary")} />
      <Switch
        checked={isDark}
        disabled={!mounted}
        onCheckedChange={(v) => toggleTheme(v)}
        aria-label="Alternar tema escuro"
      />
      <Moon className={cn("h-3.5 w-3.5", isDark && "text-primary")} />
    </label>
  );
}
