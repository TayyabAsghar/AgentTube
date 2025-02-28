import Link from "next/link";
import { ReactNode } from "react";
import XIcon from "@/components/icons/XIcon";
import { Button } from "@/components/ui/button";
import AgentPulse from "@/components/AgentPulse";
import GitHubIcon from "@/components/icons/GithubIcon";
import YouTubeIcon from "@/components/icons/YoutubeIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";

const Footer = () => {
  const SocialButton = ({
    children,
    tooltip,
  }: {
    children: ReactNode;
    tooltip: string;
  }) => (
    <Button
      asChild
      size="icon"
      variant="link"
      tooltip={tooltip}
      className="rounded-full p-2 bg-secondary-foreground"
    >
      {children}
    </Button>
  );

  return (
    <footer className="p-20 bg-gradient-to-b from-white to-gray-200">
      <div className="flex justify-between items-center gap-18 flex-col-reverse md:gap-6 md:items-start md:flex-row">
        <div className="flex flex-col gap-8 min-w-72">
          <div>
            <div className="flex gap-2 items-center justify-start">
              <AgentPulse />
              <h2 className="inline text-xl font-semibold">AgentTube</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Meet your Personal AI Content Agent
            </p>
          </div>

          <div className="flex gap-4">
            <SocialButton tooltip="X">
              <Link href="/">
                <XIcon className="text-white" />
              </Link>
            </SocialButton>

            <SocialButton tooltip="Instagram">
              <Link href="/">
                <InstagramIcon className="text-white" />
              </Link>
            </SocialButton>

            <SocialButton tooltip="Youtube">
              <Link href="/">
                <YouTubeIcon className="text-white" />
              </Link>
            </SocialButton>

            <SocialButton tooltip="Github">
              <Link href="/">
                <GitHubIcon className="text-white" />
              </Link>
            </SocialButton>
          </div>

          <div className="mt-6 text-sm">
            © 2025 AgentTube. All rights reserved.
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Meet your AI Content Agent?
          </h2>
          <p className="text-xl">
            Join Creators leveraging AI to unlock content insights
          </p>
          <blockquote className="mt-12 max-w-2xl mx-auto border-l-2 border-black/40 pl-6 italic">
            <p className="text-lg">
              “I have using AgentTube&apos;s AI analysis for months and it has
              transformed how I create content.”
            </p>
            <footer className="mt-2 text-sm">
              — Sonny Sangha, YouTube Creator with 300K+ Subscribers
            </footer>
          </blockquote>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
