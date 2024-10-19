import React from "react";

export const EmptyScreenBadge: React.FC<
  { children: React.ReactNode } & React.ComponentPropsWithoutRef<"button">
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="group relative mx-auto inline-block w-fit cursor-pointer rounded-full bg-teal-200/60 p-px text-[10px] font-semibold leading-6 text-teal-700 no-underline shadow-zinc-900 dark:bg-teal-950 dark:text-teal-200 sm:text-xs md:shadow-2xl"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>

      <div className="relative z-10 flex items-center rounded-full bg-teal-200/5 px-1 py-0.5 ring-1 ring-white/10 dark:bg-teal-950">
        <span className="absolute bottom-1 left-1 top-1 flex items-center justify-center rounded-full bg-teal-700 px-1 text-primary-foreground dark:bg-teal-400">
          New
        </span>
        <div className="pl-10">{children}</div>
        <svg
          fill="none"
          height="20"
          viewBox="0 0 24 24"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 8.75L14.25 12L10.75 15.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-teal-400/0 via-teal-300 to-teal-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </button>
  );
};
