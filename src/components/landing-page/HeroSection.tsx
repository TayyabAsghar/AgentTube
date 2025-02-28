import AgentPulse from "@/components/AgentPulse";
import VideoForm from "@/components/landing-page/VideoForm";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className=" container mx-auto px-4 mt-14">
        <div className="flex flex-col items-center gap-10 text-center mb-12">
          <AgentPulse size="medium" color="blue" />

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Meet Your Personal{" "}
            <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
              AI Content Agent
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your video content with AI-powered analysis,
            transcription, and insights. Get started in seconds.
          </p>

          <VideoForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
