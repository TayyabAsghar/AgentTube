const getYouTubeVideoId = (url: string): string | null => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(youtubeRegex);

  if (!match || !match[5]) return null;

  return match[5];
};

export default getYouTubeVideoId;
