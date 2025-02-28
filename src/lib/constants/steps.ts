import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Brain, LucideProps, MessageSquare, Video } from "lucide-react";

type StepsType = {
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const Steps: StepsType[] = [
  {
    title: "1. Enter Video Link",
    description: "Share your YouTube video URL and let your agent get to work",
    icon: Video,
  },
  {
    title: "2. AI Agent Analysis",
    description: "Your personal agent analyzes every aspect of your content",
    icon: Brain,
  },
  {
    title: "3. Receive Intelligence",
    description: "Get actionable insights and strategic recommendations",
    icon: MessageSquare,
  },
] as const;

export default Steps;
