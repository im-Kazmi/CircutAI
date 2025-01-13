"use client";

import { FormValues } from "@/app/(authenticated)/components/memory/create-memory-sheet";
import { MemoryForm } from "@/app/(authenticated)/components/memory/memory-form";
import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { AdminPermissionRequired } from "@/app/(authenticated)/components/shared/admin-permission";
import { Protect, useAuth } from "@repo/auth/client";
import { useCreateMemory } from "@repo/features/memory";
import { useRouter } from "next/navigation";

export default function page() {
  const { has } = useAuth();

  const mutation = useCreateMemory();
  const router = useRouter();

  function onSubmit(data: FormValues) {
    mutation.mutate(data, {
      onSuccess: (data, vars) => {
        router.push(`/dashboard/memory/${data?.id}`);
      },
      onError: () => {},
      onSettled: () => {},
    });
  }

  if (!has) return null;

  const havePermissions = has({ role: "org:admin" });

  if (!havePermissions) {
    return <AdminPermissionRequired />;
  }

  return (
    <ShadowWrapper>
      <MemoryForm
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          description: "",
          embeddingModel: "OPENAI",
        }}
        disabled={mutation.isPending}
      />
    </ShadowWrapper>
  );
}
