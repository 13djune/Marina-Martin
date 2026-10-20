import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Maximize2, 
  BookOpen, 
  Check,
  X
} from 'lucide-react';
import { Project, Hotspot, getSketchbookPages } from '../data';
import { useLanguage } from '../LanguageContext';
import { soundManager } from '../utils/audio';
import ProgressiveImage from './ui/ProgressiveImage';
import gsap from 'gsap';
import SketchbookTextureOverlay, { PaperTextureType } from './SketchbookTextureOverlay';

interface SketchbookProps {
  project: Project;
  onOpenDetail?: () => void;
  onOpenZoom?: (url: string) => void;
  className?: string;
  autoOpenSpread?: boolean;
  isDetail?: boolean;
}

const PaperTextureOverlay: React.FC<{
  type?: PaperTextureType;
  seed?: number;
  opacity?: number;
}> = ({
  type = 'rag',
  seed = 1,
  opacity,
}) => (
  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[4]" aria-hidden="true">
    <SketchbookTextureOverlay type={type} seed={seed} opacity={opacity} />
  </div>
);

export const Sketchbook: React.FC<SketchbookProps> = ({
  project,
  onOpenDetail,
  onOpenZoom,
  className = '',
  autoOpenSpread = false,
  isDetail = false,
}) => {
  const { t } = useLanguage();
  const totalLeaves = 5; // Leaves 0 to 4. Leaf 4 is the front cover.

  // State
  const [flippedCount, setFlippedCount] = useState<number>(0);
  const [turningLeaf, setTurningLeaf] = useState<number | null>(null);
  const [turnDirection, setTurnDirection] = useState<'forward' | 'backward' | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [mobilePageIndex, setMobilePageIndex] = useState<number>(autoOpenSpread ? 2 : 0);
  const [mobileDirection, setMobileDirection] = useState<'forward' | 'backward'>('forward');

  // Mobile page handlers with directional tracking for Framer Motion flip/slide
  const nextMobilePage = () => {
    if (mobilePageIndex < 9) {
      soundManager.playPageTurn();
      setMobileDirection('forward');
      setMobilePageIndex((prev) => prev + 1);
      setActiveHotspot(null);
    }
  };

  const prevMobilePage = () => {
    if (mobilePageIndex > 0) {
      soundManager.playPageTurn();
      setMobileDirection('backward');
      setMobilePageIndex((prev) => prev - 1);
      setActiveHotspot(null);
    }
  };

  const goToMobilePage = (idx: number) => {
    if (idx !== mobilePageIndex) {
      soundManager.playPageTurn();
      setMobileDirection(idx > mobilePageIndex ? 'forward' : 'backward');
      setMobilePageIndex(idx);
      setActiveHotspot(null);
    }
  };

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const isTurningRef = useRef<boolean>(false);
  const hasAutoOpenedRef = useRef<boolean>(false);

  // The book remains static in position as requested (no mouse tilt/parallax)
  useEffect(() => {
    const parallaxEl = parallaxRef.current;
    if (parallaxEl) {
      gsap.set(parallaxEl, {
        transformPerspective: 1800,
        transformStyle: 'preserve-3d',
        rotationX: 0,
        rotationY: 0,
        rotation: 0,
        x: 0,
        y: 0,
        z: 0,
      });
    }
  }, []);

  // Configuración completa de páginas obtenida directamente de data.ts
  const pages = getSketchbookPages(project);
  const isCarmilla = project.id === 1 || project.titleEs.toLowerCase().includes('carmilla');

  // Enlaces a imágenes y hotspots definidos en data.ts para cada página
  const carmillaSilhouettesImage = pages.page00.imageUrl;
  const carmillaCharacterImage = pages.page01.imageUrl;
  const lauraCharacterImage = pages.page02.imageUrl;
  const carmillaIllustration1Image = pages.page03.imageUrl;
  const carmillaIllustration2Image = pages.page04.imageUrl;

  const sketchImage = pages.page00.imageUrl;
  const secondaryImage = pages.page04.imageUrl || pages.page01.imageUrl;
  const sketchHotspots = pages.page00.hotspots || [];

  const carmillaSilhouettesHotspots = pages.page00.hotspots || [];
  const carmillaCharacterHotspots = pages.page01.hotspots || [];
  const lauraCharacterHotspots = pages.page02.hotspots || [];
  const carmillaIllustration1Hotspots = pages.page03.hotspots || [];
  const carmillaIllustration2Hotspots = pages.page04.hotspots || [];

  // Tactile book flip / slide animation variants for Framer Motion
  const mobileFlipVariants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? '75%' : '-75%',
      rotateY: direction === 'forward' ? 24 : -24,
      opacity: 0,
      scale: 0.93,
    }),
    center: {
      x: '0%',
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        rotateY: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      },
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? '-75%' : '75%',
      rotateY: direction === 'forward' ? -24 : 24,
      opacity: 0,
      scale: 0.93,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        rotateY: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    }),
  };

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset state on project change
  useEffect(() => {
    hasAutoOpenedRef.current = false;
    setFlippedCount(0);
    setMobilePageIndex(autoOpenSpread ? 2 : 0);
    setTurningLeaf(null);
    setTurnDirection(null);
    isTurningRef.current = false;
    setActiveHotspot(null);
  }, [project, autoOpenSpread]);

  // Natural tactile flip physics constants
  const FLIP_DURATION = 0.72;
  const FLIP_EASE = [0.37, 0, 0.21, 1]; // Smooth natural cubic-bezier curve

  // Framer Motion Page Turning Logic with synchronized sound, direction & z-index
  const turnRight = useCallback(() => {
    if (isTurningRef.current || flippedCount >= totalLeaves) return;
    isTurningRef.current = true;
    const leafToFlip = totalLeaves - 1 - flippedCount;
    setTurnDirection('forward');
    setTurningLeaf(leafToFlip);
    setFlippedCount((prev) => prev + 1);
    soundManager.playPageTurn();
    setTimeout(() => {
      setTurningLeaf(null);
      setTurnDirection(null);
      isTurningRef.current = false;
    }, 760);
    setActiveHotspot(null);
  }, [flippedCount, totalLeaves]);

  const turnLeft = useCallback(() => {
    if (isTurningRef.current || flippedCount <= 0) return;
    isTurningRef.current = true;
    const leafToUnflip = totalLeaves - flippedCount;
    setTurnDirection('backward');
    setTurningLeaf(leafToUnflip);
    setFlippedCount((prev) => prev - 1);
    soundManager.playPageTurn();
    setTimeout(() => {
      setTurningLeaf(null);
      setTurnDirection(null);
      isTurningRef.current = false;
    }, 760);
    setActiveHotspot(null);
  }, [flippedCount, totalLeaves]);

  // Optional auto-open on initial display
  useEffect(() => {
    if (autoOpenSpread && !hasAutoOpenedRef.current && flippedCount === 0) {
      hasAutoOpenedRef.current = true;
      const timer = setTimeout(() => {
        turnRight();
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [autoOpenSpread, flippedCount, turnRight]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') turnRight();
      if (e.key === 'ArrowLeft') turnLeft();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [turnRight, turnLeft]);

  // Color hex copy
  const handleCopyHex = (hex: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    }
  };

  const isCoverClosed = flippedCount === 0;
  const isBackClosed = flippedCount === totalLeaves;

  // Accessible description for screen readers (WCAG AAA)
  const getSpreadAnnouncement = () => {
    switch (flippedCount) {
      case 0:
        return `${t("Portada cerrada de", "Front cover closed of")} ${t(project.titleEs, project.titleEn)}`;
      case 1:
        return `${pages.page00.pageNumber} & ${pages.page01.pageNumber}: ${t(pages.page00.sectionHeaderEs, pages.page00.sectionHeaderEn)} / ${t(pages.page01.titleEs, pages.page01.titleEn)}`;
      case 2:
        return `${pages.page02.pageNumber} & ${pages.page03.pageNumber}: ${t(pages.page02.titleEs, pages.page02.titleEn)} / ${t(pages.page03.titleEs, pages.page03.titleEn)}`;
      case 3:
        return `${pages.page04.pageNumber} & ${pages.page05?.pageNumber || "PÁG. 05"}: ${t(pages.page04.titleEs, pages.page04.titleEn)} / ${t(pages.page05?.titleEs || "Lámina Final HD", pages.page05?.titleEn || "Final HD Plate")}`;
      case 4:
        return `${pages.page06?.pageNumber || "PÁG. 06"} & ${pages.page07?.pageNumber || "PÁG. 07"}: ${t(pages.page06?.titleEs || "Revisión de Taller", pages.page06?.titleEn || "Workshop Review")} / ${t(pages.page07?.titleEs || "Certificado de Autenticidad", pages.page07?.titleEn || "Certificate of Authenticity")}`;
      case 5:
        return t("Contraportada cerrada", "Back cover closed");
      default:
        return "";
    }
  };

  // Z-index calculation to avoid visual overlays
  const getLeafZIndex = (leafIndex: number) => {
    if (turningLeaf === leafIndex) return 50;
    const isFlipped = leafIndex >= totalLeaves - flippedCount;
    return isFlipped ? (totalLeaves - leafIndex) : (leafIndex + 1);
  };

  // Responsive book dimensions - 2:1 open ratio ensures each leaf (and closed cover outside) is a 1:1 traditional square
  const containerMaxWidth = isDetail 
    ? 'min(1360px, 95vw, calc((100vh - 110px) * 2))'
    : 'min(1240px, 93vw, calc((100vh - 130px) * 2))';
  const containerMaxHeight = isDetail 
    ? 'calc(100vh - 110px)'
    : 'calc(100vh - 130px)';

  // Mobile Single-Page Definition and Renderer - dynamically driven by pages configuration
  const mobilePages = [
    { num: 'PORTADA', titleEs: 'Portada del Cuaderno', titleEn: 'Front Cover' },
    { num: pages.page00.pageNumber, titleEs: pages.page00.titleEs, titleEn: pages.page00.titleEn },
    { num: pages.page01.pageNumber, titleEs: pages.page01.titleEs, titleEn: pages.page01.titleEn },
    { num: pages.page02.pageNumber, titleEs: pages.page02.titleEs, titleEn: pages.page02.titleEn },
    { num: pages.page03.pageNumber, titleEs: pages.page03.titleEs, titleEn: pages.page03.titleEn },
    { num: pages.page04.pageNumber, titleEs: pages.page04.titleEs, titleEn: pages.page04.titleEn },
    { num: pages.page05?.pageNumber || 'PÁG. 05', titleEs: pages.page05?.titleEs || 'Lámina Final HD', titleEn: pages.page05?.titleEn || 'Final HD Plate' },
    { num: pages.page06?.pageNumber || 'PÁG. 06', titleEs: pages.page06?.titleEs || 'Revisión de Taller & Specs', titleEn: pages.page06?.titleEn || 'Workshop Review & Specs' },
    { num: pages.page07?.pageNumber || 'PÁG. 07', titleEs: pages.page07?.titleEs || 'Certificado de Autenticidad', titleEn: pages.page07?.titleEn || 'Certificate of Authenticity' },
    { num: 'FINAL', titleEs: 'Contraportada de Estudio', titleEn: 'Studio Back Cover' },
  ];

  const renderMobilePage = (pageIdx: number) => {
    switch (pageIdx) {
      case 0:
        return (
          <div 
            className="w-full h-full rounded-2xl overflow-hidden p-5 flex flex-col justify-between border border-white/20 select-none relative"
            style={{
              backgroundColor: project.coverColor,
              backgroundImage: `
                radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 70%),
                linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.72) 100%)
              `
            }}
          >
            <div className="absolute inset-2 rounded-xl border border-white/[0.08] pointer-events-none" />
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-bone relative z-10">
              <span className="uppercase font-semibold tracking-[0.2em]">{project.sketchbookVol}</span>
              <span className="font-semibold text-bone-muted">{project.year}</span>
            </div>

            <div className="my-auto py-1 relative z-10">
              <div className="p-1 rounded-xl bg-black/70 border border-white/20 shadow-xl">
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-black/90">
                  <ProgressiveImage 
                    src={project.imageUrl} 
                    alt={`${t("Lámina de portada de", "Cover artwork of")} ${t(project.titleEs, project.titleEn)}`} 
                    widthParam={900}
                    priority={true}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="pb-1 relative z-10">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#B8C5A8] font-bold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rotate-45 organic-diamond-sm bg-[#B8C5A8]" />
                <span>{t(project.categoryEs, project.categoryEn)}</span>
              </div>
              <h3 className="font-serif italic font-bold text-base text-bone leading-tight mb-2 truncate">
                {t(project.titleEs, project.titleEn)}
              </h3>
              <button
                type="button"
                onClick={nextMobilePage}
                className="w-full py-2.5 px-4 rounded-xl bg-vampire-red hover:bg-[#e8b4b8] text-black text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{t("ABRIR CUADERNO", "OPEN SKETCHBOOK")}</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="w-full h-full bg-[#fdfbf7] p-5 flex flex-col justify-between relative overflow-hidden text-[#1c1917]">
            <PaperTextureOverlay type="botanical" seed={8} opacity={0.06} />
            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/15 text-xs font-mono text-[#54422b] relative z-10">
              <span className="font-bold uppercase tracking-wider">{t(pages.page00.sectionHeaderEs, pages.page00.sectionHeaderEn)}</span>
              <span className="font-bold">{pages.page00.pageNumber}</span>
            </div>
            <div className="relative z-10 my-auto py-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                {t(pages.page00.subHeaderEs, pages.page00.subHeaderEn)}
              </span>
              <h4 className="font-serif italic font-bold text-base text-[#1c1917] mb-2 truncate">
                {t(pages.page00.titleEs, pages.page00.titleEn)}
              </h4>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#2b2b2b]/20 shadow-sm bg-black/90 mb-2.5">
                <ProgressiveImage 
                  src={pages.page00.imageUrl} 
                  alt={t(pages.page00.imageAltEs || pages.page00.titleEs, pages.page00.imageAltEn || pages.page00.titleEn)}
                  widthParam={800}
                  className="w-full h-full object-cover filter contrast-105"
                  containerClassName="w-full h-full"
                />
                {(pages.page00.hotspots || []).map((hs, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveHotspot(hs)}
                    className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    aria-label={t(hs.titleEs, hs.titleEn)}
                  >
                    <span className="w-4 h-4 rounded-full border border-[#B8C5A8] bg-black/85 text-[#B8C5A8] flex items-center justify-center text-[9px] font-bold shadow-lg">
                      ✦
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenZoom) onOpenZoom(pages.page00.imageUrl);
                  }}
                  className="absolute bottom-1.5 right-1.5 px-2 py-1 rounded bg-black/80 hover:bg-vampire-red text-bone hover:text-black text-[10px] font-mono font-bold flex items-center gap-1 border border-white/20"
                >
                  <Maximize2 size={11} />
                  <span>HD</span>
                </button>
              </div>
              {activeHotspot && (
                <div className="p-2 mb-2 rounded-lg bg-black/92 text-bone text-[11px] border border-white/20">
                  <div className="flex items-center justify-between text-[#e8b4b8] font-bold text-[10px] mb-0.5">
                    <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                    <button onClick={() => setActiveHotspot(null)} className="p-0.5 text-white/60 hover:text-white">✕</button>
                  </div>
                  <p className="font-serif italic leading-tight text-bone-muted">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                </div>
              )}
              <div className="p-2.5 rounded-xl bg-[#f7f2e7] border-l-3 border-[#54422b] shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#54422b] font-bold mb-0.5">
                  <Sparkles size={12} className="text-vampire-red" />
                  <span>{t(pages.page00.notesTitleEs || "APUNTES DE PROCESO", pages.page00.notesTitleEn || "PROCESS NOTES")}</span>
                </div>
                <p className="font-serif italic text-xs text-[#2b251e] leading-relaxed">
                  «{t(pages.page00.quoteEs || pages.page00.notesEs || project.techniqueEs, pages.page00.quoteEn || pages.page00.notesEn || project.techniqueEn)}»
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-[#2b2b2b]/15 flex items-center justify-between text-[10px] font-mono text-[#54422b] relative z-10">
              <span>{t(pages.page00.footerLeftEs || `REGISTRO: ${project.year} · MMP`, pages.page00.footerLeftEn || `RECORD: ${project.year} · MMP`)}</span>
              <span className="font-bold">✦ {pages.page00.footerRightEs || project.sketchbookVol}</span>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full h-full bg-[#fdfbf7] p-5 flex flex-col justify-between relative overflow-hidden text-[#1c1917]">
            <PaperTextureOverlay type="rag" seed={1} opacity={0.06} />
            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/15 text-xs font-mono text-[#54422b] relative z-10">
              <span className="font-bold uppercase tracking-wider">{t(pages.page01.sectionHeaderEs, pages.page01.sectionHeaderEn)}</span>
              <span className="font-bold">{pages.page01.pageNumber}</span>
            </div>
            <div className="relative z-10 my-auto py-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                {t(pages.page01.subHeaderEs, pages.page01.subHeaderEn)}
              </span>
              <h3 className="font-serif italic font-bold text-base text-[#1c1917] truncate mb-1">
                {t(pages.page01.titleEs, pages.page01.titleEn)}
              </h3>
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-md mb-2">
                <ProgressiveImage 
                  src={pages.page01.imageUrl} 
                  alt={t(pages.page01.imageAltEs || pages.page01.titleEs, pages.page01.imageAltEn || pages.page01.titleEn)}
                  widthParam={800}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
                {(pages.page01.hotspots || []).map((hs, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveHotspot(hs)}
                    className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    aria-label={t(hs.titleEs, hs.titleEn)}
                  >
                    <span className="w-4 h-4 rounded-full border border-[#B8C5A8] bg-black/85 text-[#B8C5A8] flex items-center justify-center text-[9px] font-bold shadow-lg">
                      ✦
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenZoom) onOpenZoom(pages.page01.imageUrl);
                  }}
                  className="absolute bottom-1.5 right-1.5 px-2 py-1 rounded bg-black/80 hover:bg-vampire-red text-bone hover:text-black text-[10px] font-mono font-bold flex items-center gap-1 border border-white/20"
                >
                  <Maximize2 size={11} />
                  <span>HD</span>
                </button>
              </div>
              {activeHotspot && (
                <div className="p-2 mb-2 rounded-lg bg-black/92 text-bone text-[11px] border border-white/20">
                  <div className="flex items-center justify-between text-[#e8b4b8] font-bold text-[10px] mb-0.5">
                    <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                    <button onClick={() => setActiveHotspot(null)} className="p-0.5 text-white/60 hover:text-white">✕</button>
                  </div>
                  <p className="font-serif italic leading-tight text-bone-muted">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                </div>
              )}
              {/* Palette */}
              {pages.page01.palette && pages.page01.palette.length > 0 && (
                <div className="p-2 rounded-xl bg-[#efe9d9]/80 border border-[#3d362e]/20 mb-2">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-[#54422b] mb-1 flex items-center justify-between font-bold">
                    <span>{t("PALETA CROMÁTICA", "CHROMATIC PALETTE")}</span>
                    {copiedHex && <span className="text-vampire-red font-mono font-bold">{copiedHex}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {pages.page01.palette.map((color, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleCopyHex(color.hex)}
                        className="flex items-center gap-1 p-0.5 rounded bg-white/80 border border-[#3d362e]/15 text-left"
                      >
                        <span className="w-3.5 h-3.5 rounded shrink-0 border border-black/20" style={{ backgroundColor: color.hex }} />
                        <span className="text-[9px] font-sans font-bold text-[#1c1917] truncate">{t(color.nameEs, color.nameEn)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {pages.page01.notesEs && (
                <div className="p-2 rounded-xl bg-[#f7f2e7] border-l-3 border-[#54422b]">
                  <p className="font-serif italic text-xs text-[#2b251e] leading-tight line-clamp-2">
                    «{t(pages.page01.notesEs, pages.page01.notesEn || pages.page01.notesEs)}»
                  </p>
                </div>
              )}
            </div>
            <div className="pt-2 border-t border-[#2b2b2b]/15 flex items-center justify-between text-[10px] font-mono text-[#54422b] relative z-10">
              <span className="font-serif italic text-[#3d372e] font-semibold">{t(pages.page01.footerLeftEs || "", pages.page01.footerLeftEn || "")}</span>
              <span className="font-bold">{pages.page01.footerRightEs || project.sketchbookVol}</span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full h-full bg-[#fdfbf7] p-5 flex flex-col justify-between relative overflow-hidden text-[#1c1917]">
            <PaperTextureOverlay type="laid" seed={2} opacity={0.06} />
            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/10 text-xs font-mono text-[#54422b] relative z-10">
              <span className="font-bold">{pages.page02.pageNumber}</span>
              <span className="font-bold uppercase tracking-wider">{t(pages.page02.sectionHeaderEs, pages.page02.sectionHeaderEn)}</span>
            </div>
            <div className="relative z-10 my-auto py-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                {t(pages.page02.subHeaderEs, pages.page02.subHeaderEn)}
              </span>
              <h3 className="font-serif italic font-bold text-base text-[#1c1917] truncate mb-1">
                {t(pages.page02.titleEs, pages.page02.titleEn)}
              </h3>
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-md mb-2">
                <ProgressiveImage 
                  src={pages.page02.imageUrl} 
                  alt={t(pages.page02.imageAltEs || pages.page02.titleEs, pages.page02.imageAltEn || pages.page02.titleEn)}
                  widthParam={900}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
                {(pages.page02.hotspots || []).map((hs, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveHotspot(hs)}
                    className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    aria-label={t(hs.titleEs, hs.titleEn)}
                  >
                    <span className="w-4 h-4 rounded-full border border-[#B8C5A8] bg-black/85 text-[#B8C5A8] flex items-center justify-center text-[9px] font-bold shadow-lg">
                      ✦
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenZoom) onOpenZoom(pages.page02.imageUrl);
                  }}
                  className="absolute bottom-1.5 right-1.5 px-2 py-1 rounded bg-black/80 hover:bg-vampire-red text-bone hover:text-black text-[10px] font-mono font-bold flex items-center gap-1 border border-white/20"
                >
                  <Maximize2 size={11} />
                  <span>HD</span>
                </button>
              </div>
              {activeHotspot && (
                <div className="p-2 mb-2 rounded-lg bg-black/92 text-bone text-[11px] border border-white/20">
                  <div className="flex items-center justify-between text-[#e8b4b8] font-bold text-[10px] mb-0.5">
                    <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                    <button onClick={() => setActiveHotspot(null)} className="p-0.5 text-white/60 hover:text-white">✕</button>
                  </div>
                  <p className="font-serif italic leading-tight text-bone-muted">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                </div>
              )}
              {(pages.page02.quoteEs || pages.page02.notesEs) && (
                <div className="p-2.5 rounded-xl bg-[#f7f2e7] border-l-3 border-[#54422b] shadow-xs">
                  <p className="font-serif italic text-xs text-[#2b251e] leading-relaxed">
                    «{t(pages.page02.quoteEs || pages.page02.notesEs || "", pages.page02.quoteEn || pages.page02.notesEn || "")}»
                  </p>
                </div>
              )}
            </div>
            <div className="pt-2 border-t border-[#2b2b2b]/10 flex items-center justify-between text-xs font-mono text-[#3d372e] relative z-10">
              <span className="font-serif italic font-semibold">{t(pages.page02.footerLeftEs || "", pages.page02.footerLeftEn || "")}</span>
              <span className="text-[#54422b] font-bold">{pages.page02.footerRightEs || "PLATE 01"}</span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full h-full bg-[#fdfbf7] p-5 flex flex-col justify-between relative overflow-hidden text-[#1c1917]">
            <PaperTextureOverlay type="watercolor" seed={3} opacity={0.06} />
            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/15 text-xs font-mono text-[#54422b] relative z-10">
              <span className="font-bold uppercase tracking-wider">{t(pages.page03.sectionHeaderEs, pages.page03.sectionHeaderEn)}</span>
              <span className="font-bold">{pages.page03.pageNumber}</span>
            </div>
            <div className="relative z-10 my-auto py-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                {t(pages.page03.subHeaderEs, pages.page03.subHeaderEn)}
              </span>
              <h3 className="font-serif italic font-bold text-base text-[#1c1917] mb-1.5 truncate">
                {t(pages.page03.titleEs, pages.page03.titleEn)}
              </h3>
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-md mb-2">
                <ProgressiveImage 
                  src={pages.page03.imageUrl} 
                  alt={t(pages.page03.imageAltEs || pages.page03.titleEs, pages.page03.imageAltEn || pages.page03.titleEn)}
                  widthParam={900}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
                {(pages.page03.hotspots || []).map((hs, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveHotspot(hs)}
                    className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    aria-label={t(hs.titleEs, hs.titleEn)}
                  >
                    <span className="w-4 h-4 rounded-full border border-[#B8C5A8] bg-black/85 text-[#B8C5A8] flex items-center justify-center text-[9px] font-bold shadow-lg">
                      ✦
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenZoom) onOpenZoom(pages.page03.imageUrl);
                  }}
                  className="absolute bottom-1.5 right-1.5 px-2 py-1 rounded bg-black/80 hover:bg-vampire-red text-bone hover:text-black text-[10px] font-mono font-bold flex items-center gap-1 border border-white/20"
                >
                  <Maximize2 size={11} />
                  <span>HD</span>
                </button>
              </div>
              {activeHotspot && (
                <div className="p-2 mb-2 rounded-lg bg-black/92 text-bone text-[11px] border border-white/20">
                  <div className="flex items-center justify-between text-[#e8b4b8] font-bold text-[10px] mb-0.5">
                    <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                    <button onClick={() => setActiveHotspot(null)} className="p-0.5 text-white/60 hover:text-white">✕</button>
                  </div>
                  <p className="font-serif italic leading-tight text-bone-muted">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                </div>
              )}
              {pages.page03.quoteEs && (
                <div className="p-2.5 rounded-xl bg-[#f7f2e7] border-l-3 border-[#54422b] shadow-xs">
                  <p className="font-serif italic text-xs text-[#2b251e] leading-relaxed">
                    «{t(pages.page03.quoteEs, pages.page03.quoteEn || pages.page03.quoteEs)}»
                  </p>
                </div>
              )}
            </div>
            <div className="pt-2 border-t border-[#2b2b2b]/15 flex items-center justify-between text-[10px] font-mono text-[#54422b] relative z-10">
              <span className="font-serif italic text-[#3d372e] font-semibold">{t(pages.page03.footerLeftEs || "", pages.page03.footerLeftEn || "")}</span>
              <span className="font-bold">{pages.page03.footerRightEs || "PLATE 01 · MMP"}</span>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="w-full h-full bg-[#fdfbf7] p-5 flex flex-col justify-between relative overflow-hidden text-[#1c1917]">
            <PaperTextureOverlay type="vellum" seed={4} opacity={0.06} />
            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/10 text-xs font-mono text-[#54422b] relative z-10">
              <span className="font-bold">{pages.page04.pageNumber}</span>
              <span className="font-bold tracking-wider uppercase">{t(pages.page04.sectionHeaderEs, pages.page04.sectionHeaderEn)}</span>
            </div>
            <div className="relative z-10 my-auto py-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                {t(pages.page04.subHeaderEs, pages.page04.subHeaderEn)}
              </span>
              <h3 className="font-serif italic font-bold text-base text-[#1c1917] mb-1.5 truncate">
                {t(pages.page04.titleEs, pages.page04.titleEn)}
              </h3>
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-md mb-2">
                <ProgressiveImage 
                  src={pages.page04.imageUrl} 
                  alt={t(pages.page04.imageAltEs || pages.page04.titleEs, pages.page04.imageAltEn || pages.page04.titleEn)}
                  widthParam={900}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
                {(pages.page04.hotspots || []).map((hs, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveHotspot(hs)}
                    className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    aria-label={t(hs.titleEs, hs.titleEn)}
                  >
                    <span className="w-4 h-4 rounded-full border border-[#B8C5A8] bg-black/85 text-[#B8C5A8] flex items-center justify-center text-[9px] font-bold shadow-lg">
                      ✦
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenZoom) onOpenZoom(pages.page04.imageUrl);
                  }}
                  className="absolute bottom-1.5 right-1.5 px-2 py-1 rounded bg-black/80 hover:bg-vampire-red text-bone hover:text-black text-[10px] font-mono font-bold flex items-center gap-1 border border-white/20"
                >
                  <Maximize2 size={11} />
                  <span>HD</span>
                </button>
              </div>
              {activeHotspot && (
                <div className="p-2 mb-2 rounded-lg bg-black/92 text-bone text-[11px] border border-white/20">
                  <div className="flex items-center justify-between text-[#e8b4b8] font-bold text-[10px] mb-0.5">
                    <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                    <button onClick={() => setActiveHotspot(null)} className="p-0.5 text-white/60 hover:text-white">✕</button>
                  </div>
                  <p className="font-serif italic leading-tight text-bone-muted">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                </div>
              )}
              {pages.page04.quoteEs && (
                <div className="p-2.5 rounded-xl bg-[#f7f2e7] border-l-3 border-[#54422b] shadow-xs">
                  <p className="font-serif italic text-xs text-[#2b251e] leading-relaxed">
                    «{t(pages.page04.quoteEs, pages.page04.quoteEn || pages.page04.quoteEs)}»
                  </p>
                </div>
              )}
            </div>
            <div className="pt-2 border-t border-[#2b2b2b]/10 flex items-center justify-between text-xs font-mono text-[#3d372e] relative z-10">
              <span className="font-serif italic font-semibold">{t(pages.page04.footerLeftEs || "", pages.page04.footerLeftEn || "")}</span>
              <span className="text-[#54422b] font-bold">{pages.page04.footerRightEs || "PLATE 02 · MMP"}</span>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="w-full h-full bg-[#fdfbf7] p-5 flex flex-col justify-between relative overflow-hidden text-[#1c1917]">
            <PaperTextureOverlay type="woven" seed={5} opacity={0.06} />
            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/10 text-xs font-mono text-[#54422b] relative z-10">
              <span className="font-bold uppercase tracking-wider">{t(pages.page05?.sectionHeaderEs || "V. LÁMINA FINAL HD", pages.page05?.sectionHeaderEn || "V. FINAL HD PLATE")}</span>
              <span className="font-bold">{pages.page05?.footerRightEs || project.sketchbookVol}</span>
            </div>
            <div className="relative my-auto flex-1 max-h-[76%] rounded-xl overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-xl z-10 group">
              <ProgressiveImage 
                src={pages.page05?.imageUrl || project.imageUrl} 
                alt={t(pages.page05?.titleEs || project.titleEs, pages.page05?.titleEn || project.titleEn)}
                widthParam={1200}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
              <button
                type="button"
                onClick={() => {
                  if (onOpenZoom) onOpenZoom(pages.page05?.imageUrl || project.imageUrl);
                  else if (onOpenDetail) onOpenDetail();
                }}
                className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-vampire-red hover:bg-[#e8b4b8] text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform"
              >
                <Maximize2 size={14} />
                <span>{t("HD PANTALLA COMPLETA", "FULLSCREEN HD")}</span>
              </button>
            </div>
            <div className="pt-2 border-t border-[#2b2b2b]/10 flex items-center justify-between text-xs font-serif relative z-10">
              <span className="italic font-bold truncate max-w-[200px]">«{t(pages.page05?.titleEs || project.titleEs, pages.page05?.titleEn || project.titleEn)}»</span>
              <span className="font-mono text-[#54422b] font-bold">{pages.page05?.pageNumber || "PÁG. 05"}</span>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="w-full h-full bg-[#fdfbf7] p-5 flex flex-col justify-between relative overflow-hidden text-[#1c1917]">
            <PaperTextureOverlay type="laid" seed={6} opacity={0.06} />
            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/15 text-xs font-mono text-[#54422b] relative z-10">
              <span className="font-bold uppercase tracking-wider">{t(pages.page06?.sectionHeaderEs || "VI. REVISIÓN DE TALLER", pages.page06?.sectionHeaderEn || "VI. WORKSHOP REVIEW")}</span>
              <span className="font-bold">{pages.page06?.pageNumber || "PÁG. 06"}</span>
            </div>
            <div className="relative z-10 my-auto py-1">
              <h3 className="font-serif italic font-bold text-base text-[#1c1917] mb-1.5">
                {t(pages.page06?.titleEs || "Metodología & Ejecución", pages.page06?.titleEn || "Methodology & Execution")}
              </h3>
              <p className="text-xs font-serif italic text-[#332e26] leading-relaxed mb-2.5">
                {t(pages.page06?.notesEs || project.techniqueEs, pages.page06?.notesEn || project.techniqueEn)}
              </p>
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#efe9d9]/90 border border-[#3d362e]/20 text-xs font-mono text-[#1c1917] mb-2">
                <div>
                  <span className="text-[#54422b] font-bold block text-[10px] uppercase">{t("Software", "Software")}:</span>
                  <span className="font-semibold truncate block">{project.tools}</span>
                </div>
                <div>
                  <span className="text-[#54422b] font-bold block text-[10px] uppercase">{t("Rol", "Role")}:</span>
                  <span className="font-semibold truncate block">{t(project.roleEs, project.roleEn)}</span>
                </div>
                <div>
                  <span className="text-[#54422b] font-bold block text-[10px] uppercase">{t("Categoría", "Category")}:</span>
                  <span className="font-semibold truncate block">{t(project.categoryEs, project.categoryEn)}</span>
                </div>
                <div>
                  <span className="text-[#54422b] font-bold block text-[10px] uppercase">{t("Expediente", "Dossier")}:</span>
                  <span className="font-semibold truncate block">{project.sketchbookVol}</span>
                </div>
              </div>
              {(pages.page06?.quoteEs || true) && (
                <div className="p-2.5 rounded-xl border-l-4 border-vampire-red bg-white/85 text-xs font-serif italic text-[#1c1917] font-semibold shadow-xs">
                  «{t(
                    pages.page06?.quoteEs || "La comprensión de la luz y el color traduce las ideas en movimiento.",
                    pages.page06?.quoteEn || "Understanding light and color brings ideas to life."
                  )}»
                </div>
              )}
            </div>
            <div className="pt-2 border-t border-[#2b2b2b]/15 flex items-center justify-between text-[10px] font-mono text-[#54422b] relative z-10">
              <span className="font-semibold">{t(pages.page06?.footerLeftEs || "PROCESO Y DESARROLLO", pages.page06?.footerLeftEn || "VISUAL PROCESS")}</span>
              <span className="font-bold">{pages.page06?.footerRightEs || `MMP · ${project.year}`}</span>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="w-full h-full bg-[#fdfbf7] p-4 flex flex-col justify-between relative overflow-hidden text-[#1c1917]">
            <PaperTextureOverlay type="parchment" seed={7} opacity={0.06} />
            <div className="border border-[#3d362e]/30 p-3.5 rounded-xl h-full flex flex-col justify-between bg-[#fcfaf4] shadow-inner relative z-10">
              <div className="text-center pb-2 border-b border-[#3d362e]/20">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#54422b] font-bold">
                  {t(pages.page07?.sectionHeaderEs || "VII. CERTIFICADO DE AUTENTICIDAD", pages.page07?.sectionHeaderEn || "VII. CERTIFICATE OF AUTHENTICITY")}
                </span>
                <h3 className="font-serif italic font-bold text-base text-[#1c1917] mt-1 truncate">
                  {t(pages.page07?.titleEs || project.titleEs, pages.page07?.titleEn || project.titleEn)}
                </h3>
              </div>
              <div className="my-auto text-center space-y-2 py-1">
                <p className="text-[11px] font-serif italic text-[#332e26] leading-relaxed">
                  {t(
                    pages.page07?.notesEs || "Por el presente documento se certifica que esta obra es una pieza conceptual original creada por Marina Martín Prieto.",
                    pages.page07?.notesEn || "This document certifies that this artwork is an original conceptual piece created by Marina Martín Prieto."
                  )}
                </p>
                <div className="w-10 h-10 rounded-full border-2 border-[#54422b] bg-[#3a1d1d] text-[#e8b4b8] flex items-center justify-center font-serif font-bold text-xs shadow-md mx-auto">
                  MMP
                </div>
                <div className="font-serif italic text-xs font-bold text-[#1c1917]">
                  {t(pages.page07?.footerLeftEs || "Marina Martín Prieto", pages.page07?.footerLeftEn || "Marina Martín Prieto")}
                </div>
              </div>
              <div className="pt-2 border-t border-[#3d362e]/20 text-center text-[9px] font-mono uppercase tracking-wider text-[#54422b]">
                ✦ REG. ESTUDIO GRANADA / MADRID · {project.year} ✦
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div 
            className="w-full h-full rounded-2xl overflow-hidden p-6 flex flex-col justify-between border border-white/20 select-none relative"
            style={{
              backgroundColor: project.coverColor,
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(0,0,0,0.8) 100%)'
            }}
          >
            <div className="absolute inset-2 rounded-xl border border-white/[0.08] pointer-events-none" />
            <div className="text-right text-[10px] font-mono text-bone-muted uppercase relative z-10">
              {project.sketchbookVol} · {project.year}
            </div>
            <div className="my-auto text-center flex flex-col items-center relative z-10">
              <div className="w-14 h-14 rounded-2xl border border-white/20 flex items-center justify-center text-bone font-serif italic text-xl shadow-inner mb-3 bg-black/40">
                MMP
              </div>
              <h4 className="font-serif italic text-bone text-base font-bold">
                Marina Martín Prieto
              </h4>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B8C5A8] mt-1 font-semibold">
                {t("ARCHIVO PRIVADO DE ESTUDIO", "PRIVATE STUDIO ARCHIVE")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMobilePageIndex(0)}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-bone text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 relative z-10"
            >
              <span>↺</span>
              <span>{t("VOLVER A LA PORTADA", "BACK TO COVER")}</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 25 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={`book-section relative w-full flex flex-col items-center justify-center select-none py-1 ${className}`}
      role="region"
      aria-roledescription={t("Cuaderno interactivo", "Interactive sketchbook")}
      aria-label={`${t("Cuaderno de bocetos 3D:", "3D sketchbook:")} ${t(project.titleEs, project.titleEn)}`}
    >
      {/* Screen reader live announcement for WCAG AAA */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {getSpreadAnnouncement()}
      </div>

      {/* ========================================================================= */}
      {/* CONDITIONAL RENDER: MOBILE 1-PAGE-AT-A-TIME vs DESKTOP 3D DUAL-PAGE VIEW   */}
      {/* ========================================================================= */}
      {isMobile ? (
        <div className="w-full flex flex-col items-center max-w-[420px] mx-auto px-1 py-1">
          {/* Mobile Top Navigation Bar */}
          <div className="w-full flex items-center justify-between gap-2 mb-2 px-1">
            <button
              type="button"
              onClick={prevMobilePage}
              disabled={mobilePageIndex === 0}
              className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center border transition-all ${
                mobilePageIndex === 0
                  ? 'opacity-25 border-white/10 text-white/30 cursor-not-allowed'
                  : 'border-white/20 bg-black/70 hover:bg-[#e8b4b8] text-bone hover:text-black cursor-pointer shadow-md active:scale-95'
              }`}
              aria-label={t("Página anterior", "Previous page")}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-mono tracking-widest text-[#e8b4b8] font-bold">
                {mobilePages[mobilePageIndex].num} · {mobilePageIndex + 1} / 10
              </span>
              <span className="text-xs font-serif font-bold text-bone truncate max-w-[210px]">
                {t(mobilePages[mobilePageIndex].titleEs, mobilePages[mobilePageIndex].titleEn)}
              </span>
            </div>

            <button
              type="button"
              onClick={nextMobilePage}
              disabled={mobilePageIndex === 9}
              className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center border transition-all ${
                mobilePageIndex === 9
                  ? 'opacity-25 border-white/10 text-white/30 cursor-not-allowed'
                  : 'border-white/20 bg-black/70 hover:bg-[#e8b4b8] text-bone hover:text-black cursor-pointer shadow-md active:scale-95'
              }`}
              aria-label={t("Página siguiente", "Next page")}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Single Page Card with Framer Motion tactile Book Flip / Slide transition */}
          <div 
            className="w-full aspect-[1/1] sm:aspect-[4/5] relative select-none"
            style={{ perspective: 1400 }}
          >
            <AnimatePresence mode="popLayout" custom={mobileDirection}>
              <motion.div
                key={mobilePageIndex}
                custom={mobileDirection}
                variants={mobileFlipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onPanEnd={(e, info) => {
                  if (info.offset.x < -30) nextMobilePage();
                  else if (info.offset.x > 30) prevMobilePage();
                }}
                className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 select-none flex flex-col justify-between"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                {renderMobilePage(mobilePageIndex)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots (0 to 9) */}
          <div className="flex items-center justify-center gap-1.5 mt-3 py-1">
            {mobilePages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToMobilePage(idx)}
                className="transition-all duration-200 cursor-pointer min-h-[28px] min-w-[14px] flex items-center justify-center"
                aria-label={`${t("Ir a página", "Go to page")} ${idx + 1}`}
              >
                <span className={`block transition-all duration-200 ${
                  idx === mobilePageIndex
                    ? 'w-6 h-2 rounded-full bg-[#e8b4b8] shadow-[0_0_8px_rgba(232,180,184,0.7)]'
                    : 'w-2 h-2 rounded-full bg-white/25 hover:bg-white/50'
                }`} />
              </button>
            ))}
          </div>

          <span className="text-[10px] font-mono tracking-wider text-bone-muted/60 mt-0.5 pointer-events-none text-center">
            {t("✦ Desliza horizontalmente para pasar de página", "✦ Swipe horizontally to turn pages")}
          </span>
        </div>
      ) : (
      /* ========================================================================= */
      /* 3D BOOK STAGE WITH REALISTIC PHYSICAL SHADOWS & VERTICALLY CENTERED ARROWS */
      /* ========================================================================= */
      <div 
        ref={stageRef}
        className="relative w-full flex items-center justify-center"
        style={{
          maxWidth: containerMaxWidth,
          maxHeight: containerMaxHeight,
        }}
      >
        {/* GSAP Mouse-Following 3D Parallax Layer */}
        <div
          ref={parallaxRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            perspective: isMobile ? '1400px' : '2200px',
          }}
        >
          {/* Physical Ground & Desk Drop Shadows */}
          <div 
            ref={shadowRef}
            className="absolute -inset-4 sm:-inset-6 -bottom-8 rounded-[2rem] pointer-events-none z-0 transition-opacity duration-700"
            style={{
              background: 'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 45%, transparent 75%)',
              filter: 'blur(24px)',
              opacity: 0.95,
            }}
            aria-hidden="true"
          />
          <div 
            className="absolute inset-x-6 -bottom-5 h-14 rounded-full pointer-events-none z-0"
            style={{
              boxShadow: '0 30px 60px -5px rgba(0,0,0,0.95), 0 12px 24px -5px rgba(0,0,0,0.85)',
            }}
            aria-hidden="true"
          />

          {/* 3D BOOK CONTAINER (2:1 open ratio = two 1:1 square pages; shifts -25% when closed to center the square cover) */}
          <motion.div 
            ref={containerRef}
            className="book-container relative w-full h-full aspect-[2/1]"
            style={{
              perspective: isMobile ? '1400px' : '2200px',
              maxHeight: containerMaxHeight,
            }}
          onClick={(e) => e.stopPropagation()}
          animate={{
            x: isCoverClosed ? '-25%' : isBackClosed ? '25%' : '0%',
          }}
          transition={{
            duration: FLIP_DURATION,
            ease: FLIP_EASE,
          }}
          onPanEnd={(e, info) => {
            if (info.offset.x < -35) turnRight();
            else if (info.offset.x > 35) turnLeft();
          }}
        >
          {/* ======================================================================= */}
          {/* MULTI-STAGE REALISTIC SHADOWS DURING TURNING & OPEN SPREAD               */}
          {/* ======================================================================= */}

          {/* Central Gutter Crease & Deep Ambient Occlusion */}
          {!isCoverClosed && !isBackClosed && (
            <>
              {/* Deep Central Spine Trough Shadow */}
              <div 
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 pointer-events-none z-35 bg-gradient-to-r from-transparent via-black/45 to-transparent mix-blend-multiply opacity-80" 
                aria-hidden="true"
              />
              {/* Center Spine Seam Line */}
              <div 
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] pointer-events-none z-40 bg-black/60 shadow-[0_0_5px_rgba(0,0,0,0.8)]" 
                aria-hidden="true"
              />
              {/* Left Page Inner Gutter Curve Shadow */}
              <div 
                className="absolute top-0 bottom-0 left-[calc(50%-44px)] sm:left-[calc(50%-56px)] w-11 sm:w-14 pointer-events-none z-30 bg-gradient-to-r from-transparent via-black/10 to-black/28 mix-blend-multiply" 
                aria-hidden="true"
              />
              {/* Right Page Inner Gutter Curve Shadow */}
              <div 
                className="absolute top-0 bottom-0 left-1/2 w-11 sm:w-14 pointer-events-none z-30 bg-gradient-to-r from-black/28 via-black/10 to-transparent mix-blend-multiply" 
                aria-hidden="true"
              />
            </>
          )}

          {/* Gentle Ambient Shadow on Underlying Stacks during Page Turns */}
          <motion.div
            className="pointer-events-none absolute top-0 bottom-0 right-0 w-1/2 z-10"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 25%, transparent 60%)',
            }}
            animate={{
              opacity: turningLeaf !== null 
                ? (turnDirection === 'forward' ? [0.35, 0.15, 0] : [0, 0.15, 0.35])
                : 0,
            }}
            transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/2 z-10"
            style={{
              background: 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 25%, transparent 60%)',
            }}
            animate={{
              opacity: turningLeaf !== null 
                ? (turnDirection === 'forward' ? [0, 0.2, 0] : [0.2, 0.1, 0])
                : 0,
            }}
            transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
            aria-hidden="true"
          />

          {/* Centered Left Navigation Arrow (Min 44x44px for WCAG AAA) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              turnLeft();
            }}
            disabled={flippedCount === 0}
            className={`absolute -left-4 sm:-left-6 md:-left-7 top-1/2 -translate-y-1/2 z-[60] w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-300 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              flippedCount === 0
                ? 'opacity-0 pointer-events-none'
                : 'border-white/30 bg-black/90 hover:bg-vampire-red hover:border-vampire-red text-bone hover:text-black cursor-pointer hover:scale-110 active:scale-95 shadow-[0_4px_25px_rgba(0,0,0,0.85)] backdrop-blur-md'
            }`}
            aria-label={t("Página anterior", "Previous page")}
            title={t("Página anterior (←)", "Previous page (←)")}
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Centered Right Navigation Arrow (Min 44x44px for WCAG AAA) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              turnRight();
            }}
            disabled={flippedCount >= totalLeaves}
            className={`absolute -right-4 sm:-right-6 md:-right-7 top-1/2 -translate-y-1/2 z-[60] w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-300 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              flippedCount >= totalLeaves
                ? 'opacity-0 pointer-events-none'
                : 'border-white/30 bg-black/90 hover:bg-vampire-red hover:border-vampire-red text-bone hover:text-black cursor-pointer hover:scale-110 active:scale-95 shadow-[0_4px_25px_rgba(0,0,0,0.85)] backdrop-blur-md'
            }`}
            aria-label={t("Página siguiente", "Next page")}
            title={t("Página siguiente (→)", "Next page (→)")}
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>

        {/* ======================================================================= */}
        {/* STACKED 3D LEAVES                                                       */}
        {/* Leaf 0 = Back cover; Leaf 4 = Front cover                               */}
        {/* ======================================================================= */}

        {/* --------------------------------------------------------------------- */}
        {/* LEAF 0: Certificado & Back Cover                                      */}
        {/* --------------------------------------------------------------------- */}
        <motion.div
          key="leaf-0"
          className="right book-leaf absolute top-0 right-0 w-1/2 h-full cursor-pointer select-none"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: isCoverClosed ? 'none' : 'auto',
          }}
          animate={{
            rotateY: (0 >= totalLeaves - flippedCount) ? -180 : 0,
            zIndex: getLeafZIndex(0),
          }}
          transition={{
            rotateY: { duration: FLIP_DURATION, ease: FLIP_EASE },
            zIndex: { duration: 0 },
          }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a') || target.closest('.no-flip')) return;
            if (0 >= totalLeaves - flippedCount) turnLeft();
            else turnRight();
          }}
        >
          {/* Front: Certificado de Autenticidad (PÁG. 07) */}
          <figure 
            className="front absolute inset-0 m-0 w-full h-full bg-[#fdfbf7] rounded-none overflow-hidden shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between border-l border-[#2b2b2b]/15"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden', 
              transform: 'translateZ(1px)',
              boxShadow: turningLeaf === 0 ? '-14px 10px 24px rgba(0,0,0,0.35)' : undefined,
            }}
          >
            {/* Antique Fine Parchment Paper Overlay */}
            <PaperTextureOverlay type="parchment" seed={7} opacity={0.05} />

            {/* Spine Crease Shadow */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 pointer-events-none bg-gradient-to-r from-black/25 via-black/10 to-transparent z-10" aria-hidden="true" />

            {/* Subtle Natural Curvature Shadow on Turning Page */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 0
                  ? (turnDirection === 'forward' ? [0.1, 0.35, 0.1] : [0.1, 0.35, 0.1])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            <div className="border border-[#3d362e]/30 p-3 sm:p-5 md:p-6 rounded-none h-full flex flex-col justify-between bg-[#fcfaf4] shadow-inner relative z-10">
              <div className="text-center pb-2.5 border-b border-[#3d362e]/20">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#54422b] font-bold">
                  {t(pages.page07?.sectionHeaderEs || "VII. CERTIFICADO DE AUTENTICIDAD", pages.page07?.sectionHeaderEn || "VII. CERTIFICATE OF AUTHENTICITY")}
                </span>
                <h3 className="font-serif italic font-bold text-base sm:text-lg md:text-xl text-[#1c1917] mt-1">
                  {t(pages.page07?.titleEs || project.titleEs, pages.page07?.titleEn || project.titleEn)}
                </h3>
              </div>

              <div className="my-auto text-center space-y-2.5 py-2">
                <p className="text-xs sm:text-sm font-serif italic text-[#332e26] leading-relaxed max-w-sm mx-auto">
                  {t(
                    pages.page07?.notesEs || "Por la presente se certifica que esta obra conceptual forma parte del archivo original de Marina Martín Prieto.",
                    pages.page07?.notesEn || "This certifies that this concept artwork belongs to the original archive of Marina Martín Prieto."
                  )}
                </p>
                <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-mono text-[#54422b] font-bold">
                  <Sparkles size={14} aria-hidden="true" />
                  <span>REF: MMP-ART-{project.year}-00{project.id}</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#3d362e]/20 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#3d372e]">
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] text-[#54422b] uppercase tracking-wider font-bold">{t("Firma", "Signature")}</div>
                  <div className="font-serif italic text-sm sm:text-base font-bold text-[#1c1917]">{t(pages.page07?.footerLeftEs || "Marina Martín Prieto", pages.page07?.footerLeftEn || "Marina Martín Prieto")}</div>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-none border-2 border-[#54422b] flex items-center justify-center text-[9px] sm:text-[10px] uppercase font-mono font-bold text-[#54422b] bg-[#54422b]/10 shadow-xs">
                  SEAL
                </div>
              </div>
            </div>

            <div className="text-right text-[10px] sm:text-xs font-mono text-[#54422b] pt-1.5 font-bold relative z-10">
              {pages.page07?.pageNumber || "PÁG. 07"} · COLOFÓN
            </div>
          </figure>

          {/* Back: Contraportada (#back-cover) */}
          <figure 
            id="back-cover"
            className="back absolute inset-0 m-0 w-full h-full rounded-none overflow-hidden shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-white/20"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              boxShadow: turningLeaf === 0 ? '14px 10px 24px rgba(0,0,0,0.35)' : undefined,
              backgroundColor: project.coverColor,
              backgroundImage: `
                radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 70%),
                linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.75) 100%)
              `
            }}
          >
            {/* Traditional Book Blind-Debossed Framing Line */}
            <div className="absolute inset-2 sm:inset-3 rounded-none border border-white/[0.08] pointer-events-none z-10" />

            {/* Traditional Corner Metal Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#B8C5A8]/40 rounded-none pointer-events-none z-20" aria-hidden="true" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#B8C5A8]/40 rounded-none pointer-events-none z-20" aria-hidden="true" />
            {/* Subtle Natural Landing Shading */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 0
                  ? (turnDirection === 'forward' ? [0.25, 0.1, 0] : [0, 0.1, 0.25])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            <div className="my-auto flex flex-col items-center justify-center text-center z-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-none border border-white/20 flex items-center justify-center text-bone font-serif italic text-xl sm:text-2xl shadow-inner mb-3 bg-black/40">
                MMP
              </div>
              <h4 className="font-serif italic text-bone text-base sm:text-lg font-bold">
                Marina Martín Prieto
              </h4>
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-bone-muted mt-1.5 font-semibold">
                {t("ARCHIVO PRIVADO DE ESTUDIO", "PRIVATE STUDIO ARCHIVE")}
              </p>
            </div>

            <div className="z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-bone-muted border-t border-white/15 pt-2.5">
              <span>{t("ARCHIVO VISUAL · MMP", "VISUAL ARCHIVE · MMP")}</span>
              <span>{project.year}</span>
            </div>
          </figure>
        </motion.div>

        {/* --------------------------------------------------------------------- */}
        {/* LEAF 1: Lámina Final HD & Revisión de Taller (PÁG. 05 & PÁG. 06)       */}
        {/* --------------------------------------------------------------------- */}
        <motion.div
          key="leaf-1"
          className="right book-leaf absolute top-0 right-0 w-1/2 h-full cursor-pointer select-none"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: isCoverClosed || isBackClosed ? 'none' : 'auto',
          }}
          animate={{
            rotateY: (1 >= totalLeaves - flippedCount) ? -180 : 0,
            zIndex: getLeafZIndex(1),
          }}
          transition={{
            rotateY: { duration: FLIP_DURATION, ease: FLIP_EASE },
            zIndex: { duration: 0 },
          }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a') || target.closest('.no-flip')) return;
            if (1 >= totalLeaves - flippedCount) turnLeft();
            else turnRight();
          }}
        >
          {/* Front: Page 5 Right (Lámina Final HD) */}
          <figure 
            className="front absolute inset-0 m-0 w-full h-full bg-[#fdfbf7] rounded-none overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col justify-between border-l border-[#2b2b2b]/15"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden', 
              transform: 'translateZ(1px)',
              boxShadow: turningLeaf === 1 ? '-14px 10px 24px rgba(0,0,0,0.35)' : undefined,
            }}
          >
            {/* Delicate Linen Woven Paper Overlay */}
            <PaperTextureOverlay type="woven" seed={5} opacity={0.05} />

            {/* Subtle Natural Curvature Shadow on Turning Page */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 1
                  ? (turnDirection === 'forward' ? [0.1, 0.35, 0.1] : [0.1, 0.35, 0.1])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/10 text-xs sm:text-sm font-mono text-[#54422b] relative z-10">
              <span className="font-bold tracking-wider uppercase">
                {t(pages.page05?.sectionHeaderEs || "V. LÁMINA FINAL HD", pages.page05?.sectionHeaderEn || "V. FINAL HD PLATE")}
              </span>
              <span className="font-semibold">{pages.page05?.footerRightEs || project.sketchbookVol}</span>
            </div>

            {/* Archival Artwork Plate with ProgressiveImage */}
            <div className="relative my-auto flex-1 max-h-[76%] rounded-none overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-xl group z-10">
              <ProgressiveImage 
                src={pages.page05?.imageUrl || project.imageUrl} 
                alt={`${t("Lámina final HD de", "Final HD plate of")} ${t(project.titleEs, project.titleEn)}`}
                widthParam={900}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                containerClassName="w-full h-full"
              />
              
              {/* Fullscreen Expand Button (Min 44x44px for WCAG AAA) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenZoom) onOpenZoom(pages.page05?.imageUrl || project.imageUrl);
                  else if (onOpenDetail) onOpenDetail();
                }}
                className="no-flip absolute bottom-2.5 right-2.5 min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-none bg-black/85 hover:bg-vampire-red text-vampire-red hover:text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg border border-vampire-red/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red"
                aria-label={t("Ver lámina en pantalla completa", "Fullscreen plate")}
                title={t("Ver lámina en pantalla completa", "Fullscreen plate")}
              >
                <Maximize2 size={15} aria-hidden="true" />
                <span>{t("HD", "HD")}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-[#2b2b2b]/10 flex items-center justify-between text-xs sm:text-sm font-serif relative z-10">
              <div className="italic text-[#1c1917] truncate max-w-[220px] font-semibold">
                «{t(pages.page05?.titleEs || project.titleEs, pages.page05?.titleEn || project.titleEn)}» — Marina Martín Prieto
              </div>
              <span className="font-mono text-[#54422b] text-[10px] sm:text-xs font-bold">
                {pages.page05?.pageNumber || "PÁG. 05"}
              </span>
            </div>
          </figure>

          {/* Back: Page 6 Left (Revisión de Taller) */}
          <figure 
            className="back absolute inset-0 m-0 w-full h-full bg-[#fdfbf7] rounded-none overflow-hidden shadow-2xl p-4 sm:p-6 md:p-7 flex flex-col justify-between border-r border-[#2b2b2b]/15"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              boxShadow: turningLeaf === 1 ? '14px 10px 24px rgba(0,0,0,0.35)' : undefined,
            }}
          >
            {/* Antique Laid Paper Overlay */}
            <PaperTextureOverlay type="laid" seed={6} opacity={0.05} />
            {/* Subtle Natural Landing Shading */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 1
                  ? (turnDirection === 'forward' ? [0.25, 0.1, 0] : [0, 0.1, 0.25])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/15 text-xs sm:text-sm font-mono text-[#54422b]">
                  <span className="font-bold tracking-wider uppercase">
                    {t(pages.page06?.sectionHeaderEs || "VI. REVISIÓN DE TALLER", pages.page06?.sectionHeaderEn || "VI. WORKSHOP REVIEW")}
                  </span>
                  <span className="font-bold">{pages.page06?.pageNumber || "PÁG. 06"}</span>
                </div>

                <h3 className="font-serif italic font-bold text-base sm:text-lg md:text-xl text-[#1c1917] mt-3 mb-2">
                  {t(pages.page06?.titleEs || "Metodología & Ejecución", pages.page06?.titleEn || "Methodology & Execution")}
                </h3>
                <p className="text-xs sm:text-sm font-serif italic text-[#332e26] leading-relaxed mb-4">
                  {t(pages.page06?.notesEs || project.techniqueEs, pages.page06?.notesEn || project.techniqueEn)}
                </p>

                {/* 2x2 Clean Technical Specs Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 sm:p-3.5 rounded-none bg-[#efe9d9]/90 border border-[#3d362e]/20 text-xs font-mono text-[#1c1917]">
                  <div>
                    <span className="text-[#54422b] font-bold block text-[10px] uppercase">{t("Software", "Software")}:</span>
                    <span className="font-semibold truncate block">{project.tools}</span>
                  </div>
                  <div>
                    <span className="text-[#54422b] font-bold block text-[10px] uppercase">{t("Rol Artístico", "Artistic Role")}:</span>
                    <span className="font-semibold truncate block">{t(project.roleEs, project.roleEn)}</span>
                  </div>
                  <div>
                    <span className="text-[#54422b] font-bold block text-[10px] uppercase">{t("Categoría", "Category")}:</span>
                    <span className="font-semibold truncate block">{t(project.categoryEs, project.categoryEn)}</span>
                  </div>
                  <div>
                    <span className="text-[#54422b] font-bold block text-[10px] uppercase">{t("Expediente", "Dossier")}:</span>
                    <span className="font-semibold truncate block">{project.sketchbookVol}</span>
                  </div>
                </div>
              </div>

              {(pages.page06?.quoteEs || true) && (
                <div className="my-2 p-3 rounded-none border-l-4 border-vampire-red bg-white/85 text-xs sm:text-sm font-serif italic text-[#1c1917] font-semibold shadow-xs">
                  «{t(
                    pages.page06?.quoteEs || "La comprensión de la luz y el color traduce las ideas en movimiento.",
                    pages.page06?.quoteEn || "Understanding light and color brings ideas to life."
                  )}»
                </div>
              )}

              <div className="pt-2 border-t border-[#2b2b2b]/15 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#54422b]">
                <span className="font-semibold">{t(pages.page06?.footerLeftEs || "PROCESO Y DESARROLLO VISUAL", pages.page06?.footerLeftEn || "VISUAL PROCESS & DEVELOPMENT")}</span>
                <span className="font-bold">{pages.page06?.footerRightEs || `MMP · ${project.year}`}</span>
              </div>
            </div>
          </figure>
        </motion.div>

        {/* --------------------------------------------------------------------- */}
        {/* LEAF 2: Clave Tonal & Estudio Secundario (PÁG. 03 & PÁG. 04)           */}
        {/* --------------------------------------------------------------------- */}
        <motion.div
          key="leaf-2"
          className="right book-leaf absolute top-0 right-0 w-1/2 h-full cursor-pointer select-none"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: isCoverClosed || isBackClosed ? 'none' : 'auto',
          }}
          animate={{
            rotateY: (2 >= totalLeaves - flippedCount) ? -180 : 0,
            zIndex: getLeafZIndex(2),
          }}
          transition={{
            rotateY: { duration: FLIP_DURATION, ease: FLIP_EASE },
            zIndex: { duration: 0 },
          }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a') || target.closest('.no-flip')) return;
            if (2 >= totalLeaves - flippedCount) turnLeft();
            else turnRight();
          }}
        >
          {/* Front: Page 03 Right (Clave Tonal & Iluminación) */}
          <figure 
            className="front absolute inset-0 m-0 w-full h-full bg-[#fdfbf7] rounded-none overflow-hidden shadow-2xl p-4 sm:p-6 md:p-7 flex flex-col justify-between border-l border-[#2b2b2b]/15"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden', 
              transform: 'translateZ(1px)',
              boxShadow: turningLeaf === 2 ? '-14px 10px 24px rgba(0,0,0,0.35)' : undefined,
            }}
          >
            {/* Fine Cold-Press Watercolor Paper Overlay */}
            <PaperTextureOverlay type="watercolor" seed={3} opacity={0.055} />

            {/* Subtle Natural Curvature Shadow on Turning Page */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 2
                  ? (turnDirection === 'forward' ? [0.1, 0.35, 0.1] : [0.1, 0.35, 0.1])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            <div className="flex-1 flex flex-col justify-between py-1 relative z-10">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/15 text-xs sm:text-sm font-mono text-[#54422b]">
                  <span className="font-bold uppercase tracking-wider">
                    {t(pages.page03.sectionHeaderEs, pages.page03.sectionHeaderEn)}
                  </span>
                  <span className="font-bold">{pages.page03.pageNumber}</span>
                </div>

                <div className="mt-2 mb-1.5">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                    {t(pages.page03.subHeaderEs, pages.page03.subHeaderEn)}
                  </span>
                  <h3 className="font-serif italic font-bold text-base sm:text-lg md:text-xl text-[#1c1917] truncate">
                    {t(pages.page03.titleEs, pages.page03.titleEn)}
                  </h3>
                </div>

                {/* Illustration I Plate */}
                <div className="relative aspect-[16/10] w-full rounded-none overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-md my-2">
                  <ProgressiveImage 
                    src={pages.page03.imageUrl} 
                    alt={t(pages.page03.imageAltEs || pages.page03.titleEs, pages.page03.imageAltEn || pages.page03.titleEn)}
                    widthParam={900}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                  {(pages.page03.hotspots || []).map((hs, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(hs);
                      }}
                      className="no-flip absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group/hs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red"
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      aria-label={`${t("Anotación técnica:", "Technical note:")} ${t(hs.titleEs, hs.titleEn)}`}
                    >
                      <span className="w-5 h-5 rounded-none border-2 border-[#B8C5A8] bg-black/90 text-[#B8C5A8] flex items-center justify-center text-xs font-bold shadow-xl group-hover/hs:scale-125 transition-transform">
                        ✦
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenZoom) onOpenZoom(pages.page03.imageUrl);
                    }}
                    className="no-flip absolute bottom-1.5 right-1.5 min-h-[36px] px-2.5 py-1 rounded-none bg-black/85 hover:bg-vampire-red text-vampire-red hover:text-black text-xs font-mono font-bold flex items-center gap-1 transition-all shadow-md border border-vampire-red/30 cursor-pointer"
                    aria-label={t("Ver en pantalla completa", "Fullscreen")}
                    title={t("Ver en pantalla completa", "Fullscreen")}
                  >
                    <Maximize2 size={13} aria-hidden="true" />
                    <span>HD</span>
                  </button>
                  {/* Floating Hotspot Callout */}
                  <AnimatePresence>
                    {activeHotspot && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="no-flip absolute bottom-2 left-2 right-16 p-2 rounded-none bg-black/95 backdrop-blur-md text-bone text-xs border border-[#B8C5A8]/40 shadow-2xl z-20" 
                        role="region" 
                        aria-label={t(activeHotspot.titleEs, activeHotspot.titleEn)}
                      >
                        <div className="flex items-center justify-between text-[#B8C5A8] font-bold mb-0.5 text-[11px]">
                          <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(null);
                            }} 
                            className="w-5 h-5 flex items-center justify-center text-bone-muted hover:text-vampire-red cursor-pointer transition-colors"
                            aria-label={t("Cerrar nota", "Close note")}
                          >
                            ✕
                          </button>
                        </div>
                        <p className="font-serif italic text-bone text-[11px] leading-tight line-clamp-2">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                {(pages.page03.quoteEs || pages.page03.notesEs) && (
                  <div className="my-1 p-2.5 sm:p-3 rounded-none bg-[#f7f2e7] border-l-3 border-[#54422b] shadow-xs">
                    <p className="font-serif italic text-xs sm:text-sm text-[#2b251e] leading-relaxed line-clamp-3">
                      «{t(pages.page03.quoteEs || pages.page03.notesEs || "", pages.page03.quoteEn || pages.page03.notesEn || "")}»
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-[#2b2b2b]/15 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#54422b]">
                  <span className="font-serif italic text-[#3d372e] font-semibold">{t(pages.page03.footerLeftEs || "Ilustraciones · Lámina I", pages.page03.footerLeftEn || "Illustrations · Plate I")}</span>
                  <span className="font-bold">{pages.page03.footerRightEs || "PLATE 01 · MMP"}</span>
                </div>
              </div>
            </div>
          </figure>

          {/* Back: Page 04 Left (Ilustración II / Estudio Secundario & Color) */}
          <figure 
            className="back absolute inset-0 m-0 w-full h-full bg-[#fdfbf7] rounded-none overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col justify-between border-r border-[#2b2b2b]/15"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              boxShadow: turningLeaf === 2 ? '14px 10px 24px rgba(0,0,0,0.35)' : undefined,
            }}
          >
            {/* Silky Vellum Paper Overlay */}
            <PaperTextureOverlay type="vellum" seed={4} opacity={0.045} />
            {/* Subtle Natural Landing Shading */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 2
                  ? (turnDirection === 'forward' ? [0.25, 0.1, 0] : [0, 0.1, 0.25])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/10 text-xs sm:text-sm font-mono text-[#54422b]">
              <span className="font-bold">{pages.page04.pageNumber}</span>
              <span className="font-bold tracking-wider uppercase">
                {t(pages.page04.sectionHeaderEs, pages.page04.sectionHeaderEn)}
              </span>
            </div>

            <div className="mt-1 mb-1">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                {t(pages.page04.subHeaderEs, pages.page04.subHeaderEn)}
              </span>
              <h4 className="font-serif italic font-bold text-base sm:text-lg text-[#1c1917] truncate">
                {t(pages.page04.titleEs, pages.page04.titleEn)}
              </h4>
            </div>

            <div className="relative my-auto flex-1 max-h-[72%] rounded-none overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-lg group">
              <ProgressiveImage 
                src={pages.page04.imageUrl} 
                alt={t(pages.page04.imageAltEs || pages.page04.titleEs, pages.page04.imageAltEn || pages.page04.titleEn)}
                widthParam={900}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                containerClassName="w-full h-full"
              />

              {(pages.page04.hotspots || []).map((hs, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(hs);
                  }}
                  className="no-flip absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group/hs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  aria-label={`${t("Anotación técnica:", "Technical note:")} ${t(hs.titleEs, hs.titleEn)}`}
                >
                  <span className="w-5 h-5 rounded-none border-2 border-[#B8C5A8] bg-black/90 text-[#B8C5A8] flex items-center justify-center text-xs font-bold shadow-xl group-hover/hs:scale-125 transition-transform">
                    ✦
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenZoom) onOpenZoom(pages.page04.imageUrl);
                }}
                className="no-flip absolute bottom-2.5 right-2.5 min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-none bg-black/85 hover:bg-vampire-red text-vampire-red hover:text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md border border-vampire-red/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red"
                aria-label={t("Ver lámina en pantalla completa", "Fullscreen")}
                title={t("Ver lámina en pantalla completa", "Fullscreen")}
              >
                <Maximize2 size={15} aria-hidden="true" />
                <span>HD</span>
              </button>

              {/* Floating Hotspot Callout */}
              <AnimatePresence>
                {activeHotspot && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="no-flip absolute bottom-2 left-2 right-16 p-2 rounded-none bg-black/95 backdrop-blur-md text-bone text-xs border border-[#B8C5A8]/40 shadow-2xl z-20" 
                    role="region" 
                    aria-label={t(activeHotspot.titleEs, activeHotspot.titleEn)}
                  >
                    <div className="flex items-center justify-between text-[#B8C5A8] font-bold mb-0.5 text-[11px]">
                      <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(null);
                        }} 
                        className="w-5 h-5 flex items-center justify-center text-bone-muted hover:text-vampire-red cursor-pointer transition-colors"
                        aria-label={t("Cerrar nota", "Close note")}
                      >
                        ✕
                      </button>
                    </div>
                    <p className="font-serif italic text-bone text-[11px] leading-tight line-clamp-2">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {(pages.page04.quoteEs || pages.page04.notesEs) && (
              <div className="my-1 p-2.5 rounded-none bg-[#f7f2e7] border-l-3 border-[#54422b] shadow-xs">
                <p className="font-serif italic text-xs text-[#2b251e] leading-relaxed">
                  «{t(pages.page04.quoteEs || pages.page04.notesEs || "", pages.page04.quoteEn || pages.page04.notesEn || "")}»
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-[#2b2b2b]/10 flex items-center justify-between text-xs sm:text-sm font-mono text-[#3d372e]">
              <span className="font-serif italic font-semibold">{t(pages.page04.footerLeftEs || "Ilustraciones · Lámina II", pages.page04.footerLeftEn || "Illustrations · Plate II")}</span>
              <span className="text-[#54422b] font-bold">{pages.page04.footerRightEs || "PLATE 02 · MMP"}</span>
            </div>
          </figure>
        </motion.div>

        {/* --------------------------------------------------------------------- */}
        {/* LEAF 3: Dossier Conceptual & Bocetos (PÁG. 01 & PÁG. 02)               */}
        {/* --------------------------------------------------------------------- */}
        <motion.div
          key="leaf-3"
          className="right book-leaf absolute top-0 right-0 w-1/2 h-full cursor-pointer select-none"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: isCoverClosed || isBackClosed ? 'none' : 'auto',
          }}
          animate={{
            rotateY: (3 >= totalLeaves - flippedCount) ? -180 : 0,
            zIndex: getLeafZIndex(3),
          }}
          transition={{
            rotateY: { duration: FLIP_DURATION, ease: FLIP_EASE },
            zIndex: { duration: 0 },
          }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a') || target.closest('.no-flip')) return;
            if (3 >= totalLeaves - flippedCount) turnLeft();
            else turnRight();
          }}
        >
          {/* Front: Page 01 Right (I. Dossier Conceptual & Paleta) */}
          <figure 
            className="front absolute inset-0 m-0 w-full h-full bg-[#fdfbf7] rounded-none overflow-hidden shadow-2xl p-4 sm:p-6 md:p-7 flex flex-col justify-between border-l border-[#2b2b2b]/15"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden', 
              transform: 'translateZ(1px)',
              boxShadow: turningLeaf === 3 ? '-14px 10px 24px rgba(0,0,0,0.35)' : undefined,
            }}
          >
            {/* Fine Cotton Rag Paper Overlay */}
            <PaperTextureOverlay type="rag" seed={1} opacity={0.05} />

            {/* Subtle Natural Curvature Shadow on Turning Page */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 3
                  ? (turnDirection === 'forward' ? [0.1, 0.35, 0.1] : [0.1, 0.35, 0.1])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            <div className="flex-1 flex flex-col justify-between py-1 relative z-10">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/15 text-xs sm:text-sm font-mono text-[#54422b]">
                  <span className="font-bold uppercase tracking-wider">
                    {t(pages.page01.sectionHeaderEs, pages.page01.sectionHeaderEn)}
                  </span>
                  <span className="font-bold">{pages.page01.pageNumber}</span>
                </div>

                <div className="mt-2.5 mb-2">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                    {t(pages.page01.subHeaderEs, pages.page01.subHeaderEn)}
                  </span>
                  <h3 className="font-serif italic font-bold text-lg sm:text-xl md:text-2xl text-[#1c1917] truncate">
                    {t(pages.page01.titleEs, pages.page01.titleEn)}
                  </h3>
                </div>

                {/* Character Plate */}
                <div className="relative aspect-[16/9] w-full rounded-none overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-md my-2">
                  <ProgressiveImage 
                    src={pages.page01.imageUrl} 
                    alt={t(pages.page01.imageAltEs || pages.page01.titleEs, pages.page01.imageAltEn || pages.page01.titleEn)}
                    widthParam={900}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                  {(pages.page01.hotspots || []).map((hs, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(hs);
                      }}
                      className="no-flip absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group/hs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red"
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      aria-label={`${t("Anotación técnica:", "Technical note:")} ${t(hs.titleEs, hs.titleEn)}`}
                    >
                      <span className="w-5 h-5 rounded-none border-2 border-[#B8C5A8] bg-black/90 text-[#B8C5A8] flex items-center justify-center text-xs font-bold shadow-xl group-hover/hs:scale-125 transition-transform">
                        ✦
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenZoom) onOpenZoom(pages.page01.imageUrl);
                    }}
                    className="no-flip absolute bottom-1.5 right-1.5 min-h-[36px] px-2.5 py-1 rounded-none bg-black/85 hover:bg-vampire-red text-vampire-red hover:text-black text-xs font-mono font-bold flex items-center gap-1 transition-all shadow-md border border-vampire-red/30 cursor-pointer"
                    aria-label={t("Ver en pantalla completa", "Fullscreen")}
                    title={t("Ver en pantalla completa", "Fullscreen")}
                  >
                    <Maximize2 size={13} aria-hidden="true" />
                    <span>HD</span>
                  </button>
                  {/* Floating Hotspot Callout */}
                  <AnimatePresence>
                    {activeHotspot && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="no-flip absolute bottom-2 left-2 right-16 p-2 rounded-none bg-black/95 backdrop-blur-md text-bone text-xs border border-[#B8C5A8]/40 shadow-2xl z-20" 
                        role="region" 
                        aria-label={t(activeHotspot.titleEs, activeHotspot.titleEn)}
                      >
                        <div className="flex items-center justify-between text-[#B8C5A8] font-bold mb-0.5 text-[11px]">
                          <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(null);
                            }} 
                            className="w-5 h-5 flex items-center justify-center text-bone-muted hover:text-vampire-red cursor-pointer transition-colors"
                            aria-label={t("Cerrar nota", "Close note")}
                          >
                            ✕
                          </button>
                        </div>
                        <p className="font-serif italic text-bone text-[11px] leading-tight line-clamp-2">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Palette Chips (Min 44x44px hit target for WCAG AAA) */}
                {(pages.page01.palette || project.palette) && (
                  <div className="mb-2 p-2.5 rounded-none bg-[#efe9d9]/70 border border-[#3d362e]/20">
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#54422b] mb-1.5 flex items-center justify-between font-bold">
                      <span>{t("PALETA CROMÁTICA", "CHROMATIC PALETTE")}</span>
                      {copiedHex && (
                        <span className="text-vampire-red flex items-center gap-1 font-mono font-bold">
                          <Check size={13} aria-hidden="true" /> {copiedHex}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {(pages.page01.palette || project.palette).map((color, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyHex(color.hex);
                          }}
                          className="no-flip group/chip min-h-[38px] p-1.5 rounded-none bg-white/80 border border-[#3d362e]/20 hover:border-vampire-red transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red flex items-center gap-1.5"
                          title={`${t(color.nameEs, color.nameEn)} (${color.hex})`}
                          aria-label={`${t("Copiar código de color", "Copy color code")}: ${t(color.nameEs, color.nameEn)} (${color.hex})`}
                        >
                          <div 
                            className="w-4 h-4 rounded-none shadow-xs shrink-0 border border-black/20 group-hover/chip:scale-105 transition-transform"
                            style={{ backgroundColor: color.hex }}
                            aria-hidden="true"
                          />
                          <div className="overflow-hidden">
                            <span className="text-[10px] font-sans font-bold text-[#1c1917] truncate block leading-tight">
                              {t(color.nameEs, color.nameEn)}
                            </span>
                            <span className="text-[9px] font-mono text-[#54422b] font-semibold block">
                              {color.hex}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Artist Field Notes Callout */}
              {(pages.page01.notesEs || pages.page01.quoteEs || project.notesEs) && (
                <div className="my-1 p-2.5 sm:p-3 rounded-none bg-[#f7f2e7] border-l-3 border-[#54422b] shadow-xs">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#54422b] font-bold mb-0.5">
                    <Sparkles size={13} className="text-vampire-red" aria-hidden="true" />
                    <span>{t(pages.page01.notesTitleEs || "NOTAS DE LA ARTISTA", pages.page01.notesTitleEn || "ARTIST FIELD NOTES")}</span>
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-[#2b251e] leading-relaxed line-clamp-2">
                    «{t(pages.page01.notesEs || pages.page01.quoteEs || project.notesEs, pages.page01.notesEn || pages.page01.quoteEn || project.notesEn)}»
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-[#2b2b2b]/15 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#54422b]">
                <span className="font-serif italic text-[#3d372e] font-semibold">{t(pages.page01.footerLeftEs || `${project.categoryEs} · ${project.titleEs}`, pages.page01.footerLeftEn || `${project.categoryEn} · ${project.titleEn}`)}</span>
                <span className="font-bold">{pages.page01.footerRightEs || `EXP. ${project.sketchbookVol}`}</span>
              </div>
            </div>
          </figure>

          {/* Back: Page 02 Left (Diseño del Personaje Secundario / Bocetos) */}
          <figure 
            className="back absolute inset-0 m-0 w-full h-full bg-[#fdfbf7] rounded-none overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col justify-between border-r border-[#2b2b2b]/15"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              boxShadow: turningLeaf === 3 ? '14px 10px 24px rgba(0,0,0,0.35)' : undefined,
            }}
          >
            {/* Antique Laid Paper Overlay */}
            <PaperTextureOverlay type="laid" seed={2} opacity={0.05} />
            {/* Subtle Natural Landing Shading */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 3
                  ? (turnDirection === 'forward' ? [0.25, 0.1, 0] : [0, 0.1, 0.25])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/10 text-xs sm:text-sm font-mono text-[#54422b]">
              <span className="font-bold">{pages.page02.pageNumber}</span>
              <span className="font-bold uppercase tracking-wider">
                {t(pages.page02.sectionHeaderEs, pages.page02.sectionHeaderEn)}
              </span>
            </div>

            <div className="mt-1 mb-1">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                {t(pages.page02.subHeaderEs, pages.page02.subHeaderEn)}
              </span>
              <h4 className="font-serif italic font-bold text-base sm:text-lg text-[#1c1917] truncate">
                {t(pages.page02.titleEs, pages.page02.titleEn)}
              </h4>
            </div>

            <div className="relative my-auto flex-1 max-h-[72%] rounded-none overflow-hidden bg-black/90 border border-[#2b2b2b]/20 shadow-md">
              <ProgressiveImage 
                src={pages.page02.imageUrl} 
                alt={t(pages.page02.imageAltEs || pages.page02.titleEs, pages.page02.imageAltEn || pages.page02.titleEn)}
                widthParam={900}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />

              {(pages.page02.hotspots || []).map((hs, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(hs);
                  }}
                  className="no-flip absolute w-11 h-11 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group/hs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  aria-label={`${t("Anotación técnica:", "Technical note:")} ${t(hs.titleEs, hs.titleEn)}`}
                >
                  <span className="w-6 h-6 rounded-none border-2 border-[#B8C5A8] bg-black/90 text-[#B8C5A8] flex items-center justify-center text-xs font-bold shadow-xl group-hover/hs:scale-125 transition-transform">
                    ✦
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenZoom) onOpenZoom(pages.page02.imageUrl);
                }}
                className="no-flip absolute bottom-2.5 right-2.5 min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-none bg-black/85 hover:bg-vampire-red text-vampire-red hover:text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md border border-vampire-red/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red"
                aria-label={t("Ver en pantalla completa", "Fullscreen")}
                title={t("Ver en pantalla completa", "Fullscreen")}
              >
                <Maximize2 size={15} aria-hidden="true" />
                <span>HD</span>
              </button>
              {/* Floating Hotspot Callout pinned inside image plate */}
              <AnimatePresence>
                {activeHotspot && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="no-flip absolute bottom-2 left-2 right-16 p-2.5 rounded-none bg-black/95 backdrop-blur-md text-bone text-xs border border-[#B8C5A8]/40 shadow-2xl z-20" 
                    role="region" 
                    aria-label={t(activeHotspot.titleEs, activeHotspot.titleEn)}
                  >
                    <div className="flex items-center justify-between text-[#B8C5A8] font-bold mb-0.5 text-[11px]">
                      <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                      <button 
                        type="button" 
                        onClick={() => setActiveHotspot(null)} 
                        className="w-5 h-5 flex items-center justify-center text-bone-muted hover:text-vampire-red cursor-pointer transition-colors"
                        aria-label={t("Cerrar nota", "Close note")}
                      >
                        ✕
                      </button>
                    </div>
                    <p className="font-serif italic text-bone text-[11px] leading-tight line-clamp-2">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {(pages.page02.quoteEs || pages.page02.notesEs) && (
              <div className="my-1 p-2.5 rounded-none bg-[#f7f2e7] border-l-3 border-[#54422b] shadow-xs">
                <p className="font-serif italic text-xs text-[#2b251e] leading-relaxed">
                  «{t(pages.page02.quoteEs || pages.page02.notesEs || "", pages.page02.quoteEn || pages.page02.notesEn || "")}»
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-[#2b2b2b]/15 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#3d372e]">
              <span className="font-serif italic font-semibold">{t(pages.page02.footerLeftEs || "", pages.page02.footerLeftEn || "")}</span>
              <span className="text-[#54422b] font-bold">{pages.page02.footerRightEs || "PLATE 01"}</span>
            </div>
          </figure>
        </motion.div>

        {/* --------------------------------------------------------------------- */}
        {/* LEAF 4: FRONT COVER #cover & Inside Front Cover PÁG. 00                */}
        {/* --------------------------------------------------------------------- */}
        <motion.div
          key="leaf-4"
          className="right book-leaf absolute top-0 right-0 w-1/2 h-full cursor-pointer select-none"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: isBackClosed ? 'none' : 'auto',
          }}
          animate={{
            rotateY: (4 >= totalLeaves - flippedCount) ? -180 : 0,
            zIndex: getLeafZIndex(4),
          }}
          transition={{
            rotateY: { duration: FLIP_DURATION, ease: FLIP_EASE },
            zIndex: { duration: 0 },
          }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a') || target.closest('.no-flip')) return;
            if (4 >= totalLeaves - flippedCount) turnLeft();
            else turnRight();
          }}
        >
          {/* Front: FRONT COVER (#cover) - Sharp Square Traditional Cover */}
          <figure 
            id="cover"
            className="front absolute inset-0 m-0 w-full h-full rounded-none overflow-hidden shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between border border-white/20 select-none cursor-pointer"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(1px)',
              boxShadow: turningLeaf === 4 ? '-14px 10px 24px rgba(0,0,0,0.35)' : undefined,
              backgroundColor: project.coverColor,
              backgroundImage: `
                radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 70%),
                linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.72) 100%)
              `
            }}
          >
            {/* Traditional Book Blind-Debossed Framing Line */}
            <div className="absolute inset-2 sm:inset-3 rounded-none border border-white/[0.08] pointer-events-none z-10" />

            {/* Traditional Corner Metal Accents */}
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#B8C5A8]/40 rounded-none pointer-events-none z-20" aria-hidden="true" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#B8C5A8]/40 rounded-none pointer-events-none z-20" aria-hidden="true" />
            {/* Subtle Natural Curvature Shadow on Turning Cover */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 4
                  ? (turnDirection === 'forward' ? [0.15, 0.4, 0.15] : [0.15, 0.4, 0.15])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            {/* Left Spine Strip */}
            <div 
              className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 z-20 flex flex-col justify-center items-center border-r border-black/50 shadow-[2px_0_10px_rgba(0,0,0,0.5)]"
              style={{ 
                backgroundColor: project.spineColor,
                backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.5))' 
              }}
            >
              <div className="transform -rotate-90 whitespace-nowrap text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-bone-muted font-serif font-bold pointer-events-none">
                <span>{project.sketchbookVol}</span>
              </div>
            </div>

            {/* Spine Hinge Indentation */}
            <div className="absolute top-0 bottom-0 left-[34px] sm:left-[42px] w-[2px] bg-black/60 border-r border-white/10 pointer-events-none z-20 shadow-inner" />

            {/* Cover Header */}
            <div className="relative z-10 pl-10 sm:pl-14 pr-2 sm:pr-4 pt-1 sm:pt-2 flex items-center justify-between text-xs sm:text-sm font-mono tracking-widest text-bone">
              <span className="uppercase font-semibold tracking-[0.2em]">{project.sketchbookVol}</span>
              <span className="font-semibold text-bone-muted">{project.year}</span>
            </div>

            {/* Center Artwork Plate */}
            <div className="relative z-10 pl-10 sm:pl-14 pr-2 sm:pr-4 my-auto py-1.5">
              <div className="relative p-1.5 rounded-none bg-black/70 border border-white/20 shadow-2xl">
                <div className="relative aspect-[4/3] w-full rounded-none overflow-hidden bg-black/90">
                  <ProgressiveImage 
                    src={project.imageUrl} 
                    alt={`${t("Lámina de portada de", "Cover artwork of")} ${t(project.titleEs, project.titleEn)}`} 
                    widthParam={900}
                    priority={true}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Cover Footer & Artist */}
            <div className="relative z-10 pl-10 sm:pl-14 pr-2 sm:pr-4 pb-1 sm:pb-2">
              <div className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[#B8C5A8] font-bold mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rotate-45 organic-diamond-sm bg-[#B8C5A8] shadow-[0_0_6px_rgba(184,197,168,0.7)]" aria-hidden="true" />
                <span>{t(project.categoryEs, project.categoryEn)}</span>
              </div>
              <h3 className="font-serif italic font-bold text-base sm:text-xl md:text-2xl text-bone leading-tight drop-shadow-sm mb-2">
                {t(project.titleEs, project.titleEn)}
              </h3>
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs sm:text-sm font-mono text-bone-muted">
                <span className="tracking-wider">MARINA MARTÍN PRIETO</span>
                <span className="text-[#B8C5A8] font-bold flex items-center gap-1">
                  {t("ABRIR", "OPEN")} ➔
                </span>
              </div>
            </div>
          </figure>

          {/* Back: Page 00 Left (Estudio Preliminar & Guarda de Bocetos) */}
          <figure 
            className="back absolute inset-0 m-0 w-full h-full bg-[#fdfbf7] rounded-none overflow-hidden shadow-2xl p-4 sm:p-6 md:p-7 flex flex-col justify-between border-r border-[#2b2b2b]/15"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              boxShadow: turningLeaf === 4 ? '14px 10px 24px rgba(0,0,0,0.35)' : undefined,
            }}
          >
            {/* Handcrafted Botanical Paper Overlay */}
            <PaperTextureOverlay type="botanical" seed={8} opacity={0.05} />
            {/* Subtle Natural Landing Shading */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
              }}
              animate={{
                opacity: turningLeaf === 4
                  ? (turnDirection === 'forward' ? [0.25, 0.1, 0] : [0, 0.1, 0.25])
                  : 0,
              }}
              transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
              aria-hidden="true"
            />

            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]/15 text-xs sm:text-sm font-mono text-[#54422b]">
                  <span className="font-bold uppercase tracking-wider">
                    {t(pages.page00.sectionHeaderEs, pages.page00.sectionHeaderEn)}
                  </span>
                  <span className="font-bold">{pages.page00.pageNumber}</span>
                </div>

                {/* Title & Concept Header */}
                <div className="mt-3 mb-2">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#165e38] font-bold block mb-0.5">
                    {t(pages.page00.subHeaderEs, pages.page00.subHeaderEn)}
                  </span>
                  <h4 className="font-serif italic font-bold text-lg sm:text-xl text-[#1c1917]">
                    {t(pages.page00.titleEs, pages.page00.titleEn)}
                  </h4>
                </div>

                {/* Artwork Sketch Vignette */}
                <div className="relative aspect-[16/9] w-full rounded-none overflow-hidden border border-[#2b2b2b]/20 shadow-sm bg-black/90 my-2">
                  <ProgressiveImage 
                    src={pages.page00.imageUrl} 
                    alt={t(pages.page00.imageAltEs || pages.page00.titleEs, pages.page00.imageAltEn || pages.page00.titleEn)} 
                    widthParam={900}
                    className="w-full h-full object-cover filter contrast-105"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {(pages.page00.hotspots || []).map((hs, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(hs);
                      }}
                      className="no-flip absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group/hs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vampire-red"
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      aria-label={`${t("Anotación técnica:", "Technical note:")} ${t(hs.titleEs, hs.titleEn)}`}
                    >
                      <span className="w-5 h-5 rounded-none border-2 border-[#B8C5A8] bg-black/90 text-[#B8C5A8] flex items-center justify-center text-xs font-bold shadow-xl group-hover/hs:scale-125 transition-transform">
                        ✦
                      </span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenZoom) onOpenZoom(pages.page00.imageUrl);
                    }}
                    className="no-flip absolute bottom-1.5 right-1.5 min-h-[36px] px-2.5 py-1 rounded-none bg-black/85 hover:bg-vampire-red text-vampire-red hover:text-black text-xs font-mono font-bold flex items-center gap-1 transition-all shadow-md border border-vampire-red/30 cursor-pointer"
                    aria-label={t("Ver en pantalla completa", "Fullscreen")}
                    title={t("Ver en pantalla completa", "Fullscreen")}
                  >
                    <Maximize2 size={13} aria-hidden="true" />
                    <span>HD</span>
                  </button>

                  {/* Floating Hotspot Callout */}
                  <AnimatePresence>
                    {activeHotspot && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="no-flip absolute bottom-2 left-2 right-16 p-2 rounded-none bg-black/95 backdrop-blur-md text-bone text-xs border border-[#B8C5A8]/40 shadow-2xl z-20" 
                        role="region" 
                        aria-label={t(activeHotspot.titleEs, activeHotspot.titleEn)}
                      >
                        <div className="flex items-center justify-between text-[#B8C5A8] font-bold mb-0.5 text-[11px]">
                          <span>✦ {t(activeHotspot.titleEs, activeHotspot.titleEn)}</span>
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(null);
                            }} 
                            className="w-5 h-5 flex items-center justify-center text-bone-muted hover:text-vampire-red cursor-pointer transition-colors"
                            aria-label={t("Cerrar nota", "Close note")}
                          >
                            ✕
                          </button>
                        </div>
                        <p className="font-serif italic text-bone text-[11px] leading-tight line-clamp-2">{t(activeHotspot.descriptionEs, activeHotspot.descriptionEn)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Handwritten Artist Notes Callout */}
              <div className="my-1 p-3 sm:p-3.5 rounded-none bg-[#f7f2e7] border-l-3 border-[#54422b] shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#54422b] font-bold mb-1">
                  <Sparkles size={13} className="text-vampire-red" aria-hidden="true" />
                  <span>{t(pages.page00.notesTitleEs || "INDUMENTARIA & SILUETA", pages.page00.notesTitleEn || "COSTUME & SILHOUETTE")}</span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-[#2b251e] leading-relaxed">
                  «{t(pages.page00.quoteEs || pages.page00.notesEs || project.techniqueEs, pages.page00.quoteEn || pages.page00.notesEn || project.techniqueEn)}»
                </p>
              </div>

              <div className="pt-2 border-t border-[#2b2b2b]/15 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#3d372e]">
                <div>
                  <span className="text-[#54422b] uppercase font-bold">{t(pages.page00.footerLeftEs || `REGISTRO: ${project.year} · MMP`, pages.page00.footerLeftEn || `RECORD: ${project.year} · MMP`)}</span>
                </div>
                <div className="text-[#54422b] uppercase tracking-wider font-bold">
                  ✦ {pages.page00.footerRightEs || project.sketchbookVol}
                </div>
              </div>
            </div>
          </figure>
        </motion.div>
      </motion.div>

          {/* Subtle Specular Tactile Lighting Sheen that reacts dynamically to mouse position */}
          <div
            ref={sheenRef}
            className="pointer-events-none absolute inset-0 z-45 rounded-none opacity-10 transition-opacity"
            style={{
              background: 'radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 75%)',
              mixBlendMode: 'overlay',
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    )}
    </motion.div>
  );
};

export default Sketchbook;
