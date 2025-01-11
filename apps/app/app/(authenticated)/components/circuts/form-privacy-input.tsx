import { Checkbox } from "@repo/design-system/components/ui/checkbox";
import { Label } from "@repo/design-system/components/ui/label";
import { cn } from "@repo/design-system/lib/utils";

type Props = {
  type: "PRIVATE" | "PUBLIC";
  onChange: (val: string) => void;
  value: string;
};

export const FormPrivacyInput = ({ type, onChange, value }: Props) => {
  let description = {
    PRIVATE: "Only you and your organization members can access to this agent.",
    PUBLIC:
      "Anyone on the internet can access to this agent but not to your keys.",
  };
  return (
    <div
      className={cn(
        type === value && "bg-muted/50",
        "relative flex w-full items-start gap-2 rounded-lg border border-neutral-300 p-4 shadow-sm shadow-black/5 ",
      )}
    >
      <Checkbox
        onCheckedChange={(check) => onChange(type)}
        checked={type === value}
        id={type}
        className="order-1 after:absolute after:inset-0"
      />
      <div className="grid grow gap-2">
        <Label htmlFor={type}>
          {type.toLowerCase()}
          {/* <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
            (Sublabel)
          </span> */}
        </Label>
        <p id={`${type}-description`} className="text-xs text-muted-foreground">
          {description[type]}
        </p>
      </div>
    </div>
  );
};
