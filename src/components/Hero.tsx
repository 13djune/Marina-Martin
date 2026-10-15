import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowDownRight, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import SideRays from './SideRays';
import BotanicalBackground from './BotanicalBackground';

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
  const descCardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Initial Choreographed Editorial Entrance Timeline
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTl
        .fromTo(
          [plateLeftRef.current, plateRightRef.current],
          { y: 50, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 1.3, stagger: 0.2, delay: 0.1 }
        )
        .fromTo(
          subtitleRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.9'
        )
        .fromTo(
          titleLine1Ref.current,
          { y: 80, opacity: 0, skewY: 3 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.2 },
          '-=0.7'
        )
        .fromTo(
          titleLine2Ref.current,
          { y: 90, opacity: 0, skewY: -3 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.2 },
          '-=0.9'
        )
        .fromTo(
          descCardRef.current,
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.2)' },
          '-=0.6'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        );

      // Continuous subtle bounce on scroll indicator
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current.querySelector('.chevron-bounce'), {
          y: 6,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: 'power1.inOut',
        });
      }

      // 2. Parallax layers on scroll down
      if (titleLine1Ref.current) {
        gsap.to(titleLine1Ref.current, {
          xPercent: -8,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      if (titleLine2Ref.current) {
        gsap.to(titleLine2Ref.current, {
          xPercent: 8,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      if (plateRightRef.current) {
        gsap.to(plateRightRef.current, {
          yPercent: -25,
          rotate: 6,
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
          yPercent: 20,
          rotate: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      if (descCardRef.current) {
        gsap.to(descCardRef.current, {
          yPercent: 30,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '60% top',
            scrub: 0.5,
          },
        });
      }

      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '25% top',
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
      className="relative min-h-[100svh] flex flex-col justify-between items-center overflow-hidden pt-24 pb-12 px-4 sm:px-6 md:px-12 select-none"
      style={{ backgroundColor: '#22121b' }}
    >
      {/* 1. Dark Moody Botanical Background with Chiaroscuro Floral Centerpiece */}
      <BotanicalBackground />

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

      {/* 3. Secondary Curated Photographic Plates (Layered beneath & intersected by massive typography) */}
      {/* Secondary Photo 1 - Top-Right Archival Plate */}
      <div 
        ref={plateRightRef}
        className="absolute right-4 sm:right-8 md:right-16 lg:right-24 top-28 sm:top-32 md:top-36 z-10 pointer-events-none max-w-[170px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-[340px] will-change-transform"
      >
        <div className="p-2 sm:p-2.5 rounded-none backdrop-blur-xl bg-[#22121b]/60 border border-[#B8C5A8]/30 shadow-[0_20px_60px_rgba(22,32,18,0.85)] rotate-3">
          <div className="relative aspect-[4/5] overflow-hidden border border-[#B8C5A8]/20 bg-[#24301d]">
            <img 
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=900&auto=format&fit=crop" 
              alt="Archival Nocturne Flora" 
              className="w-full h-full object-cover filter contrast-110 brightness-90 hover:scale-105 transition-transform duration-700"
            />
            {/* Chiaroscuro vignette overlay on photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#162012]/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#B8C5A8]">
              <span>FIG. 01 · NOCTURNA</span>
              <span>8K CHIAROSCURO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Photo 2 - Lower-Left Editorial Dissection Plate */}
      <div 
        ref={plateLeftRef}
        className="absolute left-4 sm:left-8 md:left-14 lg:left-20 bottom-36 sm:bottom-40 md:bottom-44 z-10 pointer-events-none max-w-[150px] sm:max-w-[190px] md:max-w-[250px] lg:max-w-[280px] will-change-transform hidden sm:block"
      >
        <div className="p-2 rounded-none backdrop-blur-xl bg-[#22121b]/60 border border-[#B8C5A8]/30 shadow-[0_20px_60px_rgba(22,32,18,0.85)] -rotate-3">
          <div className="relative aspect-[3/4] overflow-hidden border border-[#B8C5A8]/20 bg-[#24301d]">
            <img 
              src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop" 
              alt="Botanical Study Dissection" 
              className="w-full h-full object-cover filter contrast-115 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#22121b]/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[8px] font-mono tracking-widest text-[#B8C5A8]">
              <span>PLATE 04 · STUDY</span>
              <span>EXP. 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Top Editorial Kicker & Exhibition Coordinates */}
      <div 
        ref={subtitleRef}
        className="relative z-20 w-full max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#B8C5A8] border-b border-[#B8C5A8]/20 pb-3"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#B8C5A8] animate-pulse" aria-hidden="true" />
          <span className="font-bold text-[#B8C5A8]">{t("CONCEPT ART & ENTORNO", "CONCEPT ART & ENVIRONMENT")}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#B8C5A8]/80">
          <span>{t("MADRID · REMOTO", "MADRID · REMOTE")}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8C5A8]" aria-hidden="true" />
          <span>{t("ILUMINACIÓN CINEMATOGRÁFICA 8K", "8K CINEMATIC LIGHTING")}</span>
        </div>
      </div>

      {/* 5. MASSIVE BOLD TYPOGRAPHY: Intentionally Overlapping, Intersecting & Sitting Directly on Top */}
      <div 
        ref={contentRef}
        className="relative z-20 w-full max-w-[1600px] my-auto flex flex-col items-center justify-center text-center pointer-events-none"
      >
        {/* Line 1: Colossal First Name overlapping the floral center and secondary plates */}
        <h1 
          ref={titleLine1Ref}
          className="text-[3.8rem] sm:text-[6.5rem] md:text-[9rem] lg:text-[12rem] xl:text-[14.5rem] 2xl:text-[17rem] font-serif font-black tracking-tighter uppercase leading-[0.78] text-[#B8C5A8] drop-shadow-[0_20px_45px_rgba(22,32,18,0.95)] transform will-change-transform select-none"
          style={{ textShadow: '0 8px 30px rgba(22,32,18,0.95)' }}
        >
          MARINA
        </h1>

        {/* Central Intersecting Editorial Ribbon across the flowers */}
        <div className="my-[-0.5rem] sm:my-[-1rem] lg:my-[-1.5rem] z-30 px-4 py-1 sm:px-6 sm:py-1.5 backdrop-blur-md bg-[#22121b]/70 border-y border-[#B8C5A8]/30 max-w-2xl text-[10px] sm:text-xs md:text-sm font-serif italic text-[#B8C5A8] tracking-[0.2em] uppercase">
          {t("«Mundos Nocturnos de Flora y Claroscuro»", "«Nocturne Worlds of Flora & Chiaroscuro»")}
        </div>

        {/* Line 2: Colossal Surname intersecting right through the dusty pink floral petals */}
        <h1 
          ref={titleLine2Ref}
          className="text-[3.8rem] sm:text-[6.5rem] md:text-[9rem] lg:text-[12rem] xl:text-[14.5rem] 2xl:text-[17rem] font-serif font-black tracking-tighter uppercase leading-[0.78] text-[#B8C5A8] drop-shadow-[0_20px_45px_rgba(22,32,18,0.95)] transform will-change-transform select-none"
          style={{ textShadow: '0 8px 30px rgba(22,32,18,0.95)' }}
        >
          MARTÍN
        </h1>
      </div>

      {/* 6. Heavy Frosted Glass Blur Panels for Negative Space & Usability */}
      <div className="relative z-20 w-full max-w-7xl flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-auto">
        
        {/* Editorial Card: Frosted Negative Space with Artist Statement & CTA */}
        <div 
          ref={descCardRef}
          className="p-5 sm:p-6 md:p-7 rounded-none backdrop-blur-2xl bg-[#22121b]/70 border border-[#B8C5A8]/30 shadow-[0_25px_60px_rgba(22,32,18,0.85)] max-w-md will-change-transform"
        >
          <div className="flex items-center gap-2 mb-2.5 text-[10px] font-mono tracking-widest text-[#B8C5A8] uppercase">
            <Compass size={13} className="text-[#B8C5A8]" aria-hidden="true" />
            <span>{t("DECLARACIÓN ARTÍSTICA", "ARTIST STATEMENT")}</span>
          </div>
          <p className="font-serif italic text-xs sm:text-sm text-[#B8C5A8] leading-relaxed mb-5">
            {t(
              "Concept artist especializada en traducir ideas en ilustraciones llenas de vida, movimiento, claroscuro y atmósferas botánicas densas.",
              "Concept artist specializing in translating ideas into illustrations full of life, movement, chiaroscuro, and dense botanical atmospheres."
            )}
          </p>

          <div className="flex items-center gap-3">
            <a
              ref={ctaRef}
              href="#portfolio"
              className="inline-flex items-center gap-2.5 border-2 border-[#B8C5A8] bg-[#24301d]/90 text-[#B8C5A8] px-6 sm:px-8 py-3.5 uppercase tracking-[0.25em] font-mono text-xs font-bold hover:bg-[#B8C5A8] hover:text-[#162012] transition-all duration-300 rounded-none min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8] shadow-lg active:scale-95"
            >
              <span>{t("Explorar Obras", "Explore Works")}</span>
              <ArrowDownRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-[#B8C5A8] hover:underline underline-offset-4 px-2 py-3 min-h-[44px]"
            >
              {t("Biografía", "Biography")}
            </a>
          </div>
        </div>
      </div>

      {/* 7. Scroll Indicator with Pale Sage Icon */}
      <div
        ref={scrollIndicatorRef}
        className="mt-6 flex flex-col items-center gap-1.5 text-[#B8C5A8] will-change-transform pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-mono font-bold">{t("DESPLAZAR", "SCROLL")}</span>
        <div className="chevron-bounce">
          <ChevronDown size={18} className="text-[#B8C5A8]" />
        </div>
      </div>
    </section>
  );
}
