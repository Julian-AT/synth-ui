"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAvatar({ className, ...props }: UserAvatarProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!user || !isMounted)
    return (
      <div className="flex h-full w-full items-center justify-center rounded-sm border p-0">
        <Skeleton className="h-full w-full" />
      </div>
    );

  return (
    <Avatar
      className={cn("h-full w-full rounded-sm p-0", className)}
      {...props}
    >
      <AvatarImage src={user.imageUrl} />
      <AvatarFallback className="flex items-center justify-center bg-background">
        <span className="sr-only">{user.emailAddresses[0].emailAddress}</span>
        <span className="text-center text-xs capitalize">
          {user.emailAddresses[0].emailAddress[0]}
        </span>
      </AvatarFallback>
    </Avatar>
  );
}
