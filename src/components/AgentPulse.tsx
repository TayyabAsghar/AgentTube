interface AgentPulseProps {
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "purple";
}

const AgentPulse = ({ size = "small", color = "blue" }: AgentPulseProps) => {
  const sizeClasses = {
    small: { outer: "size-6", inner: "size-4" },
    medium: { outer: "size-12", inner: "size-10" },
    large: { outer: "size-16", inner: "size-14" },
  };
  const colorClasses = {
    blue: { outer: "bg-sky-200", inner: "bg-blue-500" },
    green: { outer: "bg-emerald-200", inner: "bg-green-500" },
    purple: { outer: "bg-fuchsia-200", inner: "bg-purple-500" },
  };

  return (
    <div
      className={`relative grid place-items-center ${sizeClasses[size].outer} ${colorClasses[color].outer} rounded-full animate-pulse`}
    >
      <div
        className={`${sizeClasses[size].inner} ${colorClasses[color].inner} rounded-full`}
      />
    </div>
  );
};

export default AgentPulse;
