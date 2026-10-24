import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { MotionProvider } from "./components/ui";
import HeroSection from "./sections/HeroSection";
import WorkSection from "./sections/WorkSection";
import ExperienceSection from "./sections/ExperienceSection";
import AboutSection from "./sections/AboutSection";
import StackSection from "./sections/StackSection";
import ContactSection from "./sections/ContactSection";

export default function Home() {
  return (
    <MotionProvider>
      <Navbar />
      <main>
        <HeroSection />
        <WorkSection />
        <ExperienceSection />
        <AboutSection />
        <StackSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionProvider>
  );
}
