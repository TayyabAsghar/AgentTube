"use client";

import Image from "next/image";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { VideoDetails } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import GetVideoDetails from "@/actions/GetVideoDetails";
import { Calendar, Eye, MessageCircle, ThumbsUp } from "lucide-react";

const YoutubeVideoDetails = ({ videoId }: { videoId: string }) => {
  const { toast } = useToast();
  const [error, setError] = useState(false);
  const [video, setVideo] = useState<VideoDetails | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const response = await GetVideoDetails(videoId);

      if (response.error) {
        toast({
          variant: "destructive",
          title: response.error.title,
          description: response.error.description,
        });
        setError(true);
      } else {
        setError(false);
        setVideo(response.video);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (!video && !error) return <Spinner />;

  if (!video || error) return <>Error is here</>;

  return (
    <div className="@container bg-white rounded-xl">
      <div className="flex flex-col gap-8">
        <div className="flex-shrink-0">
          <Image
            width={500}
            height={500}
            alt={video.title}
            src={video.thumbnail}
            className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        <div className="flex-grow space-y-4">
          <h1 className="text-2xl @lg:text-3xl font-bold text-gray-900 leading-tight line-clamp-2">
            {video.title}
          </h1>
          <div className="flex items-center gap-4">
            <Image
              src={video.channel.thumbnail}
              alt={video.channel.title}
              width={48}
              height={48}
              className="w-10 h-10 @md:w-12 @md:h-12 rounded-full border-2 border-gray-100"
            />

            <div>
              <p className="text-base @md:text-lg font-semibold text-gray-900">
                {video.channel.title}
              </p>
              <p className="text-sm @md:text-base text-gray-600">
                {video.channel.subscribers} subscribers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 pt-4">
            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Published</p>
              </div>
              <p className="font-medium text-gray-900">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Views</p>
              </div>
              <p className="font-medium text-gray-900">{video.views}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <ThumbsUp className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Likes</p>
              </div>
              <p className="font-medium text-gray-900">{video.likes}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Comments</p>
              </div>
              <p className="font-medium text-gray-900">{video.comments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideoDetails;
