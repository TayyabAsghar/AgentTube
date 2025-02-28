import Steps from "@/lib/constants/steps";

const HowItWorksSection = () => {
  return (
    <section className="p-18 py-28 mt-12 bg-gradient-to-bl from-blue-300 to-blue-700">
      <h2 className="text-3xl text-white font-[500] text-center">
        Meet your AI Agent in 3 Simple Steps
      </h2>

      <ul className="mt-16 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-stretch items-stretch">
        {Steps.map((step, index) => (
          <li
            key={index}
            className="flex items-center gap-4 p-4 md:p-6 lg:p-8 bg-white bg-opacity-90 rounded-lg hover:shadow-lg"
          >
            <div className="bg-gradient-to-bl from-blue-300 to-blue-700 self-start text-xl text-white w-fit p-4 rounded-md">
              <step.icon />
            </div>
            <div className="self-start">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HowItWorksSection;
