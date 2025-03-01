"use server";

import { google } from "googleapis";
import { VideoDetails } from "@/types/types";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

const GetVideoDetails = async (videoId: string) => {
  try {
    const response = await youtube.videos.list({
      part: ["statistics", "snippet"],
      id: [videoId],
    });

    const videoDetails = response.data.items?.[0];

    if (!videoDetails) throw new Error("Video not found.");

    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [videoDetails.snippet?.channelId || ""],
      key: process.env.YOUTUBE_API_KEY,
    });

    const channelDetails = channelResponse.data.items?.[0];

    const video: VideoDetails = {
      // Video Info
      title: videoDetails.snippet?.title || "Unknown Title",
      thumbnail:
        videoDetails.snippet?.thumbnails?.maxres?.url ||
        videoDetails.snippet?.thumbnails?.high?.url ||
        videoDetails.snippet?.thumbnails?.default?.url ||
        "",
      publishedAt:
        videoDetails.snippet?.publishedAt || new Date().toISOString(),

      // Video Metrics
      views: videoDetails.statistics?.viewCount || "0",
      likes: videoDetails.statistics?.likeCount || "Not Available",
      comments: videoDetails.statistics?.commentCount || "Not Available",

      // Channel Info
      channel: {
        title: videoDetails.snippet?.channelTitle || "Unknown Channel",
        thumbnail: channelDetails?.snippet?.thumbnails?.default?.url || "",
        subscribers: channelDetails?.statistics?.subscriberCount || "0",
      },
    };

    return { video };
  } catch {
    return {
      error: {
        title: "Video Error",
        description: "Error while fetching video details.",
      },
    };
  }
};

export default GetVideoDetails;
