import { Circut } from "@prisma/client";
import { Button } from "@repo/design-system/components/ui/button";
import { Code, Play, Coins, GitForkIcon } from "lucide-react";

type CircutChanged = Omit<Circut, "createdAt" | "updatedAt">;

type Props = {
  circut: CircutChanged;
};

export function HeaderActions({ circut }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b ">
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
