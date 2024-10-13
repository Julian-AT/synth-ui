"use client";

import { ExamplePrompt } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/lib/ai/core";
import { generateId } from "ai";
import { UserMessage } from "@/components/chat-message";
import { cn } from "@/lib/utils";

const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    label: "A Pricing Section",
    prompt: "Generate a pricing section",
  },
  {
    label: "An Ecommerce Dashboard",
    prompt: "Create a dashboard for an e-commerce website",
  },
  {
    label: "A Hero Section",
    prompt: "Create a hero section for a website called 'Synth UI'",
  },
];

interface ExamplePromptsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ExamplePrompts({ className }: ExamplePromptsProps) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  return (
    <div className={cn("z-20 flex flex-col gap-3 sm:flex-row", className)}>
      {EXAMPLE_PROMPTS.map((p: ExamplePrompt, index: number) => (
        <Button
          key={index}
          variant={"outline"}
          className="rounded-xl py-0"
          onClick={async () => {
            const query = p.prompt;

            setMessages((currentMessages) => [
              ...currentMessages,
              {
                id: generateId(),
                display: <UserMessage>{query}</UserMessage>,
              },
            ]);

            const data = new FormData();
            data.append("input", p.prompt);
            const responseMessage = await submitUserMessage(data);
            setMessages((currentMessages) => [
              ...currentMessages,
              responseMessage,
            ]);
          }}
        >
          <p className="text-sm">{p.label}</p>
          <ArrowUpRight01Icon className="p-0.5" />
        </Button>
      ))}
    </div>
  );
}
