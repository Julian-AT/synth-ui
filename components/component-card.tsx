"use client";

import { ReactIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { useComponentPreview } from "@/lib/hooks/use-component-preview";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { useCallback, useEffect, useState } from "react";
import { StreamableValue } from "ai/rsc";
import { cn } from "@/lib/utils";

export interface ComponentCardProps {
  title?: string;
  fileName?: string;
  icon?: React.ReactNode;
  code: string | StreamableValue<string>;
  messageId: string;
}

export default function ComponentCard({
  title = "Untitled",
  fileName = "untitled.tsx",
  icon = <ReactIcon />,
  code,
  messageId,
}: ComponentCardProps) {
  const {
    isPreviewOpen,
    togglePreview,
    closePreview,
    setPreviewCode,
    activeMessageId,
  } = useComponentPreview();
  const streamedCode = useStreamableText(code);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      console.log(
        "setting first preview",
        messageId,
        streamedCode,
        title,
        fileName,
      );

      togglePreview(messageId, streamedCode, title, fileName);
    }
  }, [isMounted]);

  useEffect(() => {
    setPreviewCode(streamedCode);
  }, [streamedCode, setPreviewCode]);

  const handleClick = useCallback(() => {
    if (isPreviewOpen && activeMessageId === messageId) {
      console.log("closing preview");
      closePreview();
    } else {
      console.log("opening preview");
      togglePreview(messageId, streamedCode, title, fileName);
    }
  }, [
    isPreviewOpen,
    closePreview,
    togglePreview,
    messageId,
    activeMessageId,
    streamedCode,
    title,
    fileName,
  ]);

  if (!isMounted) return null;

  return (
    <div className="ml-8">
      <Button
        variant={"outline"}
        className={cn(
          "my-3 h-[55px] max-h-full w-full justify-start gap-3 rounded-lg bg-background p-1.5 hover:bg-secondary/50 md:w-[400px]",
          isPreviewOpen &&
            activeMessageId === messageId &&
            "ring-1 ring-primary/15",
        )}
        onClick={handleClick}
      >
        <div className="flex h-full items-center justify-center rounded-sm bg-secondary p-2 text-muted-foreground">
          {icon}
        </div>
        <div className="flex flex-col text-left">
          <div className="text-base font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">
            {fileName} · Click to
            {isPreviewOpen ? " close" : " open"}
          </div>
        </div>
      </Button>
    </div>
  );
}
