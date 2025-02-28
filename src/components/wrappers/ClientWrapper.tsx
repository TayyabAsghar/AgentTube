"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapper from "@/components/wrappers/SchematicWrapper";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const schematicPublishKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISH_KEY;

  if (!schematicPublishKey)
    throw new Error("No Schematic Publishable Key found.");

  return (
    <ClerkProvider>
      <SchematicProvider publishableKey={schematicPublishKey}>
        <SchematicWrapper>{children}</SchematicWrapper>
      </SchematicProvider>
    </ClerkProvider>
  );
};

export default ClientWrapper;
