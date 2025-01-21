"use client";
import { Keysets } from "@/app/(authenticated)/components/models/keysets";
import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";

export const ClientPage = () => {
  return (
    <ShadowWrapper>
      <Keysets />
    </ShadowWrapper>
  );
};
