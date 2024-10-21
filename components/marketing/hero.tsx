"use client";

import Balancer from "react-wrap-balancer";
import { Button } from "@/components/marketing/button";
import { Badge } from "@/components/marketing/badge";
import { motion } from "framer-motion";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowRight02Icon, GithubIcon } from "hugeicons-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Suspense, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";
import PulsatingButton from "../ui/pulsating-button";

export const Hero = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden pt-20 md:pt-40">
      <motion.div
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
        }}
        className="flex justify-center"
      >
        <Link href={process.env.NEXT_PUBLIC_GITHUB_URL!}>
          <Badge>
            <div className="flex items-center gap-1.5">
              <GithubIcon className="h-4 w-4" />
              <span>Proudly Open Source</span>
            </div>
          </Badge>
        </Link>
      </motion.div>
      <motion.h1
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
        }}
        className="relative z-10 mx-auto mt-6 max-w-6xl text-center text-4xl font-semibold sm:text-6xl lg:text-8xl"
      >
        <Balancer>Generate & Ship UI with minimal effort</Balancer>
      </motion.h1>
      <motion.p
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0.2,
        }}
        className="relative z-10 mx-auto mt-6 max-w-3xl text-center text-base text-muted-foreground md:text-xl"
      >
        <Balancer>
          Synth UI allows you to generate User-Interfaces without writing a
          single line of code.
        </Balancer>
      </motion.p>
      <motion.div
        initial={{
          y: 80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0.4,
        }}
        className="relative z-10 mt-6 flex items-center justify-center gap-4"
      >
        <Button as={Link} href="/chat">
          Get Started
        </Button>
        <Button
          variant="simple"
          as={Link}
          href={process.env.NEXT_PUBLIC_GITHUB_URL!}
          className="group flex items-center space-x-1"
        >
          <span>Source Code</span>
          <ArrowRight02Icon className="h-4 w-4 text-secondary-foreground transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </motion.div>
      <div className="relative mt-20 rounded-[32px] border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full scale-[1.1] bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black" />
        <div className="relative rounded-[24px] border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black">
          {isMounted && (
            <Dialog>
              <DialogTrigger>
                <>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full scale-[1.1] bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black" />
                  <Suspense
                    fallback={
                      <Skeleton className="h-full w-full rounded-[20px]" />
                    }
                  >
                    <Image
                      src={
                        theme === "dark"
                          ? "/assets/content/header_dark.png"
                          : "/assets/content/header_light.png"
                      }
                      priority
                      loading="eager"
                      unoptimized
                      alt="header"
                      width={1920}
                      height={1080}
                      className="rounded-[28px] bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black"
                    />
                  </Suspense>
                  <motion.div
                    initial={{
                      y: 40,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      ease: "easeOut",
                      duration: 0.5,
                      delay: 0.1,
                    }}
                  >
                    <PulsatingButton
                      className="absolute bottom-0 left-0 right-0 mx-auto h-fit w-fit rounded-xl border border-border bg-background text-secondary-foreground dark:bg-background dark:text-secondary-foreground md:bottom-24"
                      pulseColor={theme === "dark" ? "#272727" : "#efefef"}
                    >
                      <span>Watch Video - 00:28</span>
                    </PulsatingButton>
                  </motion.div>
                </>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-1">
                <video
                  width="1920"
                  height="1080"
                  preload="none"
                  className="rounded-lg"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="/assets/videos/synth_ui_clip1.mp4"
                    type="video/mp4"
                  />
                </video>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};
