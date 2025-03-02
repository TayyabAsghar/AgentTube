export interface ChannelDetails {
  title: string;
  thumbnail: string;
  subscribers: string;
}

export interface VideoDetails {
  title: string;
  views: string;
  likes: string;
  comments: string;
  thumbnail: string;
  channel: ChannelDetails;
  publishedAt: string;
}

export interface ToolInvocation {
  toolName: string;
  toolCallId: string;
  result?: Record<string, unknown>;
}

export interface ToolPart {
  type: "tool-invocation";
  toolInvocation: ToolInvocation;
}
