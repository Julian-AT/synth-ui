import "@/styles/globals.css";
import { NavBar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Suspense fallback={<div className="h-16" />}>
        <NavBar />
      </Suspense>
      {children}
      <Suspense fallback={<div className="h-64" />}>
        <Footer />
      </Suspense>
    </main>
  );
}
