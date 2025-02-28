import Form from "next/form";
import AnalyzeButton from "@/components/landing-page/AnalyzeButton";
import { Input } from "@/components/ui/input";
import AnalyzeVideo from "@/actions/AnalyzeVideo";

const VideoForm = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form
        action={AnalyzeVideo}
        className="flex flex-col sm:flex-row gap-2 items-center"
      >
        <Input
          name="url"
          type="text"
          placeholder="Enter Youtube URL"
          className="w-full flex-1 px-4 py-2 bg-accent"
        />
        <AnalyzeButton />
      </Form>
    </div>
  );
};

export default VideoForm;
