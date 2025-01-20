import { useModelKeyDialog } from "@/app/store/use-model-key-dialog";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/design-system/components/ui/dialog";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { ModelKeyForm } from "./model-key-form";

export function ModelKeyDialog() {
  const { type, onClose, isOpen } = useModelKeyDialog();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create {type} Key</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ModelKeyForm />
      </DialogContent>
    </Dialog>
  );
}
