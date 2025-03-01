"use client";

import Form from "next/form";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnalyzeYouTubeVideo from "@/actions/AnalyzeYouTubeVideo";

const VideoForm = () => {
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const submitUrl = async (form: FormData) => {
    const response = await AnalyzeYouTubeVideo(form);

    if (response?.error)
      toast({
        title: response?.error.title,
        description: response?.error.description,
        variant: "destructive",
      });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form
        action={submitUrl}
        className="flex flex-col sm:flex-row gap-2 items-center"
      >
        <Input
          name="url"
          type="text"
          placeholder="Enter Youtube URL"
          className="w-full flex-1 px-4 py-2 bg-accent"
        />

        <Button
          type="submit"
          disabled={pending}
          className={`${pending ? "" : "cursor-pointer"}`}
        >
          Analyze {pending && <Loader2 className="animate-spin" />}
        </Button>
      </Form>
    </div>
  );
};

export default VideoForm;
