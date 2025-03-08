import { z } from "zod";
import { tool } from "ai";
import { client } from "@/lib/schematics";
import { FeatureFlag } from "@/lib/flags";
import TitleGeneration from "@/actions/TitleGeneration";

const generateTitle = (userId: string) =>
  tool({
    description: "Generate a title for a YouTube video",
    parameters: z.object({
      videoId: z.string().describe("The video ID to generate a title for"),
      videoSummary: z
        .string()
        .describe(
          "The summary of the video obtained from video details using video details or transcript tool to generate a title for"
        ),
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

      try {
        const isTitleGenerationEnabled = await client.checkFlag(
          schematicCtx,
          FeatureFlag.TITLE_GENERATIONS
        );

        if (!isTitleGenerationEnabled)
          return { error: "Title generation is not enabled. Please upgrade." };

        const titleResult = await TitleGeneration(
          videoId,
          videoSummary,
          considerations
        );

        if (titleResult?.error || !titleResult.title)
          return { error: "Failed to generate title. Please try again." };

        return { title: titleResult.title };
      } catch {
        return { error: "Unexpected error in title generation. Try again" };
      }
    },
  });

export default generateTitle;
