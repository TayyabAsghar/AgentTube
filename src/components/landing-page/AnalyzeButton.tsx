"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const AnalyzeButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`${pending ? "" : "cursor-pointer"}`}
    >
      Analyze {pending && <Loader2 className="animate-spin" />}
    </Button>
  );
};

export default AnalyzeButton;
