"use client";
import { OnBoardingDialog } from "../(authenticated)/components/dialogs/onboarding-dialog";
import { ModelKeyDialog } from "../(authenticated)/components/models/model-key-dialog";

const DialogProvider = () => {
  return (
    <>
      <OnBoardingDialog />
      <ModelKeyDialog />
    </>
  );
};

export default DialogProvider;
