"use client";

import { SignUp } from "@clerk/nextjs";
import { experimental__simple, dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { theme } = useTheme();

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
