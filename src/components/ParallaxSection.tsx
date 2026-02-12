import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode, memo } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

const ParallaxSection = memo(({
  children,
  className = '',
  speed = 0.3,
  direction = 'up'
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Reduced parallax on mobile
  const parallaxAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? speed * 0.3 : speed;
  const y = useTransform(scrollYProgress, [0, 1], [30 * parallaxAmount, -30 * parallaxAmount]);

  const getInitialPosition = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    // Reduced movement on mobile
    const factor = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.5 : 1;
    switch (direction) {
      case 'left': return { x: -80 * factor, y: 0 };
      case 'right': return { x: 80 * factor, y: 0 };
      case 'down': return { x: 0, y: -60 * factor };
      case 'up':
      default: return { x: 0, y: 60 * factor };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      className={`${className} will-change-transform`}
      initial={{
        opacity: 0,
        x: initial.x,
        y: initial.y,
        scale: 0.97,
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ y: isInView && !shouldReduceMotion ? y : 0 }}
    >
      {children}
    </motion.div>
  );
});

ParallaxSection.displayName = 'ParallaxSection';

export default ParallaxSection;
