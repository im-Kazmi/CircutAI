"use client";

import { useState, useMemo } from "react";
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
import { useFormContext } from "react-hook-form";
import { CircutUpdateInput } from "../client-page";
import { aiModels } from "@repo/common";

import { ScrollArea } from "@repo/design-system/components/ui/scroll-area";
import { iconMap } from "@/app/utils/constants";
export const ModelsSelect = () => {
  const [open, setOpen] = useState(false);

  const { control, watch, setValue, getValues } =
    useFormContext<CircutUpdateInput>();

  const currentModel = watch("config.model");

  const onChangeModel = (model: string) => {
    setValue(`config.model`, model);
    setOpen(false);
  };

  const currentModelKey = useMemo(
    () =>
      Object.entries(aiModels).find(([key, models]) =>
        models.includes(currentModel),
      )?.[0],
    [currentModel],
  );

  const currentModelIcon = currentModelKey ? iconMap[currentModelKey] : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          <div className="flex gap-x-3">
            {currentModelIcon && (
              <span className="ml-2">{currentModelIcon}</span>
            )}
            {currentModel}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search models..." />
          <CommandEmpty>No Model found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-72 rounded-md ">
              <div key={"container"}>
                {Object.entries(aiModels).map(([key, models]) => (
                  <div className="" key={key}>
                    <CommandItem
                      key={key}
                      value={key}
                      className=" cursor-pointer"
                    >
                      {iconMap[key]} {key.toUpperCase()}
                    </CommandItem>
                    {models.map((model) => (
                      <CommandItem
                        key={model}
                        value={model}
                        className=" cursor-pointer"
                        onSelect={() => onChangeModel(model)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            model === currentModel
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {iconMap[key]} {key.toUpperCase()} {model}
                      </CommandItem>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
