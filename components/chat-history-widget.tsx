"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import debounce from "debounce";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Clock04Icon, MessageSearch01Icon } from "hugeicons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ChatPublicBadge } from "@/components/chat-public-badge";
import { useChatStore } from "@/lib/stores/chatStore";
import { useUser } from "@clerk/nextjs";

const searchFormSchema = z.object({
  query: z.string().min(0),
});

export default function ChatHistoryWidget() {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { chats, fetchChats } = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (chats) {
      setIsLoading(false);
    }
  }, [chats]);

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
    },
  });

  const filteredChats = useMemo(() => {
    if (!chats) return [];

    const lowercaseQuery = query.toLowerCase();
    return chats.filter((chat) => {
      const title = chat.title?.toLowerCase() || "";
      const description =
        chat.messages
          .filter(
            (message) =>
              message.role === "assistant" &&
              typeof message.content === "string",
          )
          .at(-1)
          ?.content.toString()
          .toLowerCase() || "";
      return (
        title.includes(lowercaseQuery) || description.includes(lowercaseQuery)
      );
    });
  }, [chats, query]);

  const debouncedHandleSearchChange = useCallback(
    (value: string) => {
      const debouncedSetQuery = debounce((v: string) => setQuery(v), 300);
      debouncedSetQuery(value);
    },
    [setQuery],
  );

  return (
    <Popover
      onOpenChange={(open) => {
        if (open && user && !chats) {
          setIsLoading(true);
          fetchChats(user.id);
        }
      }}
    >
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
        <Form {...form}>
          <form className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Search for a chat"
                        className="my-1 border-none pl-10 text-sm shadow-none focus-visible:ring-0"
                        autoComplete="off"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debouncedHandleSearchChange(e.target.value);
                        }}
                      />
                      <MessageSearch01Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 p-0.5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <Separator />
                </div>
              )}
            />

            {isLoading ? (
              <div className="flex max-h-60 flex-col gap-0 overflow-x-hidden px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-2 p-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : filteredChats.length > 0 ? (
              <div className="flex max-h-60 flex-col gap-0 overflow-x-hidden px-2">
                {filteredChats.map((chat) => (
                  <Link href={`/chat/${chat.id}`} key={chat.id}>
                    <div className="rounded-lg p-2 hover:bg-muted">
                      <h3 className="flex gap-0.5">
                        <p className="truncate font-semibold">{chat.title}</p>
                        <ChatPublicBadge
                          className="p-0.5"
                          isPublic={chat.sharePath !== undefined}
                        />
                      </h3>
                      <p className="truncate text-sm text-muted-foreground">
                        {chat.messages
                          .filter(
                            (message) =>
                              message.role === "assistant" &&
                              typeof message.content === "string",
                          )
                          .at(-1)
                          ?.content.toString() || "No description"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                No chats found
              </div>
            )}
            <Link
              href="/chat/history"
              className={cn(buttonVariants({ variant: "outline" }), "m-2")}
            >
              View All Chats
            </Link>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
