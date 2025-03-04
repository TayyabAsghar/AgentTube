"use server";

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

  return { videoId };
};

export default AnalyzeYouTubeVideo;
