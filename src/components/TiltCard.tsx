import { motion } from 'framer-motion';
import { useRef, useState, useCallback, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
  maxTilt?: number;
  scale?: number;
}

const TiltCard = ({
  children,
  className = '',
  glareEnabled = true,
  maxTilt = 12,
  scale = 1.02,
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      // Glare position
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      setTilt({ rotateX, rotateY, scale });
      setGlarePosition({ x: glareX, y: glareY });
    },
    [maxTilt, scale]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlarePosition({ x: 50, y: 50 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
        transition: 'transform 0.15s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare effect */}
      {glareEnabled && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden z-20"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, hsl(0 0% 100% / 0.15) 0%, transparent 60%)`,
            opacity: tilt.scale > 1 ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* 3D shine edge effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg z-10"
        style={{
          boxShadow: tilt.scale > 1 
            ? `${-tilt.rotateY * 0.5}px ${tilt.rotateX * 0.5}px 30px hsl(0 0% 100% / 0.1), 
               ${-tilt.rotateY * 0.3}px ${tilt.rotateX * 0.3}px 60px hsl(220 10% 85% / 0.1)`
            : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      />
    </motion.div>
  );
};

export default TiltCard;