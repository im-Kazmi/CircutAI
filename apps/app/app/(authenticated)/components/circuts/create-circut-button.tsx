import { Protect } from "@repo/auth/client";
import { Button } from "@repo/design-system/components/ui/button";
import Link from "next/link";
import { TextureButton } from "@repo/design-system/components/ui/texture-button";
import { PlusCircle } from "lucide-react";

export const CreateCircutButton = () => {
  return (
    <Protect condition={(has) => has({ role: "org:admin" })}>
      <Link href={"/dashboard/circuts/new"}>
        <TextureButton variant="secondary">
          <PlusCircle className="mr-2" /> Create circut
        </TextureButton>
      </Link>
    </Protect>
  );
};
