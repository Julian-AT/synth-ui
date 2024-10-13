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
  | "skip"
  | "input"
  | "inquiry"
  | "tool"
  | "end";

export type AIMessage = CoreMessage & {
  id: string;
};

export type ExamplePrompt = {
  label: string;
  prompt: string;
};
