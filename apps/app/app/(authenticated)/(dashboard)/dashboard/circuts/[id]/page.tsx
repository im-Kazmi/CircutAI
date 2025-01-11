"use client";

import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { useGetCircut } from "@repo/features/circut";

type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params }: Props) => {
  const { data, isLoading, isPending } = useGetCircut(params.id);

  return (
    <div className="">
      <ShadowWrapper>{JSON.stringify(data)}</ShadowWrapper>
    </div>
  );
};

export default Page;
