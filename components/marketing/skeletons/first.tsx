"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/logo";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

export const SkeletonOne = () => {
  return (
    <div className="relative flex h-full gap-10 p-8">
      <div className="group mx-auto h-full w-full bg-white p-5 shadow-2xl dark:bg-neutral-900 md:w-[90%]">
        <div className="flex h-full w-full flex-1 flex-col space-y-2 opacity-20 dark:opacity-60">
          <UserMessage>
            Hey! I want to make a landing page for a side project of mine
          </UserMessage>
          <AIMessage>
            Certainly, I&apos;m here to help you with that. What category does
            your side project fall under?
          </AIMessage>
          <UserMessage>
            My side project is a blog about AI. I write about AI and how it
            affects our lives.
          </UserMessage>
          <AIMessage>
            Sure, I can help you with that. What design do you want the website
            to have?
          </AIMessage>
          <UserMessage>
            It should be a simple, modern and sleek design. I want it to be
            minimalistic and modern
          </UserMessage>
          <AIMessage>
            I&apos;ll generate a design for you. Please give me a moment.
          </AIMessage>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col gap-4">
        <div className="r z-20 mx-auto h-[250px] w-[250px] flex-shrink-0 rounded-[32px] border border-neutral-200 bg-neutral-100 p-2 transition duration-200 group-hover:scale-[1.02] dark:border-neutral-700 dark:bg-neutral-800 md:h-[300px] md:w-[300px]">
          <div className="h-full flex-shrink-0 rounded-[24px] border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-background">
            <Card
              className="max-w-xs rounded-[32px] border-none shadow-none"
              x-chunk="charts-01-chunk-2"
            >
              <CardHeader>
                <CardTitle>Productivity</CardTitle>
                <CardDescription className="hidden md:block">
                  Approximate number of lines of code written within a month
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid auto-rows-min gap-2">
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    20k
                    <span className="text-sm font-normal text-muted-foreground">
                      with Synth UI
                    </span>
                  </div>
                  <ChartContainer
                    config={{
                      steps: {
                        label: "Lines of Code",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="aspect-auto h-[32px] w-full"
                  >
                    <BarChart
                      accessibilityLayer
                      layout="vertical"
                      margin={{
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                      }}
                      data={[
                        {
                          value: "Synth UI",
                          steps: 100,
                        },
                      ]}
                    >
                      <Bar dataKey="steps" radius={4} barSize={32}>
                        <LabelList
                          position="insideLeft"
                          dataKey="value"
                          offset={8}
                          fontSize={12}
                          fill="white"
                        />
                      </Bar>
                      <YAxis
                        dataKey="value"
                        type="category"
                        tickCount={1}
                        hide
                      />
                      <XAxis dataKey="steps" type="number" hide />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="grid auto-rows-min gap-2">
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    7.5k
                    <span className="text-sm font-normal text-muted-foreground">
                      by hand
                    </span>
                  </div>
                  <ChartContainer
                    config={{
                      steps: {
                        label: "Lines of Code",
                        color: "hsl(var(--muted))",
                      },
                    }}
                    className="aspect-auto h-[32px] w-full"
                  >
                    <BarChart
                      accessibilityLayer
                      layout="vertical"
                      margin={{
                        left: 0,
                        top: 0,
                        right: 128,
                        bottom: 0,
                      }}
                      data={[
                        {
                          value: "Developer",
                          steps: 20,
                        },
                      ]}
                    >
                      <Bar
                        dataKey="steps"
                        fill="hsl(var(--secondary))"
                        radius={4}
                        barSize={32}
                      >
                        <LabelList
                          position="insideLeft"
                          dataKey="value"
                          offset={8}
                          fontSize={12}
                          fill="hsl(var(--secondary-foreground))"
                        />
                      </Bar>
                      <YAxis
                        dataKey="value"
                        type="category"
                        tickCount={1}
                        hide
                      />
                      <XAxis dataKey="steps" type="number" hide />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="r z-20 mx-auto h-96 w-[250px] flex-shrink-0 rounded-[32px] border border-neutral-200 bg-neutral-100 p-2 transition duration-200 group-hover:scale-[1.02] dark:border-neutral-700 dark:bg-neutral-800 md:h-[300px] md:w-[300px]">
          <div className="h-full flex-shrink-0 rounded-[24px] border border-neutral-200 bg-white py-6 dark:border-neutral-700 dark:bg-background">
            <span className="flex flex-col items-center justify-center text-center text-muted-foreground">
              Time saved with
              <b>Synth UI</b>
            </span>
            <ChartContainer
              config={{
                time: {
                  label: "Time",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <AreaChart
                accessibilityLayer
                data={[
                  {
                    date: "2024-01-01",
                    time: 8.5,
                  },
                  {
                    date: "2024-01-02",
                    time: 7.2,
                  },
                  {
                    date: "2024-01-03",
                    time: 8.1,
                  },
                  {
                    date: "2024-01-04",
                    time: 6.2,
                  },
                  {
                    date: "2024-01-05",
                    time: 5.2,
                  },
                  {
                    date: "2024-01-06",
                    time: 8.1,
                  },
                  {
                    date: "2024-01-07",
                    time: 7.0,
                  },
                ]}
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="date" hide />
                <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                <defs>
                  <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--muted-foreground))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="time"
                  type="natural"
                  fill="url(#fillTime)"
                  fillOpacity={0.4}
                  stroke="var(--color-time)"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value: any) => (
                    <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                      Time saved
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          hr
                        </span>
                      </div>
                    </div>
                  )}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-background dark:via-background" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 w-full bg-gradient-to-b from-white via-transparent to-transparent dark:from-background" />
    </div>
  );
};

const UserMessage = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      className="flex flex-row items-start space-x-2 rounded-2xl bg-white p-2 dark:bg-neutral-900"
    >
      <Image
        src="/assets/avatars/julian.avif"
        alt="avatar"
        height="100"
        width="100"
        className="h-6 w-6 rounded-full"
      />
      <p className="text-[10px] text-neutral-500 sm:text-sm">{children}</p>
    </motion.div>
  );
};

const AIMessage = ({ children }: { children: React.ReactNode }) => {
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <motion.div
      variants={variantsSecond}
      className="flex flex-row items-center justify-start space-x-2 rounded-2xl bg-white p-2 dark:bg-neutral-900"
    >
      <Logo className="h-6 w-6 rounded-full bg-secondary" />
      <p className="text-[10px] text-neutral-500 sm:text-sm">{children}</p>
    </motion.div>
  );
};
