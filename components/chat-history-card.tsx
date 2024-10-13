import { Card } from "@/components/ui/card";
import { ChatPublicBadge } from "@/components/chat-public-badge";
import { Separator } from "@/components/ui/separator";
import { ChatDropdown } from "@/components/chat-dropdown";
import Link from "next/link";
import moment from "moment";
import { Chat } from "@/lib/types";

export default function ChatHistoryCard({
  id,
  title,
  description,
  createdAt,
  sharePath,
  path,
}: Chat) {
  return (
    <Link href={path}>
      <Card className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-1">
          <h3>{title}</h3>
          <ChatPublicBadge
            className="text-muted-foreground"
            isPublic={sharePath !== undefined}
          />
        </div>
        <p className="test-sm line-clamp-2 h-12 text-muted-foreground">
          {description}
        </p>
        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Created {moment(createdAt).fromNow()}
          </p>
          <ChatDropdown />
        </div>
      </Card>
    </Link>
  );
}
