import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import SideRays from './SideRays';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const plateRightRef = useRef<HTMLDivElement>(null);
  const plateLeftRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Initial Calm, Luxurious Editorial Entrance Timeline
      const introTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      introTl
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
        )
        .fromTo(
          [titleLine1Ref.current, titleLine2Ref.current],
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          [plateLeftRef.current, plateRightRef.current],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
          '-=0.6'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );

      // Continuous subtle breath on scroll indicator
      if (scrollIndicatorRef.current) {
        const bounceEl = scrollIndicatorRef.current.querySelector('.chevron-bounce');
        if (bounceEl) {
          gsap.to(bounceEl, {
            y: 5,
            repeat: -1,
            yoyo: true,
            duration: 1.0,
            ease: 'sine.inOut',
          });
        }
      }

      // 2. Smooth, Unified Parallax on Scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -15,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '85% top',
            scrub: true,
          },
        });
      }

      if (plateRightRef.current) {
        gsap.to(plateRightRef.current, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (plateLeftRef.current) {
        gsap.to(plateLeftRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '20% top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[100svh] flex flex-col justify-between items-center overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 md:px-12 select-none"
      style={{ backgroundColor: '#22121b' }}
    >
      {/* 1. Cinematic Atmospheric Chiaroscuro Background (Zero flowers, pure dark atmospheric depth) */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, #2a1421 0%, #1e0d17 40%, #172214 75%, #0d140a 100%)'
        }}
        aria-hidden="true"
      />
      
      {/* Subtle Dusty Rose / Pale Sage ambient atmospheric glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(232, 180, 184, 0.08) 0%, transparent 65%), radial-gradient(circle at 20% 80%, rgba(36, 48, 29, 0.6) 0%, transparent 60%)'
        }}
        aria-hidden="true"
      />

      {/* 2. Cinematic Volumetric Lighting Rays */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <SideRays
          speed={1.2}
          rayColor1="#B8C5A8"
          rayColor2="#24301d"
          intensity={1.2}
          spread={2.2}
          origin="top-right"
          tilt={-12}
          saturation={0.9}
          blend={0.6}
          falloff={1.1}
          opacity={0.3}
        />
      </div>

      {/* 3. Transparent PNG Figures without Borders (Concept Art & Fine Arts Sculptures) */}
      {/* Right Transparent PNG: Classical Chiaroscuro Sculpture Figure (No border, no card, pure PNG cutout) */}
      <div 
        ref={plateRightRef}
        className="absolute -right-2 sm:right-4 md:right-10 lg:right-16 top-20 sm:top-24 md:top-28 z-10 pointer-events-none w-[115px] sm:w-[180px] md:w-[250px] lg:w-[320px] xl:w-[380px] will-change-transform opacity-35 sm:opacity-55 md:opacity-75 transition-opacity"
      >
        <img 
          src="/images/hero-sculpture-1.png" 
          alt="Concept Art Classical Form" 
          className="w-full h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(232,180,184,0.18)] contrast-125 brightness-90 hover:scale-105 transition-transform duration-700 pointer-events-none border-0"
        />
      </div>

      {/* Left Transparent PNG: Concept Art Figure Silhouette (No border, no card, pure PNG cutout) */}
      <div 
        ref={plateLeftRef}
        className="absolute -left-2 sm:left-4 md:left-8 lg:left-14 bottom-16 sm:bottom-20 md:bottom-24 z-10 pointer-events-none w-[95px] sm:w-[150px] md:w-[210px] lg:w-[270px] xl:w-[320px] will-change-transform opacity-30 sm:opacity-45 md:opacity-70 transition-opacity"
      >
        <img 
          src="/images/hero-figure-2.png" 
          alt="Concept Art Anatomical Study" 
          className="w-full h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(184,197,168,0.15)] contrast-125 brightness-90 hover:scale-105 transition-transform duration-700 pointer-events-none border-0"
        />
      </div>

      {/* 4. Top Editorial Kicker & Exhibition Coordinates (Fully Responsive on Mobile) */}
      <div 
        ref={subtitleRef}
        className="relative z-20 w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#B8C5A8] border-b border-white/10 pb-2.5 sm:pb-3 text-center sm:text-left"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-[#e8b4b8] animate-pulse" aria-hidden="true" />
          <span className="font-bold text-[#B8C5A8]">{t("CONCEPT ART & ENTORNO", "CONCEPT ART & ENVIRONMENT")}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] text-[#B8C5A8]/80">
          <span>{t("MADRID · REMOTO", "MADRID · REMOTE")}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8b4b8]" aria-hidden="true" />
          <span>{t("ILUMINACIÓN CINEMATOGRÁFICA 8K", "8K CINEMATIC LIGHTING")}</span>
        </div>
      </div>

      {/* 5. MASSIVE BOLD TYPOGRAPHY: Perfectly Responsive Fluid VW Scaling with Zero Overflow */}
      <div 
        ref={contentRef}
        className="relative z-20 w-full max-w-[1600px] my-auto flex flex-col items-center justify-center text-center pointer-events-none px-2"
      >
        {/* Line 1: First Name scaling gracefully without wrapping or clipping on any mobile */}
        <h1 
          ref={titleLine1Ref}
          className="text-[13.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[11.5vw] xl:text-[13.5rem] 2xl:text-[15.5rem] font-serif font-black tracking-tighter uppercase leading-[0.84] sm:leading-[0.8] text-[#B8C5A8] drop-shadow-[0_15px_35px_rgba(22,32,18,0.95)] transform will-change-transform select-none"
          style={{ textShadow: '0 8px 30px rgba(22,32,18,0.95)' }}
        >
          MARINA
        </h1>

        {/* Central Intersecting Editorial Ribbon (Updated without flowers) */}
        <div className="my-0.5 sm:my-[-0.75rem] lg:my-[-1.25rem] z-30 px-3.5 py-1 sm:px-6 sm:py-1.5 backdrop-blur-md bg-[#22121b]/80 border-y border-[#e8b4b8]/35 max-w-[94vw] sm:max-w-xl text-[9px] sm:text-xs md:text-sm font-serif italic text-bone tracking-[0.18em] sm:tracking-[0.2em] uppercase shadow-lg">
          {t("«Arte Conceptual · Iluminación & Claroscuro»", "«Concept Art · Lighting & Chiaroscuro»")}
        </div>

        {/* Line 2: Surname scaling gracefully */}
        <h1 
          ref={titleLine2Ref}
          className="text-[13.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[11.5vw] xl:text-[13.5rem] 2xl:text-[15.5rem] font-serif font-black tracking-tighter uppercase leading-[0.84] sm:leading-[0.8] text-[#B8C5A8] drop-shadow-[0_15px_35px_rgba(22,32,18,0.95)] transform will-change-transform select-none"
          style={{ textShadow: '0 8px 30px rgba(22,32,18,0.95)' }}
        >
          MARTÍN
        </h1>
      </div>

      {/* 6. Scroll Indicator with Safe Bottom Spacing */}
      <div
        ref={scrollIndicatorRef}
        className="mt-3 sm:mt-6 pb-1 sm:pb-0 flex flex-col items-center gap-1 text-[#B8C5A8] will-change-transform pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-mono font-bold text-[#B8C5A8]/90">{t("DESPLAZAR", "SCROLL")}</span>
        <div className="chevron-bounce">
          <ChevronDown size={18} className="text-[#e8b4b8]" />
        </div>
      </div>
    </section>
  );
}
