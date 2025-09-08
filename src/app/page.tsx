// "use client"

import ContentSection from "@/components/content/contentsection";
import HeroSection from "@/components/general/hero";
import Navbar from "@/components/general/navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ContentSection />
    </>

  );
}
