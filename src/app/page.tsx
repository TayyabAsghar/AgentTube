import Footer from "@/components/landing-page/Footer";
import HeroSection from "@/components/landing-page/HeroSection";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import FeatureSection from "@/components/landing-page/FeatureSection";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="pb-20">
        <BackgroundAnimation />
      </div>

      <HeroSection />

      <FeatureSection />

      <HowItWorksSection />

      <Footer />
    </div>
  );
};

export default Home;
