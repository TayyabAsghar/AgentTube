import { z } from "zod";
import { tool } from "ai";
import TitleGeneration from "@/actions/TitleGeneration";
import { client } from "@/lib/schematics";
import { FeatureFlag } from "@/lib/flags";

const generateTitle = (userId: string) =>
  tool({
    description: "Generate a title for a YouTube video",
    parameters: z.object({
      videoId: z.string().describe("The video ID to generate a title for"),
      videoSummary: z
        .string()
        .describe("The summary of the video to generate a title for"),
      considerations: z
        .string()
        .describe("Any additional considerations for the title"),
    }),
    execute: async ({ videoId, videoSummary, considerations }) => {
      const schematicCtx = {
        company: { id: userId },
        user: {
          id: userId,
        },
      };

      const isTitleGenerationEnabled = await client.checkFlag(
        schematicCtx,
        FeatureFlag.TITLE_GENERATIONS
      );

      if (!isTitleGenerationEnabled)
        return {
          error: "Title generation is not enabled, the user must upgrade.",
        };

      const title = await TitleGeneration(
        videoId,
        videoSummary,
        considerations
      );

      return { title };
    },
  });

export default generateTitle;
