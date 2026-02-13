import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Lightbox from './Lightbox';
import ProjectTransition from './ProjectTransition';
import OptimizedImage from './OptimizedImage';

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
import nikeAirMaxImg from '@/assets/nike-air-max.png';
import nikeBlazerImg from '@/assets/nike-blazer.png';
import nikeJordan1Img from '@/assets/nike-jordan-1.png';
import nikeJordan11Img from '@/assets/nike-jordan-11.png';
import nikeJordanImg from '@/assets/nike-jordan.png';
import nikeJordanRetroImg from '@/assets/nike-jordan-retro.png';
import nikeSneakersImg from '@/assets/nike-sneakers.png';
import nikeSneakersAltImg from '@/assets/nike-sneakers-alt.png';
import foxPolygonImg from '@/assets/fox-polygon.jpg';
import jokerPolygonImg from '@/assets/joker-polygon.jpg';

const works = [
  { title: 'Bloom Vine Brand Kit', category: 'Branding', image: bloomVineImg, link: 'https://www.behance.net/gallery/234192275/Bloom-Vine-Brand-Kit' },
  { title: 'Nike Air Max', category: 'Poster Design', image: nikeAirMaxImg, link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS' },
  { title: 'VOLTROX Brand Kit', category: 'Branding', image: voltroxImg, link: 'https://www.behance.net/gallery/232685537/VOLTROX-BRAND-KIT' },
  { title: 'Nike Blazer', category: 'Poster Design', image: nikeBlazerImg, link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS' },
  { title: 'ELEGANCE UI/UX', category: 'UI/UX', image: eleganceImg, link: 'https://www.behance.net/gallery/239622631/ELEGENCE-UIUX' },
  { title: 'Nike Jordan 1', category: 'Poster Design', image: nikeJordan1Img, link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS' },
  { title: 'Polygon Fox', category: 'Illustration', image: foxPolygonImg, link: '#' },
  { title: 'Nike Jordan 11', category: 'Poster Design', image: nikeJordan11Img, link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS' },
  { title: 'Polygon Joker', category: 'Illustration', image: jokerPolygonImg, link: '#' },
  { title: 'Nike Legacy', category: 'Poster Design', image: nikeJordanImg, link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS' },
  { title: 'Geometric Fox', category: 'Illustration', image: foxArtImg, link: '#' },
  { title: 'Nike Retro', category: 'Poster Design', image: nikeJordanRetroImg, link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS' },
  { title: 'Night Drive', category: 'Illustration', image: nightCarImg, link: '#' },
  { title: 'Nike Break Boundaries', category: 'Poster Design', image: nikeSneakersImg, link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS' },
  { title: 'Luffy & Ace', category: 'Illustration', image: luffyAceImg, link: '#' },
  { title: 'Nike Defy Gravity', category: 'Poster Design', image: nikeSneakersAltImg, link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS' },
  { title: 'Mob Psycho', category: 'Illustration', image: mobPsychoImg, link: '#' },
  { title: 'NIKE Posters', category: 'Branding', image: nikePosterImg, link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS' },
  { title: 'Black Clover', category: 'Illustration', image: astaArtImg, link: '#' },
  { title: 'Book Cover Design', category: 'Branding', image: bookCoverImg, link: '#' },
];

const CurvedCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<{ title: string; url: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const smoothDragX = useSpring(dragX, { stiffness: 300, damping: 30 });
  const cardWidth = isMobile ? 120 : 180;
  const cardGap = isMobile ? 12 : 20;
  const totalItems = works.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % totalItems);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalItems]);

  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const cardsToMove = Math.round((offset + velocity * 0.15) / (cardWidth + cardGap));
    let newIndex = activeIndex - cardsToMove;
    newIndex = ((newIndex % totalItems) + totalItems) % totalItems;
    setActiveIndex(newIndex);
    animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 });
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleCardClick = (index: number, work: typeof works[0]) => {
    if (!isDragging) {
      if (index === activeIndex) {
        setSelectedWork(work);
        setLightboxOpen(true);
      } else {
        setActiveIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
      }
    }
  };

  const handleProjectLink = (work: typeof works[0], e: React.MouseEvent) => {
    e.stopPropagation();
    if (work.link !== '#') {
      setTransitionTarget({ title: work.title, url: work.link });
      setTransitioning(true);
    }
  };

  const navigateCarousel = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      setActiveIndex(prev => (prev - 1 + totalItems) % totalItems);
    } else {
      setActiveIndex(prev => (prev + 1) % totalItems);
    }
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const getCardPosition = (index: number) => {
    let offset = index - activeIndex;
    if (offset > totalItems / 2) offset -= totalItems;
    if (offset < -totalItems / 2) offset += totalItems;
    return offset;
  };

  return (
    <>
      <section id="work" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary font-display">
              Behind the Designs
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight font-display mt-3 sm:mt-4">
              Curious What Else
              <br />
              <span className="text-gradient">I've Created?</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Explore more brand identities, packaging, and digital design work in my extended portfolio.
            </p>
          </motion.div>

          <div
            ref={containerRef}
            className="relative h-[360px] sm:h-[480px] md:h-[520px] flex items-center justify-center select-none"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <button
              onClick={() => navigateCarousel('prev')}
              className="absolute left-2 sm:left-8 z-20 p-2 sm:p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:bg-background/80"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => navigateCarousel('next')}
              className="absolute right-2 sm:right-8 z-20 p-2 sm:p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:bg-background/80"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <motion.div
              className="flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-x"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{ x: smoothDragX }}
            >
              {works.map((work, index) => {
                const offset = getCardPosition(index);
                const absOffset = Math.abs(offset);
                const isActive = index === activeIndex;

                if (absOffset > (isMobile ? 3 : 5)) return null;

                const anglePer = isMobile ? 20 : 15;
                const radius = isMobile ? 220 : 400;
                const angle = offset * anglePer;
                const xOffset = Math.sin((angle * Math.PI) / 180) * radius;
                const yOffset = (1 - Math.cos((angle * Math.PI) / 180)) * radius * 0.3;
                const rotation = offset * (isMobile ? 7 : 5);
                const scale = Math.max(0.6, 1 - absOffset * (isMobile ? 0.18 : 0.12));
                const opacity = Math.max(0.3, 1 - absOffset * (isMobile ? 0.3 : 0.2));
                const zIndex = 10 - absOffset;

                return (
                  <motion.div
                    key={`${work.title}-${index}`}
                    className="absolute cursor-pointer"
                    animate={{
                      x: xOffset,
                      y: yOffset,
                      rotateZ: rotation,
                      scale,
                      opacity,
                      zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 28,
                    }}
                    onClick={() => handleCardClick(index, work)}
                    whileHover={isActive ? { scale: scale * 1.05, y: yOffset - 10 } : {}}
                  >
                    <div
                      className={`relative w-[110px] sm:w-[160px] md:w-[180px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group transition-shadow duration-300 ${
                        isActive ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]' : ''
                      }`}
                    >
                      <OptimizedImage
                        src={work.image}
                        alt={work.title}
                        className={`w-full h-full transition-transform duration-500 ${
                          isActive ? 'group-hover:scale-110' : ''
                        }`}
                        priority={absOffset <= 2}
                        draggable={false}
                      />

                      <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent transition-opacity duration-300 ${
                        isActive ? 'opacity-80' : 'opacity-0'
                      }`} />

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-3 sm:p-4"
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 20
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-primary/90 font-medium">
                          {work.category}
                        </span>
                        <h3 className="text-xs sm:text-sm font-display font-bold mt-1 text-foreground leading-tight">
                          {work.title}
                        </h3>
                      </motion.div>

                      {isActive && work.link !== '#' && (
                        <motion.button
                          className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80"
                          onClick={(e) => handleProjectLink(work, e)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.button>
                      )}

                      {isActive && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-foreground/5 to-transparent pointer-events-none" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 max-w-[280px] flex-wrap justify-center">
              {works.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-primary w-4'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://www.behance.net/dakshgulati2"
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

export default CurvedCarousel;
