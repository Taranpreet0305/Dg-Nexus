import { motion, useInView, Variants, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode, Children, isValidElement, memo, useMemo } from 'react';

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  once?: boolean;
}

const StaggeredContainer = memo(({
  children,
  className = '',
  staggerDelay = 0.08,
  direction = 'up',
  once = true,
}: StaggeredContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-30px' });
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = useMemo((): Variants => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    }

    const directions = {
      up: { y: 25, x: 0 },
      down: { y: -25, x: 0 },
      left: { x: 25, y: 0 },
      right: { x: -25, y: 0 },
      fade: { x: 0, y: 0 },
    };

    const { x, y } = directions[direction];

    return {
      hidden: { opacity: 0, x, y },
      visible: { opacity: 1, x: 0, y: 0 },
    };
  }, [direction, shouldReduceMotion]);

  const containerVariants: Variants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  }), [staggerDelay]);

  const childrenArray = Children.toArray(children);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
});

StaggeredContainer.displayName = 'StaggeredContainer';

export default StaggeredContainer;
