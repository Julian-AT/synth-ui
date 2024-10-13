"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontalIcon, PlusSignIcon } from "hugeicons-react";

export const SkeletonThree = () => {
  return (
    <div className="group mx-auto mt-10 h-full w-full rounded-md border bg-white shadow-2xl dark:bg-background dark:shadow-white/40 sm:w-[80%]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[11] h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-background dark:via-background" />

      <div className="flex h-full w-full flex-1 flex-col space-y-2">
        <div className="flex justify-between border-b p-4 pb-2 dark:border-neutral-700">
          <p className="text-sm font-bold text-muted-foreground">Add LLM</p>
          <p className="flex flex-shrink-0 cursor-pointer items-center space-x-1 rounded-md border px-2 py-1 text-sm text-muted-foreground hover:bg-secondary">
            <PlusSignIcon className="h-4 w-4 text-muted-foreground" />{" "}
            <span>Add</span>
          </p>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <Row title="Groq LLM" updatedAt="23rd March" />
          <Row title="OpenAI GPT0" updatedAt="21st March" active />
          <Row title="Stable DIffusion" updatedAt="3rd May" />
          <Row title="Llama 2" updatedAt="1st April" active />
          <Row title="Claude 200k" updatedAt="2nd June" active />
        </div>
      </div>
    </div>
  );
};

export const Row = ({
  title,
  updatedAt,
  active = false,
}: {
  title: string;
  updatedAt: string;
  active?: boolean;
}) => {
  const [checked, setChecked] = useState<boolean>(active);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <p className="rounded-md border bg-background px-1 py-0.5 text-xs text-muted-foreground shadow-md">
          {title}
        </p>
        <p className="text-xs text-muted-foreground">{updatedAt}</p>
      </div>
      <div className="flex items-center space-x-1">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <MoreHorizontalIcon className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};
