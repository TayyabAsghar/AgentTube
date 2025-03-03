"use server";

import { client } from "@/lib/schematics";
import { getConvexClient } from "@/lib/convex";
import { api } from "../../convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import checkUsageLimit from "@/lib/checkUsageLimit";
import { Doc } from "../../convex/_generated/dataModel";
import { FeatureFlag, featureFlagEvents } from "@/lib/flags";

export interface VideoResponse {
  success: boolean;
  data?: Doc<"videos">;
  error?: string;
}

export const CreateOrGetVideo = async (
  videoId: string,
  userId: string
): Promise<VideoResponse> => {
  const convex = getConvexClient();
  const user = await currentUser();

  if (!user) return { success: false, error: "User not found." };

  const featureCheck = await checkUsageLimit(
    user.id,
    featureFlagEvents[FeatureFlag.VIDEO_ANALYSIS].event
  );

  if (!featureCheck.success) return featureCheck;

  try {
    const video = await convex.query(api.videos.getVideoById, {
      videoId,
      userId,
    });

    if (video) return { success: true, data: video };
    else {
      const newVideoId = await convex.mutation(api.videos.createVideoEntry, {
        videoId,
        userId,
      });

      const newVideo = await convex.query(api.videos.getVideoById, {
        videoId: newVideoId,
        userId,
      });

      await client.track({
        event: featureFlagEvents[FeatureFlag.VIDEO_ANALYSIS].event,
        company: { id: userId },
        user: { id: userId },
      });
      return { success: true, data: newVideo! };
    }
  } catch {
    return { success: false, error: "An unexpected error occurred." };
  }
};
