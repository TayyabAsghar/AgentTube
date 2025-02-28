"use server";

import { redirect } from "next/navigation";

const AnalyzeVideo = async (form: FormData) => {
  const url = form.get("url")?.toString();

  if (!url) return;

  const videoId = "getVideoFromUrl(url)";

  if (!videoId) return;

  redirect(`/video/${videoId}/analysis`);
};

export default AnalyzeVideo;
