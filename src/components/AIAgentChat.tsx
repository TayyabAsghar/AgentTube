"use Client";

import { ArrowUp } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { ToolPart } from "@/types/types";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AIAgentChatProps {
  videoId: string;
}

const formateToolInvocation = (part: ToolPart) => {
  if (!part.toolInvocation) return "Unknown Tool";

  return `🛠️ Tool Used: ${part.toolInvocation.toolName}`;
};

const AIAgentChat = ({ videoId }: AIAgentChatProps) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
    body: { videoId },
  });

  return (
    <div className="flex flex-col h-full">
      <div className="hidden lg:block px-4 pb-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">AI Agent</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
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
        </div>
      </div>

      <div className="border-t border-gray-100 p-4 bg-white">
        <div className="space-y-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything about the video"
            />
            <Button type="submit" size="icon">
              <ArrowUp />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAgentChat;
