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
import ComponentCard from "@/components/component-card";
import { currentUser } from "@clerk/nextjs/server";
import { saveChat } from "@/lib/actions/chat";
import ErrorCard from "@/components/error-card";
import { generateTitle } from "@/lib/ai/agents/title-generator";
import { workflow } from "./workflow";

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
  retryMessages?: AIMessage[],
) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();
  const isGenerating = createStreamableValue(true);
  const isCollapsed = createStreamableValue(false);

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

  messages.splice(0, Math.max(messages.length - 10, 0));

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
      isCollapsed,
      isGenerating,
    },
    aiState,
    messages,
    skip ?? false,
  );

  return {
    id: generateId(),
    isGenerating: isGenerating.value,
    isCollapsed: isCollapsed.value,
    display: uiStream.value,
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
        const { id, messages, createdAt, path } = state;
        let title = state.title;
        const userId = user.id;

        if (title === "") {
          const firstUserMessage = messages
            .filter((m) => m.role === "user")[0]
            .content.toString();
          title = await generateTitle(firstUserMessage);
        }

        console.log(title);

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
            const isCollapsed = createStreamableValue(false);
            isCollapsed.done(true);

            switch (type) {
              case "component_card":
                return {
                  id,
                  display: (
                    <ComponentCard
                      key={`component-card-${id}`}
                      {...toolOutput}
                    />
                  ),
                };
              case "component_iteration":
                return {
                  id,
                  display: <div>Component Iteration Placeholder</div>,
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
              <ErrorCard message="Ooops! Something went wrong while rendering this message." />
            ),
          };
      }
    })
    .filter((message) => message !== null) as UIState;
};
