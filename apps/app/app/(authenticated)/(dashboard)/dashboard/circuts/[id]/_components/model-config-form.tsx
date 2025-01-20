import { TempratureSlider } from "./temprature-slider";
import { ModelsSelect } from "./models-select";
import { useFormContext } from "react-hook-form";
import { CircutUpdateInput } from "../client-page";
import { ValueSlider } from "./value-slider";
import {
  Torus,
  AlarmClockOff,
  Maximize2,
  Compass,
  Repeat,
  PieChart,
} from "lucide-react";
export const ModelConfigForm = () => {
  const { control, watch, setValue, getValues } =
    useFormContext<CircutUpdateInput>();

  const config = watch("config");

  const onChangeValue = (key: string, value: string) => {
    setValue(`config.${key}`, value);
  };
  return (
    <div className="flex flex-col gap-y-3 mt-10">
      <div className="flex justify-between w-full my-5">
        <h1 className="text-lg font-bold">Model</h1>
        <ModelsSelect />
      </div>
      <TempratureSlider />

      <div className="flex flex-col gap-y-6 mt-10">
        {/* i would have mapped through a list but i like it this way */}
        <ValueSlider
          title="Max Tokens"
          value={config.max_tokens}
          maxValue={4096}
          minValue={50}
          step={1}
          onValueChange={(v) => onChangeValue("max_tokens", v)}
          Icon=<Maximize2 size={15} />
          tooltipDescription="The maximum number of words the model can generate in its response."
        />
        {/* i would have mapped through a list but i like it this way */}
        <ValueSlider
          title="Presence Penalty"
          value={config.presence_penalty}
          maxValue={2}
          minValue={-2}
          step={0.1}
          onValueChange={(v) => onChangeValue("presence_penalty", v)}
          Icon=<Compass size={15} />
          tooltipDescription="This setting helps the model talk about new topics instead of repeating what it already said."
        />
        {/* i would have mapped through a list but i like it this way */}
        <ValueSlider
          title="Frequency Penalty"
          value={config.frequency_penalty}
          maxValue={2}
          minValue={-2}
          step={0.1}
          onValueChange={(v) => onChangeValue("frequency_penalty", v)}
          Icon=<Repeat size={15} />
          tooltipDescription="This setting helps reduce how often the model repeats the same words."
        />
        {/* i would have mapped through a list but i like it this way */}
        <ValueSlider
          title="Top P"
          value={config.top_p}
          maxValue={1}
          minValue={0}
          step={0.1}
          onValueChange={(v) => onChangeValue("top_p", v)}
          Icon=<PieChart size={15} />
          tooltipDescription="This controls how many different options the model considers when picking words. A smaller value means fewer options."
        />
      </div>
    </div>
  );
};
