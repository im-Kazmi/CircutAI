"use client";

import { useOnboardingDialog } from "@/app/store/use-onboarding-dialog";
// import DialogImg from '@/public/dialog-content.png';
import { Button } from "@repo/design-system/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/design-system/components/ui/dialog";
import { cn } from "@repo/design-system/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { CreateOrganization } from "@repo/auth/client";
export function OnBoardingDialog() {
  const { isOpen, onClose } = useOnboardingDialog();

  return <></>;
}
