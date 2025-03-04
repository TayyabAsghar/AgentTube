import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    userId: v.string(),
    videoId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("titles")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .collect();
  },
});

export const generate = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
    videoId: v.string(),
  },
  handler: async (ctx, args) => {
    const titleId = await ctx.db.insert("titles", {
      videoId: args.videoId,
      userId: args.userId,
      title: args.title,
    });

    return titleId;
  },
});
