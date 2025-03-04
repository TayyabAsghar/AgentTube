import HeroSection from "@/components/landing-page/HeroSection";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <BackgroundAnimation />

      <HeroSection className="py-2" />
    </div>
  );
};

export default Dashboard;
