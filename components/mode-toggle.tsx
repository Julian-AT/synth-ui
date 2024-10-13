"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon02Icon, Sun02Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";

export function ModeToggle({ children }: { children?: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  const [isClient, setIsClient] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <Button
        variant="ghost"
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
        className="flex w-full items-center justify-start gap-2 px-3"
      >
        {theme === "light" && (
          <motion.div
            key={theme}
            initial={{
              x: 40,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <Sun02Icon className="h-4 w-4 flex-shrink-0 text-neutral-700 dark:text-neutral-500" />
          </motion.div>
        )}

        {theme === "dark" && (
          <motion.div
            key={theme}
            initial={{
              x: 40,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              ease: "easeOut",
              duration: 0.3,
            }}
          >
            <Moon02Icon className="h-4 w-4 flex-shrink-0 text-neutral-700 dark:text-neutral-500" />
          </motion.div>
        )}

        <span className="sr-only">Toggle theme</span>
        {children}
      </Button>
    )
  );
}
