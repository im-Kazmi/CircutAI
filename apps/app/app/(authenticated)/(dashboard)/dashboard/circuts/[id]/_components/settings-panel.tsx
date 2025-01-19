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
import { Circut } from "@prisma/client";
import { MetaSettings } from "./meta-settings";
import { useFormContext } from "react-hook-form";
import { CircutUpdateInput } from "../client-page";
import { CustomSwitch } from "./custom-switch";

type CircutChanged = Omit<Circut, "createdAt" | "updatedAt">;

export function SettingsPanel() {
  const { control, watch, setValue, getValues } =
    useFormContext<CircutUpdateInput>();

  const variables = watch("config.variables");
  return (
    <div className="space-y-4">
      <Card className="rounded-xl bg-transparent border shadow-none">
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
        <MetaSettings />
      </Card>
      <Card className="rounded-xl bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Variable className="h-4 w-4" />
            Variables
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {variables && variables.map((v) => <h1>{v}</h1>)}
          <p className="text-sm text-muted-foreground">No variables defined</p>
        </CardContent>
      </Card>
    </div>
  );
}
