import { Button } from "@repo/design-system/components/ui/button";
import { Code, Play, Coins, GitForkIcon } from "lucide-react";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button variant="ghost" size="sm" className="gap-2">
        <Code className="h-4 w-4" />
        Code
      </Button>
      <Button variant="ghost" size="sm" className="gap-2">
        <Play className="h-4 w-4" />
        Runs
        <span className="px-1.5 py-0.5 rounded-full bg-muted text-xs">0</span>
      </Button>
      <Button variant="ghost" size="sm" className="gap-2">
        <Coins className="h-4 w-4" />
        Tokens
        <span className="px-1.5 py-0.5 rounded-full bg-muted text-xs">0</span>
      </Button>
      <Button variant="ghost" size="sm" className="gap-2">
        <GitForkIcon className="h-4 w-4" />
        Fork
      </Button>
    </div>
  );
}
