import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { getSharedChat } from "@/lib/actions/chat";
import { ChatList } from "@/components/chat-list";
import { AI, UIState, getUIStateFromAIState } from "@/lib/ai/core";
import { Badge } from "@/components/ui/badge";
import { clerkClient } from "@clerk/nextjs/server";

export const runtime = "edge";
export const preferredRegion = "home";

interface SharePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const chat = await getSharedChat(params.id);

  return {
    title: (chat?.title.slice(0, 50) ?? "Untitled") + " - Shared - Synth UI",
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id);

  if (!chat || !chat?.sharePath) {
    notFound();
  }

  const uiState: UIState = getUIStateFromAIState(chat);

  return (
    <>
      <div className="max-h-screen min-h-screen space-y-6 overflow-hidden border-r">
        <div className="border-b bg-background px-4 py-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="space-y-1 md:-mx-8">
              <h1 className="text-2xl font-bold">{chat.title}</h1>
              <div className="text-sm text-muted-foreground">
                {formatDate(chat.createdAt)} · {chat.messages.length} messages
              </div>
            </div>
          </div>
        </div>
        <AI initialAIState={chat} initialUIState={uiState}>
          <ChatList messages={uiState} isShared={true} />
        </AI>
        {/* <Badge className="absolute bottom-2 left-2 border bg-secondary text-secondary-foreground"> */}
        {/* Shared by {chat.userId} */}
        {/* </Badge> */}
      </div>
    </>
  );
}
