import { Checkbox } from "@repo/design-system/components/ui/checkbox";
import { Label } from "@repo/design-system/components/ui/label";
import { Switch } from "@repo/design-system/components/ui/switch";

type Props = {
  label: string;
  description: string;
  checked: boolean;
  onCheckChange: (val: boolean) => void;
};

export const CustomSwitch = ({
  label,
  checked,
  onCheckChange,
  description,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="json-mode">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={onCheckChange}
        className="data-[state=unchecked]:border-input dark:data-[state=checked]:bg-[#CBFFBF]  data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
      />
    </div>
  );
};
