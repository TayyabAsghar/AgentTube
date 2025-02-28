import React from "react";
import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return <SignIn fallbackRedirectUrl="/dashboard" />;
};

export default Page;
