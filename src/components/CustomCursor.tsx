import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates
  const mouse = useRef({ x: -100, y: -100 });
  const prevMouse = useRef({ x: -100, y: -100 });

  // Physics positions
  const dot = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });

  // Directional physics: angle & gentle deformation
  const angle = useRef(0);
  const targetAngle = useRef(0);
  const stretch = useRef(1);
  const squash = useRef(1);

  const isHoveringRef = useRef(false);
  isHoveringRef.current = isHovering;

  const isClickingRef = useRef(false);
  isClickingRef.current = isClicking;

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse / trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) {
        setIsVisible(true);
        dot.current.x = e.clientX;
        dot.current.y = e.clientY;
        trail.current.x = e.clientX;
        trail.current.y = e.clientY;
        prevMouse.current.x = e.clientX;
        prevMouse.current.y = e.clientY;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;

    // Smooth, controlled 120Hz RAF Physics Loop
    const renderPhysics = (time: number) => {
      const hovering = isHoveringRef.current;
      const clicking = isClickingRef.current;

      // Calculate instantaneous mouse delta (velocity)
      const vx = mouse.current.x - prevMouse.current.x;
      const vy = mouse.current.y - prevMouse.current.y;
      prevMouse.current.x = mouse.current.x;
      prevMouse.current.y = mouse.current.y;

      const speed = Math.hypot(vx, vy);

      // 1. Inner core dot follows cursor directly for crisp responsiveness
      dot.current.x = mouse.current.x;
      dot.current.y = mouse.current.y;

      if (hovering) {
        // IN HOVER:
        // Outer circle snaps statically right to the cursor position (no outward runaway drift!)
        trail.current.x += (mouse.current.x - trail.current.x) * 0.35;
        trail.current.y += (mouse.current.y - trail.current.y) * 0.35;

        // Reset stretch and angle smoothly to neutral
        stretch.current += (1 - stretch.current) * 0.2;
        squash.current += (1 - squash.current) * 0.2;
        targetAngle.current = 0;
        angle.current += (0 - angle.current) * 0.15;

        // Very subtle, calm organic breathing (2.5% breathing wave)
        const organicBreath = 1 + Math.sin(time * 0.0035) * 0.025;
        const clickScale = clicking ? 0.88 : 1;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%) scale(${clickScale})`;
        }

        if (trailRef.current) {
          trailRef.current.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0) translate(-50%, -50%) scale(${organicBreath * clickScale})`;
        }
      } else {
        // IN REGULAR MOVEMENT:
        // Smooth controlled follow (calm lerp, no runaway swings)
        trail.current.x += (mouse.current.x - trail.current.x) * 0.22;
        trail.current.y += (mouse.current.y - trail.current.y) * 0.22;

        // Directional angle only updates when moving meaningfully (> 1.2px)
        if (speed > 1.2) {
          const rad = Math.atan2(vy, vx);
          targetAngle.current = rad * (180 / Math.PI);
        }

        // Shortest arc angle interpolation
        let angleDiff = targetAngle.current - angle.current;
        while (angleDiff < -180) angleDiff += 360;
        while (angleDiff > 180) angleDiff -= 360;
        angle.current += angleDiff * 0.15;

        // Controlled, refined stretch (capped at 1.22 max, subtle organic fluid droplet)
        const targetStretch = 1 + Math.min(speed * 0.012, 0.22);
        stretch.current += (targetStretch - stretch.current) * 0.18;
        squash.current = 1 / Math.sqrt(stretch.current);

        const clickScale = clicking ? 0.85 : 1;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%) rotate(${angle.current}deg) scale(${stretch.current * clickScale}, ${squash.current * clickScale})`;
        }

        if (trailRef.current) {
          const outerStretch = 1 + (stretch.current - 1) * 1.15;
          const outerSquash = 1 / Math.sqrt(outerStretch);
          trailRef.current.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0) translate(-50%, -50%) rotate(${angle.current}deg) scale(${outerStretch * clickScale}, ${outerSquash * clickScale})`;
        }
      }

      animationFrameId = requestAnimationFrame(renderPhysics);
    };

    animationFrameId = requestAnimationFrame(renderPhysics);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Inner Core Fluid Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100] hidden md:block will-change-transform transition-[width,height,background-color,border-radius,opacity] duration-200 ${
          isHovering
            ? 'w-2 h-2 bg-[#e8b4b8] rounded-full opacity-90'
            : 'w-3 h-3 bg-[#B8C5A8] shadow-[0_0_10px_rgba(184,197,168,0.85)] rounded-[60%_40%_52%_48%_/_50%_50%_50%_50%]'
        }`}
        style={{
          transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Secondary Outer Organic Aura Ring */}
      <div
        ref={trailRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100] hidden md:block will-change-transform transition-[width,height,border-color,border-radius,background-color,opacity] duration-250 ${
          isHovering
            ? 'w-12 h-12 border-1.5 border-[#e8b4b8] bg-[#e8b4b8]/10 backdrop-blur-[1px] opacity-95 rounded-[46%_54%_52%_48%_/_50%_48%_52%_50%]'
            : 'w-8 h-8 border border-[#B8C5A8]/60 shadow-[0_0_12px_rgba(184,197,168,0.3)] opacity-70 rounded-[58%_42%_52%_48%_/_48%_52%_48%_52%]'
        }`}
        style={{
          transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
