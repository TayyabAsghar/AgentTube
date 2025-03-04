import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import DashboardButton from "@/components/DashboardButton";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const HeaderMenu = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Menu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem className="flex items-center justify-center">
          <UserButton />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <DashboardButton />
        </DropdownMenuItem>

        <DropdownMenuItem className="px-0">
          <SignedIn>
            <Button asChild variant="ghost" className="w-full px-2">
              <Link href="/manage-plan" className="justify-start">
                Manage Plan
              </Link>
            </Button>
          </SignedIn>
        </DropdownMenuItem>

        <DropdownMenuItem className="px-0">
          <Button asChild variant="ghost" className="w-full px-2">
            <Link href="/#features" className="justify-start">
              Features
            </Link>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem className="px-0">
          <Button asChild variant="ghost" className="w-full px-2">
            <Link href="/#pricing" className="justify-start">
              Pricing
            </Link>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="px-0">
          <ThemeSwitcher className="w-full m-auto rounded-none" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
