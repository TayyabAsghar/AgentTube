"use client";

import { FeatureFlag } from "@/lib/flags";
import Spinner from "@/components/Spinner";
import { Progress } from "@/components/ui/progress";
import {
  useSchematicIsPending,
  useSchematicEntitlement,
} from "@schematichq/schematic-react";

interface UsageProps {
  title: string;
  featureFlag: FeatureFlag;
}

const Usage = ({ featureFlag, title }: UsageProps) => {
  const isPending = useSchematicIsPending();
  const {
    featureUsage,
    featureAllocation,
    value: isFeatureEnabled,
  } = useSchematicEntitlement(featureFlag);

  const hasUsedAllTokens =
    featureUsage && featureAllocation && featureUsage >= featureAllocation;

  if (isPending) return <Spinner />;

  if (hasUsedAllTokens)
    return (
      <div className="bg-accent/60 rounded-2xl shadow-sm border border-destructive/40 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="px-4 py-2 bg-red-50 rounded-lg">
            <span className="font-medium text-destructive">{featureUsage}</span>
            <span className="text-red-400 mx-2">/</span>
            <span className="font-medium text-destructive">
              {featureAllocation}
            </span>
          </div>
        </div>

        <div className="relative">
          <Progress
            value={100}
            className="h-3 rounded-full bg-gray-100 [&>*]:bg-destructive"
          />
          <p className="text-sm text-destructive mt-2">
            You have used all available tokens. Please upgrade your plan to
            continue using this feature.
          </p>
        </div>
      </div>
    );

  if (!isFeatureEnabled) {
    return (
      <div className="bg-accent/60 rounded-2xl shadow-sm border p-6 opacity-70">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="px-4 py-2 bg-gray-50 rounded-lg">
            <span className="text-muted-foreground">Feature Disabled</span>
          </div>
        </div>
        <div className="relative">
          <Progress value={0} className="h-3 rounded-full bg-gray-100" />
          <p className="text-sm text-muted-foreground mt-2">
            Upgrade to use this feature
          </p>
        </div>
      </div>
    );
  }

  const progress = ((featureUsage || 0) / (featureAllocation || 1)) * 100;

  const getProgressColor = (percent: number) => {
    if (percent >= 80) return "[&>*]:bg-red-600";
    if (percent >= 50) return "[&>*]:bg-yellow-500";
    return "[&>*]:bg-green-500";
  };

  const progressColor = getProgressColor(progress);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="px-4 py-2 bg-accent rounded-lg">
          <span className="font-medium">{featureUsage}</span>
          <span className="text-gray-400 mx-2">/</span>
          <span className="font-medium">{featureAllocation}</span>
        </div>
      </div>

      <div className="relative">
        <Progress
          value={progress}
          className={`h-3 rounded-full bg-gray-100 ${progressColor}`}
        />

        {progress >= 100 ? (
          <p className="text-sm text-destructive mt-2">
            You have reached your usage limit
          </p>
        ) : (
          progress >= 80 && (
            <p className="text-sm text-yellow-400 mt-2 dark:text-yellow-200">
              Warning: You are approaching your usage limit
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Usage;
