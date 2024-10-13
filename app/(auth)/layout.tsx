import { cn } from "@/lib/utils";
import { HorizontalGradient } from "@/components/marketing/horizontal-gradient";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { FileScriptIcon } from "hugeicons-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 flex items-center gap-2",
          )}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Link>
        <div className="flex items-center justify-center">{children}</div>
        <div className="relative z-20 hidden w-full items-center justify-center overflow-hidden border-l border-neutral-100 bg-gray-50 dark:border-neutral-800 dark:bg-muted/40 md:flex">
          <div className="mx-auto max-w-sm">
            <FileScriptIcon className="mx-auto h-12 w-12" />
            <p
              className={cn(
                "py-6 text-center text-xl font-semibold text-secondary-foreground",
              )}
            >
              Generate & Ship UI with minimal effort
            </p>
            <p
              className={cn(
                "-mt-4 text-center text-base font-normal text-neutral-500 dark:text-neutral-400",
              )}
            >
              Synth UI allows you to generate User-Interfaces without writing a
              single line of code.
            </p>
          </div>
          <HorizontalGradient className="top-20 text-secondary" />
          <HorizontalGradient className="bottom-20 text-secondary" />
          <HorizontalGradient className="inset-y-0 -right-80 h-full rotate-90 scale-x-150 transform text-secondary" />
          <HorizontalGradient className="inset-y-0 -left-80 h-full rotate-90 scale-x-150 transform text-secondary" />
        </div>
      </div>
    </>
  );
}
