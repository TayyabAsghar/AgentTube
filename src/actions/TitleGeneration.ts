"use server";

import { generateText } from "ai";
import { client } from "@/lib/schematics";
import { getConvexClient } from "@/lib/convex";
import { api } from "../../convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { FeatureFlag, featureFlagEvents } from "@/lib/flags";

const convexClient = getConvexClient();

const TitleGeneration = async (
  videoId: string,
  videoSummary: string,
  considerations: string
) => {
  const user = await currentUser();

  if (!user?.id) throw new Error("User not found");

  const titles = (
    await convexClient.query(api.titles.list, {
      videoId,
      userId: user?.id ?? "",
    })
  ).map((item) => ({ title: item.title }));

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const model = google("gemini-1.5-flash");

  try {
    const response = await generateText({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful YouTube video creator assistant that creates high-quality SEO-friendly concise video titles.",
        },
        {
          role: "user",
          content: `Please provide ONE concise YouTube title (and nothing else) for this video. Focus on the main points and key takeaways. 
          It should be SEO-friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}\n\n Here are the list of previous 
          titles you have created so you don't create same titles again:${titles}`,
        },
      ],
      maxTokens: 200,
      temperature: 0.7,
    });

    const title = response.text;

    if (!title)
      return {
        error: "Failed to generate title (System error)",
      };

    await convexClient.mutation(api.titles.generate, {
      videoId,
      userId: user.id,
      title: title,
    });

    await client.track({
      event: featureFlagEvents[FeatureFlag.TITLE_GENERATIONS].event,
      company: { id: user.id },
      user: { id: user.id },
    });

    return { title };
  } catch {
    throw new Error("Failed to generate title");
  }
};

export default TitleGeneration;
