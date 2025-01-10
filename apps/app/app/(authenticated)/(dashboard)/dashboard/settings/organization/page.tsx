"use client";

import { OrganizationProfile } from "@repo/auth/client";

const Page = () => {
  return (
    <div className="">
      <OrganizationProfile routing="virtual" />
    </div>
  );
};

export default Page;
