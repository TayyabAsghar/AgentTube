import BackgroundAnimation from "@/components/BackgroundAnimation";
import { ClerkLoaded } from "@clerk/nextjs";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <main className="w-screen h-screen flex justify-center items-center">
        <>
          <BackgroundAnimation />
          {children}
        </>
      </main>
    </ClerkLoaded>
  );
};

export default RootLayout;
