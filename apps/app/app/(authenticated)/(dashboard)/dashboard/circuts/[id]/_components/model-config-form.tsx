import { TempratureSlider } from "./temprature-slider";
import { ModelsSelect } from "./models-select";
import { useFormContext } from "react-hook-form";
import { CircutUpdateInput } from "../client-page";
import { ValueSlider } from "./value-slider";
import { Torus, AlarmClockOff } from "lucide-react";
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
          Icon=<Torus />
          tooltipDescription="Tokens can be thought of as pieces of words.
          Maximum number of tokens in the response message returned."
        />
        {/* i would have mapped through a list but i like it this way */}
        <ValueSlider
          title="Presence Penalty"
          value={config.presence_penalty}
          maxValue={2}
          minValue={-2}
          step={0.1}
          onValueChange={(v) => onChangeValue("presence_penalty", v)}
          Icon=<AlarmClockOff />
          tooltipDescription="Presence Penalty: Penalizes a word on its occurrence in the input text. Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."
        />
        {/* i would have mapped through a list but i like it this way */}
        <ValueSlider
          title="Frequency Penalty"
          value={config.frequency_penalty}
          maxValue={2}
          minValue={-2}
          step={0.1}
          onValueChange={(v) => onChangeValue("frequency_penalty", v)}
          Icon=<AlarmClockOff />
          tooltipDescription="Frequency Penalty: Penalizes a word on how frequently it appears in the training data. Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."
        />
        {/* i would have mapped through a list but i like it this way */}
        <ValueSlider
          title="Top P"
          value={config.top_p}
          maxValue={1}
          minValue={0}
          step={0.1}
          onValueChange={(v) => onChangeValue("top_p", v)}
          Icon=<AlarmClockOff />
          tooltipDescription="An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

          OpenAI: Recommends altering either `temperature` or `top_p` but not both."
        />
      </div>
    </div>
  );
};
