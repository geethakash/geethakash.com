'use client';

import AnimatedBackgroundDesktop from "./components/AnimatedBackgroundDesktop";
import AnimatedBackgroundMobile from "./components/AnimatedBackgroundMobile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import JourneySection from "./sections/JourneySection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import ContactSection from "./sections/ContactSection";
import useIsMobile from "./hooks/isMobile";

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <main className="relative min-h-screen">
      {/* Fixed animated background */}
      {isMobile ? <AnimatedBackgroundMobile /> : <AnimatedBackgroundDesktop />}


      {/* Navigation */}
      <Navbar />

      {/* Page content — sits above background */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
