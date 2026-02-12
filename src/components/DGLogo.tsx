import { motion } from 'framer-motion';

interface DGLogoProps {
  className?: string;
  size?: number;
}

const DGLogo = ({ className = '', size = 48 }: DGLogoProps) => {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, hsl(var(--silver)) 0%, transparent 70%)',
        }}
      />
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.rect
          x="2" y="2" width="96" height="96"
          stroke="currentColor" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M20 25 L20 75 L40 75 C55 75 60 60 60 50 C60 40 55 25 40 25 L20 25"
          stroke="currentColor" strokeWidth="3" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d="M80 35 C75 27 67 25 60 25 C48 25 42 35 42 50 C42 65 48 75 60 75 C68 75 75 72 80 65 L80 55 L65 55"
          stroke="currentColor" strokeWidth="3" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.line
          x1="85" y1="15" x2="95" y2="5"
          stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default DGLogo;
