import { Innertube } from "youtubei.js";
import { api } from "../../convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export interface TranscriptEntry {
  text: string;
  timestamp: string;
}

const youtube = await Innertube.create({
  lang: "en",
  location: "US",
  retrieve_player: false,
});

function formatTimestamp(start_ms: number): string {
  const minutes = Math.floor(start_ms / 60000);
  const seconds = Math.floor((start_ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const fetchTranscript = async (videoId: string): Promise<TranscriptEntry[]> => {
  try {
    const info = await youtube.getInfo(videoId);
    const transcriptData = await info.getTranscript();

    const transcript: TranscriptEntry[] =
      transcriptData.transcript.content?.body?.initial_segments.map(
        (segment) => ({
          text: segment.snippet.text ?? "N/A",
          timestamp: formatTimestamp(Number(segment.start_ms)),
        })
      ) ?? [];

    return transcript;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
};

export const GetYoutubeTranscript = async (videoId: string) => {
  const user = await currentUser();

  if (!user?.id) throw new Error("User not found");

  const existingTranscript = await convex.query(
    api.transcript.getTranscriptByVideoId,
    { videoId, userId: user.id }
  );

  const transcript = await fetchTranscript(videoId);

  // Save to database

  return { transcript, cache: "This was not cashed." };
};
