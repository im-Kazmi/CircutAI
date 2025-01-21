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
import { FormValues, ModelKeyForm } from "./model-key-form";
import { useCreateApiKey } from "@repo/features/apiKey/mutations";

export function ModelKeyDialog() {
  const { type, onClose, isOpen } = useModelKeyDialog();
  const mutation = useCreateApiKey();

  function onSubmit(data: FormValues) {
    mutation.mutate(
      {
        key: data.key,
        type: type as any,
      },
      {
        onSuccess: (data, vars) => {},
        onError: () => {},
        onSettled: () => {},
      },
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create {type} Key</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ModelKeyForm
          onSubmit={onSubmit}
          defaultValues={{
            key: "",
          }}
          disabled={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
