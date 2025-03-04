import { z } from "zod";
import { tool } from "ai";
import GetVideoDetails from "@/actions/GetVideoDetails";

export const getVideoDetails = tool({
  description: "Get the details of a youtube video",
  parameters: z.object({
    videoId: z.string().describe("The YouTube video ID to get details for"),
  }),
  execute: async ({ videoId }) => {
    const videoDetails = await GetVideoDetails(videoId);

    return { videoDetails };
  },
});
