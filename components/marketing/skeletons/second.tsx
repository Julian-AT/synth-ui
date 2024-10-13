"use client";
import { stagger, useAnimate } from "framer-motion";
import React, { useState } from "react";

export const SkeletonTwo = () => {
  const [scope, animate] = useAnimate();
  const [animating, setAnimating] = useState<boolean>(false);

  const handleAnimation = async () => {
    if (animating) return;

    setAnimating(true);
    await animate(
      ".message",
      {
        opacity: [0, 1],
        y: [20, 0],
      },
      {
        delay: stagger(0.5),
      },
    );
    setAnimating(false);
  };
  return (
    <div className="relative mt-4 h-full w-full">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" />
      <div className="z-20 h-full rounded-[32px] border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="h-full rounded-[24px] border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-muted">
          <div className="mx-auto h-6 w-20 rounded-full bg-neutral-200/80 dark:bg-neutral-800/80" />
          <div
            onMouseEnter={handleAnimation}
            ref={scope}
            className="content mx-auto mt-4 w-[90%]"
          >
            <UserMessage>
              Hello Synth UI! Can you help me build a login page?
            </UserMessage>
            <AIMessage>
              Of course! What do you want the login page to look like?
            </AIMessage>
            <UserMessage>
              Umm... I want it to be a simple login page with a username and
              password input field.
            </UserMessage>
            <AIMessage>And what should the submit button do?</AIMessage>
            <UserMessage>
              The submit button should set a loading state and then redirect the
              user to the home page.
            </UserMessage>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="message my-4 rounded-md bg-neutral-100 p-2 text-[10px] text-black dark:bg-neutral-800 dark:text-white sm:p-4 sm:text-xs">
      {children}
    </div>
  );
};
const AIMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="message my-4 rounded-md bg-black p-2 text-[10px] text-white dark:bg-white dark:text-black sm:p-4 sm:text-xs">
      {children}
    </div>
  );
};
