import { TooltipButton } from "@/components/tooltip-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Delete02Icon,
  Edit02Icon,
  MoreHorizontalIcon,
  SentIcon,
} from "hugeicons-react";
import ChatRenameDialog from "@/components/chat-rename-dialog";
import { ChatShareDialog } from "@/components/chat-share-dialog";

export function ChatDropdown({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TooltipButton
          variant="ghost"
          tooltip="More"
          size={"icon"}
          className={className}
        >
          <MoreHorizontalIcon />
        </TooltipButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4 text-xl">
        <DropdownMenuItem asChild>
          <div className="flex cursor-pointer items-center gap-3 pr-12">
            <ChatShareDialog>
              <ChatRenameDialog>
                <div className="flex items-center gap-3">
                  <SentIcon className="w-4 text-muted-foreground" />
                  <span>Share Chat</span>
                </div>
              </ChatRenameDialog>
            </ChatShareDialog>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div className="flex cursor-pointer items-center gap-3 pr-12">
            <ChatRenameDialog>
              <div className="flex items-center gap-3">
                <Edit02Icon className="w-4 text-muted-foreground" />
                <span>Rename Chats</span>
              </div>
            </ChatRenameDialog>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div className="flex cursor-pointer items-center gap-3 pr-12 text-rose-600 focus:bg-rose-400/10 focus:text-rose-600">
            <Delete02Icon className="w-4" />
            <span>Delete Chat</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
