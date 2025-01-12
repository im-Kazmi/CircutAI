import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";
import { Button } from "@repo/design-system/components/ui/button";
import { Brain, MemoryStickIcon, Key, Wand2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/design-system/components/ui/tooltip";

export function EnvSelector() {
  return (
    <div className="flex items-center gap-3 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Select defaultValue="production">
        <SelectTrigger className="w-[180px] bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
          <SelectValue placeholder="Select environment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="production">PRODUCTION v1</SelectItem>
          <SelectItem value="staging">STAGING v1</SelectItem>
          <SelectItem value="development">DEVELOPMENT v1</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Brain className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Select Model</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MemoryStickIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Memory Settings</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Key className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>LLM Keys</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" size="sm" className="gap-2">
          <Wand2 className="h-4 w-4" />
          Deploy Changes
        </Button>
      </div>
    </div>
  );
}
