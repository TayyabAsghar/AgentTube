"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { SchematicClient } from "@schematichq/schematic-typescript-node";

const apiKey = process.env.SCHEMATIC_SECRET_KEY;

if (!apiKey) throw new Error("Schematics Secret key is not configured.");

const client = new SchematicClient({
  apiKey: apiKey,
});

const GetSchematicAccessToken = async () => {
  auth.protect();
  const user = await currentUser();

  if (!user) return;

  const tempToken = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: {
      id: user.id,
    },
  });

  return tempToken.data.token;
};

export default GetSchematicAccessToken;
