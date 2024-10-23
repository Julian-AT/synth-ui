import { Suspense } from "react";
import ChatHistorySearchForm from "@/components/chat-history-search-form";
import { getChats } from "@/lib/actions/chat";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatHistorySkeleton } from "@/components/chat-history-skeleton";
import Link from "next/link";
import { BubbleChatSearchIcon } from "hugeicons-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const runtime = "edge";
export const preferredRegion = "home";

async function ChatHistoryContent() {
  const user = await currentUser();

  if (!user) {
    redirect("/chat");
  }

  const chats = await getChats(user.id);

  if (!chats || "error" in chats) {
    return <div>Error retrieving chats</div>;
  }

  return <ChatHistorySearchForm chats={chats} />;
}

export default function HistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full max-h-screen w-full flex-col gap-4 bg-muted p-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Chat History</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  placeholder="Search for a chat..."
                  className="w-[500px] pl-9"
                  disabled
                />
                <BubbleChatSearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <Link
                href="/chat"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                New Chat
              </Link>
            </div>
          </div>
          <ChatHistorySkeleton />
        </div>
      }
    >
      <ChatHistoryContent />
    </Suspense>
  );
}
