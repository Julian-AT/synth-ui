import { cn } from "@/lib/utils";

import {
  SourceCodeIcon,
  Dollar01Icon,
  TradeUpIcon,
  CloudIcon,
  Compass01Icon,
  HelpCircleIcon,
  SquareLock01Icon,
  FavouriteIcon,
} from "hugeicons-react";

export const GridFeatures = () => {
  const features = [
    {
      title: "Built for developers",
      description: "Built for engineers, developers, dreamers...",
      icon: <SourceCodeIcon />,
    },
    {
      title: "Ease of use",
      description: "It's as easy as writing down your design dreams.",
      icon: <TradeUpIcon />,
    },
    {
      title: "Pricing like no other",
      description: "Open source, free forever. No strings attached.",
      icon: <Dollar01Icon />,
    },
    {
      title: "Cloud Native",
      description: "Built for the cloud, run anywhere.",
      icon: <CloudIcon />,
    },
    {
      title: "Multi-tenant Architecture",
      description: "Run multiple requests in parallel with only a single API.",
      icon: <Compass01Icon />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "Synth UI support is available 24/7. Atleast our AI Agents are.",
      icon: <HelpCircleIcon />,
    },
    {
      title: "Secure by default",
      description: "Bring along your own LLM, Databases, Proxies etc.",
      icon: <SquareLock01Icon />,
    },
    {
      title: "And everything else",
      description:
        "Synth UI's infrastructure is built for scalability and reliability.",
      icon: <FavouriteIcon />,
    },
  ];
  return (
    <div className="relative z-10 grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
};

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col py-10 dark:border-neutral-800 lg:border-r",
        (index === 0 || index === 4) && "dark:border-neutral-800 lg:border-l",
        index < 4 && "dark:border-neutral-800 lg:border-b",
      )}
    >
      {index < 4 && (
        <div className="group pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 4 && (
        <div className="group pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover:opacity-100 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10">{icon}</div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 rounded-br-full rounded-tr-full bg-neutral-300 transition duration-200 group-hover:bg-blue-500 dark:bg-neutral-700" />
        <span className="inline-block transition duration-200 group-hover:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 mx-auto max-w-xs px-10 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
