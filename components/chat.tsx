"use client";

import { useEffect, useState } from "react";
import { useAIState, useUIState } from "ai/rsc";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { ChatList } from "@/components/chat-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyScreen from "@/components/empty-screen";
import EmptyScreenBackground from "@/components/empty-screen-background";
import PromptForm from "@/components/prompt-form";

import { AI } from "@/lib/ai/core";
import { useComponentPreview } from "@/lib/hooks/use-component-preview";
import ChatHeader from "@/components/chat-header";
import { toast } from "sonner";
import { ChatListSkeleton } from "@/components/chat-list-skeleton";
import { useAppState } from "@/lib/hooks/use-app-state";
import { generateTitle } from "@/lib/ai/agents/title-generator";

interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
  missingKeys?: string[];
}

export function Chat({ className, missingKeys }: ChatProps) {
  const [aiState] = useAIState<typeof AI>();
  const [messages] = useUIState<typeof AI>();
  const { setChat, setIsGenerating, isGenerating } = useAppState();
  const { isPreviewOpen, activeMessageId, closePreview, setComponentCards } =
    useComponentPreview();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { visibilityRef } = useScrollAnchor();

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
    }
  }, [messages, aiState.id]);

  useEffect(() => {
    if (Array.isArray(messages)) {
      const filteredCards = messages.filter((m) => m.isComponentCard);

      if (isPreviewOpen && activeMessageId) {
        const activeCardExists = filteredCards.some(
          (card) => card.id === activeMessageId,
        );
        console.log("activeCardExists", activeCardExists, filteredCards);

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
    console.log("aiState change", aiState);

    const lastMessage = aiState.messages.at(-1);
    if (lastMessage?.type === "inquiry" || lastMessage?.type === "follow_up") {
      setIsGenerating(false);
    }
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
        <div className="relative flex h-screen max-h-screen flex-col overflow-hidden">
          <ChatHeader />
          {isGenerating ? "Generating" : "Not Generating"}
          <div className="flex flex-1 flex-col overflow-auto">
            <ScrollArea className="h-full w-full overflow-auto pb-32">
              <ChatList messages={messages} isShared={false} />
            </ScrollArea>
            <div className="h-px w-full" ref={visibilityRef} />
          </div>
          <PromptForm className="absolute bottom-5 left-0 right-0 mx-auto max-h-fit w-[95%] max-w-3xl" />
        </div>
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
