import { GeistSans } from "geist/font/sans";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const runtime = "edge";
export const preferredRegion = "home";

const siteConfig = {
  name: "Synth UI",
  description: "Generative User Interfaces for the Web",
  url: "https://synthui.design",
  ogImage: "https://synthui.design/og.png",
  creator: "Julian S.",
  twitterHandle: "@julian-at",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  keywords: [
    "synth ui",
    "UI design",
    "UI generation",
    "AI",
    "generative UI",
    "generative design",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Shadcn UI",
  ],
  authors: [{ name: siteConfig.creator, url: "https://github.com/julian-at" }],
  creator: siteConfig.creator,
  manifest: `${siteConfig.url}/site.webmanifest`,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-normal antialiased", GeistSans.className)}>
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex max-h-screen min-h-screen flex-1 flex-col bg-background">
            {children}
            <Toaster />
          </main>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
