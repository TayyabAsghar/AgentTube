"use Client";

import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { ToolPart } from "@/types/types";
import { FeatureFlag } from "@/lib/flags";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message, useChat } from "@ai-sdk/react";
import { useSchematicFlag } from "@schematichq/schematic-react";
import {
  ArrowUp,
  BotIcon,
  ImageIcon,
  LetterText,
  PenIcon,
  Square,
} from "lucide-react";

interface AIAgentChatProps {
  videoId: string;
}

const formateToolInvocation = (part: ToolPart) => {
  if (!part.toolInvocation) return "Unknown Tool";

  return `🛠️ Tool Used: ${part.toolInvocation.toolName}`;
};

const AIAgentChat = ({ videoId }: AIAgentChatProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const {
    input,
    status,
    messages,
    stop,
    append,
    handleSubmit,
    handleInputChange,
  } = useChat({
    maxSteps: 5,
    body: { videoId },
  });

  const isScriptGenerationEnabled = useSchematicFlag(
    FeatureFlag.SCRIPT_GENERATION
  );
  const isImageGenerationEnabled = useSchematicFlag(
    FeatureFlag.IMAGE_GENERATION
  );
  const isTitleGenerationEnabled = useSchematicFlag(
    FeatureFlag.TITLE_GENERATIONS
  );
  const isVideoAnalysisEnabled = useSchematicFlag(FeatureFlag.VIDEO_ANALYSIS);

  const generateScript = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);

    const userMessage: Message = {
      id: `generate-script-${randomId}`,
      role: "user",
      content: `Generate a step-by-step shooting script for this video that I can use on my own channel to produce a video that is similar to this 
      one. Don't do any other steps such as generating an image, just generate the script only!`,
    };

    append(userMessage);
  };

  useEffect(() => {
    if (bottomRef.current && messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let toastId;

    switch (status) {
      case "submitted":
        toastId = toast.success("Agent is thinking...", {
          id: toastId,
          icon: <BotIcon className="size-4" />,
        });
        break;

      case "streaming":
        toastId = toast.success("Agent is replying...", {
          id: toastId,
          icon: <BotIcon className="size-4" />,
        });
        break;

      case "error":
        toastId = toast.error(
          "Whoops! Something went wrong, please try again.",
          {
            id: toastId,
            icon: <BotIcon className="size-4" />,
          }
        );
        break;

      case "ready":
        toast.dismiss(toastId);
        break;
    }
  }, [status]);

  const generateImage = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const userMessage: Message = {
      id: `generate-image-${randomId}`,
      role: "user",
      content: "Generate a thumbnail for this video",
    };

    append(userMessage);
  };

  const generateTitle = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const userMessage: Message = {
      id: `generate-title-${randomId}`,
      role: "user",
      content: "Generate a title for this video",
    };

    append(userMessage);
  };

  const cancelRequest = () => {
    stop();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="hidden lg:block px-4 pb-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">AI Agent</h2>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        ref={messageContainerRef}
      >
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-gray-700">
                  Welcome to AI Agent Chat
                </h3>
                <p className="text-sm text-gray-500">
                  Ask any question about your video!
                </p>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] ${m.role === "user" ? "bg-blue-300" : "bg-gray-100"} rounded-2xl px-4 py-3`}
              >
                {m.parts && m.role === "assistant" ? (
                  <div className="space-y-3">
                    {m.parts.map((part, i) =>
                      part.type === "text" ? (
                        <div key={i} className="prose prose-sm max-w-none">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      ) : (
                        part.type === "tool-invocation" && (
                          <div
                            key={i}
                            className="bg-white/50 rounded-lg p-2 space-y-2 text-gray-800"
                          >
                            <div className="font-medium text-xs">
                              {formateToolInvocation(part as ToolPart)}
                            </div>
                            {(part as ToolPart).toolInvocation.result && (
                              <pre className="text-xs bg-white/75 p-2 rounded overflow-auto max-h-40">
                                {JSON.stringify(
                                  (part as ToolPart).toolInvocation.result,
                                  null,
                                  2
                                )}
                              </pre>
                            )}
                          </div>
                        )
                      )
                    )}
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none text-white">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-gray-100 p-4 bg-white">
        <div className="space-y-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder={
                isVideoAnalysisEnabled
                  ? "Ask anything about the video"
                  : "Upgrade to ask anything about the video"
              }
            />
            {status === "streaming" || status === "submitted" ? (
              <Button size="icon" type="button" onClick={cancelRequest}>
                <Square />
              </Button>
            ) : (
              <Button
                size="icon"
                type="submit"
                disabled={!isVideoAnalysisEnabled}
              >
                <ArrowUp />
              </Button>
            )}
          </form>

          <div className="flex gap-2">
            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full
    transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={generateScript}
              type="button"
              disabled={
                status === "streaming" ||
                status === "submitted" ||
                !isScriptGenerationEnabled
              }
            >
              <LetterText className="w-4 h-4" />

              {isScriptGenerationEnabled ? (
                <span>Generate Script</span>
              ) : (
                <span>Upgrade to generate a script</span>
              )}
            </button>

            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2
  px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors
  disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={generateTitle}
              type="button"
              disabled={
                status === "streaming" ||
                status === "submitted" ||
                !isTitleGenerationEnabled
              }
            >
              <PenIcon className="w-4 h-4" />
              Generate Title
            </button>

            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2
  px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors
  disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={generateImage}
              type="button"
              disabled={
                status === "streaming" ||
                status === "submitted" ||
                !isImageGenerationEnabled
              }
            >
              <ImageIcon className="w-4 h-4" />
              Generate Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentChat;
