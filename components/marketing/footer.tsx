import Link from "next/link";
import React from "react";
import Logo from "@/components/logo";

export const Footer = () => {
  const legal = [
    {
      name: "Privacy Policy",
      href: "#",
    },
    {
      name: "Terms of Service",
      href: "#",
    },
    {
      name: "Source Code",
      href: "process.env.NEXT_PUBLIC_GITHUB_URL",
    },
  ];

  return (
    <div className="relative">
      <div className="relative border-t border-neutral-100 bg-white px-8 pb-32 pt-20 dark:border-neutral-800 dark:bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-neutral-500 dark:text-neutral-400 sm:flex-row">
          <div>
            <div className="mb-4 mr-4 md:flex">
              <Logo />
            </div>
            <div>Copyright &copy; 2024 Synth UI</div>
            <div className="mt-2">All rights reserved</div>
          </div>
          <div className="mt-10 grid items-start gap-10 md:mt-0">
            <div className="mt-4 flex flex-col justify-center space-y-4">
              {legal.map((link) => (
                <Link
                  key={link.name}
                  className="text-xs text-muted-foreground transition-colors hover:text-black dark:hover:text-neutral-400 sm:text-sm"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <p className="inset-x-0 bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-center text-5xl font-bold text-transparent dark:from-neutral-950 dark:to-neutral-800 md:text-9xl lg:text-[18rem]">
        SYNTH UI
      </p> */}
    </div>
  );
};
