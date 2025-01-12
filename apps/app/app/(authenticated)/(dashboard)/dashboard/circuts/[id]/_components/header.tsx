import Link from "next/link";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar";
import { Code, Play, Coins, GitForkIcon } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center h-16 px-4 gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <span className="font-medium">im-kazmi</span>
          <span className="text-muted-foreground">/</span>
          <span>33333</span>
          <span className="px-2 py-1 rounded-full bg-muted text-xs">
            Public
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Code className="h-4 w-4" />
            Code
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Play className="h-4 w-4" />
            Runs
            <span className="px-1.5 py-0.5 rounded-full bg-muted text-xs">
              0
            </span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Coins className="h-4 w-4" />
            Tokens
            <span className="px-1.5 py-0.5 rounded-full bg-muted text-xs">
              0
            </span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <GitForkIcon className="h-4 w-4" />
            Fork
          </Button>
        </div>
      </div>
    </header>
  );
}
