"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/design-system/components/ui/alert";

type Props = {
  havePermissions?: boolean;
  children: React.ReactNode;
  message?: string;
  ctaText?: string;
  onCtaClick?: () => void;
};

export const NoPermissionsWrapper = ({
  children,
  message = "You don't have permission to view this content.",
  ctaText = "Request Access",
  onCtaClick,
  havePermissions,
}: Props) => {
  if (havePermissions) return children;
  return (
    <div className="relative">
      <div className="filter blur-md pointer-events-none">{children}</div>

      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
        <div className="max-w-md w-full space-y-4 p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>

          {onCtaClick && (
            <Button onClick={onCtaClick} className="w-full">
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
