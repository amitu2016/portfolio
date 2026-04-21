import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SystemDesignSection } from "@/components/sections/SystemDesignSection";
import { ObservabilitySection } from "@/components/sections/ObservabilitySection";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { SectionDivider } from "@/components/shared/SectionDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <SystemDesignSection />
      <SectionDivider />
      <ObservabilitySection />
      <SectionDivider />
      <ProjectGallery />
      <SectionDivider />
      <BlogPreviewSection />
    </>
  );
}
