import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, ZoomIn } from 'lucide-react';
import Lightbox from './Lightbox';
import ProjectTransition from './ProjectTransition';
import TiltCard from './TiltCard';
import TextReveal from './TextReveal';

import bloomVineImg from '@/assets/bloom-vine.png';
import nikePosterImg from '@/assets/nike-posters.png';
import voltroxImg from '@/assets/voltrox.jpg';
import eleganceImg from '@/assets/elegance-uiux.jpeg';
import foxArtImg from '@/assets/fox-art.jpg';
import nightCarImg from '@/assets/night-car.jpg';
import luffyAceImg from '@/assets/luffy-ace.png';
import mobPsychoImg from '@/assets/mob-psycho.jpg';
import astaArtImg from '@/assets/asta-art.jpg';
import bookCoverImg from '@/assets/book-cover.jpg';

const workCategories = ['All', 'Branding', 'UI/UX', 'Illustration'];

const works = [
  {
    title: 'Bloom Vine Brand Kit',
    category: 'Branding',
    image: bloomVineImg,
    link: 'https://www.behance.net/gallery/234192275/Bloom-Vine-Brand-Kit',
    rotation: -8,
  },
  {
    title: 'NIKE Posters',
    category: 'Branding',
    image: nikePosterImg,
    link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS',
    rotation: 5,
  },
  {
    title: 'VOLTROX Brand Kit',
    category: 'Branding',
    image: voltroxImg,
    link: 'https://www.behance.net/gallery/232685537/VOLTROX-BRAND-KIT',
    rotation: -4,
  },
  {
    title: 'ELEGANCE UI/UX',
    category: 'UI/UX',
    image: eleganceImg,
    link: 'https://www.behance.net/gallery/239622631/ELEGENCE-UIUX',
    rotation: 7,
  },
  {
    title: 'Geometric Fox',
    category: 'Illustration',
    image: foxArtImg,
    link: '#',
    rotation: -6,
  },
  {
    title: 'Night Drive',
    category: 'Illustration',
    image: nightCarImg,
    link: '#',
    rotation: 4,
  },
  {
    title: 'Luffy & Ace',
    category: 'Illustration',
    image: luffyAceImg,
    link: '#',
    rotation: -3,
  },
  {
    title: 'Mob Psycho',
    category: 'Illustration',
    image: mobPsychoImg,
    link: '#',
    rotation: 8,
  },
  {
    title: 'Black Clover',
    category: 'Illustration',
    image: astaArtImg,
    link: '#',
    rotation: -5,
  },
  {
    title: 'Book Cover Design',
    category: 'Branding',
    image: bookCoverImg,
    link: '#',
    rotation: 6,
  },
];

const Work = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<{ title: string; url: string } | null>(null);

  const filteredWorks = activeCategory === 'All' 
    ? works 
    : works.filter(work => work.category === activeCategory);

  const openLightbox = (work: typeof works[0], e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedWork(work);
    setLightboxOpen(true);
  };

  const handleProjectClick = (work: typeof works[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (work.link !== '#') {
      setTransitionTarget({ title: work.title, url: work.link });
      setTransitioning(true);
    }
  };

  return (
    <>
      <section id="work" className="py-16 sm:py-24 md:py-32 relative" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary font-display">
              Behind the Designs
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight font-display mt-3 sm:mt-4">
              <TextReveal delay={0.1}>Curious What Else</TextReveal>
              <br />
              <span className="text-gradient">
                <TextReveal delay={0.4}>I've Created?</TextReveal>
              </span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Explore more brand identities, packaging, and digital design work in my extended portfolio.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {workCategories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-wider font-display transition-all duration-300 rounded-full ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.3)]'
                    : 'bg-transparent text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]'
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Tilted Cards Grid - Like reference image */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            layout
          >
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.title}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: work.rotation }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ 
                  rotate: 0, 
                  scale: 1.05, 
                  zIndex: 50,
                  transition: { duration: 0.3 } 
                }}
                layout
                className="relative"
                style={{ zIndex: 10 - index }}
              >
                <TiltCard
                  className="w-[140px] sm:w-[180px] md:w-[200px] aspect-[3/4] rounded-xl overflow-hidden relative cursor-pointer shadow-2xl group"
                  maxTilt={12}
                  scale={1.02}
                >
                  <div 
                    className="absolute inset-0"
                    onClick={(e) => openLightbox(work, e)}
                  >
                    {/* Image */}
                    <div className="absolute inset-0 bg-card">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20">
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-primary font-medium">
                        #{String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xs sm:text-sm font-display font-bold mt-1 leading-tight text-foreground">
                        {work.title}
                      </h3>
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-foreground/10 to-transparent pointer-events-none" />
                  </div>

                  {/* External link button with transition */}
                  {work.link !== '#' && (
                    <motion.button
                      className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 hover:bg-background/80"
                      onClick={(e) => handleProjectClick(work, e)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  )}
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* See More Projects Button */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://www.behance.net/devgulati23"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-display text-sm uppercase tracking-wider hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-shadow duration-300"
            >
              See more Projects
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={selectedWork?.image || ''}
        title={selectedWork?.title || ''}
      />

      <ProjectTransition
        isActive={transitioning}
        projectTitle={transitionTarget?.title || ''}
        targetUrl={transitionTarget?.url || ''}
        onComplete={() => setTransitioning(false)}
      />
    </>
  );
};

export default Work;
