import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/design-system/components/ui/sheet";
import { ModelConfigForm } from "./model-config-form";
import { useModelConfigSheet } from "@/app/store/use-model-config-sheet";

export const ModelConfigSheet = () => {
  const { isOpen, onClose } = useModelConfigSheet();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="lg:min-w-[600px]">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            <ModelConfigForm />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
