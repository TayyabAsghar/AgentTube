"use client";

import { toast } from "sonner";
import { Copy } from "lucide-react";
import Usage from "@/components/Usage";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { FeatureFlag } from "@/lib/flags";
import { Button } from "@/components/ui/button";
import { api } from "../../../convex/_generated/api";
import { useSchematicEntitlement } from "@schematichq/schematic-react";

interface TitleGenerationProps {
  videoId: string;
}

const TitleGeneration = ({ videoId }: TitleGenerationProps) => {
  const { user } = useUser();
  const titles = useQuery(api.titles.list, { videoId, userId: user?.id ?? "" });
  const { value: isTitleGenerationEnabled } = useSchematicEntitlement(
    FeatureFlag.TITLE_GENERATIONS
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(" Copied to clipboard!");
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm">
      <div className="min-w-52">
        <Usage featureFlag={FeatureFlag.TITLE_GENERATIONS} title="Titles" />
      </div>

      <div className="space-y-3 mt-4 max-h-[280px] overflow-y-auto">
        {titles?.map((title) => (
          <div
            key={title._id}
            className="group relative p-4 rounded-lg border bg-accent/60 hover:border-primary/10 hover:bg-primary/20 
            transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm leading-relaxed">{title.title}</p>

              <Button
                size="icon"
                variant="ghost"
                className="cursor-pointer"
                tooltip="Copy to clipboard"
                onClick={() => copyToClipboard(title.title)}
              >
                <Copy className="w-4 h-4 text-primary" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {!titles?.length && !!isTitleGenerationEnabled && (
        <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-muted-foreground">
          <p className="text-accent-foreground">
            No titles have been generated yet
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Generate titles to see them appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default TitleGeneration;
