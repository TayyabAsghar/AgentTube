"use client";

import { ClerkProvider } from "@clerk/nextjs";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClientWrapper;
