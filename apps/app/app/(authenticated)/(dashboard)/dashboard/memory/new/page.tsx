"use client";

import { CreateMemoryForm } from "@/app/(authenticated)/components/memory/create-memory-form";
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
      <CreateMemoryForm />
    </ShadowWrapper>
  );
}
