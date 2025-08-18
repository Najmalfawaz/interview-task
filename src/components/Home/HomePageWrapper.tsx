'use client';
import HeroSection from "./HeroSection";
import OurTeam from "./OurTeam";
import Clients from "./Clients";

export default function HomePageWrapper() {
  return (
    <>
      <HeroSection />
      <section className="bg-[#F3F3F3]">
        <div className="section-container py-20">
          <OurTeam />
        </div>
      </section>
      <section className="section-container py-20">
        <Clients />
      </section>
      <div className="w-full h-[25px] bg-[#FAFAFA]" />
    </>
  );
}
