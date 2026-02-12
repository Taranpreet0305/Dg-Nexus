import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ProjectTransitionProps {
  isActive: boolean;
  projectTitle: string;
  onComplete: () => void;
  targetUrl: string;
}

const ProjectTransition = ({ isActive, projectTitle, onComplete, targetUrl }: ProjectTransitionProps) => {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        window.open(targetUrl, '_blank');
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isActive, targetUrl, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background layers */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Expanding circles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-foreground/20"
              style={{
                width: '100px',
                height: '100px',
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{
                scale: [0, 15 + i * 3],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}

          {/* Center glow */}
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--foreground) / 0.3) 0%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 3, 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />

          {/* Horizontal lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
              style={{
                width: '100%',
                top: `${15 + i * 15}%`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.08,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Vertical lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-foreground/40 to-transparent"
              style={{
                height: '100%',
                left: `${15 + i * 15}%`,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: [0, 1],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.08,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Corner brackets */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position, i) => (
            <motion.div
              key={position}
              className={`absolute ${
                position.includes('top') ? 'top-1/4' : 'bottom-1/4'
              } ${position.includes('left') ? 'left-1/4' : 'right-1/4'}`}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0],
                rotate: [0, 90],
              }}
              transition={{
                duration: 1,
                delay: 0.4 + i * 0.1,
                ease: 'easeOut',
              }}
            >
              <div
                className={`w-12 h-12 border-2 border-foreground/60 ${
                  position === 'top-left'
                    ? 'border-r-0 border-b-0'
                    : position === 'top-right'
                    ? 'border-l-0 border-b-0'
                    : position === 'bottom-left'
                    ? 'border-r-0 border-t-0'
                    : 'border-l-0 border-t-0'
                }`}
              />
            </motion.div>
          ))}

          {/* Project title */}
          <motion.div
            className="absolute z-10 text-center"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, -20],
              scale: [0.8, 1, 1, 1.1],
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.3, 0.7, 1],
              ease: 'easeOut',
            }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-2">
              Opening
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-gradient">
              {projectTitle}
            </h3>
          </motion.div>

          {/* Particle burst */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-foreground/60"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: Math.cos((i * 30 * Math.PI) / 180) * 300,
                y: Math.sin((i * 30 * Math.PI) / 180) * 300,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectTransition;