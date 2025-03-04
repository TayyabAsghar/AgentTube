"use server";

import OpenAI from "openai";
import { getConvexClient } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs/server";
import { api } from "../../convex/_generated/api";
import { client } from "@/lib/schematics";
import { FeatureFlag, featureFlagEvents } from "@/lib/flags";

const convexClient = getConvexClient();

const TitleGeneration = async (
  videoId: string,
  videoSummary: string,
  considerations: string
) => {
  const user = await currentUser();

  if (!user?.id) throw new Error("User not found");

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful YouTube video creator assistant that creates high-quality SEO-friendly concise video titles.",
        },
        {
          role: "user",
          content: `Please provide ONE concise YouTube title (and nothing else) for this video. Focus on the main points and key takeaways. 
          It should be SEO-friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const title =
      response.choices[0]?.message?.content || "Unable to generate title";

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
