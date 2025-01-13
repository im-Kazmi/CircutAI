import { useUrlState } from "@/app/hooks/use-url-state";
import { Button } from "@repo/design-system/components/ui/button";
import { cn } from "@repo/design-system/lib/utils";
import { Brain, Settings2, Waypoints } from "lucide-react";

export function HeaderActions() {
  const [view, setView] = useUrlState("view", {});
  return (
    <div className="flex w-full items-center gap-2 px-4 py-2 border-b bg-background/95 min-w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button
        onClick={() => setView("memory")}
        variant="ghost"
        size="sm"
        className={cn("gap-2", view === "memory" && "bg-muted")}
      >
        <Brain className="h-4 w-4 text-neutral-600" />
        Memory
      </Button>
      <Button
        onClick={() => setView("testing")}
        variant="ghost"
        size="sm"
        className={cn("gap-2", view === "testing" && "bg-muted")}
      >
        <Waypoints className="h-4 w-4" />
        Retrievel testing
      </Button>
      <Button
        onClick={() => setView("settings")}
        variant="ghost"
        size="sm"
        className={cn("gap-2", view === "settings" && "bg-muted")}
      >
        <Settings2 className="h-4 w-4" />
        Settings
      </Button>
    </div>
  );
}
