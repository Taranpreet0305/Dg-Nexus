import { useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailPointsRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const drawTrail = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const points = trailPointsRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (points.length < 3) {
      animationFrameRef.current = requestAnimationFrame(drawTrail);
      return;
    }
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 2; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
    const gradient = ctx.createLinearGradient(
      points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.4)');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    animationFrameRef.current = requestAnimationFrame(drawTrail);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    let lastX = 0, lastY = 0;
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (distance > 8) {
        lastX = e.clientX;
        lastY = e.clientY;
        trailPointsRef.current.push({ x: e.clientX, y: e.clientY });
        if (trailPointsRef.current.length > 20) trailPointsRef.current.shift();
      }
      if (trailPointsRef.current.length > 0) {
        trailPointsRef.current = trailPointsRef.current.slice(-18);
      }
    };
    window.addEventListener('mousemove', moveCursor, { passive: true });
    animationFrameRef.current = requestAnimationFrame(drawTrail);
    const decayInterval = setInterval(() => {
      if (trailPointsRef.current.length > 0) trailPointsRef.current.shift();
    }, 50);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(decayInterval);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [cursorX, cursorY, drawTrail]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9995] hidden md:block"
        style={{ width: '100%', height: '100%' }} />
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-foreground rounded-full" />
        </div>
      </motion.div>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 border border-foreground/40 rounded-full transition-transform duration-200"
            style={{ boxShadow: '0 0 8px hsl(var(--foreground) / 0.1)' }} />
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
