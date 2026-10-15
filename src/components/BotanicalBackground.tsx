import React, { useEffect, useRef, useState } from 'react';

/**
 * BotanicalBackground
 * 
 * A sophisticated and moody botanical web design background for the portfolio.
 * - Palette: Deep, rich Kombu Green (#33432B) primary base contrasted with soft dusty pink (rosa empolvado) floral elements.
 * - Center: High-detail, sharp composition of vintage peonies, tulips, and lilies in chiaroscuro lighting.
 * - Edges: Heavy smooth blur resembling frosted glass / soft vignette creating clean negative space for typography and UI.
 */
export default function BotanicalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 20;
      targetY = (e.clientY / innerHeight - 0.5) * 15;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMousePos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{ backgroundColor: '#693D4E' }}
      aria-hidden="true"
    >
      {/* 1. Base Muted Plum Purple (#693D4E) with Kombu Green (#33432B) Shadows */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, #693D4E 0%, #4c2937 40%, #33432B 75%, #1e2919 100%)'
        }}
      />

      {/* 2. Central High-Detail Chiaroscuro Botanical Artwork */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0px) scale(1.02)`,
        }}
      >
        <svg 
          viewBox="0 0 1600 1000" 
          className="w-full h-full max-w-[1920px] object-cover opacity-90 filter drop-shadow-[0_20px_50px_rgba(10,18,11,0.8)]"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Chiaroscuro directional lighting gradient: Dusty Pink glow to Kombu Green shadow */}
            <radialGradient id="chiaroscuroGlow" cx="48%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#D2A7AA" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#693D4E" stopOpacity="0.35" />
              <stop offset="65%" stopColor="#33432B" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#1e2919" stopOpacity="0.98" />
            </radialGradient>

            {/* Dusty Pink (#D2A7AA) Petal Gradients */}
            <linearGradient id="dustyPink1" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#f7e4e5" />
              <stop offset="35%" stopColor="#D2A7AA" />
              <stop offset="70%" stopColor="#b67a80" />
              <stop offset="100%" stopColor="#6e353c" />
            </linearGradient>

            <linearGradient id="dustyPink2" x1="70%" y1="10%" x2="20%" y2="90%">
              <stop offset="0%" stopColor="#ebd2d4" />
              <stop offset="40%" stopColor="#D2A7AA" />
              <stop offset="75%" stopColor="#9e5d63" />
              <stop offset="100%" stopColor="#4f2025" />
            </linearGradient>

            <linearGradient id="dustyPinkDeep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bd7d82" />
              <stop offset="50%" stopColor="#87484e" />
              <stop offset="100%" stopColor="#3c1519" />
            </linearGradient>

            <linearGradient id="softBlushTulip" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#f7e6e7" />
              <stop offset="45%" stopColor="#D2A7AA" />
              <stop offset="85%" stopColor="#8c4e54" />
              <stop offset="100%" stopColor="#441a1e" />
            </linearGradient>

            {/* Rich Kombu Green Foliage Gradients */}
            <linearGradient id="kombuLeafLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f6643" />
              <stop offset="50%" stopColor="#33432B" />
              <stop offset="100%" stopColor="#1e2919" />
            </linearGradient>

            <linearGradient id="kombuLeafDark" x1="30%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#3c5033" />
              <stop offset="55%" stopColor="#253220" />
              <stop offset="100%" stopColor="#121a0f" />
            </linearGradient>

            {/* Stamen Gold & Dewdrop Glow */}
            <radialGradient id="goldStamen" cx="40%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffebb3" />
              <stop offset="60%" stopColor="#e5b85c" />
              <stop offset="100%" stopColor="#8a6117" />
            </radialGradient>

            {/* Heavy Blur Filter for Vignette Border */}
            <filter id="borderFrostedBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="38" />
            </filter>

            <filter id="softGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Radial Mask: Center crystal clear, edges heavy frosted blur */}
            <mask id="frostedGlassMask">
              <radialGradient id="maskGrad" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="38%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="85%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <rect width="1600" height="1000" fill="url(#maskGrad)" />
            </mask>
          </defs>

          {/* Central Dramatic Chiaroscuro Atmospheric Ambient */}
          <ellipse cx="800" cy="460" rx="550" ry="380" fill="url(#chiaroscuroGlow)" />

          {/* Masked Group containing crystal-sharp vintage floral artwork */}
          <g mask="url(#frostedGlassMask)">
            
            {/* Background Botanical Silhouette & Deep Kombu Leaves */}
            <g opacity="0.85">
              {/* Left Deep Kombu Stem & Foliage */}
              <path d="M 620,680 Q 580,560 510,480 Q 450,420 380,390 Q 460,450 490,540 Q 510,610 540,720 Z" fill="url(#kombuLeafDark)" />
              <path d="M 540,540 Q 460,490 410,410 Q 480,440 520,510 Z" fill="url(#kombuLeafLight)" opacity="0.9" />
              <path d="M 680,620 Q 610,500 560,370 Q 530,300 480,240 Q 560,290 600,380 Q 630,460 670,590 Z" fill="url(#kombuLeafLight)" />
              
              {/* Right Deep Kombu Stems & Fern/Lily Leaves */}
              <path d="M 980,690 Q 1060,570 1140,490 Q 1210,430 1280,390 Q 1190,460 1150,550 Q 1110,620 1060,730 Z" fill="url(#kombuLeafDark)" />
              <path d="M 1030,550 Q 1120,500 1170,410 Q 1100,440 1060,520 Z" fill="url(#kombuLeafLight)" opacity="0.9" />
              <path d="M 920,630 Q 990,510 1050,380 Q 1090,300 1140,240 Q 1060,300 1010,390 Q 970,470 930,600 Z" fill="url(#kombuLeafLight)" />
            </g>

            {/* Vintage Peony (Left Side - Rosa Empolvado with Chiaroscuro depth) */}
            <g transform="translate(560, 410) scale(1.15)">
              {/* Outer Deep Shadows */}
              <path d="M-60,40 C-110,10 -130,-40 -90,-80 C-50,-120 10,-100 40,-60 C70,-20 80,40 20,80 C-30,110 -50,60 -60,40 Z" fill="url(#dustyPinkDeep)" opacity="0.95" />
              
              {/* Layer 1 - Outer Petals */}
              <path d="M-75,15 C-125,-15 -105,-85 -55,-95 C-5,-105 25,-75 45,-35 C65,5 45,65 -15,75 C-65,85 -65,35 -75,15 Z" fill="url(#dustyPink2)" />
              <path d="M10,-70 C40,-100 90,-70 105,-25 C120,20 80,75 35,70 C-10,65 15,20 10,-70 Z" fill="url(#dustyPink1)" />
              <path d="M-95,-20 C-130,-60 -85,-115 -35,-105 C15,-95 -10,-45 -45,-15 C-75,5 -85,10 -95,-20 Z" fill="url(#dustyPinkDeep)" />
              
              {/* Layer 2 - Intermediate Ruffled Peony Petals */}
              <path d="M-45,-15 C-80,-45 -65,-85 -25,-80 C15,-75 35,-45 25,-10 C15,25 -20,15 -45,-15 Z" fill="url(#dustyPink1)" />
              <path d="M-15,-60 C15,-90 60,-65 65,-25 C70,15 30,40 5,25 C-20,10 -35,-40 -15,-60 Z" fill="url(#dustyPink2)" />
              <path d="M-55,5 C-85,-15 -60,-60 -25,-50 C10,-40 5,0 -20,20 C-40,35 -45,20 -55,5 Z" fill="url(#dustyPinkDeep)" opacity="0.8" />
              
              {/* Layer 3 - Core Inner Tender Petals (Rosa Empolvado Highlight) */}
              <path d="M-20,-30 C-45,-55 -25,-75 0,-65 C25,-55 30,-30 15,-15 C0,0 -10,-10 -20,-30 Z" fill="url(#dustyPink1)" />
              <path d="M-10,-45 C5,-65 35,-50 30,-25 C25,0 5,5 -5,-10 C-15,-25 -20,-35 -10,-45 Z" fill="#fae8e9" opacity="0.9" />

              {/* Central Golden Stamens with Chiaroscuro Spark */}
              <circle cx="-5" cy="-28" r="4" fill="url(#goldStamen)" filter="url(#softGlowFilter)" />
              <circle cx="8" cy="-32" r="3" fill="url(#goldStamen)" />
              <circle cx="2" cy="-20" r="3.5" fill="url(#goldStamen)" />
              <circle cx="-12" cy="-22" r="2.8" fill="url(#goldStamen)" />
            </g>

            {/* Regal Vintage Lily (Center Crown - Sculptural, Sharp & Ethereal) */}
            <g transform="translate(805, 360) scale(1.25)">
              {/* Lily Upper Petals Arching Outward */}
              <path d="M0,40 Q-40,-40 -60,-130 Q-50,-150 -30,-140 Q0,-60 10,40 Z" fill="url(#dustyPink1)" />
              <path d="M0,40 Q40,-40 60,-130 Q50,-150 30,-140 Q0,-60 -10,40 Z" fill="url(#softBlushTulip)" />
              
              {/* Lily Center Graceful Main Petal */}
              <path d="M-15,45 Q0,-70 0,-175 Q15,-70 15,45 Q0,55 -15,45 Z" fill="#fae8e9" />
              {/* Central petal subtle chiaroscuro ridge */}
              <path d="M0,45 L0,-170" stroke="#87474d" strokeWidth="1.5" strokeOpacity="0.45" />

              {/* Lily Side Flaring Petals with Dusty Pink Blushes */}
              <path d="M-5,40 Q-80,20 -150,-10 Q-160,-25 -140,-35 Q-65,0 -5,35 Z" fill="url(#dustyPink2)" />
              <path d="M5,40 Q80,20 150,-10 Q160,-25 140,-35 Q65,0 5,35 Z" fill="url(#dustyPink1)" />

              {/* Lower Fluted Petals */}
              <path d="M-10,45 Q-70,80 -110,140 Q-95,150 -75,130 Q-35,80 -5,50 Z" fill="url(#dustyPinkDeep)" />
              <path d="M10,45 Q70,80 110,140 Q95,150 75,130 Q35,80 5,50 Z" fill="url(#dustyPink2)" />

              {/* Golden Lily Pistils & Anthers in Chiaroscuro Contrast */}
              <path d="M0,45 Q-20,-20 -35,-85" stroke="#ffe082" strokeWidth="2.5" fill="none" opacity="0.85" />
              <ellipse cx="-37" cy="-88" rx="6" ry="3.5" transform="rotate(-30, -37, -88)" fill="url(#goldStamen)" filter="url(#softGlowFilter)" />
              
              <path d="M0,45 Q20,-20 35,-85" stroke="#ffe082" strokeWidth="2.5" fill="none" opacity="0.85" />
              <ellipse cx="37" cy="-88" rx="6" ry="3.5" transform="rotate(30, 37, -88)" fill="url(#goldStamen)" filter="url(#softGlowFilter)" />

              <path d="M0,45 Q-5,-30 -8,-100" stroke="#ffe082" strokeWidth="2.5" fill="none" opacity="0.9" />
              <ellipse cx="-8" cy="-103" rx="6.5" ry="3.5" fill="url(#goldStamen)" filter="url(#softGlowFilter)" />

              <path d="M0,45 Q10,-35 15,-105" stroke="#ffe082" strokeWidth="2.5" fill="none" opacity="0.9" />
              <ellipse cx="15" cy="-108" rx="6.5" ry="3.5" transform="rotate(15, 15, -108)" fill="url(#goldStamen)" filter="url(#softGlowFilter)" />
            </g>

            {/* Vintage Tulip (Right Side - Elegant Fluted Silhouette in Chiaroscuro) */}
            <g transform="translate(1040, 430) scale(1.15)">
              {/* Back Petal in Deep Shadow */}
              <path d="M-15,60 C-60,10 -65,-50 -25,-100 C5,-80 20,-30 15,60 Z" fill="url(#dustyPinkDeep)" />
              
              {/* Main Left Petal Cup */}
              <path d="M-35,65 C-85,15 -75,-65 -30,-115 C0,-85 0,-15 -10,65 Z" fill="url(#softBlushTulip)" />
              
              {/* Main Right Enveloping Petal */}
              <path d="M-15,65 C25,15 75,-25 50,-105 C15,-80 -10,-30 -25,65 Z" fill="url(#dustyPink1)" />
              
              {/* Front Overlapping Lip Petal (Rosa Empolvado with cream rim) */}
              <path d="M-30,55 C-20,0 10,-35 25,-85 C15,-30 -15,20 -25,65 Z" fill="#fae8e9" opacity="0.85" />

              {/* Elegant Stem curving down into Kombu Green */}
              <path d="M-22,65 Q-20,130 5,200" stroke="url(#kombuLeafDark)" strokeWidth="9" fill="none" strokeLinecap="round" />
            </g>

            {/* Tender Rosebuds & Delicate Botanical Sprigs */}
            <g opacity="0.95">
              {/* Small top-left peony bud */}
              <g transform="translate(680, 260) scale(0.65)">
                <path d="M-25,30 C-45,10 -35,-30 -10,-45 C15,-30 25,10 5,30 Z" fill="url(#dustyPink2)" />
                <path d="M-10,30 C-25,5 -15,-25 0,-35 C15,-20 15,5 0,30 Z" fill="#fae8e9" opacity="0.9" />
                <path d="M-10,32 Q-25,75 -40,110" stroke="url(#kombuLeafDark)" strokeWidth="6" fill="none" />
              </g>

              {/* Small right accent tulip bud */}
              <g transform="translate(940, 275) scale(0.7) rotate(15)">
                <path d="M-20,25 C-35,5 -25,-30 -5,-40 C15,-25 20,5 5,25 Z" fill="url(#softBlushTulip)" />
                <path d="M-5,25 Q10,70 25,115" stroke="url(#kombuLeafLight)" strokeWidth="5.5" fill="none" />
              </g>
            </g>

            {/* Floating Chiaroscuro Spores / Dew Drops */}
            <g opacity="0.6">
              <circle cx="720" cy="330" r="2.5" fill="#fdf0f1" filter="url(#softGlowFilter)" />
              <circle cx="890" cy="310" r="3" fill="#ffe082" filter="url(#softGlowFilter)" />
              <circle cx="770" cy="240" r="1.8" fill="#fdf0f1" />
              <circle cx="630" cy="380" r="2.2" fill="#ffe082" />
              <circle cx="980" cy="360" r="2" fill="#fdf0f1" />
              <circle cx="850" cy="490" r="2.5" fill="#ffd54f" filter="url(#softGlowFilter)" />
            </g>
          </g>
        </svg>
      </div>

      {/* 3. Heavy Frosted Glass Blur Effects for Negative Space */}
      {/* Heavy smooth blur layer on outer edges creating clean negative space for typography and UI */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 46%, transparent 18%, rgba(105, 61, 78, 0.45) 45%, rgba(51, 67, 43, 0.85) 75%, #33432B 92%, #1e2919 100%)',
        }}
      />

      {/* Secondary editorial frosted glass vignette frame for cinematic chiaroscuro contrast */}
      <div 
        className="absolute inset-0 pointer-events-none backdrop-blur-[3px] md:backdrop-blur-[8px]"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 46%, transparent 22%, black 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 46%, transparent 22%, black 78%)',
          backgroundColor: 'rgba(105, 61, 78, 0.45)',
        }}
      />

      {/* Outer peripheral frosted border frame for high-end web design negative space */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 160px 80px rgba(105, 61, 78, 0.9), inset 0 0 320px 160px rgba(51, 67, 43, 0.95)',
        }}
      />
    </div>
  );
}
