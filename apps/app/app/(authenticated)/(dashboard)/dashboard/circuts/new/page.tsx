"use client";

import { CreateCircutForm } from "@/app/(authenticated)/components/circuts/create-circut-form";
import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { AdminPermissionRequired } from "@/app/(authenticated)/components/shared/admin-permission";
import { Protect, useAuth } from "@repo/auth/client";

export default function page() {
  const { has } = useAuth();

  if (!has) return null;

  const havePermissions = has({ role: "org:admin" });

  if (!havePermissions) {
    return <AdminPermissionRequired />;
  }
  return (
    <ShadowWrapper>
      <CreateCircutForm />
    </ShadowWrapper>
  );
}
