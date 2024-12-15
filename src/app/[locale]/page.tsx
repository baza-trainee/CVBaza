import { CoverLetter } from '@/components/cover-letter';
import HeroSection from "@/components/HeroSection/hero-section";
import { Steps } from "@/components/steps/steps";


export default function Home() {

  return (
    <div className="grid min-h-screen items-center gap-16 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 gap-8 sm:items-start">
        <HeroSection />
        <Steps />
        <CoverLetter />
      </main>
    </div>
  );
}
