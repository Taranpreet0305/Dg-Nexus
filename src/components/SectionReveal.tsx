import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';
import { useRef, ReactNode, Children, isValidElement, memo, useMemo } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  staggerChildren?: boolean;
  staggerDelay?: number;
  threshold?: string;
}

const SectionReveal = memo(({
  children,
  className = '',
  direction = 'up',
  staggerChildren = true,
  staggerDelay = 0.12,
  threshold = '-80px',
}: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: threshold as any });
  const shouldReduceMotion = useReducedMotion();

  const directionOffset = useMemo(() => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    const factor = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.5 : 1;
    switch (direction) {
      case 'left': return { x: -80 * factor, y: 0 };
      case 'right': return { x: 80 * factor, y: 0 };
      case 'down': return { x: 0, y: -60 * factor };
      case 'up':
      default: return { x: 0, y: 60 * factor };
    }
  }, [direction, shouldReduceMotion]);

  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0, x: directionOffset.x, y: directionOffset.y },
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: 0.1,
      },
    },
  }), [directionOffset, staggerChildren, staggerDelay]);

  const childVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: 0.97 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }), [shouldReduceMotion]);

  const childrenArray = Children.toArray(children);

  if (!staggerChildren) {
    return (
      <motion.div ref={ref} className={className} variants={containerVariants}
        initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} className={className} variants={containerVariants}
      initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          return <motion.div key={index} variants={childVariants}>{child}</motion.div>;
        }
        return child;
      })}
    </motion.div>
  );
});

SectionReveal.displayName = 'SectionReveal';

export default SectionReveal;
