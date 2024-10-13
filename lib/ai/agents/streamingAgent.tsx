import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { getModel } from "@/lib/utils";
import { BotMessage, PlainMessage } from "@/components/chat-message";

export interface StreamResponse {
  response: string;
  hasError: boolean;
}

export async function streamingAgent(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  systemPrompt: string,
  update: boolean = false,
): Promise<StreamResponse> {
  let fullResponse = "";
  let hasError = false;
  const streamableAnswer = createStreamableValue<string>("");

  let textNode: React.ReactNode;

  if (!update) {
    textNode = <PlainMessage content={streamableAnswer.value} indent />;
  } else {
    textNode = <BotMessage content={streamableAnswer.value} />;
  }

  if (update) {
    uiStream.update(textNode);
  } else {
    uiStream.append(textNode);
  }

  try {
    await streamText({
      model: getModel(),
      messages,
      system: systemPrompt,
      onFinish: (event) => {
        fullResponse = event.text;
        streamableAnswer.done();
      },
    })
      .then(async (result) => {
        for await (const text of result.textStream) {
          if (text) {
            fullResponse = text;
            streamableAnswer.update(fullResponse);
          }
        }
      })
      .catch((err) => {
        hasError = true;
        fullResponse = "Error: " + err.message;
        streamableAnswer.update(fullResponse);
      });

    return { response: fullResponse, hasError };
  } catch (err) {
    const errorMessage = `Error: ${err instanceof Error ? err.message : "An unknown error occurred"}`;
    streamableAnswer.update(errorMessage);
    streamableAnswer.done(errorMessage);
    return { response: errorMessage, hasError: true };
  }
}
