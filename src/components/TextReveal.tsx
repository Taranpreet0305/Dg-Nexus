import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const TextReveal = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = 'span',
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const letters = children.split('');

  return (
    <Tag ref={ref} className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ 
            display: letter === ' ' ? 'inline' : 'inline-block',
            transformOrigin: 'bottom',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </Tag>
  );
};

export default TextReveal;
