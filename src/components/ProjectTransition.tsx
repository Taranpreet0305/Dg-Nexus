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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full border border-foreground/20"
              style={{ width: '100px', height: '100px' }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: [0, 15 + i * 3], opacity: [0.8, 0] }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          ))}
          <motion.div className="absolute z-10 text-center"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20], scale: [0.8, 1, 1, 1.1] }}
            transition={{ duration: 1.5, times: [0, 0.3, 0.7, 1], ease: 'easeOut' }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-2">Opening</span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-gradient">{projectTitle}</h3>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectTransition;
