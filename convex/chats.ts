import { v } from "convex/values";
import ChatType from "./types/chat.type";
import { mutation, query } from "./_generated/server";

export const createChat = mutation({
  args: {
    userId: v.string(),
    videoId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const existingChat = await ctx.db
      .query("chats")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .first();

    if (existingChat) return existingChat;

    const newChatId = await ctx.db.insert("chats", {
      userId: args.userId,
      videoId: args.videoId,
      title: args.title || "New Chat",
      messages: [],
    });

    return await ctx.db.get(newChatId);
  },
});

export const addMessageToChat = mutation({
  args: {
    userId: v.string(),
    videoId: v.string(),
    message: ChatType,
  },
  handler: async (ctx, args) => {
    const chat = await ctx.db
      .query("chats")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .first();

    if (!chat) throw new Error("Chat not found");

    const updatedMessages = [...chat.messages, args.message];

    await ctx.db.patch(chat._id, { messages: updatedMessages });
  },
});

export const getChatByUserAndVideo = query({
  args: { userId: v.string(), videoId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chats")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .first();
  },
});

export const getChatsMetaDataByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const chats = await ctx.db
      .query("chats")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();

    return chats.map((chat) => {
      return {
        _id: chat._id,
        videoId: chat.videoId,
        title: chat.title,
      };
    });
  },
});
