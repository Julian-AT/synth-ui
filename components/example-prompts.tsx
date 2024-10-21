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
    prompt:
      "Design a professional pricing section for a SaaS platform. Include three tiered plan cards, a monthly/yearly toggle (yearly at 10x monthly rate), and ensure each plan features a title, price, concise description, feature list, and call-to-action button.",
  },
  {
    label: "An Ecommerce Dashboard",
    prompt:
      "Create a comprehensive e-commerce dashboard. Include key metrics like total sales, average order value, and conversion rate. Design widgets for recent orders, top-selling products, and customer demographics. Add a customizable calendar selector widget.",
  },
  {
    label: "A Hero Section",
    prompt:
      "Design an engaging hero section for 'Synth UI' website. Include a catchy headline that highlights the product's unique value proposition, a subheadline explaining key benefits, and a prominent call-to-action button. ",
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
