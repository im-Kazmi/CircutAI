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

export const CustomOrganizationSwitcher = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { organization } = useOrganization();

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const handleOrganizationChange = async (orgId: string) => {
    await setActive?.({ organization: orgId });
    queryClient.invalidateQueries();
    setOpen(false);
  };

  if (!isLoaded) {
    return (
      <Button variant="outline" className="w-[200px] justify-start">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  const organizations = userMemberships.data || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <img
            src={organization?.imageUrl}
            className="size-8 rounded-full"
            alt=""
          />
          {organization ? organization.name : "Select organization"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search organization..." />
          <CommandEmpty>No organization found.</CommandEmpty>
          <CommandGroup>
            {organizations.map((mem) => (
              <CommandItem
                key={mem.organization.id}
                value={mem.organization.name}
                className=" cursor-pointer"
                onSelect={() => handleOrganizationChange(mem.organization.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    mem.organization.id === organization?.id
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                <img
                  src={mem.organization.imageUrl}
                  className="size-4 rounded-full"
                  alt=""
                />
                {mem.organization.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        {userMemberships.hasNextPage && (
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => userMemberships.fetchNext()}
          >
            Load more organizations
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};
