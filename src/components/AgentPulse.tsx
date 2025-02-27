interface AgentPulseProps {
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "purple";
}

const AgentPulse = ({ size = "small", color = "blue" }: AgentPulseProps) => {
  const sizeClasses = { small: 6, medium: 12, large: 16 };
  const colorClasses = {
    blue: { outer: "bg-sky-200", inner: "bg-blue-500" },
    green: { outer: "bg-emerald-200", inner: "bg-green-500" },
    purple: { outer: "bg-fuchsia-200", inner: "bg-purple-500" },
  };

  return (
    <div
      className={`relative grid place-items-center size-${sizeClasses[size]} ${colorClasses[color].outer} rounded-full animate-pulse`}
    >
      <div
        className={`size-${sizeClasses[size] - 2} ${
          colorClasses[color].inner
        } rounded-full`}
      />
    </div>
  );
};

export default AgentPulse;
