"use server";

import { redirect } from "next/navigation";
import getYouTubeVideoId from "@/lib/getYouTubeVideoId";

const AnalyzeYouTubeVideo = async (form: FormData) => {
  const url = form.get("url")?.toString();

  if (!url) return;

  const videoId = getYouTubeVideoId(url);

  if (!videoId)
    return {
      error: {
        title: "Invalid  Link",
        description: "Provided youtube link is invalid.",
      },
    };

  redirect(`/video/${videoId}/analysis`);
};

export default AnalyzeYouTubeVideo;
