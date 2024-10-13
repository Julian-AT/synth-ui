"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { ComponentPreviewProvider } from "@/lib/hooks/use-component-preview";
import { experimental__simple } from "@clerk/themes";
import { AppStateProvider } from "@/lib/hooks/use-app-state";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: experimental__simple,
      }}
    >
      <NextThemesProvider {...props}>
        <ComponentPreviewProvider>
          <SidebarProvider>
            <TooltipProvider delayDuration={50}>
              <AppStateProvider>{children}</AppStateProvider>
            </TooltipProvider>
          </SidebarProvider>
        </ComponentPreviewProvider>
      </NextThemesProvider>
    </ClerkProvider>
  );
}
