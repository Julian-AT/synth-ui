import type { Metadata } from "next";
import "@/styles/globals.css";
import { NavBar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
