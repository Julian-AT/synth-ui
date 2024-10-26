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
  taskManager,
  inquire,
  componentSpecification,
  componentAbstract,
  componentGenerator,
  componentSummarizer,
  componentIterationAbstract,
  componentIterator,
  componentIterationSummarizer,
} from "@/lib/ai/agents";
import { camelCaseToSpaces } from "@/lib/utils";
import ComponentCardSkeleton from "@/components/component-card-skeleton";
import ErrorCard from "@/components/error-card";
import { ComponentCardProps } from "@/components/component-card";
import { AI } from "@/lib/ai/core";
import { AIMessage, LLMSelection, UILibrary } from "@/lib/types";
import { languageIdentifier } from "../agents/language-identifier";

export async function workflow(
  uiState: {
    uiStream: ReturnType<typeof createStreamableUI>;
    isGenerating: ReturnType<typeof createStreamableValue<boolean>>;
    isComponentCard: ReturnType<typeof createStreamableValue<boolean>>;
  },
  aiState: ReturnType<typeof getMutableAIState<typeof AI>>,
  query: string,
  messages: CoreMessage[],
  skip: boolean,
  uiLibrary: UILibrary,
  llm: LLMSelection,
  messageId?: string,
) {
  const { uiStream, isComponentCard } = uiState;

  try {
    const id = messageId ?? generateId();

    uiStream.update(<SpinnerMessage />);

    let languageObject: {
      object: {
        language: string;
      };
    } = { object: { language: "English" } };

    languageObject = (await languageIdentifier(query)) ?? languageObject;
    const language = languageObject.object.language;

    console.log(language);

    let action: {
      object: {
        next: z.infer<typeof nextActionSchema>["next"];
      };
    } = { object: { next: "generate_component" } };

    if (!skip) action = (await taskManager(messages, language)) ?? action;

    if (action.object.next === "inquire") {
      const inquiry = await inquire(uiStream, messages, language);

      if (inquiry.hasError) {
        throw new Error("An error occured while generating the component.");
      }

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
      const abstract = await componentAbstract(
        uiStream,
        messages,
        uiLibrary,
        language,
        true,
      );

      uiStream.append(<ComponentCardSkeleton />);

      const specification = await componentSpecification(
        messages,
        uiLibrary,
        language,
      );

      const fileName = specification.fileName;
      const title = camelCaseToSpaces(specification.componentName);
      const component = await componentGenerator(
        uiStream,
        specification,
        id,
        true,
        llm,
        language,
      );

      isComponentCard.done(true);

      if (component.hasError) {
        throw new Error(
          "An error occured while generating the component. Please try again later!",
        );
      }

      const summary = await componentSummarizer(
        uiStream,
        component.response,
        uiLibrary,
        language,
      );

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
                iteration: 1,
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
      const iterationAbstract = await componentIterationAbstract(
        uiStream,
        messages,
        language,
        true,
      );

      uiStream.append(<ComponentCardSkeleton />);

      const lastComponentCardRaw = aiState
        .get()
        .messages.find(
          (message: AIMessage) => message.type === "component_card",
        );

      console.log(lastComponentCardRaw);

      const lastComponentCardJSON = JSON.parse(lastComponentCardRaw.content);

      const lastComponentCard =
        lastComponentCardJSON.result as ComponentCardProps;

      const code = lastComponentCard.code.toString();
      const fileName = lastComponentCard.fileName ?? "untitled.tsx";
      const title = lastComponentCard.title ?? "Untitled";
      const messageId = lastComponentCard.messageId;
      const iteration = lastComponentCard.iteration + 1;

      const componentIteration = await componentIterator(
        uiStream,
        code,
        query,
        uiLibrary,
        llm,
        title,
        fileName,
        messageId,
        iteration,
        language,
      );

      if (componentIteration.hasError) {
        throw new Error(
          "An error occured while generating the component. Please try again later!",
        );
      }

      const iterationSummary = await componentIterationSummarizer(
        uiStream,
        code,
        componentIteration.response,
        uiLibrary,
        language,
        true,
      );

      aiState.done({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id,
            content: iterationAbstract.response,
            role: "assistant",
            type: "answer",
          },
          {
            id,
            role: "assistant",
            type: "component_iteration",
            content: JSON.stringify({
              result: {
                messageId: id,
                code: componentIteration.response,
                fileName,
                title,
                iteration: iteration,
              } as ComponentCardProps,
            }),
          },
          {
            id,
            role: "assistant",
            content: iterationSummary.response,
            type: "follow_up",
          },
        ],
      });
    }
  } catch (error: any) {
    console.error("Error in processEvents:", error);
    uiStream.update(
      <ErrorCard message={error.message ?? "An unknown error occured."} />,
    );
  } finally {
    uiStream.done();
  }
}
