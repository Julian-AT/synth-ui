"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ComponentEditorPreviewHeader from "@/components/component-editor-preview-header";
import ComponentEditorPreview from "@/components/component-editor-preview";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { useComponentPreview } from "@/lib/hooks/use-component-preview";
import { useEffect, useState } from "react";

export default function ComponentPreviewPanel() {
  const { isPreviewOpen, previewTitle, closePreview } = useComponentPreview();
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isPreviewOpen || !isMounted) return null;

  return (
    <>
      <ResizableHandle className="h-full min-h-screen bg-secondary" />
      <ResizablePanel
        minSize={33}
        defaultSize={100}
        className="flex h-full max-h-screen flex-col overflow-hidden"
      >
        <ComponentEditorPreviewHeader title={previewTitle} />
        <ComponentEditorPreview />
      </ResizablePanel>
    </>
  );

  return (
    <div className="h-full max-h-screen overflow-hidden">
      {width >= 1280 ? (
        <div className="flex h-full max-h-screen bg-red-500">
          <ResizableHandle className="h-full min-h-screen bg-secondary" />
          <ResizablePanel
            defaultSize={100}
            minSize={50}
            className="flex h-full max-h-screen flex-col overflow-hidden"
          >
            <ComponentEditorPreviewHeader title={previewTitle} />
            <ComponentEditorPreview />
          </ResizablePanel>
        </div>
      ) : (
        <Drawer
          open={isPreviewOpen}
          autoFocus
          onOpenChange={(o) => (!o ? closePreview() : null)}
        >
          <DrawerContent className="h-full max-h-[90%]">
            <ComponentEditorPreviewHeader title={previewTitle} />
            <ComponentEditorPreview />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
