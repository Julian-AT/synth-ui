import { createStreamableUI } from "ai/rsc";
import { CoreMessage } from "ai";
import { streamingAgent, StreamResponse } from "@/lib/ai/agents/streamingAgent";

const SYSTEM_PROMPT = `As a professional Senior Software Engineer specializing in NextJS/React components, your role is to inform the user that the given information is not enough to fulfill the task of generating a React component.

- Tell the user that you are not able to fulfill the request.
- Tell the user that it's your job to help them generate a React component.
- Use Markdown lists to suggest possible criteria that could be used to generate the component.
- Suggest a list of prompts that the user could use to generate the component.
`;

export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
): Promise<StreamResponse> {
  return streamingAgent(uiStream, messages, SYSTEM_PROMPT, true);
}
