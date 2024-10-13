import { currentUser } from "@clerk/nextjs/server";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Clock04Icon } from "hugeicons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChatHistoryWidgetForm from "@/components/chat-history-widget-form";
import { getChats } from "@/lib/actions/chat";

export default async function ChatHistory() {
  const user = await currentUser();
  if (!user) return null;

  const chats = await getChats(user.id);

  if (!chats || "error" in chats) {
    return null;
  }

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Clock04Icon className="h-full w-full p-2" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side={"right"} className={"ml-4"}>
          <p>Chat History</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent
        side="right"
        className="mb-3 ml-5 mt-[calc(35%)] w-80 rounded-xl p-0 text-base"
      >
        <ChatHistoryWidgetForm chats={chats} />
      </PopoverContent>
    </Popover>
  );
}
