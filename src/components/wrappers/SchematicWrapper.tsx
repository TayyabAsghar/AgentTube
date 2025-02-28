"use client";

import { useUser } from "@clerk/nextjs";
import { ReactNode, useEffect } from "react";
import { useSchematicEvents } from "@schematichq/schematic-react";

interface SchematicWrapperProps {
  children: ReactNode;
}

const SchematicWrapper = ({ children }: SchematicWrapperProps) => {
  const { user } = useUser();
  const { identify } = useSchematicEvents();

  useEffect(() => {
    const userName =
      user?.username ??
      user?.fullName ??
      user?.emailAddresses[0]?.emailAddress ??
      user?.id;

    if (user?.id)
      identify({
        company: { keys: { id: user.id }, name: userName },
        keys: {
          id: user.id,
        },
        name: userName,
      });
  }, [user, identify]);

  return children;
};

export default SchematicWrapper;
