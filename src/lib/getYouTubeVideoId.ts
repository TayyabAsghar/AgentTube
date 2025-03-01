// const getVideoId = (url: string) => {
//   let videoId = null;

//   if (url.includes("youtu.be/"))
//     videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0] || null;
//   else if (url.includes("youtube.com/shorts/"))
//     videoId = url.split("shorts/")[1]?.split(/[?#]/)[0] || null;
//   else if (url.includes("v="))
//     videoId = url.split("v=")[1]?.split(/&/)[0] || null;

//   return videoId;
// };

// export default getVideoId;

const getYouTubeVideoId = (url: string) => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(youtubeRegex);

  if (!match || !match[5]) return null;

  return match[5];
};

export default getYouTubeVideoId;
