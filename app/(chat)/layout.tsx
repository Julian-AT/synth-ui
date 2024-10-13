import ComponentPreviewPanel from "@/components/component-preview-panel";
import Sidebar from "@/components/sidebar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function ChatWrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full max-h-screen overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex h-full min-h-full w-full"
      >
        <ResizablePanel defaultSize={100} minSize={50}>
          {children}
        </ResizablePanel>
        <ComponentPreviewPanel />
      </ResizablePanelGroup>
    </div>
  );
}
