import React from "react";
import { cn } from "@/lib/utils";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Globe } from "@/components/marketing/globe";
import Image from "next/image";
export const SkeletonFour = () => {
  return (
    <div className="relative mt-10 flex h-full flex-col items-center bg-white dark:bg-background">
      <InfiniteMovingCards speed="fast" direction="left">
        <MovingGrid />
      </InfiniteMovingCards>
      <InfiniteMovingCards speed="slow" direction="right">
        <MovingGrid />
      </InfiniteMovingCards>
      <InfiniteMovingCards speed="normal" direction="left">
        <MovingGrid />
      </InfiniteMovingCards>

      <Globe className="absolute -bottom-40 -right-2 md:-right-40" />
    </div>
  );
};

const MovingGrid = () => {
  return (
    <div className="relative z-40 mb-4 flex flex-shrink-0 space-x-4">
      <span
        className={cn(
          "flex min-w-24 items-center justify-center space-x-1 rounded-md bg-white px-2 py-1 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-background dark:bg-neutral-900",
        )}
      >
        <Image
          src="/assets/logos/libraries/aceternity.png"
          alt="Aceternity UI"
          width={16}
          height={16}
        />
        <span>Aceternity UI</span>
      </span>
      <span
        className={cn(
          "flex min-w-24 items-center justify-center space-x-1 rounded-md bg-white px-2 py-1 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-neutral-900",
        )}
      >
        <Image
          src="/assets/logos/libraries/next-ui.png"
          alt="NextUI"
          width={16}
          height={16}
        />
        <span>NextUI</span>
      </span>
      <span
        className={cn(
          "flex min-w-24 items-center justify-center space-x-1 rounded-md bg-white px-2 py-1 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-neutral-900",
        )}
      >
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 object-contain"
        >
          <title>file_type_tailwind</title>
          <path
            d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z"
            fill="#44a8b3"
          />
        </svg>
        <span>Tailwind CSS</span>
      </span>
      <span
        className={cn(
          "flex min-w-24 items-center justify-center space-x-1 rounded-md bg-white px-2 py-1 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-neutral-900",
        )}
      >
        <Image
          src="/assets/logos/libraries/framer-motion.png"
          alt="Framer Motion"
          width={16}
          height={16}
        />
        <span>Framer Motion</span>
      </span>
      <span
        className={cn(
          "flex min-w-24 items-center justify-center space-x-1 rounded-md bg-white px-2 py-1 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-neutral-900",
        )}
      >
        <Image
          src="/assets/logos/libraries/magic-ui.png"
          alt="Magic UI"
          width={16}
          height={16}
        />
        <span>Magic UI</span>
      </span>
      <span
        className={cn(
          "flex min-w-24 items-center justify-center space-x-1 rounded-md bg-white px-2 py-1 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-neutral-900",
        )}
      >
        <Image
          src="/assets/logos/libraries/shadcn.png"
          alt="shadcn/ui"
          width={12}
          height={12}
        />
        <span>shadcn/ui</span>
      </span>
    </div>
  );
};
