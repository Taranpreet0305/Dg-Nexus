import { useRef, useState, useCallback } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface UseTiltOptions {
  max?: number;
  scale?: number;
  speed?: number;
}

export const useTilt = (options: UseTiltOptions = {}) => {
  const { max = 15, scale = 1.02, speed = 400 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [tiltValues, setTiltValues] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * -max;
      const rotateY = (mouseX / (rect.width / 2)) * max;

      setTiltValues({
        rotateX,
        rotateY,
        scale,
      });
    },
    [max, scale]
  );

  const handleMouseEnter = useCallback(() => {
    setTiltValues((prev) => ({ ...prev, scale }));
  }, [scale]);

  const handleMouseLeave = useCallback(() => {
    setTiltValues({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${tiltValues.rotateX}deg) rotateY(${tiltValues.rotateY}deg) scale(${tiltValues.scale})`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
  };

  return {
    ref,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
};