interface AgentPulseProps {
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "purple";
}

const AgentPulse = ({ size = "small", color = "blue" }: AgentPulseProps) => {
  const sizeClasses = {
    small: { outer: "size-6", inner: "size-3" },
    medium: { outer: "size-12", inner: "size-6" },
    large: { outer: "size-16", inner: "size-8" },
  };
  const colorClasses = {
    blue: { outer: "bg-blue-100", inner: "bg-blue-700" },
    green: { outer: "bg-emerald-100", inner: "bg-green-600" },
    purple: { outer: "bg-fuchsia-100", inner: "bg-purple-600" },
  };

  return (
    <div
      className={`relative grid place-items-center ${sizeClasses[size].outer} ${colorClasses[color].outer} rounded-full 
      dark:opacity-80`}
    >
      <div
        className={`${sizeClasses[size].inner} ${colorClasses[color].inner} rounded-full animate-ping`}
      />
    </div>
  );
};

export default AgentPulse;
