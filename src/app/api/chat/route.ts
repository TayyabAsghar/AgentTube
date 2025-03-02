import { streamText } from "ai";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import GetVideoDetails from "@/actions/GetVideoDetails";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import fetchTranscript from "@/ai-tools/FetchTranscript";

export const POST = async (req: NextRequest) => {
  const user = await currentUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { messages, videoId } = await req.json();

  const videoDetails = await GetVideoDetails(videoId);

  if (videoDetails.error)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const model = google("gemini-1.5-flash");

  const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video. The video ID in
  question is ${videoId} but you'll refer to this as ${videoDetails.video.title || "Selected Video"}. Use emojis to make the
  conversation more engaging. If an error occurs, explain it to the user and ask them to try again later. If the error suggest
  the user upgrade, explain that they must upgrade to use the feature, tell them to go to 'Manage Plan' in the header and
  upgrade. If any tool is used, analyze the response and if it contains a cache, explain that the transcript is cached because
  they previously transcribed the video saving the user a token - use words like database instead of cache to make it more
  easy to understand. Format for notion.`;

  const result = streamText({
    model,
    messages: [{ role: "system", content: systemMessage }, ...messages],
    tools: { fetchTranscript },
  });

  return result.toDataStream();
};
