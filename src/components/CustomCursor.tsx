import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Instant positions for primary cursor to avoid any lag
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Velocity tracking for natural fluid blob motion stretch
  const velX = useVelocity(cursorX);
  const velY = useVelocity(cursorY);

  // Smooth positions for outer decorative shape
  const springConfig = { damping: 24, stiffness: 280, mass: 0.6 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Subtle velocity-based blob elongation (capped to avoid exaggerated deformation)
  const rawSpeed = useTransform(() => {
    const vx = velX.get();
    const vy = velY.get();
    return Math.min(Math.hypot(vx, vy), 900);
  });
  
  // Spring-softened blob stretch & squash for organic fluid feel
  const blobStretch = useSpring(
    useTransform(rawSpeed, [0, 900], [1, 1.28]),
    { damping: 20, stiffness: 260 }
  );
  const blobSquash = useSpring(
    useTransform(rawSpeed, [0, 900], [1, 0.82]),
    { damping: 20, stiffness: 260 }
  );

  // Motion angle so blob subtly aligns with movement direction
  const blobAngle = useTransform(() => {
    const vx = velX.get();
    const vy = velY.get();
    if (Math.hypot(vx, vy) < 25) return 0;
    return Math.atan2(vy, vx) * (180 / Math.PI);
  });
  const smoothAngle = useSpring(blobAngle, { damping: 25, stiffness: 200 });

  useEffect(() => {
    // Only show custom cursor on devices with a mouse
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Fluid Droplet: gentle undulating blob morphing */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-vampire-red pointer-events-none z-[1000000] hidden sm:block origin-center shadow-[0_0_12px_rgba(255,59,31,0.75)]"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: '-7px',
          marginTop: '-7px',
          rotate: smoothAngle,
          scaleX: blobStretch,
          scaleY: blobSquash,
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 2.2 : 1,
          borderRadius: isHovering 
            ? '50%'
            : [
                '48% 52% 56% 44% / 52% 48% 54% 46%',
                '54% 46% 44% 56% / 46% 54% 48% 52%',
                '44% 56% 52% 48% / 54% 46% 52% 48%',
                '48% 52% 56% 44% / 52% 48% 54% 46%',
              ],
        }}
        transition={{
          scale: { type: 'tween', duration: 0.15 },
          borderRadius: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      
      {/* Outer Organic Blob Ring: moves with fluid drag & subtle morphing */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/45 pointer-events-none z-[1000000] hidden sm:block origin-center shadow-[0_0_15px_rgba(255,255,255,0.08)] backdrop-blur-[0.5px]"
        style={{
          x: smoothX,
          y: smoothY,
          marginLeft: '-20px',
          marginTop: '-20px',
          rotate: smoothAngle,
          scaleX: blobStretch,
          scaleY: blobSquash,
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovering ? 1.35 : 1,
          opacity: isHovering ? 0 : 0.85,
          borderRadius: isClicking
            ? '50%'
            : isHovering
              ? '50%'
              : [
                  '44% 56% 62% 38% / 54% 46% 54% 46%',
                  '56% 44% 38% 62% / 46% 54% 44% 56%',
                  '40% 60% 54% 46% / 58% 42% 56% 44%',
                  '44% 56% 62% 38% / 54% 46% 54% 46%',
                ],
        }}
        transition={{
          scale: { type: 'tween', duration: 0.2 },
          opacity: { duration: 0.2 },
          borderRadius: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </>
  );
}
