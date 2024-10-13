"use client";

import {
  Menu01Icon,
  SentIcon,
  SquareLock02Icon,
  SquareUnlock02Icon,
} from "hugeicons-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import { TooltipButton } from "@/components/tooltip-button";
import { ChatShareDialog } from "@/components/chat-share-dialog";
import { ChatDropdown } from "@/components/chat-dropdown";
import { useAppState } from "@/lib/hooks/use-app-state";
import { usePathname } from "next/navigation";
import ChatRenameDialog from "./chat-rename-dialog";

export default function ChatHeader() {
  const pathname = usePathname();
  const { chat } = useAppState();
  const { open, setOpen } = useSidebar();

  console.log("detected change in chat", chat?.id, chat?.sharePath);

  console.log("pathname", pathname);
  console.log("chat.path", chat?.path);

  if (!chat || pathname !== chat.path) {
    return null;
  }

  return (
    <header className="flex justify-between px-5 py-2">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <Menu01Icon />
        </Button>

        <div className="flex items-center gap-1.5">
          <ChatRenameDialog>
            <span className="cursor-pointer hover:underline">{chat.title}</span>
          </ChatRenameDialog>
          <ChatShareDialog>
            {chat.sharePath ? (
              <Tooltip>
                <TooltipTrigger>
                  <SquareUnlock02Icon className="w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This chat is public</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger>
                  <SquareLock02Icon className="w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This chat is private</p>
                </TooltipContent>
              </Tooltip>
            )}
          </ChatShareDialog>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ChatShareDialog>
          <TooltipButton variant="ghost" tooltip="Share" size={"icon"}>
            <SentIcon />
          </TooltipButton>
        </ChatShareDialog>
        <ChatDropdown />
      </div>
    </header>
  );
}
