import { Separator } from "@repo/design-system/components/ui/separator";
import type React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const DashboardHeader = ({ title, children }: Props) => {
  return (
    <div className=" flex flex-col gap-y-2  mb-5">
      <div className=" flex justify-between w-full">
        <h1 className=" text-lg font-bold text-neutral-500 dark:text-white ">
          {title}
        </h1>
        {children}
      </div>
      <Separator className=" w-full opacity-30" />
    </div>
  );
};

export default DashboardHeader;
