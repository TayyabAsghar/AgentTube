import { SchematicClient } from "@schematichq/schematic-typescript-node";

if (!process.env.SCHEMATIC_SECRET_KEY)
  throw new Error("SCHEMATIC_SECRET_KEY is not set");

export const client = new SchematicClient({
  apiKey: process.env.SCHEMATIC_SECRET_KEY,
  cacheProviders: {
    flagChecks: [],
  },
});
