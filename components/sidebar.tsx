import {
  Sidebar as AceternitySidebar,
  SidebarBody,
} from "@/components/ui/sidebar";
import { PlusSignIcon, GithubIcon } from "hugeicons-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserPanel from "@/components/user-panel";
import Logo from "@/components/logo";
import ChatHistory from "@/components/chat-history-widget";

export default function Sidebar() {
  return (
    <AceternitySidebar animate={false}>
      <SidebarBody className="h-screen flex-col items-center justify-between gap-6 p-3 md:flex">
        <div className="flex w-full flex-col items-center gap-6">
          <Logo className="h-full w-full p-1" />
          <div className="flex w-full flex-col gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/chat"}
                  prefetch={false}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "flex aspect-square items-center justify-center rounded-lg border p-2 transition-colors",
                  )}
                >
                  <PlusSignIcon className="h-full w-full" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-4">
                <p>New Chat</p>
              </TooltipContent>
            </Tooltip>
            <ChatHistory />
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "flex aspect-square items-center justify-center rounded-lg p-2 transition-colors",
                  )}
                >
                  <GithubIcon className="h-full w-full" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-4">
                <p>Source Code</p>
              </TooltipContent>
            </Tooltip>
            {/* <ThemeToggle /> */}
          </div>
        </div>
        <UserPanel />
      </SidebarBody>
    </AceternitySidebar>
  );
}
