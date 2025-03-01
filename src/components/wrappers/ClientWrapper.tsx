"use client";

import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapper from "@/components/wrappers/SchematicWrapper";
import ConvexWrapper from "@/components/wrappers/ConvexWrapper";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const schematicPublishKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISH_KEY;

  if (!schematicPublishKey)
    throw new Error("No Schematic Publishable Key found.");

  return (
    <ConvexWrapper>
      <SchematicProvider publishableKey={schematicPublishKey}>
        <SchematicWrapper>{children}</SchematicWrapper>
      </SchematicProvider>
    </ConvexWrapper>
  );
};

export default ClientWrapper;
