import { cn } from "@repo/design-system/lib/utils";
import { Label } from "@repo/design-system/components/ui/label";
import { Slider } from "@repo/design-system/components/ui/slider";
import { CircutUpdateInput } from "../client-page";
import { ReactNode } from "react";
import { Button } from "@repo/design-system/components/ui/button";
import { Badge } from "@repo/design-system/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/design-system/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
type Props = {
  title: string;
  tooltipDescription?: string;
  value: number;
  maxValue: number;
  minValue: number;
  step: number;
  Icon?: ReactNode;
  onValueChange: (val: number) => void;
};

export const ValueSlider = ({
  title,
  Icon,
  onValueChange,
  value,
  maxValue,
  minValue,
  step,
  tooltipDescription,
}: Props) => {
  return (
    <div className="flex justify-between items-center gap-x-5">
      <div className="flex gap-x-2 items-center w-full ">
        {Icon}
        <Label>{title}</Label>

        {tooltipDescription && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-4 w-4">
                <InfoIcon className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className=" py-3 max-w-80 ">
              <div className="flex gap-3">
                {Icon}
                <div className="space-y-1">
                  <p className="text-[13px] font-medium">{title}</p>
                  <p className="text-xs">{tooltipDescription}</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <Slider
        defaultValue={[value]}
        max={maxValue}
        min={minValue}
        step={step}
        className=""
        onValueChange={onValueChange}
      />
      <Badge className="w-24">{value}</Badge>
    </div>
  );
};
