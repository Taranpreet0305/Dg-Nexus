import CustomCursor from '@/components/CustomCursor';
import GeometricShapes from '@/components/GeometricShapes';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollProgress from '@/components/ScrollProgress';
import LoadingAnimation from '@/components/LoadingAnimation';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import CurvedCarousel from '@/components/CurvedCarousel';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import SectionReveal from '@/components/SectionReveal';

const Index = () => {
  return (
    <>
      <LoadingAnimation />
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <CustomCursor />
        <GeometricShapes />
        <ScrollProgress />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <ParallaxSection speed={0.2} direction="right">
            <SectionReveal direction="right" staggerDelay={0.15}>
              <About />
            </SectionReveal>
          </ParallaxSection>
          <ParallaxSection speed={0.15} direction="left">
            <SectionReveal direction="left" staggerDelay={0.1}>
              <Skills />
            </SectionReveal>
          </ParallaxSection>
          <SectionReveal direction="up" staggerDelay={0.1}>
            <CurvedCarousel />
          </SectionReveal>
          <ParallaxSection speed={0.2} direction="right">
            <SectionReveal direction="right" staggerDelay={0.1}>
              <Projects />
            </SectionReveal>
          </ParallaxSection>
          <ParallaxSection speed={0.15} direction="left">
            <SectionReveal direction="left" staggerDelay={0.12}>
              <Experience />
            </SectionReveal>
          </ParallaxSection>
          <ParallaxSection speed={0.1} direction="up">
            <SectionReveal direction="up" staggerDelay={0.15}>
              <Contact />
            </SectionReveal>
          </ParallaxSection>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
