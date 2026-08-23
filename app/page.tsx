import { Navbar } from '@/components/landing/Navbar/Navbar';
import { HeroSection } from '@/components/landing/HeroSection/HeroSection';
import { ListenToLifeSection } from '@/components/landing/ListenToLifeSection/ListenToLifeSection';
import { StorySection } from '@/components/landing/StorySection/StorySection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection/HowItWorksSection';
import { BeforeAfterSection } from '@/components/landing/BeforeAfterSection/BeforeAfterSection';
import { KnowledgeAtRiskSection } from '@/components/landing/KnowledgeAtRiskSection/KnowledgeAtRiskSection';
import { ImpactSection } from '@/components/landing/ImpactSection/ImpactSection';
import { Footer } from '@/components/landing/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ListenToLifeSection />
      <StorySection />
      <HowItWorksSection />
      <BeforeAfterSection />
      <KnowledgeAtRiskSection />
      <ImpactSection />
      <Footer />
    </main>
  );
}
