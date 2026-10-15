import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Divider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        diamondRef.current,
        { scale: 0, rotation: 0, opacity: 0 },
        { scale: 1, rotation: 405, opacity: 1, duration: 0.7, ease: 'back.out(2)' }
      ).fromTo(
        [leftLineRef.current, rightLineRef.current],
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.08 },
        '-=0.45'
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center py-16 opacity-75 overflow-hidden">
      <div 
        ref={leftLineRef} 
        className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-vampire-red/20 to-vampire-red/50 origin-right" 
      />
      <div className="mx-6 flex items-center justify-center relative">
        <div 
          ref={diamondRef} 
          className="w-3 h-3 bg-[#B8C5A8] rotate-45 organic-diamond shadow-[0_0_15px_rgba(184,197,168,0.7)]" 
        />
      </div>
      <div 
        ref={rightLineRef} 
        className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-vampire-red/20 to-vampire-red/50 origin-left" 
      />
    </div>
  );
}
