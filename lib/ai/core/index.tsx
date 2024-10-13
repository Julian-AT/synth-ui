import {
  StreamableValue,
  createAI,
  createStreamableUI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
} from "ai/rsc";
import { z } from "zod";
import React, { ReactNode } from "react";
import { generateId } from "ai";
import { AIMessage, Chat } from "@/lib/types";
import { nextActionSchema } from "@/lib/schema/next-action";
import {
  componentSpecification,
  taskManager,
  inquire,
  componentAbstract,
} from "@/lib/ai/agents";
import {
  BotMessage,
  PlainMessage,
  SpinnerMessage,
  UserMessage,
} from "@/components/chat-message";
import ComponentCard, { ComponentCardProps } from "@/components/component-card";
import { camelCaseToSpaces } from "@/lib/utils";
import ComponentCardSkeleton from "@/components/component-card-skeleton";
import { currentUser } from "@clerk/nextjs/server";
import { saveChat } from "@/lib/actions/chat";
import ErrorCard from "@/components/error-card";
import { generateTitle } from "@/lib/ai/agents/title-generator";
import { componentGenerator } from "@/lib/ai/agents/component-generator";
import { componentSummarizer } from "@/lib/ai/agents/component-summarizer";

export type AIState = Chat;

export type UIState = {
  id: string;
  display: ReactNode;
  isComponentCard?: StreamableValue<boolean>;
}[];

const initialAIState: AIState = {
  id: generateId(),
  title: "",
  createdAt: new Date(),
  userId: "",
  path: "",
  messages: [],
};

const initialUIState: UIState = [];

async function submitUserMessage(
  formData?: FormData,
  skip?: boolean,
  retryMessage?: AIMessage[],
) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();
  const isComponentCard = createStreamableValue<boolean>(false);

  const groupId = generateId();

  const userInput = skip
    ? `{ "action": "skip" }`
    : (formData?.get("input") as string);

  const content = skip
    ? userInput
    : formData
      ? JSON.stringify(
          Object.fromEntries(formData)
            ["input"].toString()
            .replace(/^\"|\"$/, ""),
        )
      : null;

  if (content) {
    const newMessage: AIMessage = {
      id: generateId(),
      role: "user",
      content,
    };

    aiState.update({
      ...aiState.get(),
      messages: [...aiState.get().messages, newMessage],
    });

    console.log("Updated AI State:", aiState.get());
  }

  async function processEvents() {
    try {
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
              content: `inquiry: ${inquiry.response}`,
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

        isComponentCard.done(true);

        const component = await componentGenerator(
          uiStream,
          specification,
          groupId,
        );

        if (component.hasError) {
          return uiStream.done(
            <ErrorCard
              message={"An error occured while generating the component."}
            />,
          );
        }

        const summary = await componentSummarizer(uiStream, component.response);

        const toolCallId = generateId();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: groupId,
              content: abstract.response,
              role: "assistant",
            },
            {
              id: groupId,
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolName: "component_card",
                  args: {},
                  toolCallId,
                },
              ],
            },
            {
              id: groupId,
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "component_card",
                  toolCallId,
                  result: {
                    messageId: groupId,
                    code: component.response,
                    fileName,
                    title,
                  } as ComponentCardProps,
                },
              ],
            },
            {
              id: groupId,
              role: "assistant",
              content: `summary: ${summary.response}`,
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

    isComponentCard.done();
  }

  processEvents();

  return {
    id: generateId(),
    display: uiStream.value,
    isComponentCard: isComponentCard.value,
  };
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
  onGetUIState: async () => {
    "use server";

    try {
      const user = await currentUser();

      if (user) {
        const aiState = getAIState() as Chat;

        if (aiState) {
          return getUIStateFromAIState(aiState);
        }
      }
    } catch (error) {
      console.error("Error in onGetUIState:", error);
    }

    return initialUIState;
  },
  onSetAIState: async ({ state, done }) => {
    "use server";

    try {
      const user = await currentUser();

      if (user) {
        const { id, messages, title, createdAt, path } = state;
        const userId = user.id;

        const chat: Chat = {
          id,
          title,
          createdAt,
          userId,
          path: path || `/chat/${id}`,
          messages,
        };

        await saveChat(chat);
      }
    } catch (error) {
      console.error("Error in onSetAIState:", error);
    }
  },
});

export const getUIStateFromAIState = (aiState: AIState): UIState => {
  const chatId = aiState.id;
  const isSharePage = !aiState.sharePath === undefined;

  const messages = Array.isArray(aiState.messages) ? aiState.messages : [];

  return messages.map((message, index) => {
    const { role, content, id } = message;

    switch (role) {
      case "user":
        return {
          id,
          display: <UserMessage>{content as string}</UserMessage>,
        };
      case "assistant":
        if (typeof content !== "string") {
          return {
            id,
            display: null,
          };
        }

        let display: ReactNode;
        const answer = createStreamableValue();

        if (content.startsWith("summary:")) {
          const summary = content.split(":")[1];
          answer.done(summary);
          display = <PlainMessage content={summary} indent />;
        } else {
          answer.done(content);
          display = <BotMessage content={answer.value} />;
        }

        return {
          id,
          display,
        };
      case "tool":
        try {
          const tool = content[0];
          const toolResult = tool.result as ComponentCardProps;
          const code = createStreamableValue();
          code.done(toolResult.code);

          if (
            tool.type === "tool-result" &&
            tool.toolName === "component_card"
          ) {
            return {
              id,
              display: (
                <ComponentCard
                  key={tool.toolCallId}
                  {...toolResult}
                  code={code.value}
                />
              ),
            };
          }
        } catch (error: any) {
          return {
            id,
            display: (
              <ErrorCard
                message={error.message ?? "An unknown error occured"}
              />
            ),
          };
        }
      default:
        return {
          id,
          display: (
            <ErrorCard message="Message could not be parsed into UI stream." />
          ),
        };
    }
  });
};
