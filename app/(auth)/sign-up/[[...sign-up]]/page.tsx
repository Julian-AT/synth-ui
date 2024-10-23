"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { experimental__simple, dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";

export const runtime = "edge";
export const preferredRegion = "home";

export default function SignInPage() {
  const { theme } = useTheme();
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    redirect("/chat");
  }

  return (
    <SignUp
      appearance={{
        baseTheme: theme === "dark" ? dark : experimental__simple,
        variables: {
          colorBackground: theme === "dark" ? "#090909" : "#efefef",
          colorInputBackground: "transparent",
        },
      }}
    />
  );
}
