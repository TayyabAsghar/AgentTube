import AgentPulse from "@/components/AgentPulse";

const SuspenseLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <AgentPulse size="large" color="blue" />
    </div>
  );
};

export default SuspenseLoader;
