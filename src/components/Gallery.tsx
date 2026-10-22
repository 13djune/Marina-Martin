import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Sparkles, Layers } from 'lucide-react';
import { galleryItems, Project } from '../data';
import { useLanguage } from '../LanguageContext';
import SketchbookCoverCard from './SketchbookCoverCard';
import ProjectDetail from './ProjectDetail';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
      .fromTo(
        redLineRef.current,
        { opacity: 0.6 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        filterRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.25'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const categories = useMemo(() => [
    { id: 'all', labelEs: 'Todos', labelEn: 'All' },
    { id: 'environment', labelEs: 'Entornos', labelEn: 'Environments' },
    { id: 'character', labelEs: 'Personajes', labelEn: 'Characters' },
    { id: 'props', labelEs: 'Atrezo & Props', labelEn: 'Props' },
    { id: 'keyframe', labelEs: 'Keyframe & Escenas', labelEn: 'Keyframe' },
  ], []);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'environment') {
        return item.categoryEs.toLowerCase().includes('entorno') || item.categoryEn.toLowerCase().includes('environment');
      }
      if (activeCategory === 'character') {
        return item.categoryEs.toLowerCase().includes('personaje') || item.categoryEn.toLowerCase().includes('character');
      }
      if (activeCategory === 'props') {
        return item.categoryEs.toLowerCase().includes('atrezo') || item.categoryEn.toLowerCase().includes('prop');
      }
      if (activeCategory === 'keyframe') {
        return item.categoryEs.toLowerCase().includes('ilustraci') || item.categoryEn.toLowerCase().includes('keyframe');
      }
      return true;
    });
  }, [activeCategory]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: {
      opacity: 0,
      scale: 0.94,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <section 
      ref={sectionRef} 
      id="portfolio" 
      className="py-20 md:py-28 px-4 sm:px-6 md:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* ========================================================================= */}
        {/* EDITORIAL SHOWCASE CARD: Placed above Galería de Proyectos title           */}
        {/* ========================================================================= */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 mb-12 relative overflow-hidden backdrop-blur-2xl bg-white/[0.08] border border-white/25 shadow-[0_25px_65px_rgba(28,14,20,0.5),inset_0_1.5px_1.5px_rgba(255,255,255,0.4)]">
          {/* Top specular sheen */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

          {/* Top coordinates & pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-widest text-[#eedbe1] pb-4 mb-6 border-b border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold bg-[#5b6c4b]/30 px-2.5 py-0.5 rounded-full border border-[#B8C5A8]/30">[ {t("Visión Escultórica", "Sculptural Vision")} ]</span>
              <span className="bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10">[ {t("Atmósfera Cinematográfica", "Cinematic Atmosphere")} ]</span>
              <span className="bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10">[ {t("Claroscuro", "Chiaroscuro")} ]</span>
            </div>
            <div className="flex items-center gap-2 text-[#B8C5A8]">
              <Sparkles size={12} />
              <span>{t("DIRECCIÓN DE ARTE & NARRATIVA", "ART DIRECTION & LORE")}</span>
            </div>
          </div>

          {/* Large Interleaved Typography: Text woven with real artwork capsules and lenses */}
          <div className="text-left select-none space-y-3 sm:space-y-4">
            <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-[#faf7f2] leading-[1.15] tracking-tight flex flex-wrap items-center gap-x-3 gap-y-2.5">
              <span>{t("CREAMOS", "WE CREATE")}</span>
              
              {/* Inline Image Capsule 1 */}
              <span className="inline-flex items-center h-8 sm:h-11 md:h-13 px-2 sm:px-2.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md overflow-hidden shadow-lg transform hover:scale-105 transition-transform align-middle">
                <img 
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop" 
                  alt="Entorno orgánico" 
                  className="w-12 sm:w-16 md:w-20 h-5 sm:h-7 md:h-9 object-cover rounded-full"
                />
                <span className="text-[10px] font-mono text-[#B8C5A8] ml-1.5 hidden sm:inline">[{t("Entorno", "Environment")}]</span>
              </span>

              <span>{t("MUNDOS", "VISUAL")}</span>
              <span className="italic font-serif font-light text-[#B8C5A8]">{t("VISUALES", "WORLDS")}</span>
              
              {/* Inline Circular Image Lens 2 */}
              <span className="inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-full bg-white/20 border-2 border-white/40 overflow-hidden shadow-lg transform hover:scale-110 transition-transform align-middle">
                <img 
                  src="/images/hero-sculpture-1.png" 
                  alt="Estudio 3D" 
                  className="w-full h-full object-contain p-0.5"
                />
              </span>

              <span>{t("PARA", "FOR")}</span>
              <span>{t("CINE", "CINEMA")}</span>

              {/* Inline Image Capsule 3 */}
              <span className="inline-flex items-center h-8 sm:h-11 md:h-13 px-2 sm:px-2.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md overflow-hidden shadow-lg transform hover:scale-105 transition-transform align-middle">
                <img 
                  src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=400&auto=format&fit=crop" 
                  alt="Personaje y ropaje" 
                  className="w-12 sm:w-16 md:w-20 h-5 sm:h-7 md:h-9 object-cover rounded-full"
                />
                <span className="text-[10px] font-mono text-[#B8C5A8] ml-1.5 hidden sm:inline">[{t("Personaje", "Character")}]</span>
              </span>

              <span>&</span>
              <span className="italic font-serif font-light text-[#faf7f2]">{t("VIDEOJUEGOS", "VIDEO GAMES")}</span>
            </div>

            <p className="text-xs sm:text-sm md:text-base font-serif italic text-[#eedbe1] max-w-3xl pt-2 leading-relaxed">
              {t(
                <>«Cada imagen es un destello de una <strong className="text-white font-semibold">historia no contada</strong>; la <strong className="text-white font-semibold">luz guía la mirada</strong>, mientras la <strong className="text-white font-semibold">forma esculpe la memoria visual</strong>.»</>,
                <>«Each image is a spark of an <strong className="text-white font-semibold">untold story</strong>; <strong className="text-white font-semibold">light leads the eye</strong> while <strong className="text-white font-semibold">form sculpts the visual memory</strong>.»</>
              )}
            </p>
          </div>
        </div>

        {/* Section Header: Galería de Proyectos */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
          <div ref={headerRef} className="will-change-transform">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-[0.25em] text-[#B8C5A8] font-bold">
              <BookOpen size={14} aria-hidden="true" />
              <span>{t("ARCHIVO DE CUADERNOS & ESTUDIOS", "SKETCHBOOK ARCHIVE & STUDIES")}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black uppercase text-[#faf7f2] italic leading-tight">
              {t("Galería de", "Project")}<br/>
              <span className="text-[#B8C5A8]">{t("Proyectos", "Gallery")}</span>
            </h2>
            <div 
              ref={redLineRef}
              className="w-24 h-1.5 bg-[#B8C5A8] mt-4 origin-left will-change-transform rounded-full"
            />
          </div>

          <div ref={descRef} className="max-w-md space-y-3 will-change-transform">
            <p className="text-[#eedbe1] text-sm md:text-base font-serif italic leading-relaxed">
              {t(
                <>Colección de <strong className="text-white font-semibold">cuadernos de bocetos encuadernados</strong>. Haz clic en cualquier portada para abrir el <strong className="text-white font-semibold">cuaderno interactivo en 3D</strong> y explorar su <strong className="text-white font-semibold">proceso de creación</strong>.</>,
                <>Collection of <strong className="text-white font-semibold">bound sketchbooks</strong>. Click on any cover to open the <strong className="text-white font-semibold">interactive 3D book</strong> and explore its <strong className="text-white font-semibold">creative development process</strong>.</>
              )}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#eedbe1]">
              <Sparkles size={13} className="text-[#B8C5A8]" aria-hidden="true" />
              <span>
                {t("Total en archivo:", "Archive total:")} <strong className="text-[#B8C5A8] font-bold">{galleryItems.length} {t("volúmenes", "volumes")}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs with Smooth Layout Transition Animation */}
        <div 
          ref={filterRef}
          className="mb-10 flex flex-wrap items-center gap-2 sm:gap-2.5 pb-2 border-b border-white/15 will-change-transform"
          role="tablist"
          aria-label={t("Filtro de categorías de la galería", "Gallery categories filter")}
        >
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#B8C5A8] mr-2 hidden sm:flex font-bold">
            <Layers size={14} className="text-[#B8C5A8]" aria-hidden="true" />
            <span>{t("Filtrar:", "Filter:")}</span>
          </div>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8] ${
                  isActive
                    ? 'text-[#faf7f2] font-bold'
                    : 'text-[#eedbe1] hover:text-[#B8C5A8] bg-white/[0.08] hover:bg-white/[0.15]'
                }`}
              >
                {/* Active Pill Layout Indicator Animation */}
                {isActive && (
                  <motion.span
                    layoutId="active-gallery-pill"
                    className="absolute inset-0 rounded-full bg-[#5b6c4b] border border-[#7e946a] shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{t(cat.labelEs, cat.labelEn)}</span>
              </button>
            );
          })}

          <div className="ml-auto text-[11px] font-mono text-[#eedbe1] hidden md:block">
            {t("Mostrando", "Showing")} <strong className="text-[#B8C5A8]">{filteredItems.length}</strong> / {galleryItems.length}
          </div>
        </div>

        {/* Sketchbook Covers Grid - With Smooth Staggered Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="contents"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.04, 0.2),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full"
                >
                  <SketchbookCoverCard
                    project={item}
                    index={index}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setOriginRect(rect);
                      setSelectedProject(item);
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Immersive Sketchbook Studio Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject}
            originRect={originRect}
            onClose={() => {
              setSelectedProject(null);
              setOriginRect(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
