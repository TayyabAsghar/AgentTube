"use server";

import OpenAI from "openai";
import { client } from "@/lib/schematics";
import { getConvexClient } from "@/lib/convex";
import { api } from "../../convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { FeatureFlag, featureFlagEvents } from "@/lib/flags";

const IMAGE_SIZE = "1792x1024";
const convexClient = getConvexClient();

export const DalleImageGeneration = async (prompt: string, videoId: string) => {
  const user = await currentUser();

  if (!user?.id) throw new Error("User not found.");

  const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  if (!prompt) throw new Error("Failed to create image prompt.");

  const imageResponse = await openAi.images.generate({
    n: 1,
    prompt,
    style: "vivid",
    size: IMAGE_SIZE,
    model: "dall-e-3",
    quality: "standard",
  });

  const imageUrl = imageResponse.data[0]?.url;

  if (!imageUrl) throw new Error("Failed to generate image.");

  const image: Blob = await fetch(imageUrl).then((res) => res.blob());

  const postUrl = await convexClient.mutation(api.images.generateUploadUrl);

  const result = await fetch(postUrl, {
    body: image,
    method: "POST",
    headers: { "Content-Type": image.type },
  });

  const { storageId } = await result.json();

  await convexClient.mutation(api.images.storeImage, {
    storageId: storageId,
    videoId,
    userId: user.id,
  });

  const dbImageUrl = await convexClient.query(api.images.getImage, {
    videoId,
    userId: user.id,
  });

  await client.track({
    event: featureFlagEvents[FeatureFlag.IMAGE_GENERATION].event,
    company: {
      id: user.id,
    },
    user: {
      id: user.id,
    },
  });

  return { imageUrl: dbImageUrl };
};
