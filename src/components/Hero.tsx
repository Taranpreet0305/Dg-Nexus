import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef, memo, lazy, Suspense } from 'react';
import DGLogo from './DGLogo';
import MagneticButton from './MagneticButton';

// Lazy load heavy component
const ParticleConstellation = lazy(() => import('./ParticleConstellation'));

const titles = [
  'Graphic Designer',
  'Programmer',
  'UI/UX Designer',
  'Social Media Designer',
];

const Hero = memo(() => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Particle constellation background - lazy loaded */}
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <ParticleConstellation />
      </Suspense>
      
      {/* Simplified gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-radial from-foreground/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-radial from-foreground/3 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center will-change-transform"
        style={shouldReduceMotion ? {} : { y, opacity }}
      >
        {/* Logo animation */}
        <motion.div
          className="mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <DGLogo size={60} className="mx-auto text-foreground sm:hidden" />
          <DGLogo size={80} className="mx-auto text-foreground hidden sm:block md:hidden" />
          <DGLogo size={100} className="mx-auto text-foreground hidden md:block" />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="block glow-text text-foreground">DAKSH</span>
          <span className="block text-gradient">GULATI</span>
        </motion.h1>

        {/* Animated titles - simplified */}
        <motion.div
          className="h-6 sm:h-8 md:h-10 overflow-hidden mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: ['0%', '-80%'] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex flex-col"
          >
            {[...titles, ...titles].map((title, index) => (
              <div
                key={index}
                className="h-6 sm:h-8 md:h-10 flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-body tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground uppercase"
              >
                {title}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <MagneticButton
            as="a"
            href="#work"
            className="btn-outline w-full sm:w-auto text-sm sm:text-base"
            strength={0.3}
            radius={100}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Work
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="btn-outline w-full sm:w-auto text-sm sm:text-base"
            strength={0.3}
            radius={100}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get in Touch
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1 },
          y: { duration: 2, repeat: Infinity },
        }}
      >
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
