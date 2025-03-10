"use client";

import Usage from "@/components/Usage";
import { FeatureFlag } from "@/lib/flags";
import Spinner from "@/components/Spinner";
import { useCallback, useEffect, useState } from "react";
import { GetYoutubeTranscript } from "@/actions/GetYoutubeTranscript";
import { useSchematicEntitlement } from "@schematichq/schematic-react";

interface TranscriptEntry {
  text: string;
  timestamp: string;
}

interface TranscriptionProps {
  videoId: string;
}

const Transcription = ({ videoId }: TranscriptionProps) => {
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState<{
    transcript: TranscriptEntry[];
    cache: string;
  } | null>(null);

  const { featureUsageExceeded } = useSchematicEntitlement(
    FeatureFlag.TRANSCRIPTION
  );

  const handleGenerateTranscription = useCallback(
    async (videoId: string) => {
      if (featureUsageExceeded) return;

      setLoading(true);
      const result = await GetYoutubeTranscript(videoId);

      setTranscript(result);
      setLoading(false);
    },
    [featureUsageExceeded]
  );

  useEffect(() => {
    handleGenerateTranscription(videoId);
  }, [handleGenerateTranscription, videoId]);

  return (
    <div className="border p-4 pb-0 rounded-xl gap-4 flex flex-col">
      <Usage featureFlag={FeatureFlag.TRANSCRIPTION} title="Transcription" />

      {!featureUsageExceeded && (
        <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4">
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : transcript ? (
            transcript.transcript.map((entry, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-sm text-muted-foreground min-w-[50px]">
                  {entry.timestamp}
                </span>
                <p className="text-sm text-accent-foreground">{entry.text}</p>
              </div>
            ))
          ) : (
            <p className="text-sm">No transcription available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Transcription;
