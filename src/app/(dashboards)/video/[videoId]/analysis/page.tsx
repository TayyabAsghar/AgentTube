"use client";

import { toast } from "sonner";
import Usage from "@/components/Usage";
import { useUser } from "@clerk/nextjs";
import { FeatureFlag } from "@/lib/flags";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AIAgentChat from "@/components/AIAgentChat";
import { CreateOrGetVideo } from "@/actions/CreateOrGetVideo";
import Transcription from "@/components/features/Transcription";
import TitleGeneration from "@/components/features/TitleGeneration";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import YoutubeVideoDetails from "@/components/features/YoutubeVideoDetails";
import ThumbnailGeneration from "@/components/features/ThumbnailGeneration";

const AnalysisPage = () => {
  const { user } = useUser();
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<Doc<"videos"> | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user?.id) return;

    const fetchVideo = async () => {
      const response = await CreateOrGetVideo(videoId, user?.id);

      if (!response.success) toast.error(response.error);
      else setVideo(response.data!);
    };

    fetchVideo();
  }, [videoId, user]);

  const VideoTranscriptionStatus = () => {
    return video === undefined ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/60 border rounded-full">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        <span className="text-sm">Loading...</span>
      </div>
    ) : !video ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        <p className="text-sm text-amber-700">
          This is your first time analyzing this video. <br />
          <span className="font-semibold">
            (1 Analysis token is being used!)
          </span>
        </p>
      </div>
    ) : (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <p className="text-sm text-green-700">
          Analysis exists for this video - no additional tokens needed in future
          calls! <br />
        </p>
      </div>
    );
  };

  return (
    <div className="xl:container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-accent/60">
        <div className="order-2 lg:order-1 flex flex-col gap-4 bg-background lg:border-r p-6">
          <div className="flex flex-col gap-4 p-4 border border-accent-foreground/20 rounded-xl">
            <Usage
              featureFlag={FeatureFlag.VIDEO_ANALYSIS}
              title="Analyze Video"
            />

            <VideoTranscriptionStatus />
          </div>

          <YoutubeVideoDetails videoId={videoId} />

          <ThumbnailGeneration videoId={videoId} />

          <TitleGeneration videoId={videoId} />

          <Transcription videoId={videoId} />
        </div>

        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
          <AIAgentChat videoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
