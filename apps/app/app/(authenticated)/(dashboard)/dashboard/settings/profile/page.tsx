"use client";

import { UserProfile } from "@repo/auth/client";

const Page = () => {
  return (
    <div className="">
      <UserProfile routing="virtual" />
    </div>
  );
};

export default Page;
