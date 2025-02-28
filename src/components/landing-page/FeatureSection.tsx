import Features from "@/lib/constants/features";

const FeatureSection = () => {
  return (
    <section id="features" className="p-20 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Content Creators
        </h2>
      </div>

      <div className="grid grid-cols-1 mt-10 text-center gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-x-12 md:gap-0 md:grid-cols-3 xl:mt-24">
        {Features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col justify-start items-center md:p-8 lg:p-14 hover:shadow-xl
                ${index >= 3 ? "md:border-t md:border-gray-200" : ""} 
                ${index % 3 !== 0 ? "md:border-l md:border-gray-200" : ""}`}
          >
            <div
              className={`w-14 h-14 rounded-full flex justify-center items-center ${feature.bgColor}`}
            >
              <feature.icon className="text-3xl text-gray-900" />
            </div>
            <h3 className="mt-12 text-xl font-bold">{feature.title}</h3>
            <p className="mt-5 text-base text-accent-foreground opacity-60">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
