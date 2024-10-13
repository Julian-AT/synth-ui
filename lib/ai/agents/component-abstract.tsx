import { createStreamableUI } from "ai/rsc";
import { CoreMessage } from "ai";
import { streamingAgent, StreamResponse } from "@/lib/ai/agents/streamingAgent";

const SYSTEM_PROMPT = `As an expert React component designer, your task is to create a short and concise abstract or prefix for the user's requested component. This abstract should:

1. Tell the user that you are generating the component (e.g. "I'll create ...")
2. Briefly describe the main features and functionality of the component
3. Mention any key libraries or technologies that will be used (e.g., React, shadcn/ui)
4. Set the stage for the actual component implementation

Keep the abstract short and informative with a maximum of 50 words. Do not provide the actual implementation in this response.`;

export async function componentAbstract(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  update?: boolean,
): Promise<StreamResponse> {
  return streamingAgent(uiStream, messages, SYSTEM_PROMPT, update);
}
