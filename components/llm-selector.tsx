"use client";

import { LLMSelection } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { ArrowDown01Icon, Forward02Icon, SparklesIcon } from "hugeicons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSettings } from "@/lib/hooks/use-app-settings";

export const llms: LLMItem[] = [
  {
    icon: <Logo className="h-6 w-6" />,
    name: "Quality (SynthUI) [Soon]",
    description: "SynthUI custom model (Experimental)",
    suffix: "(SynthUI/synth-ui-v1)",
    value: "synth-ui-v1",
    highlighted: true,
  },
  {
    icon: <Forward02Icon className="h-6 w-6 text-green-500" />,
    name: "Speed (GPT-4o-mini)",
    description: "High speed, but low accuracy",
    suffix: "(OpenAI/GPT-4o-mini)",
    value: "gpt-4o-mini",
  },
  {
    icon: <SparklesIcon className="h-6 w-6 text-violet-700" />,
    name: "Quality (GPT-4o)",
    description: "High quality generation",
    suffix: "(OpenAI/GPT-4o)",
    value: "gpt-4o",
  },
  {
    icon: <SparklesIcon className="h-6 w-6 text-violet-700" />,
    name: "Quality (Claude)",
    description: "High quality generation",
    suffix: "(Anthropic/claude-3.5-sonnet)",
    value: "claude-3.5-sonnet",
  },
];

interface LLMItem {
  icon: React.ReactNode;
  name: string;
  description: string;
  suffix: string;
  value: LLMSelection;
  highlighted?: boolean;
}

export default function LLMSelector() {
  const { updateSettings, settings } = useAppSettings();
  const [open, setOpen] = useState<boolean>(false);
  const selectedLLM = settings.llm;

  return (
    <Select
      defaultValue={selectedLLM}
      onValueChange={(value) => {
        updateSettings({
          llm: value as LLMSelection,
        });
        toast("Successfully changed LLM", {
          icon: llms.find((llm) => llm.value === value)?.icon,
          description: "LLM changed to " + value,
        });
      }}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger className="border-none px-0 shadow-none">
        <Button variant="list-item" className="justify-between">
          <div className="flex items-center gap-3">
            {llms.find((llm) => llm.value === selectedLLM)?.icon}{" "}
            {llms.find((llm) => llm.value === selectedLLM)?.name}
          </div>
          <motion.div
            animate={{ rotate: open ? -90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowDown01Icon className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </Button>
      </SelectTrigger>
      <SelectContent className="mx-6 rounded-xl text-xl" side="right">
        {llms.map((llm) => (
          <SelectItem
            className="rounded-lg px-2 py-0.5"
            value={llm.value}
            key={llm.value}
            disabled={llm.value === "synth-ui-v1"}
          >
            <div className="flex items-center gap-3 p-1 pr-5">
              {llm.icon}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{llm.name}</span>
                <span className="text-xs text-muted-foreground">
                  {llm.description}
                </span>
                <span className="text-xs text-muted-foreground">
                  {llm.suffix}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
