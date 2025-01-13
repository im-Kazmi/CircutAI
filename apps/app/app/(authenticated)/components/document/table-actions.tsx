import { Button } from "@repo/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@repo/design-system/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "@repo/design-system/icons";
import { useConfirm } from "@repo/design-system/hooks/use-confirm";
import { useUpdateMemorySheet } from "@/app/store/use-update-memory-sheet";

type Props = {
  id: string;
};
export const DocumentActions = ({ id }: Props) => {
  const { onOpen } = useUpdateMemorySheet();
  // const deleteMutation = useDeleteMemory(id);

  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure! 🖐️",
    message: "This will permanently delete this document!",
  });

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      // deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"ghost"} className=" size-8 p-0">
            <MoreHorizontal className=" size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            // disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className=" size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            // disabled={deleteMutation.isPending}
            onClick={onDelete}
          >
            <Trash className=" size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
