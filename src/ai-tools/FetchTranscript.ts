import { z } from "zod";
import { tool } from "ai";
import { GetYoutubeTranscript } from "@/actions/GetYoutubeTranscript";

const fetchTranscript = tool({
  description: "Fetch the transcript of a YouTube video in segments",
  parameters: z.object({
    videoId: z.string().describe("The video ID to fetch the transcript for"),
  }),
  execute: async ({ videoId }) => {
    const transcript = await GetYoutubeTranscript(videoId);
    return {
      cache: transcript.cache,
      transcript: transcript.transcript,
    };
  },
});

export default fetchTranscript;
