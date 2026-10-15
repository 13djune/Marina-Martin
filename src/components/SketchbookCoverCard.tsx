import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Project } from '../data';
import { useLanguage } from '../LanguageContext';
import ProgressiveImage from './ui/ProgressiveImage';

interface SketchbookCoverCardProps {
  project: Project;
  index: number;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const SketchbookCoverCard: React.FC<SketchbookCoverCardProps> = ({ project, index, onClick }) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Silky spring physics for tilt rotation
  const tiltSpring = { stiffness: 280, damping: 24, mass: 0.5 };
  const rotateX = useSpring(mouseY, tiltSpring);
  const rotateY = useSpring(mouseX, tiltSpring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalised tilt angles: X tilts based on Y, Y tilts based on X
    const tiltAmountX = ((y - centerY) / centerY) * -12;
    const tiltAmountY = ((x - centerX) / centerX) * 14;

    mouseY.set(tiltAmountX);
    mouseX.set(tiltAmountY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer select-none py-4"
      style={{ perspective: '1600px' }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e as any);
        }
      }}
      aria-label={`${t('Abrir cuaderno de bocetos', 'Open sketchbook')}: ${t(project.titleEs, project.titleEn)}`}
    >
      {/* 3D Contact Shadow on Table/Desk */}
      <div 
        className="absolute -bottom-2 inset-x-6 h-10 rounded-none blur-xl pointer-events-none transition-all duration-500"
        style={{
          backgroundColor: 'rgba(0,0,0,0.85)',
          transform: isHovered ? 'scale(1.08) translateY(12px)' : 'scale(0.95)',
          opacity: isHovered ? 0.95 : 0.65,
        }}
        aria-hidden="true"
      />

      {/* 3D Physical Book Structure - Square 1:1 Aspect Ratio (Crisp Square Corners, stays closed & tilts with mouse) */}
      <motion.div
        className="relative w-full aspect-square rounded-none transform-gpu transition-shadow duration-500"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          boxShadow: isHovered 
            ? `0 35px 70px -15px rgba(0,0,0,0.98), 0 0 40px ${project.accentColor}25`
            : '0 20px 45px -10px rgba(0,0,0,0.85)',
        }}
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        {/* Hardcover Casing - Sharp Square Format, No Border Radius */}
        <div 
          className="relative w-full h-full rounded-none overflow-hidden border border-white/15 ring-1 ring-inset ring-white/10 flex flex-col justify-between"
          style={{
            backgroundColor: project.coverColor,
            backgroundImage: `
              radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 70%),
              linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.68) 100%)
            `,
          }}
        >
          {/* Subtle Book Cloth / Leather Texture */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Traditional Book Blind-Debossed Frame Line */}
          <div className="absolute inset-2.5 rounded-none border border-white/[0.08] pointer-events-none z-10" />

          {/* Traditional Brass Corner Protectors (Crisp Square Corners) */}
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-300/40 rounded-none pointer-events-none z-20" aria-hidden="true" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300/40 rounded-none pointer-events-none z-20" aria-hidden="true" />

          {/* Left Book Spine (Encuadernación tradicional de libro cuadrado) */}
          <div 
            className="absolute top-0 bottom-0 left-0 w-7 sm:w-8 md:w-8.5 z-20 flex flex-col justify-center items-center border-r border-black/40 shadow-[2px_0_10px_rgba(0,0,0,0.5)]"
            style={{ 
              backgroundColor: project.spineColor,
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.55), rgba(255,255,255,0.08) 50%, rgba(0,0,0,0.45))' 
            }}
          >
            {/* Vertical Spine Title */}
            <div className="transform -rotate-90 whitespace-nowrap text-[7.5px] sm:text-[8px] uppercase tracking-[0.25em] text-bone-muted font-serif font-semibold pointer-events-none">
              <span>{project.sketchbookVol}</span>
            </div>
          </div>

          {/* Spine Hinge Indentation */}
          <div className="absolute top-0 bottom-0 left-[30px] sm:left-[34px] md:left-[36px] w-[2px] bg-black/50 border-r border-vampire-red/20 pointer-events-none z-20 shadow-inner" />

          {/* Cover Header Details */}
          <div className="relative z-10 pl-10 sm:pl-11 md:pl-12 pr-4 pt-3 sm:pt-3.5 flex items-center justify-between text-[10px] font-mono tracking-widest text-bone-muted">
            <span className="uppercase font-medium text-bone">{project.sketchbookVol}</span>
            <span className="font-medium text-bone-muted">{project.year}</span>
          </div>

          {/* Center Artwork Plate (Square / Crisp) */}
          <div className="relative z-10 pl-10 sm:pl-11 md:pl-12 pr-4 my-auto py-1">
            <div className="relative p-1 rounded-none bg-black/60 border border-white/20 shadow-xl group-hover:border-white/40 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.95)] transition-all duration-500">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-none overflow-hidden bg-black/80">
                <ProgressiveImage 
                  src={project.imageUrl} 
                  alt={`${t("Portada de", "Cover of")} ${t(project.titleEs, project.titleEn)}`} 
                  widthParam={800}
                  priority={index === 0}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Subtle Dynamic Sheen Line Transition across Leather Cover */}
          <div 
            className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.22) 50%, transparent 60%)',
              transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
              transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
            }}
            aria-hidden="true"
          />

          {/* Right Book Block Rim (Physical Paper Leaves Depth) */}
          <div 
            className="absolute top-1 bottom-1 -right-1 w-2 rounded-none pointer-events-none z-0 border-l border-black/40"
            style={{
              background: 'repeating-linear-gradient(to bottom, #d6cfbe 0px, #b8af9c 1px, #ede8dc 2px, #c4baa7 3px)',
              boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.4), 2px 2px 4px rgba(0,0,0,0.5)',
              opacity: isHovered ? 0.95 : 0.7,
              transition: 'opacity 0.4s ease',
            }}
            aria-hidden="true"
          />

          {/* Cover Footer & Clean Typography */}
          <div className="relative z-10 pl-10 sm:pl-11 md:pl-12 pr-4 pb-3 sm:pb-3.5">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#B8C5A8] font-bold mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rotate-45 organic-diamond-sm bg-[#B8C5A8] shadow-[0_0_6px_rgba(184,197,168,0.7)]" aria-hidden="true" />
              <span className="truncate">{t(project.categoryEs, project.categoryEn)}</span>
            </div>
            <h3 className="font-serif italic font-bold text-base sm:text-lg md:text-xl text-bone leading-tight drop-shadow-sm mb-1.5 group-hover:text-vampire-red transition-colors truncate">
              {t(project.titleEs, project.titleEn)}
            </h3>
            <div className="pt-1.5 border-t border-vampire-red/20 flex items-center justify-between text-[10px] font-mono text-bone-muted group-hover:text-vampire-red transition-colors">
              <span className="tracking-wider">{t("ABRIR CUADERNO", "OPEN SKETCHBOOK")}</span>
              <span className="text-[#B8C5A8] font-bold transform group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SketchbookCoverCard;
