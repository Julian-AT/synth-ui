"use client";
import React from "react";
import Balancer from "react-wrap-balancer";
import { Button } from "@/components/marketing/button";
import { Link } from "next-view-transitions";

export const CTA = () => {
  return (
    <section className="relative z-30 w-full overflow-hidden py-60">
      <div className="bg-white dark:bg-black">
        <div className="relative z-20 mx-auto w-full bg-gradient-to-br from-slate-800 to-gray-900 dark:from-neutral-900 sm:max-w-[40rem] sm:rounded-2xl md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
          <div className="relative -mx-6 overflow-hidden px-6 sm:mx-0 sm:rounded-2xl md:px-8">
            <div
              className="bg-noise fade-vignette absolute inset-0 h-full w-full opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
              style={{
                backgroundImage: "url(/noise.webp)",
                backgroundSize: "30%",
              }}
            ></div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 select-none overflow-hidden rounded-2xl"
              style={{
                mask: "radial-gradient(33.875rem 33.875rem at calc(100% - 8.9375rem) 0, white 3%, transparent 70%)",
              }}
            ></div>

            <div className="relative px-6 pb-14 pt-20 sm:px-10 sm:pb-20 lg:px-[4.5rem]">
              <h2 className="mx-auto text-balance text-center text-3xl font-semibold tracking-[-0.015em] text-white md:text-5xl">
                Ready to ship your project?
              </h2>
              <p className="mx-auto mt-4 max-w-[26rem] text-center text-base/6 text-neutral-200">
                <Balancer>
                  Synth UI is available now, signup and get instant access.
                </Balancer>
              </p>

              <div className="relative z-10 mx-auto mt-6 flex justify-center">
                <Button
                  variant="outline"
                  className="hover:bg-neutral-300 hover:text-black"
                  as={Link}
                  href="/chat"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
