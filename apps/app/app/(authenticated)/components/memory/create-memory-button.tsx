import { Protect } from "@repo/auth/client";
import { Button } from "@repo/design-system/components/ui/button";
import Link from "next/link";
import { TextureButton } from "@repo/design-system/components/ui/texture-button";
import { PlusCircle } from "lucide-react";

export const CreateMemoryButton = () => {
  return (
    <Protect condition={(has) => has({ role: "org:admin" })}>
      <Link href={"/dashboard/memory/new"}>
        <TextureButton variant="secondary">
          <PlusCircle className="mr-2" /> Create Memory
        </TextureButton>
      </Link>
    </Protect>
  );
};
