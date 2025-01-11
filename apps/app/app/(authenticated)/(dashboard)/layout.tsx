"use client";
import { useOnboardingDialog } from "@/app/store/use-onboarding-dialog";
import {
  RedirectToSignIn,
  useOrganizationList,
  useUser,
} from "@repo/auth/client";
import { Button } from "@repo/design-system/components/ui/button";
import { SidebarProvider } from "@repo/design-system/components/ui/sidebar";
import { type ReactNode, useEffect } from "react";
import { GlobalSidebar } from "../components/dashboard/sidebar";
import { OnBoardingDialog } from "../components/dialogs/onboarding-dialog";
import { useOrganization } from "@repo/auth/client";
import { redirect } from "next/navigation";
import { ShadowWrapper } from "../components/shadow-wrapper";
type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProperties) => {
  const { user, isSignedIn } = useUser();

  const { membership, organization, isLoaded } = useOrganization({
    memberships: true,
  });

  const { setActive } = useOrganizationList();

  if (!isSignedIn) {
    RedirectToSignIn({});
  }

  if (isSignedIn && isLoaded && (!membership || !organization)) {
    return redirect("/create-org");
  }

  return (
    <SidebarProvider>
      <GlobalSidebar>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-muted/50">
          <div className="min-h-[100vh]  my-5 rounded-2xl flex-1  md:min-h-min p-5">
            {children}
          </div>
        </div>
      </GlobalSidebar>
    </SidebarProvider>
  );
};

export default AppLayout;
