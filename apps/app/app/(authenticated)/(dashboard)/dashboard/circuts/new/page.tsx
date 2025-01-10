"use client";

import { CreateCircutForm } from "@/app/(authenticated)/components/circuts/create-circut-form";
import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { Protect, useAuth } from "@repo/auth/client";

export default function page() {
  const { has } = useAuth();

  if (!has) return null;

  const canManageSettings = has({ permission: "org:team_settings:manage" });

  return (
    <Protect condition={(has) => has({ role: "org:admin" })}>
      {" "}
      <CreateCircutForm />
    </Protect>
  );
}
