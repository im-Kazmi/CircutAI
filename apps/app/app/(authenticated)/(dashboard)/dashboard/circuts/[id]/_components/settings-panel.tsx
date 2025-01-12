import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Label } from "@repo/design-system/components/ui/label";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Info, Variable } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/design-system/components/ui/tooltip";

export function SettingsPanel() {
  return (
    <div className="space-y-4">
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Variable className="h-4 w-4" />
            Variables
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">No variables defined</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            Configuration
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Configure how your AI assistant behaves
              </TooltipContent>
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="json-mode">JSON mode</Label>
              <p className="text-xs text-muted-foreground">
                Force responses in JSON format
              </p>
            </div>
            <Switch id="json-mode" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="moderation">Moderation</Label>
              <p className="text-xs text-muted-foreground">
                Filter inappropriate content
              </p>
            </div>
            <Switch id="moderation" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="stream-mode">Stream mode</Label>
              <p className="text-xs text-muted-foreground">
                Stream responses in real-time
              </p>
            </div>
            <Switch id="stream-mode" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="store-messages">Store messages</Label>
              <p className="text-xs text-muted-foreground">
                Save conversation history
              </p>
            </div>
            <Switch id="store-messages" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
