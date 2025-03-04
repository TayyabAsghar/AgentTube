import { z } from "zod";
import { tool } from "ai";
import { client } from "@/lib/schematics";
import { FeatureFlag } from "@/lib/flags";
import { DalleImageGeneration } from "@/actions/DalleImageGeneration";

export const generateImage = (videoId: string, userId: string) =>
  tool({
    description: "Generate an image",
    parameters: z.object({
      videoId: z.string().describe("The YouTube video ID"),
      prompt: z.string().describe("The prompt to generate an image for"),
    }),
    execute: async ({ prompt }) => {
      const schematicCtx = {
        company: { id: userId },
        user: {
          id: userId,
        },
      };

      const isImageGenerationEnabled = await client.checkFlag(
        schematicCtx,
        FeatureFlag.IMAGE_GENERATION
      );

      if (!isImageGenerationEnabled)
        return {
          error: "Image generation is not enabled, the user must upgrade.",
        };

      const image = await DalleImageGeneration(prompt, videoId);
      return { image };
    },
  });
