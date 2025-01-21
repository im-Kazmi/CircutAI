import { useModelKeyDialog } from "@/app/store/use-model-key-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/design-system/components/ui/dialog";
import { FormValues, ModelKeyForm } from "./model-key-form";
import { useCreateApiKey } from "@repo/features/apiKey/mutations";
import { useUpdateApiKey } from "@repo/features/apiKey/mutations";
import { useRevokeApiKey } from "@repo/features/apiKey/mutations";

export function ModelKeyDialog() {
  const { data: modelData, onClose, isOpen } = useModelKeyDialog();
  const createMutation = useCreateApiKey();
  const updateMutation = useUpdateApiKey(modelData?.id!, modelData?.type!);
  const revokeMutation = useRevokeApiKey(modelData?.type!);

  function onSubmit(data: FormValues) {
    if (modelData && modelData.id) {
      updateMutation.mutate(
        {
          key: data.key,
        },
        {
          onSuccess: (data, vars) => {
            onClose();
          },
          onError: () => {},
          onSettled: () => {},
        },
      );
    } else {
      createMutation.mutate(
        {
          key: data.key,
          type: modelData?.type as any,
        },
        {
          onSuccess: (data, vars) => {
            onClose();
          },
          onError: () => {},
          onSettled: () => {},
        },
      );
    }
  }

  function onDelete() {
    revokeMutation.mutate(modelData?.id!, {
      onSuccess: (data, vars) => {
        onClose();
      },
    });
  }

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    revokeMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create {modelData?.type} Key</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ModelKeyForm
          onSubmit={onSubmit}
          defaultValues={{
            key: modelData?.key ? modelData.key : "",
          }}
          disabled={isLoading}
          id={modelData?.id ? modelData.id : undefined}
          onDelete={onDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
