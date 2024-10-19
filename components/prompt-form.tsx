"use client";

import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import Textarea from "react-textarea-autosize";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  ArrowDown01Icon,
  ArrowUp02Icon,
  Attachment01Icon,
  SparklesIcon,
} from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/lib/ai/core";
import { generateId } from "ai";
import { TooltipButton } from "@/components/tooltip-button";
import { UserMessage } from "@/components/chat-message";
import { cn } from "@/lib/utils";
import NotImplementedDialog from "@/components/not-implemented-dialog";
import { useAppState } from "@/lib/hooks/use-app-state";

interface PromptFormProps extends React.HTMLAttributes<HTMLDivElement> {
  query?: string;
}

export default function PromptForm({ query, className }: PromptFormProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [, setMessages] = useUIState<typeof AI>();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { submitUserMessage } = useActions();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isFirstRender = useRef(true);
  const { onKeyDown, formRef } = useEnterSubmit();
  const { setPrompt } = useAppState();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleQuerySubmit(query: string, formData?: FormData) {
    setInput("");
    setIsGenerating(true);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: generateId(),
        display: <UserMessage>{query}</UserMessage>,
      },
    ]);

    // Submit and get response message
    const data = formData || new FormData();
    if (!formData) {
      data.append("input", query);
    }
    setPrompt(query);
    const responseMessage = await submitUserMessage(data);
    console.log("response", responseMessage);
    setMessages((currentMessages) => [...currentMessages, responseMessage]);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("input", input);
    await handleQuerySubmit(input, formData);
  };

  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
      handleQuerySubmit(query);
      isFirstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (query && query.trim().length > 0) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className={cn(
        "md:muted relative flex w-full grow flex-col gap-1 overflow-hidden border-t border-primary/15 bg-background px-2.5 py-2.5 shadow-sm md:rounded-xl md:border",
        className,
      )}
    >
      <Textarea
        ref={inputRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        placeholder="Send a message..."
        className="h-full min-h-12 w-full resize-none bg-transparent shadow-none outline-none focus-within:outline-none focus-visible:ring-0 md:text-sm"
        autoFocus
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        name="message"
        rows={2}
        maxRows={20}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl bg-background p-1"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("append file");
                }}
              >
                {isMounted ? (
                  <NotImplementedDialog>
                    <Attachment01Icon className="p-0.5" />
                    <span className="sr-only">Attach Image</span>
                  </NotImplementedDialog>
                ) : (
                  <Attachment01Icon className="p-0.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Attach Image</TooltipContent>
          </Tooltip>
        </div>
        <TooltipButton
          type="submit"
          disabled={input === "" || isGenerating}
          className="rounded-xl border border-primary/15 disabled:bg-muted disabled:text-secondary-foreground"
          tooltip={"Send Message"}
        >
          <ArrowUp02Icon fontWeight={400} height={20} />
          Send
          <span className="sr-only">Send message</span>
        </TooltipButton>
      </div>
    </form>
  );
}
