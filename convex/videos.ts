import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getVideoById = query({
  args: { videoId: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("videos")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .unique();
  },
});

export const createVideoEntry = mutation({
  args: {
    videoId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const videoId = await ctx.db.insert("videos", {
      videoId: args.videoId,
      userId: args.userId,
    });

    return videoId;
  },
});
