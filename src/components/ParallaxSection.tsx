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

  const y = useTransform(scrollYProgress, [0, 1], [30 * speed, -30 * speed]);

  // Direction-based initial positions
  const getInitialPosition = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'left': return { x: -80, y: 0 };
      case 'right': return { x: 80, y: 0 };
      case 'down': return { x: 0, y: -60 };
      case 'up':
      default: return { x: 0, y: 60 };
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
        filter: 'blur(4px)',
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
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
