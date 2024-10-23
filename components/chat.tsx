"use client";

import { useEffect, useState } from "react";
import { useAIState, useUIState } from "ai/rsc";
import { ChatList } from "@/components/chat-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyScreen from "@/components/empty-screen";
import EmptyScreenBackground from "@/components/empty-screen-background";
import PromptForm from "@/components/prompt-form";
import ChatHeader from "@/components/chat-header";
import { ChatListSkeleton } from "@/components/chat-list-skeleton";

import { AI } from "@/lib/ai/core";
import { useComponentPreview } from "@/lib/hooks/use-component-preview";
import { useAppState } from "@/lib/hooks/use-app-state";
import { useScrollToBottom } from "@/lib/hooks/use-scroll-to-bottom";

import { toast } from "sonner";

interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
  missingKeys?: string[];
}

export function Chat({ missingKeys }: ChatProps) {
  const [aiState] = useAIState<typeof AI>();
  const [messages] = useUIState<typeof AI>();
  const { setChat } = useAppState();
  const { isPreviewOpen, activeMessageId, closePreview } =
    useComponentPreview();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    setIsMounted(true);
    missingKeys?.forEach((key) =>
      toast.error(`Missing ${key} environment variable!`),
    );
  }, [missingKeys]);

  useEffect(() => {
    setChat(aiState);
  }, [aiState]);

  useEffect(() => {
    if (messages.length === 1) {
      window.history.replaceState({}, "", `/chat/${aiState.id}`);
    }
  }, [messages, aiState]);

  useEffect(() => {
    if (Array.isArray(messages)) {
      const filteredCards = messages.filter((m) => m.isComponentCard);
      if (
        isPreviewOpen &&
        activeMessageId &&
        !filteredCards.some((card) => card.id === activeMessageId)
      ) {
        closePreview();
      }
    }
  }, [messages, isPreviewOpen, activeMessageId, closePreview]);

  if (!isMounted) {
    return messages.length > 0 ? (
      <ChatListSkeleton />
    ) : (
      <EmptyScreenWithBackground />
    );
  }

  return (
    <div className="relative flex h-full flex-col">
      {messages.length ? (
        <div className="relative flex h-screen max-h-screen flex-col overflow-hidden">
          <ChatHeader />
          <div
            className="flex flex-1 flex-col overflow-auto"
            ref={messagesContainerRef}
          >
            <ScrollArea className="h-full w-full overflow-auto pb-32">
              <ChatList messages={messages} isShared={false} />
              <div className="h-px w-full" ref={messagesEndRef} />
            </ScrollArea>
          </div>
          <PromptForm className="absolute bottom-5 left-0 right-0 mx-auto max-h-fit w-[95%] max-w-3xl" />
        </div>
      ) : (
        <EmptyScreenWithBackground />
      )}
    </div>
  );
}

function EmptyScreenWithBackground() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <EmptyScreenBackground />
      <div className="z-20 h-full w-full md:max-w-2xl md:px-4">
        <EmptyScreen />
      </div>
    </div>
  );
}
