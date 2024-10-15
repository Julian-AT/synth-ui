"use server";

import { SpinnerMessage } from "@/components/chat-message";
import { nextActionSchema } from "@/lib/schema/next-action";
import { CoreMessage, generateId } from "ai";
import { createStreamableUI, createStreamableValue } from "ai/rsc";
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
import { componentSummarizer } from "../agents/component-summarizer";
import { ComponentCardProps } from "@/components/component-card";

export async function workflow(
  uiState: {
    uiStream: ReturnType<typeof createStreamableUI>;
    isCollapsed: ReturnType<typeof createStreamableValue<boolean>>;
    isGenerating: ReturnType<typeof createStreamableValue<boolean>>;
  },
  aiState: any,
  messages: CoreMessage[],
  skip: boolean,
) {
  const { uiStream, isCollapsed, isGenerating } = uiState;

  try {
    const id = generateId();

    uiStream.update(<SpinnerMessage />);

    let action: {
      object: {
        next: z.infer<typeof nextActionSchema>["next"];
      };
    } = { object: { next: "generate_component" } };

    if (!skip) action = (await taskManager(aiState.get().messages)) ?? action;

    if (action.object.next === "inquire") {
      const inquiry = await inquire(uiStream, aiState.get().messages);

      uiStream.done();
      aiState.done({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id: generateId(),
            role: "assistant",
            content: inquiry.response,
            type: "inquiry",
          },
        ],
      });

      return;
    }

    if (action.object.next === "generate_component") {
      const abstract = await componentAbstract(
        uiStream,
        aiState.get().messages,
        true,
      );

      uiStream.append(<ComponentCardSkeleton />);

      const specification = await componentSpecification(
        aiState.get().messages,
      );

      const fileName = specification.fileName;
      const title = camelCaseToSpaces(specification.componentName);
      const component = await componentGenerator(uiStream, specification, id);

      if (component.hasError) {
        throw new Error("An error occured while generating the component.");
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
          {
            id,
            content: JSON.stringify(specification),
            role: "tool",
            type: "component_specification",
          },
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
            id: id,
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
