"use client";

import { ThemeProvider } from "next-themes";
import ConvexWrapper from "@/components/wrappers/ConvexWrapper";
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
    <ThemeProvider attribute="class">
      <ConvexWrapper>
        <SchematicProvider publishableKey={schematicPublishKey}>
          <SchematicWrapper>{children}</SchematicWrapper>
        </SchematicProvider>
      </ConvexWrapper>
    </ThemeProvider>
  );
};

export default ClientWrapper;
