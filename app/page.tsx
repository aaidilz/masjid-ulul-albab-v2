import HeroSection from "@/app/components/HeroSection";
import PrayerTimesSection from "./components/PrayerTimeSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PrayerTimesSection />
      {/* Additional sections can be added here */}
    </main>
  );
}
