"use client";

import Form from "next/form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnalyzeYouTubeVideo from "@/actions/AnalyzeYouTubeVideo";

const VideoForm = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { pending } = useFormStatus();

  const submitUrl = async (form: FormData) => {
    const response = await AnalyzeYouTubeVideo(form);

    console.log(response);

    if (response?.error) toast.error(response?.error.description);
    else if (!response?.videoId) return;
    else {
      const url = `/video/${response.videoId}/analysis`;

      if (!isSignedIn)
        router.push(`/signin?redirect_url=${encodeURIComponent(url)}`);
      else router.push(url);
    }
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
