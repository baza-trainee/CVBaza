import { CoverLetter } from "@/components/homepage/cover-letter";
import { HeroSection } from "@/components/homepage/hero-section";
import { OptimizationSection } from "@/components/homepage/optimization-section";
import { Steps } from "@/components/homepage/steps/steps";

export default function Home() {
  return (
    <main className="overflow-x-hidden font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-2 flex flex-col items-center sm:items-start">
        <HeroSection />
        <OptimizationSection />
        <Steps />
        <CoverLetter />
      </div>
    </main>
  );
}
