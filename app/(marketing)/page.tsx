import { Hero } from "@/components/marketing/hero";
import { Background } from "@/components/marketing/background";
import { Features } from "@/components/marketing/features";
import { Companies } from "@/components/marketing/companies";
import { GridFeatures } from "@/components/marketing/grid-features";
import { CTA } from "@/components/marketing/cta";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between px-4">
        <Hero />
        <Companies />
        <Features />
        <GridFeatures />
      </div>
      <div className="relative">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Background />
        </div>
        <CTA />
      </div>
    </div>
  );
}
