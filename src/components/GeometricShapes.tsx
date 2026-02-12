import { motion, useScroll, useTransform } from 'framer-motion';

const GeometricShapes = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -500]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -700]);
  const rotate1 = useTransform(scrollY, [0, 3000], [0, 180]);
  const rotate2 = useTransform(scrollY, [0, 3000], [0, -90]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden md:block">
      <motion.div className="absolute top-[10%] right-[10%] w-32 h-32 md:w-48 md:h-48"
        style={{ y: y1, rotate: rotate1 }}>
        <div className="relative w-full h-full animate-float-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
            <path d="M10 30 L50 10 L90 30 L90 70 L50 90 L10 70 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M10 30 L50 50 L90 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 50 L50 90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </motion.div>

      <motion.div className="absolute top-[40%] left-[5%] w-24 h-24 md:w-40 md:h-40" style={{ y: y2 }}>
        <div className="relative w-full h-full animate-float-delayed">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-15">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(60 50 50)" />
          </svg>
        </div>
      </motion.div>

      <motion.div className="absolute top-[60%] right-[15%] w-20 h-20 md:w-32 md:h-32"
        style={{ y: y3, rotate: rotate2 }}>
        <div className="relative w-full h-full animate-float">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-15">
            <path d="M50 10 L90 80 L10 80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 10 L50 60 M50 60 L90 80 M50 60 L10 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </motion.div>

      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default GeometricShapes;
