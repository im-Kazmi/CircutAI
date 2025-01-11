import { Protect } from "@repo/auth/client";
import { Button } from "@repo/design-system/components/ui/button";
import Link from "next/link";
import { TextureButton } from "@repo/design-system/components/ui/texture-button";

export const CreateCircutButton = () => {
  return (
    <Protect condition={(has) => has({ role: "org:admin" })}>
      <Link href={"/dashboard/circuts/new"}>
        <TextureButton variant="secondary">Create circut</TextureButton>
      </Link>
    </Protect>
  );
};
