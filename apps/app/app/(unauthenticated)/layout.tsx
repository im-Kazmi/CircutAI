import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { env } from "@repo/env";
import { CommandIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="relative z-20 flex items-center font-medium text-lg">
        <CommandIcon className="mr-2 h-6 w-6" />
        Blooms
      </div>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="relative z-20 mt-auto"></div>
    </div>
    <div className="lg:p-8">
      <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6">
        {children}
        <p className="px-8 text-center text-muted-foreground text-sm">
          By clicking continue, you agree to our and .
        </p>
      </div>
    </div>
  </div>
);

export default AuthLayout;
