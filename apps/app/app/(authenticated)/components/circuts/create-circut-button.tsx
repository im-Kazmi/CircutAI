import { Protect } from "@repo/auth/client";
import { Button } from "@repo/design-system/components/ui/button";
import Link from "next/link";

export const CreateCircutButton = () => {
  return (
    <Protect condition={(has) => has({ role: "org:admin" })}>
      <Link href={"/dashboard/circuts/new"}>
        <Button>Create circut</Button>
      </Link>
    </Protect>
  );
};
