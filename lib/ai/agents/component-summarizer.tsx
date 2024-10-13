import { createStreamableUI } from "ai/rsc";
import { CoreMessage } from "ai";
import { streamingAgent, StreamResponse } from "@/lib/ai/agents/streamingAgent";

const SYSTEM_PROMPT = `Summarize the following React component in under 1500 characters, ensuring the summary flows naturally instead of following a rigid list. Use markdown for formatting. The summary should cover:

- A brief overview of the component's purpose and functionality.
- Implementation details, including React hooks, logic, and any event listeners used, in a smooth, flowing narrative.
- A description of the styling approach, such as the use of CSS frameworks, transitions, and responsiveness.

Keep the summary concise, ensuring it doesn’t exceed the 1500 character limit, and format it clearly with markdown for readability using different headings..`;

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
        content: code,
      },
    ],
    SYSTEM_PROMPT,
    update,
  );
}
