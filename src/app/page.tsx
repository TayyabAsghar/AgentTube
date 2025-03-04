import Footer from "@/components/landing-page/Footer";
import HeroSection from "@/components/landing-page/HeroSection";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import PricingSection from "@/components/landing-page/PricingSection";
import FeatureSection from "@/components/landing-page/FeatureSection";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";

const Home = () => {
  return (
    <div>
      <BackgroundAnimation />

      <HeroSection />

      <FeatureSection />

      <HowItWorksSection />

      <PricingSection />

      <Footer />
    </div>
  );
};

export default Home;
