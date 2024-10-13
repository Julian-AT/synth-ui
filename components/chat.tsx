"use client";

import { useEffect, useState } from "react";
import { readStreamableValue, useAIState, useUIState } from "ai/rsc";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { cn } from "@/lib/utils";
import { ChatList } from "@/components/chat-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyScreen from "@/components/empty-screen";
import EmptyScreenBackground from "@/components/empty-screen-background";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import PromptForm from "@/components/prompt-form";

import { AI } from "@/lib/ai/core";
import { useComponentPreview } from "@/lib/hooks/use-component-preview";
import ChatHeader from "@/components/chat-header";
import { toast } from "sonner";
import { ChatListSkeleton } from "@/components/chat-list-skeleton";
import { useAppState } from "@/lib/hooks/use-app-state";
import ComponentPreviewPanel from "./component-preview-panel";
import { generateTitle } from "@/lib/ai/agents/title-generator";

interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
  missingKeys?: string[];
}

export function Chat({ className, missingKeys }: ChatProps) {
  const [aiState] = useAIState<typeof AI>();
  const [messages] = useUIState<typeof AI>();
  const { setChat, setChatName } = useAppState();
  const { isPreviewOpen, activeMessageId, closePreview, setComponentCards } =
    useComponentPreview();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { messagesRef, scrollRef, visibilityRef } = useScrollAnchor();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (missingKeys) {
      missingKeys.map((key) => {
        toast.error(`Missing ${key} environment variable!`);
      });
    }
  }, [missingKeys]);

  useEffect(() => {
    if (messages.length === 1) {
      window.history.replaceState({}, "", `/chat/${aiState.id}`);

      if (!aiState.title || aiState.title === "") {
        (async () => {
          const initialMessage = aiState.messages
            .filter((m) => m.role === "user")
            .find((m) => m.content)?.content;
          console.log("initialMessage", initialMessage);
          if (initialMessage) {
            const newTitle = await generateTitle(initialMessage.toString());
            console.log("newTitle", newTitle);
            setChatName(newTitle);
          }
        })();
      }
    }
  }, [messages, aiState.id]);

  useEffect(() => {
    if (Array.isArray(messages)) {
      const filteredCards = messages.filter(async (m) => {
        if (!m.isComponentCard) return;
        let isComponentCard = false;
        for await (const delta of readStreamableValue(m.isComponentCard)) {
          console.log("delta", delta);
          if (typeof delta === "boolean") {
            isComponentCard = delta;
          }
        }
        return isComponentCard;
      });

      if (isPreviewOpen && activeMessageId) {
        const activeCardExists = filteredCards.some(
          (card) => card.id === activeMessageId,
        );
        if (!activeCardExists) {
          closePreview();
        }
      }
    }
  }, [
    messages,
    isPreviewOpen,
    activeMessageId,
    setComponentCards,
    closePreview,
  ]);

  useEffect(() => {
    setChat(aiState);
  }, [aiState]);

  if (!isMounted) {
    return messages.length > 0 ? (
      <ChatListSkeleton />
    ) : (
      <div className="relative flex h-full items-center justify-center">
        <EmptyScreenBackground />
        <div className="z-20 h-full w-full md:max-w-2xl md:px-4">
          <EmptyScreen />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col">
      {messages.length ? (
        <>
          <ChatHeader />
          <ScrollArea className="flex-grow" ref={scrollRef}>
            <div className="md:mx-auto md:max-w-2xl">
              <div
                className={cn(
                  "mb-6 min-h-full w-full px-4 pt-4 md:px-0 md:pt-10",
                  className,
                )}
                ref={messagesRef}
              >
                <ChatList messages={messages} isShared={false} />
                <div className="h-px w-full" ref={visibilityRef} />
              </div>
            </div>
          </ScrollArea>
          <div className="sticky bottom-0 w-full space-y-4 px-5 md:pb-7">
            <PromptForm className="mx-auto max-w-3xl" />
          </div>
        </>
      ) : (
        <div className="relative flex h-full items-center justify-center">
          <EmptyScreenBackground />
          <div className="z-20 h-full w-full md:max-w-2xl md:px-4">
            <EmptyScreen />
          </div>
        </div>
      )}
    </div>
  );
}
