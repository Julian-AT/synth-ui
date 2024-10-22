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
  const SYSTEM_PROMPT = `As an expert React component designer, provide a concise abstract for a completly new component to be implemented. Your response should be no longer than 3 sentences, briefly describing the component's purpose, main functionality, and key technologies (including ${uiLibrary}) to be used.`;

  return streamingAgent(uiStream, messages, SYSTEM_PROMPT, update);
}
