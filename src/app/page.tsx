
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import HireMeSection from '@/components/sections/HireMeSection';
import MentorshipSection from '@/components/sections/MentorshipSection';
import ContactSection from '@/components/sections/ContactSection';
import BlogSection from '@/components/sections/BlogSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection /> 
      <HireMeSection />
      <MentorshipSection />
      <ContactSection />
    </>
  );
}
