import { createStreamableUI } from "ai/rsc";
import { CoreMessage } from "ai";
import { streamingAgent, StreamResponse } from "@/lib/ai/agents/streamingAgent";
import { UILibrary } from "@/lib/types";

export async function componentAbstract(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  uiLibrary: UILibrary,
  update?: boolean,
): Promise<StreamResponse> {
  const SYSTEM_PROMPT = `As an expert React component designer, provide a brief confirmation message that you will create a new component. Your response should be a single sentence starting with "I will create" and briefly summarizing the component's main functionality. Do not include any code or detailed explanations.`;

  return streamingAgent(uiStream, messages, SYSTEM_PROMPT, update);
}
