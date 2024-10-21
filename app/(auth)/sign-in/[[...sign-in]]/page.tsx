"use client";

import { SignIn } from "@clerk/nextjs";
import { experimental__simple, dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { theme } = useTheme();

  return (
    <SignIn
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
