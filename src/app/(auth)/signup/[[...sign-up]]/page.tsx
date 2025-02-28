import React from "react";
import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return <SignUp fallbackRedirectUrl="/dashboard" />;
};

export default Page;
