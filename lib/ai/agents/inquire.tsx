import { createStreamableUI } from "ai/rsc";
import { CoreMessage } from "ai";
import { streamingAgent, StreamResponse } from "@/lib/ai/agents/streamingAgent";

const SYSTEM_PROMPT = `As a professional Senior Software Engineer specializing in NextJS/React components, your role is to inform the user that the given information is not enough to fulfill the task of generating a React component.
Use Markdown to concisely format your response. You can use Inline Code, Lists, and other Markdown features to make your response more readable. Do not use Code Blocks.`;

export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
): Promise<StreamResponse> {
  return streamingAgent(uiStream, messages, SYSTEM_PROMPT, true);
}
