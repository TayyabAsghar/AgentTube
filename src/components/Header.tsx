"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AgentPulse from "@/components/AgentPulse";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="px-4 h-12 w-[90vw] left-1/2 transform -translate-x-1/2 z-50 fixed top-6 flex items-center justify-between md:grid md:grid-cols-3 gap-4 backdrop-blur">
      <h1 className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-9 justify-self-start">
        <Link
          href="/"
          className="sm:text-lg font-semibold flex items-center gap-2"
        >
          <AgentPulse size="small" color="blue" />
          <div>AgentTube</div>
        </Link>
      </h1>

      <div className="flex items-center justify-center gap-3 opacity-80">
        <Button asChild variant="ghost">
          <Link href="/">Features</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">Pricing</Link>
        </Button>
      </div>

      <div className="flex justify-end gap-3">
        <ThemeSwitcher />

        <SignedIn>
          <Link href="/manage-plan">
            <Button>Manage Plan</Button>
          </Link>

          <div className="p-2 size-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200">
            <UserButton />
          </div>
        </SignedIn>
        <Button>dfdfd</Button>

        {!isSignedIn && (
          <Button asChild variant="ghost" className="hover:text-black">
            <Link href="/" className="">
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
