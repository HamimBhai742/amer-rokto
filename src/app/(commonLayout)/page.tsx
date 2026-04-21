import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import HowItWorks from "@/components/home/HowItWorks";
import BloodGroupFinder from "@/components/home/BloodGroupFinder";
import WhyDonate from "@/components/home/WhyDonate";
import Testimonials from "@/components/home/Testimonials";
import EmergencyBanner from "@/components/home/EmergencyBanner";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <BloodGroupFinder />
      <WhyDonate />
      <Testimonials />
      <EmergencyBanner />
      <CallToAction />
    </div>
  );
}
