"use client";

import { useState } from "react";
import { useOrganization, useOrganizationList } from "@repo/auth/client";
import { useQueryClient } from "@repo/react-query";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@repo/design-system/lib/utils";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@repo/design-system/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/design-system/components/ui/popover";

const models = [
  "ANTHROPIC",
  "OPENAI",
  "MISTRAL",
  "TOGETHER",
  "GROQ",
  "GOOGLE",
  "COHERE",
  "FIREWORKS",
  "PERPLEXITY",
  "DEEPSEEK",
  "XAI",
];
export const ModelsSelect = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          asdfsdf
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandEmpty>No Model found.</CommandEmpty>
          <CommandGroup>
            {models.map((model) => (
              <CommandItem
                key={model}
                value={model}
                className=" cursor-pointer"
                // onSelect={() => handleOrganizationChange(model.organization.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    model === "OPENAI" ? "opacity-100" : "opacity-0",
                  )}
                />

                {model}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
