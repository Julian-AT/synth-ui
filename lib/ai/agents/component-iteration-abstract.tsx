import { createStreamableUI } from "ai/rsc";
import { CoreMessage } from "ai";
import { streamingAgent, StreamResponse } from "@/lib/ai/agents/streamingAgent";

export async function componentIterationAbstract(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  update?: boolean,
): Promise<StreamResponse> {
  const SYSTEM_PROMPT = `As an expert React component designer, provide a brief confirmation message about the changes you will make to an existing component. Your response should be a single sentence starting with "I will update" and briefly summarizing the main modifications to be made. Do not include any code or detailed explanations.`;

  return streamingAgent(uiStream, messages, SYSTEM_PROMPT, update);
}
