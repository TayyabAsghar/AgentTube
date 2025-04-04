import { ClerkLoaded } from "@clerk/nextjs";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <BackgroundAnimation />
      <div className="w-full flex justify-center items-center">{children}</div>
    </ClerkLoaded>
  );
};

export default RootLayout;
