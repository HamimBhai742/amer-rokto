import AboutHero from "./AboutHero";
import MissionVision from "./MissionVision";
import ImpactStats from "./ImpactStats";
import OurStory from "./OurStory";
import Timeline from "./Timeline";
import TeamSection from "./TeamSection";
import ValuesSection from "./ValuesSection";
import PartnerSection from "./PartnerSection";
import AboutCTA from "./AboutCTA";

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <AboutHero />
      <MissionVision />
      <ImpactStats />
      <OurStory />
      <Timeline />
      <ValuesSection />
      <TeamSection />
      <PartnerSection />
      <AboutCTA />
    </div>
  );
}
