import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Label } from "@repo/design-system/components/ui/label";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Info } from "lucide-react";

export function MetaSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">3333</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            Meta
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="json-mode">JSON mode</Label>
            <Switch id="json-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="moderation">Moderation</Label>
            <Switch id="moderation" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="stream-mode">Stream mode</Label>
            <Switch id="stream-mode" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="store-messages">Store messages</Label>
            <Switch id="store-messages" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
