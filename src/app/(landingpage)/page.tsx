import Image from "next/image";
import Hero from "./_components/hero";
import Features from "./_components/features";
import HowItWorks from "./_components/how-it-works";
import Cta from "./_components/cta";
import Pricing from "./_components/pricing";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Testimonials /> */}
        <Pricing />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* <Cta /> */}
      </footer>
    </div>
  );
}
