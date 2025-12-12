import Image from "next/image";
import HeroSection from "./_components/HeroSection";
import FeaturedIn from "./_components/FeaturedIn";
import HowItWorks from "./_components/HowItWorks";
import Header from "./_components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <HeroSection />
        <FeaturedIn />
        <HowItWorks />
      </div>
    </div>
  );
}
