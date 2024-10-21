import {
  StreamableValue,
  createAI,
  createStreamableUI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
} from "ai/rsc";
import React, { ReactNode } from "react";
import { CoreMessage, generateId } from "ai";
import { AIMessage, Chat } from "@/lib/types";
import {
  BotMessage,
  PlainMessage,
  UserMessage,
} from "@/components/chat-message";
import ComponentCard, { ComponentCardProps } from "@/components/component-card";
import { currentUser } from "@clerk/nextjs/server";
import { saveChat } from "@/lib/actions/chat";
import ErrorCard from "@/components/error-card";
import { workflow } from "@/lib/ai/core/workflow";
import { generateTitle } from "@/lib/ai/agents/title-generator";

const MAX_MESSAGES = 6;

async function submitUserMessage(
  formData?: FormData,
  skip?: boolean,
  retryMessages?: AIMessage[],
) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();
  const isGenerating = createStreamableValue(true);
  const isComponentCard = createStreamableValue(false);

  const aiMessages = [...(retryMessages ?? aiState.get().messages)];
  const messages = aiMessages
    .filter(
      (m) =>
        m.role !== "tool" &&
        m.type !== "end" &&
        m.type !== "component_card" &&
        m.type !== "component_specification" &&
        m.type !== "component_iteration",
    )
    .map((m) => {
      const { role, content } = m;
      return { role, content } as CoreMessage;
    });

  messages.splice(0, Math.max(messages.length - MAX_MESSAGES, 0));

  const content = skip
    ? `{ "action": "skip" }`
    : (formData?.get("input") as string);

  if (content) {
    aiState.update({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: generateId(),
          role: "user",
          content,
          type: "input",
        },
      ],
    });
    messages.push({
      role: "user",
      content,
    });
  }

  workflow(
    {
      uiStream,
      isGenerating,
      isComponentCard,
    },
    aiState,
    messages,
    skip ?? false,
  );

  return {
    id: generateId(),
    isGenerating: isGenerating.value,
    isComponentCard: isComponentCard.value,
    display: uiStream.value,
  };
}

export type AIState = Chat;

export type UIState = {
  id: string;
  display: ReactNode;
  isGenerating?: StreamableValue<boolean>;
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
        const { id, messages, createdAt, path } = state;
        let { title } = state;
        const userId = user.id;

        if (!title || title.trim().length === 0) {
          title = await generateTitle(
            messages.find((m) => m.role === "user")?.content ?? "",
          );
          console.log("generated new title", title);
        }

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
  const messages = Array.isArray(aiState.messages) ? aiState.messages : [];

  return messages
    .map((message) => {
      const { role, content, id, type } = message;

      if (type === "end" || type === "component_specification") return null;

      switch (role) {
        case "user":
          switch (type) {
            case "input":
              return {
                id,
                display: <UserMessage>{content}</UserMessage>,
              };
          }
        case "assistant":
          const answer = createStreamableValue();
          answer.done(content);

          switch (type) {
            case "inquiry":
              return {
                id,
                display: <BotMessage content={answer.value} />,
              };
            case "answer":
              return {
                id,
                display: <BotMessage content={answer.value} />,
              };
            case "follow_up":
              return {
                id,
                display: <PlainMessage content={answer.value} indent />,
              };
          }
        case "tool":
          try {
            const toolOutput = JSON.parse(content);
            switch (type) {
              case "component_card":
                const code = createStreamableValue();
                code.done(toolOutput.result.code);

                const componentCard = toolOutput.result as ComponentCardProps;
                componentCard.code = code.value;

                const isComponentCard = createStreamableValue(false);
                isComponentCard.done(true);

                return {
                  id,
                  display: (
                    <ComponentCard
                      key={`component-card-${id}`}
                      {...componentCard}
                    />
                  ),
                  isComponentCard: isComponentCard.value,
                };
              case "component_iteration":
                return {
                  id,
                  display: <div>Component Iteration Placeholder</div>,
                };
            }
          } catch (error: any) {
            console.log(error);
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
              <ErrorCard message="Something went wrong while rendering this message." />
            ),
          };
      }
    })
    .filter((message) => message !== null) as UIState;
};
