import { Chat } from "@/components/chat";
import { getMissingKeys } from "@/lib/actions/chat";
import { AI } from "@/lib/ai/core";
import { generateId } from "ai";

export const runtime = "edge";
export const preferredRegion = "home";

export const metadata = {
  title: "New Chat - Synth UI",
};

export default async function ChatPage() {
  const id = generateId();
  const missingKeys = await getMissingKeys();

  return (
    <AI>
      <Chat id={id} missingKeys={missingKeys} />
    </AI>
  );
}
