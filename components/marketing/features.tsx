import React from "react";
import { cn } from "@/lib/utils";
import {
  GridLineHorizontal,
  GridLineVertical,
} from "@/components/marketing/grid-lines";
import { SkeletonOne } from "@/components/marketing/skeletons/first";
import { SkeletonTwo } from "@/components/marketing/skeletons/second";
import { SkeletonFour } from "@/components/marketing/skeletons/fourth";
import { SkeletonThree } from "@/components/marketing/skeletons/third";

export const Features = () => {
  const features = [
    {
      title: "Generate User Interfaces with plain text",
      description:
        "Describe your UI in plain text and let the AI generate efficient, reusable, and customizable React Code.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 md:col-span-4 border-b border-r dark:border-neutral-800",
    },
    {
      title: "Speak to Synth UI like to a Senior Developer",
      description:
        "Synth UI is designed to be a senior developer. It can help you with complex logic, design, and even write unit tests and documentation.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 md:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Synth UI supports almost all LLMs",
      description:
        "Wether it's OpenAI, GroQ or Your own custom LLM, we support (almost) everything.",
      skeleton: <SkeletonThree />,
      className: "col-span-1 md:col-span-3 border-r dark:border-neutral-800",
    },
    {
      title: "Make use of established UI libraries",
      description:
        "Synth UI is designed to work with existing design systems. By default, Synth UI uses Shadcn/UI and TailwindCSS, but you can use any other library or custom components.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 md:col-span-3",
    },
  ];
  return (
    <div className="relative z-20 py-10 md:py-40" id="features">
      <h2 className="text-center text-4xl font-bold">Synth UI Features</h2>
      <p className="text-center text-sm text-muted-foreground">
        Synth UI makes it easy to generate and ship UI with minimal effort.
      </p>

      <div className="relative">
        <div className="mt-12 grid grid-cols-1 dark:bg-background md:grid-cols-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
        <GridLineHorizontal
          style={{
            top: 0,
            left: "-10%",
            width: "120%",
          }}
        />

        <GridLineHorizontal
          style={{
            bottom: 0,
            left: "-10%",
            width: "120%",
          }}
        />

        <GridLineVertical
          style={{
            top: "-10%",
            right: 0,
            height: "120%",
          }}
        />
        <GridLineVertical
          style={{
            top: "-10%",
            left: 0,
            height: "120%",
          }}
        />
      </div>
    </div>
  );
};

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`relative overflow-hidden p-4 sm:p-8`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return <h3 className="text-left text-2xl font-bold">{children}</h3>;
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return <p className="mx-0 my-2 max-w-sm text-left md:text-sm">{children}</p>;
};
