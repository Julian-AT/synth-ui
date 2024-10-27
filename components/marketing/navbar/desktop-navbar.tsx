"use client";

import { useCallback, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/marketing/button";
import { NavBarItem } from "@/components/marketing/navbar/navbar-item";
import { ModeToggle } from "@/components/mode-toggle";
import { GithubIcon } from "hugeicons-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface NavItem {
  icon?: React.ReactNode;
  link: string;
  title: string;
  target?: "_blank";
}

type Props = {
  navItems: NavItem[];
};

export const DesktopNavbar = ({ navItems }: Props) => {
  const { scrollY } = useScroll();
  const [showBackground, setShowBackground] = useState<boolean>(false);

  const handleScroll = useCallback((value: number) => {
    setShowBackground(value > 100);
  }, []);

  useMotionValueEvent(scrollY, "change", handleScroll);

  return (
    <div
      className={cn(
        "relative flex w-full justify-between rounded-full bg-transparent px-4 py-2 transition duration-200",
        showBackground && "border bg-background dark:bg-neutral-900",
      )}
    >
      <AnimatePresence>
        {showBackground && (
          <motion.div
            key="background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0 h-full w-full rounded-full bg-neutral-100 [mask-image:linear-gradient(to_bottom,white,transparent,white)] dark:bg-neutral-800"
          />
        )}
      </AnimatePresence>
      <div className="flex flex-row items-center gap-2">
        <div className="flex items-center gap-1.5">
          <Logo className="h-6 w-6" />
          <span className="font-semibold">Synth UI</span>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map((item, index) => (
            <div key={item.title} className="flex items-center gap-1.5">
              <NavBarItem
                href={item.link}
                target={item.target}
                className="flex items-center gap-1.5 px-3"
              >
                {item.icon}
                {item.title}
              </NavBarItem>
              {index !== navItems.length - 1 && (
                <Separator orientation="vertical" className="h-4" />
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <Button
          as={Link}
          href={process.env.NEXT_PUBLIC_GITHUB_URL!}
          variant="simple"
          className="flex items-center gap-1.5"
        >
          <GithubIcon className="h-4 w-4" />
          Github
        </Button>
        <SignedIn>
          <Link href="/chat" prefetch={false}>
            <Button>Chat</Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <Button as={Link} href="/chat" prefetch={false}>
            Login
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};
