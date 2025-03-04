import Link from "next/link";
import { Button } from "@/components/ui/button";
import AgentPulse from "@/components/AgentPulse";
import HeaderMenu from "@/components/HeaderMenu";
import { SignedIn, UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import DashboardButton from "@/components/DashboardButton";

const Header = () => {
  return (
    <header
      className="px-4 h-12 w-[90vw] left-1/2 transform -translate-x-1/2 z-50 fixed top-6 flex items-center justify-between 
    rounded-3xl backdrop-blur border border-accent"
    >
      <h1 className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-9 justify-self-start">
        <Link
          href="/"
          className="sm:text-lg font-semibold flex items-center gap-2"
        >
          <AgentPulse size="small" color="blue" />
          <div>AgentTube</div>
        </Link>
      </h1>

      <div className="items-center justify-center gap-3 opacity-80 hidden md:flex">
        <Button asChild variant="ghost" tooltip="Features">
          <Link href="/#features">Features</Link>
        </Button>
        <Button asChild variant="ghost" tooltip="Pricing">
          <Link href="/#pricing">Pricing</Link>
        </Button>
      </div>

      <div className="justify-end gap-3 hidden md:flex">
        <ThemeSwitcher />

        <SignedIn>
          <Button asChild variant="outline" tooltip="Manage Plan">
            <Link href="/manage-plan">Manage Plan</Link>
          </Button>

          <div className="p-2 size-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200">
            <UserButton />
          </div>
        </SignedIn>

        <DashboardButton />
      </div>

      <div className="md:hidden">
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
