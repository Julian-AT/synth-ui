"use client";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { Button } from "@/components/marketing/button";
import Logo from "@/components/logo";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { Menu01Icon, Cancel01Icon, GithubIcon } from "hugeicons-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

export const MobileNavbar = ({ navItems }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);

    if (latest > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });

  return (
    <motion.div
      className={cn(
        "flex h-full w-full items-center justify-between p-3 transition duration-200",
        showBackground &&
          "bg-neutral-50 shadow-[0px_-2px_0px_0px_var(--neutral-100),0px_2px_0px_0px_var(--neutral-100)] dark:bg-neutral-900 dark:shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]",
      )}
    >
      <Logo className="h-6 w-6" />
      <Menu01Icon
        className="h-6 w-6 text-black dark:text-white"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col items-start justify-start space-y-10 bg-white pt-5 text-xl text-zinc-600 transition duration-200 hover:text-zinc-800 dark:bg-black"
        >
          <div className="flex w-full items-center justify-between px-5">
            <Logo />
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <Cancel01Icon
                className="h-8 w-8 text-black dark:text-white"
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-[14px] px-8">
            {navItems.map((navItem: any, idx: number) => (
              <>
                {navItem.children && navItem.children.length > 0 ? (
                  <>
                    {navItem.children.map((childNavItem: any, idx: number) => (
                      <Link
                        key={`link=${idx}`}
                        href={childNavItem.link}
                        onClick={() => setOpen(false)}
                        className="relative max-w-[15rem] text-left text-2xl"
                      >
                        <span className="block text-black">
                          {childNavItem.title}
                        </span>
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    key={`link=${idx}`}
                    href={navItem.link}
                    onClick={() => setOpen(false)}
                    className="relative"
                  >
                    <span className="flex items-center gap-1.5 text-xl text-black dark:text-white">
                      <div className="flex items-center justify-center">
                        {navItem.icon}
                      </div>
                      {navItem.title}
                    </span>
                  </Link>
                )}
              </>
            ))}
          </div>
          <div className="flex w-full flex-row items-start gap-2.5 px-8 py-4">
            <SignedIn>
              <Button as={Link} href="/chat">
                Dashboard
              </Button>
            </SignedIn>
            <SignedOut>
              <Button as={Link} href="/chat">
                Login
              </Button>
            </SignedOut>
            <Button
              as={Link}
              href={process.env.NEXT_PUBLIC_GITHUB_URL!}
              variant="simple"
              className="flex items-center gap-1.5"
            >
              <GithubIcon className="h-4 w-4" />
              Github
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
