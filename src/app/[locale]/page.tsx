import { CoverLetter } from '@/components/cover-letter';
import { Steps } from "@/components/steps/steps";

import HeroSection from "@/components/hero-section";
import OptimizationSection from "@/components/optimization-section";

export default function Home() {

  return (
    <div className=" font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      <main className="row-start-2 flex flex-col items-center sm:items-start">
        <HeroSection/>
        <OptimizationSection/>
        <Steps />
        <CoverLetter />
      </main>
    </div>
  );
}
