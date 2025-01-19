import { cn } from "@repo/design-system/lib/utils";
import { Label } from "@repo/design-system/components/ui/label";
import { Slider } from "@repo/design-system/components/ui/slider";
import { Heater } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CircutUpdateInput } from "../client-page";
import { Badge } from "@repo/design-system/components/ui/badge";
export const TempratureSlider = () => {
  const max = 1;
  const { control, watch, setValue, getValues } =
    useFormContext<CircutUpdateInput>();

  const temprature = watch("config.temperature");

  const values = ["Custom", "Precise", "Creative", "Random"];

  return (
    <div className="space-y-4">
      <div className="flex justify-between w-full">
        <div className="flex gap-x-2 items-center ">
          <Heater size={20} /> <Label>Temprature</Label>
        </div>

        <Badge>{temprature}</Badge>
      </div>
      <div>
        <Slider
          defaultValue={[temprature]}
          max={max}
          step={0.1}
          aria-label="Slider with ticks"
          className=""
          onValueChange={(val) => setValue("config.temperature", val)}
        />
        <span
          className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          {values.map((v, i) => (
            <span
              key={i}
              className="flex flex-col  items-center justify-center gap-2"
            >
              {v}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};
