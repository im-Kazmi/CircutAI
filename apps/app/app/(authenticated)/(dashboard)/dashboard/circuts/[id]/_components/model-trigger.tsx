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

export const ModelTrigger = () => {
  const { onOpen } = useModelConfigSheet();

  const { control, watch, setValue, getValues } =
    useFormContext<CircutUpdateInput>();

  const model = watch("config.model");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onOpen}
          variant="outline"
          className="border-[#CBFFBF]/30"
        >
          <Brain className="h-4 w-4" /> {model}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Select Model</TooltipContent>
    </Tooltip>
  );
};
