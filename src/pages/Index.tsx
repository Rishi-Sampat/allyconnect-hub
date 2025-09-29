import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import OpportunitiesSection from "@/components/OpportunitiesSection";
import AlumniSpotlight from "@/components/AlumniSpotlight";
import LeaderboardSection from "@/components/LeaderboardSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <EventsSection />
      <OpportunitiesSection />
      <AlumniSpotlight />
      <LeaderboardSection />
      <Footer />
    </div>
  );
};

export default Index;
