import { Circut } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Label } from "@repo/design-system/components/ui/label";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CircutUpdateInput } from "../client-page";
import { CustomSwitch } from "./custom-switch";

type CircutChanged = Omit<Circut, "createdAt" | "updatedAt">;

export function MetaSettings() {
  const { control, watch, setValue, getValues } =
    useFormContext<CircutUpdateInput>();

  const config = watch("config");

  const updateConfig = (key: string, value: string) =>
    setValue(`config.${key}`, value);

  return (
    <div className="space-y-4">
      <Card className="bg-transparent shadow-none border-none">
        <CardContent className="space-y-4">
          <CustomSwitch
            description="Force responses in JSON format"
            label="JSON mode"
            onCheckChange={(v) => updateConfig("json", v)}
            checked={config?.json}
          />
          <CustomSwitch
            description="Filter inappropriate content"
            label="Moderation"
            onCheckChange={(v) => updateConfig("moderate", v)}
            checked={config?.moderate}
          />
          <CustomSwitch
            description="Streaming"
            label=" Stream responses in real-time"
            onCheckChange={(v) => updateConfig("stream", v)}
            checked={config?.stream}
          />
          <CustomSwitch
            description="Save conversation history"
            label="Store messages"
            onCheckChange={(v) => updateConfig("store", v)}
            checked={config?.store}
          />
        </CardContent>
      </Card>
    </div>
  );
}
