"use server";

import { SpinnerMessage } from "@/components/chat-message";
import { nextActionSchema } from "@/lib/schema/next-action";
import { CoreMessage, generateId } from "ai";
import {
  createStreamableUI,
  createStreamableValue,
  getMutableAIState,
} from "ai/rsc";
import { z } from "zod";
import {
  componentAbstract,
  componentSpecification,
  inquire,
  taskManager,
} from "@/lib/ai/agents";
import { camelCaseToSpaces } from "@/lib/utils";
import ComponentCardSkeleton from "@/components/component-card-skeleton";
import { componentGenerator } from "../agents/component-generator";
import ErrorCard from "@/components/error-card";
import { componentSummarizer } from "@/lib/ai/agents/component-summarizer";
import { ComponentCardProps } from "@/components/component-card";
import { AI } from "@/lib/ai/core";

export async function workflow(
  uiState: {
    uiStream: ReturnType<typeof createStreamableUI>;
    isGenerating: ReturnType<typeof createStreamableValue<boolean>>;
    isComponentCard: ReturnType<typeof createStreamableValue<boolean>>;
  },
  aiState: ReturnType<typeof getMutableAIState<typeof AI>>,
  messages: CoreMessage[],
  skip: boolean,
) {
  const { uiStream } = uiState;

  try {
    const id = generateId();

    uiStream.update(<SpinnerMessage />);

    let action: {
      object: {
        next: z.infer<typeof nextActionSchema>["next"];
      };
    } = { object: { next: "generate_component" } };

    if (!skip) action = (await taskManager(messages)) ?? action;

    if (action.object.next === "inquire") {
      const inquiry = await inquire(uiStream, messages);

      if (inquiry.hasError) {
        throw new Error("An error occured while generating the component.");
      }

      uiStream.done();
      aiState.done({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id,
            role: "assistant",
            content: inquiry.response,
            type: "inquiry",
          },
        ],
      });

      return;
    }

    if (action.object.next === "generate_component") {
      const abstract = await componentAbstract(uiStream, messages, true);

      uiStream.append(<ComponentCardSkeleton />);

      const specification = await componentSpecification(messages);

      const fileName = specification.fileName;
      const title = camelCaseToSpaces(specification.componentName);
      const component = await componentGenerator(uiStream, specification, id);

      uiState.isComponentCard.done(true);

      if (component.hasError) {
        throw new Error(
          "An error occured while generating the component. Please try again later!",
        );
      }

      const summary = await componentSummarizer(uiStream, component.response);

      aiState.done({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id,
            content: abstract.response,
            role: "assistant",
            type: "answer",
          },
          //   {
          //     id,
          //     content: JSON.stringify(specification),
          //     role: "tool",
          //     type: "component_specification",
          //   },
          {
            id,
            role: "tool",
            type: "component_card",
            content: JSON.stringify({
              result: {
                messageId: id,
                code: component.response,
                fileName,
                title,
              } as ComponentCardProps,
            }),
          },
          {
            id,
            role: "assistant",
            content: summary.response,
            type: "follow_up",
          },
        ],
      });
    } else if (action.object.next === "iterate_component") {
      // Implement iteration logic here
    }
  } catch (error: any) {
    console.error("Error in processEvents:", error);
    uiStream.update(
      <ErrorCard message={error.message ?? "An unknown error occured."} />,
    );
  }
}
