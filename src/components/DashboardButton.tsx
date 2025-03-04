"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const DashboardButton = () => {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  return (
    <>
      {isSignedIn
        ? pathname === "/" && (
            <Button asChild tooltip="Dashboard">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )
        : isLoaded && (
            <Button asChild tooltip="Sign in">
              <Link href="/signin">Sign in</Link>
            </Button>
          )}
    </>
  );
};

export default DashboardButton;
