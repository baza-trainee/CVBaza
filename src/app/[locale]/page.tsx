import HeroSection from "@/components/HeroSection/hero-section";

export default function Home() {

  return (
    <div className=" font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      <main className="row-start-2 flex flex-col items-center sm:items-start">
        <HeroSection/>
      </main>
    </div>
  );
}
