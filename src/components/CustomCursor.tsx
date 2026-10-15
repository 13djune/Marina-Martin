import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Instant positions for primary cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Velocity tracking across X and Y axes
  const velX = useVelocity(cursorX);
  const velY = useVelocity(cursorY);

  // Smooth positions for outer fluid aura
  const ringSpringConfig = { damping: 22, stiffness: 260, mass: 0.55 };
  const smoothX = useSpring(cursorX, ringSpringConfig);
  const smoothY = useSpring(cursorY, ringSpringConfig);

  // Combined speed along the motion trajectory (capped to keep deformation elegant)
  const speed = useTransform(() => {
    const vx = velX.get();
    const vy = velY.get();
    return Math.min(Math.hypot(vx, vy), 1400);
  });

  // Angle of motion along the X and Y axes
  const moveAngle = useTransform(() => {
    const vx = velX.get();
    const vy = velY.get();
    if (Math.hypot(vx, vy) < 25) return 0;
    return Math.atan2(vy, vx) * (180 / Math.PI);
  });
  const smoothAngle = useSpring(moveAngle, { damping: 20, stiffness: 320 });

  // Axis-responsive elongation: stretches along the movement vector
  const stretch = useTransform(speed, [0, 1200], [1, 1.55]);
  const smoothStretch = useSpring(stretch, { damping: 18, stiffness: 300 });

  // Incompressible fluid volume conservation: squashes perpendicularly
  const squash = useTransform(speed, [0, 1200], [1, 0.74]);
  const smoothSquash = useSpring(squash, { damping: 18, stiffness: 300 });

  // Outer ring deformation along movement axis
  const outerStretch = useSpring(
    useTransform(speed, [0, 1200], [1, 1.38]),
    { damping: 20, stiffness: 250 }
  );
  const outerSquash = useSpring(
    useTransform(speed, [0, 1200], [1, 0.82]),
    { damping: 20, stiffness: 250 }
  );

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (mouse)
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
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button'
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
      {/* Primary Fluid Droplet with mix-blend-difference on interaction */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[1000000] hidden sm:block origin-center rounded-full ${
          isHovering 
            ? 'w-10 h-10 bg-[#B8C5A8] mix-blend-difference shadow-none' 
            : 'w-3.5 h-3.5 bg-[#B8C5A8] shadow-[0_0_14px_rgba(184,197,168,0.85)]'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: isHovering ? '-20px' : '-7px',
          marginTop: isHovering ? '-20px' : '-7px',
          rotate: isHovering ? 0 : smoothAngle,
          scaleX: isHovering ? 1 : smoothStretch,
          scaleY: isHovering ? 1 : smoothSquash,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1 : 1,
          borderRadius: isHovering 
            ? '50%'
            : [
                '60% 40% 50% 50% / 50% 50% 50% 50%',
                '50% 50% 40% 60% / 45% 55% 45% 55%',
                '40% 60% 55% 45% / 55% 45% 55% 45%',
                '60% 40% 50% 50% / 50% 50% 50% 50%',
              ],
        }}
        transition={{
          scale: { type: 'spring', stiffness: 350, damping: 22 },
          borderRadius: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      
      {/* Outer Organic Fluid Aura Ring */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[1000000] hidden sm:block origin-center rounded-full transition-opacity duration-200 ${
          isHovering 
            ? 'w-14 h-14 border-2 border-[#B8C5A8] mix-blend-difference' 
            : 'w-10 h-10 border border-[#B8C5A8]/70 shadow-[0_0_18px_rgba(184,197,168,0.4)]'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          marginLeft: isHovering ? '-28px' : '-20px',
          marginTop: isHovering ? '-28px' : '-20px',
          rotate: isHovering ? 0 : smoothAngle,
          scaleX: isHovering ? 1 : outerStretch,
          scaleY: isHovering ? 1 : outerSquash,
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovering ? 1.05 : 1,
          opacity: isHovering ? 0.95 : 0.8,
          borderRadius: isHovering
            ? '50%'
            : [
                '45% 55% 65% 35% / 55% 45% 55% 45%',
                '58% 42% 38% 62% / 45% 55% 42% 58%',
                '40% 60% 52% 48% / 60% 40% 58% 42%',
                '45% 55% 65% 35% / 55% 45% 55% 45%',
              ],
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 24 },
          borderRadius: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </>
  );
}
