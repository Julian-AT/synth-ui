import { ComponentSpecificationSchema } from "@/lib/schema/component/specification";
import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { StreamResponse } from "@/lib/ai/agents/streamingAgent";
import { streamText } from "ai";
import { camelCaseToSpaces } from "@/lib/utils";
import { getModel } from "@/lib/utils/getModel";
import ComponentCard from "@/components/component-card";
import { ReactIcon } from "hugeicons-react";

export async function componentGenerator(
  uiStream: ReturnType<typeof createStreamableUI>,
  specification: ComponentSpecificationSchema,
  messageId: string,
): Promise<StreamResponse> {
  let fullResponse = "";
  let hasError = false;
  const streamableAnswer = createStreamableValue<string>("");
  const componentCard = (
    <ComponentCard
      code={streamableAnswer.value}
      messageId={messageId}
      fileName={specification.fileName}
      title={camelCaseToSpaces(specification.componentName)}
      icon={<ReactIcon />}
    />
  );

  uiStream.update(componentCard);

  uiStream.update(<>{streamableAnswer.value}</>);

  try {
    await streamText({
      model: getModel(),
      system: `As a professional and experienced senior software engineer for NextJS/React, your task is to generate React component code based on a JSON specification provided by the user.

    **Key Guidelines:**

    1. **Primary Objective**: Convert the given JSON specification into a complete, functional React component.
       - The JSON may include details such as component name, properties (props), state management, UI structure, styling, event handlers, and any additional logic.
       - Ensure the component adheres to React best practices (e.g., functional components, hooks where applicable).

    2. **Code-Only Output**: Your output should only contain the necessary React component code. Do not include explanations, comments, or any other text outside of the code itself.

    3. **Structural Requirements**: The component should be fully self-contained, meaning it can be copied and used directly in a React project.
       - Import statements (if necessary) should be included.
       - Ensure the code is properly formatted and indented.

    4. **Focus on Accuracy**: Carefully map the JSON specification to React syntax, translating all relevant keys into corresponding JSX, props, state, hooks, etc.

    5. **Edge Cases**: If the specification is incomplete or ambiguous, make reasonable assumptions to ensure the component remains functional.

    Follow these instructions closely to ensure the highest quality of output. Only deliver React component code—nothing else.
    `,
      messages: [
        {
          role: "user",
          content: `Specification:

                \`\`\`
                ${JSON.stringify(specification)}
                \`\`\`
                `,
        },
      ],
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
