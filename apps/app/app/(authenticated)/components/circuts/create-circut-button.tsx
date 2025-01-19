import { Protect } from "@repo/auth/client";
import Link from "next/link";
import { TextureButton } from "@repo/design-system/components/ui/texture-button";
import { Button } from "@repo/design-system/components/ui/button";
import { PlusCircle } from "lucide-react";

export const CreateCircutButton = () => {
  return (
    <Protect condition={(has) => has({ role: "org:admin" })}>
      <Link href={"/dashboard/circuts/new"}>
        <Button className="bg-[#FF6B6B]">
          <PlusCircle className="mr-2" /> Create circut
        </Button>
      </Link>
    </Protect>
  );
};
