import { Button } from "@repo/design-system/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/design-system/components/ui/tooltip";
import { Brain, MemoryStickIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CircutUpdateInput } from "../client-page";
import { useModelConfigSheet } from "@/app/store/use-model-config-sheet";
import { aiModels } from "@repo/common";
import { useState, useMemo } from "react";
import { iconMap } from "@/app/utils/constants";
export const ModelTrigger = () => {
  const { onOpen } = useModelConfigSheet();

  const { control, watch, setValue, getValues } =
    useFormContext<CircutUpdateInput>();

  const model = watch("config.model");

  const currentModelKey = useMemo(
    () =>
      Object.entries(aiModels).find(([key, models]) =>
        models.includes(model),
      )?.[0],
    [model],
  );

  const currentModelIcon = currentModelKey ? iconMap[currentModelKey] : null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onOpen}
          variant="outline"
          className="border-muted-foreground/30"
        >
          {currentModelIcon} {model}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Select Model</TooltipContent>
    </Tooltip>
  );
};
