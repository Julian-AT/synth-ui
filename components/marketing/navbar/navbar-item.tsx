import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  href: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
  target?: "_blank";
};

export function NavBarItem({
  children,
  href,
  active,
  target,
  className,
}: Props) {
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-sm font-normal text-muted-foreground",
          className,
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "link" }),
        "text-sm font-normal text-muted-foreground",
        className,
      )}
      target={target}
    >
      {children}
    </Link>
  );
}
