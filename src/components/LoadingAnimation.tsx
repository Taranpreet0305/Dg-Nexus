import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, memo } from 'react';
import DGLogo from './DGLogo';

const LoadingAnimation = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Preload critical assets
  useEffect(() => {
    const preloadAssets = async () => {
      // Check if document is ready
      if (document.readyState === 'complete') {
        setAssetsLoaded(true);
        return;
      }
      
      // Wait for window load
      const handleLoad = () => setAssetsLoaded(true);
      window.addEventListener('load', handleLoad);
      
      // Fallback timeout
      const timeout = setTimeout(() => setAssetsLoaded(true), 2000);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeout);
      };
    };
    
    preloadAssets();
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 70 ? Math.random() * 15 + 8 : Math.random() * 5 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, []);

  // Complete loading when both progress is done and assets are loaded
  useEffect(() => {
    if (progress >= 100 && assetsLoaded) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [progress, assetsLoaded]);

  // Faster minimum load time
  useEffect(() => {
    const minTimer = setTimeout(() => {
      if (progress >= 100) setIsLoading(false);
    }, 1800);
    return () => clearTimeout(minTimer);
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background will-change-transform"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Simplified background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at center, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          {/* Logo with optimized animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10"
          >
            <DGLogo size={80} className="text-foreground sm:w-[100px] sm:h-[100px]" />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="relative mt-8 sm:mt-12 w-48 sm:w-64"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.div className="text-center mb-2 sm:mb-3">
              <span className="text-2xl sm:text-4xl font-display font-bold tracking-tight">
                {Math.round(progress)}
              </span>
              <span className="text-sm sm:text-lg text-muted-foreground ml-1">%</span>
            </motion.div>

            <div className="h-0.5 sm:h-1 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-foreground"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <motion.p
              className="text-center mt-3 sm:mt-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

LoadingAnimation.displayName = 'LoadingAnimation';

export default LoadingAnimation;