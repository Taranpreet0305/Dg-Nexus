import { useRef, useCallback, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: 'button' | 'a' | 'div';
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
  rel?: string;
}

const MagneticButton = ({
  children,
  className = '',
  strength = 0.3,
  radius = 100,
  as = 'button',
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);
      if (distance < radius) {
        const factor = 1 - distance / radius;
        x.set(distanceX * strength * factor);
        y.set(distanceY * strength * factor);
      }
    },
    [strength, radius, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const commonProps = { className, onClick };
  const anchorProps = as === 'a' ? {
    href,
    target,
    rel: target === '_blank' ? 'noopener noreferrer' : rel,
  } : {};

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
    >
      {as === 'a' ? (
        <motion.a {...commonProps} {...anchorProps} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {children}
        </motion.a>
      ) : as === 'div' ? (
        <motion.div {...commonProps} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {children}
        </motion.div>
      ) : (
        <motion.button {...commonProps} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {children}
        </motion.button>
      )}
    </motion.div>
  );
};

export default MagneticButton;
