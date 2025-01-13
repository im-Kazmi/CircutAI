import { Protect } from "@repo/auth/client";
import { Button } from "@repo/design-system/components/ui/button";
import Link from "next/link";
import { TextureButton } from "@repo/design-system/components/ui/texture-button";
import { PlusCircle } from "lucide-react";
import { useCreateMemorySheet } from "@/app/store/use-create-memory-sheet";

export const CreateMemoryButton = () => {
  const { onOpen } = useCreateMemorySheet();
  return (
    <Protect condition={(has) => has({ role: "org:admin" })}>
      {/* <Link href={"/dashboard/memory/new"}> */}
      <TextureButton onClick={onOpen} variant="secondary">
        <PlusCircle className="mr-2" /> Create Memory
      </TextureButton>
      {/* </Link> */}
    </Protect>
  );
};
