import { Chat } from "@/components/chat";
import ChatHeader from "@/components/chat-header";
import { getChat, getMissingKeys } from "@/lib/actions/chat";
import { AI, getUIStateFromAIState } from "@/lib/ai/core";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const user = await currentUser();

  if (!user) {
    return {};
  }

  const chat = await getChat(params.id, user.id);

  if (!chat || "error" in chat) {
    redirect("/chat");
  } else {
    let title = chat?.title.toString().slice(0, 50);
    if (!title || title.length === 0) {
      title = "Untitled Chat";
    }

    return {
      title: `${title} - Synth UI`,
    };
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const user = await currentUser();
  const missingKeys = await getMissingKeys();

  if (!user) {
    redirect(`/login?next=/chat/${params.id}`);
  }

  const userId = user.id;
  const chat = await getChat(params.id, userId);

  if (!chat || "error" in chat) {
    redirect("/chat");
  } else {
    if (chat?.userId !== user?.id) {
      notFound();
    }

    const messages = getUIStateFromAIState(chat);

    return (
      <AI initialAIState={chat} initialUIState={messages}>
        <Chat id={params.id} missingKeys={missingKeys} />
      </AI>
    );
  }
}
