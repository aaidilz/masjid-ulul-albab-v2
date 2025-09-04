import HeroSection from "./components/HeroSection";
import PrayerTimesSection from "./components/PrayerTimeSection";
import AboutSection from "./components/AboutSection";
import FacilitiesSection from "./components/FacilitiesSection";
import OrganizationSection from "./components/OrganizationSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PrayerTimesSection />
      <AboutSection />
      <FacilitiesSection />
      <OrganizationSection />
      {/* Additional sections can be added here */}
    </main>
  );
}
