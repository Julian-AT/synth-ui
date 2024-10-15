import { currentUser } from "@clerk/nextjs/server";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Logout02Icon, PaintBucketIcon } from "hugeicons-react";
import { SignOutButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "@/components/user-avatar";
import { ModeToggle } from "@/components/mode-toggle";

export default async function UserPanel() {
  const user = await currentUser();

  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="aspect-square w-full items-center justify-center rounded-lg px-0 py-0"
        >
          <UserAvatar className="rounded-lg" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="mb-3 ml-5 flex flex-col gap-5 rounded-xl"
      >
        <div className="flex flex-col gap-3">
          <Badge className="hover:bg-secondar w-fit rounded-xl border bg-secondary text-secondary-foreground">
            User
          </Badge>
          <span className="text-sm">{user.emailAddresses[0].emailAddress}</span>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <SignOutButton>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 px-2"
            >
              <Logout02Icon className="h-5 w-5 text-muted-foreground" />
              <span>Sign Out</span>
            </Button>
          </SignOutButton>
          <ModeToggle>Toggle Theme</ModeToggle>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <span className="text-center text-sm">
            Synth UI is an
            <Link
              href={process.env.NEXT_PUBLIC_GITHUB_URL!}
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-fit px-1 py-0",
              )}
            >
              open source
            </Link>
            project licensed under MIT
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
