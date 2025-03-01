"use client";

import Usage from "@/components/Usage";
import { FeatureFlag } from "@/lib/flags";
import { useParams } from "next/navigation";
import TitleGeneration from "@/components/features/TitleGeneration";
import YoutubeVideoDetails from "@/components/features/YoutubeVideoDetails";
import ThumbnailGeneration from "@/components/features/ThumbnailGeneration";

const AnalysisPage = () => {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;

  return (
    <div className="xl:container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="order-2 lg:order-1 flex flex-col gap-4 bg-white lg:border-r border-gray-200 p-6">
          <div className="flex flex-col gap-4 p-4 border border-accent-foreground/50 rounded-xl">
            <Usage
              featureFlag={FeatureFlag.VIDEO_ANALYSIS}
              title="Analyze Video"
            />
          </div>

          <YoutubeVideoDetails videoId={videoId} />

          <ThumbnailGeneration videoId={videoId} />

          <TitleGeneration videoId={videoId} />
          {/* Transcription */}
        </div>

        {/* Right Side */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
          {/* AI Agent Chat Section */}
          <p>Chat</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
