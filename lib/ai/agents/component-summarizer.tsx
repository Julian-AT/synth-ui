import { createStreamableUI } from "ai/rsc";
import { CoreMessage } from "ai";
import { streamingAgent, StreamResponse } from "@/lib/ai/agents/streamingAgent";

const SYSTEM_PROMPT = `You have written a React component. Its your job to summarize the component in a natural language in under 1500 characters, ensuring the summary flows naturally instead of following a rigid list. Use markdown for formatting. The summary should cover:

- A brief overview of the component's purpose and functionality.
- Implementation details, including React hooks, logic, and any event listeners used, in a smooth, flowing narrative.
- A description of the styling approach, such as the use of CSS frameworks, transitions, and responsiveness.
- You wrote the component so you know the best way to explain it. Write the summary from your perspective and explain why you wrote the component the way you did.
- The summary should be written in a way that is easy to understand and follow, with a natural flow and a smooth narrative.

Keep the summary concise, ensuring it doesn’t exceed the 1500 character limit, and format it clearly with markdown for readability using different headings.`;

export async function componentSummarizer(
  uiStream: ReturnType<typeof createStreamableUI>,
  code: string,
  update?: boolean,
): Promise<StreamResponse> {
  return streamingAgent(
    uiStream,
    [
      {
        role: "user",
        content: `Please create a summary of the following component: ${code}`,
      },
    ],
    SYSTEM_PROMPT,
    update,
  );
}
