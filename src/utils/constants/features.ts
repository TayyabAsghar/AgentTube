import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Captions,
  Languages,
  ImagePlus,
  ScanSearch,
  LucideProps,
  MessageSquare,
  ChartNoAxesCombined,
} from "lucide-react";

type FeatureList = {
  title: string;
  description: string;
  bgColor: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const Features: FeatureList[] = [
  {
    title: "AI Video Insights",
    description:
      "Get deep insights on engagement, keywords, and audience behavior.",
    bgColor: "bg-purple-200",
    icon: ChartNoAxesCombined,
  },
  {
    title: "AI Thumbnails",
    description: "Generate AI-powered thumbnails based on video content.",
    bgColor: "bg-teal-200",
    icon: ImagePlus,
  },
  {
    title: "Auto Captions",
    description:
      "Auto-generate captions and transcriptions in multiple languages.",
    bgColor: "bg-yellow-200",
    icon: Captions,
  },
  {
    title: "SEO Optimization",
    description: "Optimize titles, descriptions, and tags for better reach.",
    bgColor: "bg-red-200",
    icon: ScanSearch,
  },
  {
    title: "AI Chatbot",
    description: "Chat with AI for video insights, summaries, and suggestions.",
    bgColor: "bg-green-200",
    icon: MessageSquare,
  },
  {
    title: "Multi-Language",
    description:
      "Translate captions and descriptions to reach a global audience.",
    bgColor: "bg-orange-200",
    icon: Languages,
  },
] as const;

export default Features;
