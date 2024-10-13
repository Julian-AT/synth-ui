"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loading03Icon, PencilEdit01Icon, Tick02Icon } from "hugeicons-react";
import { renameChat } from "@/lib/actions/chat";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAppState } from "@/lib/hooks/use-app-state";

export default function ChatRenameDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chat, setChatName } = useAppState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>(chat?.title || "");
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  if (!chat) {
    return null;
  }

  const { id } = chat;

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await renameChat(id, name);
    if (!res || !res.success || "error" in res) {
      setError(res.error || "An error occurred while renaming the chat");
    }

    setError(null);
    setHasChanged(true);
    setIsLoading(false);
    setChatName(name);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Rename Chat</DialogTitle>
        <DialogDescription></DialogDescription>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="Chat Name"
        />
        {error && (
          <DialogFooter>
            <span className="text-sm text-red-500">{error}</span>
          </DialogFooter>
        )}
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="flex gap-1.5"
          >
            {isLoading ? (
              <Loading03Icon className="h-5 w-5 animate-spin" />
            ) : hasChanged ? (
              <Tick02Icon className="h-5 w-5" />
            ) : (
              <PencilEdit01Icon className="h-5 w-5" />
            )}
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
