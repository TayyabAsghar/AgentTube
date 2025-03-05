import Lost from "@/components/icons/Lost";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const notFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-full m-auto">
      <BackgroundAnimation />

      <Lost className="size-52 sm:size-80" />
      <div className="font-bold text-3xl relative top-[-2.4em] left-[-6.4em] md:text-5xl md:top-[-2.25em] md:left-[-6.2em]">
        404
      </div>
    </div>
  );
};

export default notFound;
