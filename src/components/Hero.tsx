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

      // 2. Smooth, Unified Parallax on Scroll (Inertial smoothing prevents micro-jumps)
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -12,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '85% top',
            scrub: 0.8,
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
            scrub: 0.8,
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
            scrub: 0.8,
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
            scrub: 0.5,
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
    >
      {/* 1. Cinematic Deep Burgundy Mauve Atmosphere (#5E3F47) */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(125, 82, 93, 0.45) 0%, rgba(94, 63, 71, 0.85) 50%, rgba(65, 40, 48, 0.98) 100%)'
        }}
        aria-hidden="true"
      />
      
      {/* Subtle Luminous Sage & Ambient Sheens */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(184, 197, 168, 0.09) 0%, transparent 65%), radial-gradient(circle at 20% 80%, rgba(184, 197, 168, 0.07) 0%, transparent 60%)'
        }}
        aria-hidden="true"
      />

      {/* 2. Unified Atmospheric Green Corner Light Emitter & WebGL Rays (#5D6E4D) */}
      {/* High-performance single ambient glow (no muddy overlapping blurs or delayed blend-screen layers) */}
      <div 
        className="absolute -top-12 -right-12 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(184, 197, 168, 0.45) 0%, rgba(93, 110, 77, 0.3) 38%, rgba(50, 65, 40, 0.12) 65%, transparent 80%)',
          filter: 'blur(30px)',
          opacity: 0.85,
        }}
        aria-hidden="true"
      />

      {/* Volumetric Atmospheric WebGL Rays in #5D6E4D (Instant hardware-accelerated rendering) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-85 mix-blend-screen">
        <SideRays
          speed={0.8}
          rayColor1="#5D6E4D"
          rayColor2="#3E4E32"
          intensity={1.35}
          spread={2.4}
          origin="top-right"
          tilt={-16}
          saturation={1.1}
          blend={0.7}
          falloff={1.4}
          opacity={0.8}
        />
      </div>

      {/* 3. Transparent PNG Sculptures Interleaved with Typography */}
      {/* Right Transparent PNG: Classical Chiaroscuro Sculpture Figure */}
      <div 
        ref={plateRightRef}
        className="absolute -right-2 sm:right-4 md:right-10 lg:right-16 top-20 sm:top-24 md:top-28 z-10 pointer-events-none w-[125px] sm:w-[190px] md:w-[260px] lg:w-[330px] xl:w-[400px] will-change-transform opacity-75 sm:opacity-85 md:opacity-95 transition-opacity"
      >
        <img 
          src="/images/hero-sculpture-1.png" 
          alt="Concept Art Classical Form" 
          className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] contrast-110 brightness-95 hover:scale-105 transition-transform duration-700 pointer-events-none border-0"
        />
      </div>

      {/* Left Transparent PNG: Concept Art Figure Silhouette */}
      <div 
        ref={plateLeftRef}
        className="absolute -left-2 sm:left-4 md:left-8 lg:left-14 bottom-16 sm:bottom-20 md:bottom-24 z-10 pointer-events-none w-[105px] sm:w-[160px] md:w-[220px] lg:w-[280px] xl:w-[340px] will-change-transform opacity-70 sm:opacity-80 md:opacity-90 transition-opacity"
      >
        <img 
          src="/images/hero-figure-2.png" 
          alt="Concept Art Anatomical Study" 
          className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] contrast-110 brightness-95 hover:scale-105 transition-transform duration-700 pointer-events-none border-0"
        />
      </div>

      {/* 4. Top Editorial Kicker & Exhibition Coordinates */}
      <div 
        ref={subtitleRef}
        className="relative z-20 w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#faf7f2] border-b border-white/20 pb-2.5 sm:pb-3 text-center sm:text-left font-semibold"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-[#B8C5A8]" aria-hidden="true" />
          <span className="font-bold text-[#faf7f2]">{t("CONCEPT ART & ENTORNO", "CONCEPT ART & ENVIRONMENT")}</span>
        </div>

        {/* Circular Preview Lenses (Inspired directly by Reference Photo 2) */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-[#eedbe1] font-sans">
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-[#B8C5A8]/30 font-mono text-[9px] text-[#B8C5A8]">[ {t("Concepto", "Concept")} ]</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-[#B8C5A8]/30 font-mono text-[9px] text-[#B8C5A8]">[ {t("Claroscuro", "Chiaroscuro")} ]</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-[#B8C5A8]/30 font-mono text-[9px] text-[#B8C5A8]">[ {t("Atmósfera", "Atmosphere")} ]</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] text-[#eedbe1]">
          <span>{t("MADRID · REMOTO", "MADRID · REMOTE")}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8C5A8]" aria-hidden="true" />
          <span>{t("ILUMINACIÓN CINEMATOGRÁFICA", "CINEMATIC LIGHTING")}</span>
        </div>
      </div>

      {/* 5. MASSIVE BOLD ARCHITECTURAL TYPOGRAPHY: Interleaved with Concept Art Sculptures */}
      <div 
        ref={contentRef}
        className="relative z-20 w-full max-w-[1600px] my-auto flex flex-col items-center justify-center text-center pointer-events-none px-2"
      >
        {/* Line 1: First Name */}
        <h1 
          ref={titleLine1Ref}
          className="text-[13.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[11.5vw] xl:text-[13.5rem] 2xl:text-[15.5rem] font-serif font-black tracking-tighter uppercase leading-[0.84] sm:leading-[0.8] text-[#faf7f2] drop-shadow-[0_12px_35px_rgba(0,0,0,0.6)] transform will-change-transform select-none"
        >
          MARINA
        </h1>

        {/* Central Intersecting Editorial Ribbon (Moss Green Card with Frosted Specular Sheen) */}
        <div className="my-0.5 sm:my-[-0.75rem] lg:my-[-1.25rem] z-30 px-4 py-1.5 sm:px-7 sm:py-2 rounded-xl backdrop-blur-2xl bg-[#5b6c4b]/95 text-[#faf7f2] border border-[#7e946a] max-w-[94vw] sm:max-w-xl text-[10px] sm:text-xs md:text-sm font-serif italic tracking-[0.16em] sm:tracking-[0.18em] uppercase shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_1.5px_1px_rgba(255,255,255,0.4)] font-bold">
          {t("«Arte Conceptual · Iluminación & Claroscuro»", "«Concept Art · Lighting & Chiaroscuro»")}
        </div>

        {/* Line 2: Surname */}
        <h1 
          ref={titleLine2Ref}
          className="text-[13.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[11.5vw] xl:text-[13.5rem] 2xl:text-[15.5rem] font-serif font-black tracking-tighter uppercase leading-[0.84] sm:leading-[0.8] text-[#faf7f2] drop-shadow-[0_12px_35px_rgba(0,0,0,0.6)] transform will-change-transform select-none"
        >
          MARTÍN
        </h1>
      </div>

      {/* 6. Scroll Indicator with Safe Bottom Spacing */}
      <div
        ref={scrollIndicatorRef}
        className="mt-3 sm:mt-6 pb-1 sm:pb-0 flex flex-col items-center gap-1 text-[#faf7f2] will-change-transform pointer-events-none font-semibold"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-mono font-bold text-[#B8C5A8]">{t("DESPLAZAR", "SCROLL")}</span>
        <div className="chevron-bounce">
          <ChevronDown size={18} className="text-[#B8C5A8]" />
        </div>
      </div>
    </section>
  );
}
