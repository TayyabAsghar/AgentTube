import { v } from "convex/values";

const TextUIPart = v.object({
  type: v.literal("text"),
  text: v.string(),
});

const ReasoningUIPart = v.object({
  type: v.literal("reasoning"),
  reasoning: v.string(),
  details: v.optional(v.string()),
});

const ToolInvocationUIPart = v.object({
  type: v.literal("tool-invocation"),
  toolInvocation: v.object({
    toolName: v.string(),
    parameters: v.optional(v.any()),
    result: v.optional(v.any()),
  }),
});

const SourceUIPart = v.object({
  type: v.literal("source"),
  sourceName: v.string(),
  url: v.optional(v.string()),
});

const PartsSchema = v.array(
  v.union(TextUIPart, ReasoningUIPart, ToolInvocationUIPart, SourceUIPart)
);

// Define the Chat Message Schema
const ChatType = v.object({
  id: v.string(),
  role: v.union(
    v.literal("assistant"),
    v.literal("system"),
    v.literal("user"),
    v.literal("data")
  ),
  content: v.optional(v.string()),
  parts: v.optional(PartsSchema),
});

export default ChatType;
