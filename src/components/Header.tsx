"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AgentPulse from "@/components/AgentPulse";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header
      className="px-6 h-12 z-50 sticky top-0 flex items-center justify-between md:grid md:grid-cols-3 gap-4 border-b backdrop-blur 
    bg-white border-solid border-gray-300"
    >
      <h1 className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-black h-9 justify-self-start">
        <Link
          href="/"
          className="sm:text-lg font-semibold flex items-center gap-2"
        >
          <AgentPulse size="small" color="blue" />
          AgentTube
        </Link>
      </h1>

      <div className="flex items-center justify-center gap-3 opacity-70">
        <Button asChild variant="ghost">
          <Link href="/">Features</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">Pricing</Link>
        </Button>
      </div>

      <div className="flex justify-end">
        <ThemeSwitcher />

        <SignedIn>
          <Link href="/manage-plan">
            <Button>Manage Plan</Button>
          </Link>

          <div className="p-2 size-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200">
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <Button asChild variant="ghost" className="hover:text-black">
            <Link href="/">Sign in</Link>
          </Button>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
