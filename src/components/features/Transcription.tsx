"use client";

import { useState } from "react";
import Usage from "@/components/Usage";
import { FeatureFlag } from "@/lib/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";

interface TranscriptEntry {
  text: string;
  timestamp: string;
}

interface TranscriptionProps {
  videoId: string;
}

const Transcription = ({ videoId }: TranscriptionProps) => {
  const [transcript, setTranscript] = useState<{
    transcript: TranscriptEntry[];
    cache: string;
  } | null>(null);

  console.log(setTranscript);
  console.log(videoId);

  const { featureUsageExceeded } = useSchematicEntitlement(
    FeatureFlag.TRANSCRIPTION
  );

  return (
    <div className="border p-4 pb-0 rounded-xl gap-4 flex flex-col">
      <Usage featureFlag={FeatureFlag.TRANSCRIPTION} title="Transcription" />

      {!featureUsageExceeded && (
        <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4">
          {transcript ? (
            transcript.transcript.map((entry, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-sm text-gray-400 min-w-[50px]">
                  {entry.timestamp}
                </span>
                <p className="text-sm text-gray-700">{entry.text}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No transcription available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Transcription;
