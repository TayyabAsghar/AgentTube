import BackgroundAnimation from "@/components/BackgroundAnimation";
import { ClerkLoaded } from "@clerk/nextjs";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <BackgroundAnimation />
      <div className="w-full flex justify-center items-center">{children}</div>
    </ClerkLoaded>
  );
};

export default RootLayout;
