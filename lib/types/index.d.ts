import { CoreMessage, ToolContent } from "ai";

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: AIMessage[];
  sharePath?: string;
}

export type AIMessageType =
  | "component_specification"
  | "component_card"
  | "component_iteration"
  | "answer"
  | "skip"
  | "input"
  | "inquiry"
  | "tool"
  | "follow_up"
  | "end";

export type AIMessage = Omit<CoreMessage, "content"> & {
  id: string;
  content: string;
  type: AIMessageType;
};

export type ExamplePrompt = {
  label: string;
  prompt: string;
};
