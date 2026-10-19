import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const processSteps = [
  {
    number: "01",
    titleEs: "INVESTIGACIÓN",
    titleEn: "RESEARCH",
    descEs: "Comprender los objetivos del proyecto y desarrollar paneles de inspiración basados en la visión artística.",
    descEn: "Understand project goals and objectives, developing mood boards based on the artistic vision."
  },
  {
    number: "02",
    titleEs: "CONCEPTO",
    titleEn: "CONCEPT",
    descEs: "Exploración de siluetas, claroscuro y 2-3 direcciones preliminares para acordar la línea visual.",
    descEn: "Exploration of silhouettes, chiaroscuro, and 2-3 preliminary directions to lock in visual style."
  },
  {
    number: "03",
    titleEs: "DESARROLLO VISUAL",
    titleEn: "VISUAL DEVELOPMENT",
    descEs: "Definición estética y pintura digital directa con texturas orgánicas, iluminación y color.",
    descEn: "Aesthetic definition and direct digital painting with organic textures, lighting, and color."
  },
  {
    number: "04",
    titleEs: "REVISIÓN",
    titleEn: "REVIEW",
    descEs: "Iteración ágil y feedback continuo con el cliente y el equipo de producción antes de la entrega.",
    descEn: "Agile iteration and continuous feedback with the client and production team before delivery."
  },
  {
    number: "05",
    titleEs: "ENTREGA FINAL",
    titleEn: "FINAL ASSETS",
    descEs: "Archivos empaquetados en alta resolución (capas, paletas, notas técnicas) listos para producción.",
    descEn: "High-resolution packaged assets (layers, color palettes, technical notes) ready for production."
  }
];

export default function Process() {
  const { t } = useLanguage();

  return (
    <motion.section 
      id="process"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.02 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="py-24 px-4 sm:px-6 md:px-12 relative z-10 text-[#faf7f2] overflow-hidden"
    >
      {/* Distinct Moss Green Atmospheric Environment highlighting section from #5E3F47 */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, rgba(68, 95, 52, 0.72) 0%, rgba(45, 68, 35, 0.58) 50%, rgba(30, 46, 23, 0.45) 75%, rgba(94, 63, 71, 0.2) 100%)'
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
        style={{
          background: 'linear-gradient(180deg, rgba(46, 68, 36, 0.35) 0%, rgba(36, 52, 28, 0.55) 50%, rgba(46, 68, 36, 0.3) 100%)'
        }}
        aria-hidden="true"
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none overflow-hidden z-0 opacity-55">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop" 
          alt="" 
          className="w-full h-full object-cover filter blur-[85px] saturate-200 scale-150 transform-gpu"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#B8C5A8]/30 text-[11px] font-mono uppercase tracking-widest text-[#B8C5A8] mb-4 shadow-sm backdrop-blur-md">
            <Sparkles size={12} className="text-[#B8C5A8]" />
            <span>04</span>
            <span className="w-1 h-1 rounded-full bg-[#B8C5A8]" />
            <span>{t("METODOLOGÍA & VISIÓN EDITORIAL", "CREATIVE WORKFLOW & VISION")}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black uppercase mb-5 tracking-tight text-[#faf7f2]">
            {t("PROCESO DE DISEÑO", "DESIGN PROCESS")}
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-serif max-w-3xl mx-auto text-[#eedbe1] font-light leading-relaxed">
            {t(
              "Un puente estructurado entre la concepción artística y la viabilidad técnica para cine, videojuegos y arte editorial.",
              "A structured bridge between artistic conception and technical feasibility for cinema, games, and editorial art."
            )}
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* EDITORIAL CARD 1: DESIGN SHAPES WORLDS (Intensely Blurred Image Background + Glassmorphism) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.02 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="glass-panel rounded-3xl p-6 sm:p-10 md:p-14 mb-10 relative overflow-hidden backdrop-blur-2xl bg-white/[0.08] border border-white/25 shadow-[0_30px_80px_rgba(28,14,20,0.5),inset_0_1.5px_1.5px_rgba(255,255,255,0.4)]"
        >
          {/* INTENSELY BLURRED BACKGROUND IMAGE: Creates ethereal, vibrant, lush background atmosphere */}
          <div className="absolute -inset-16 pointer-events-none overflow-hidden z-0 select-none">
            <img 
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop" 
              alt="" 
              className="w-full h-full object-cover filter blur-[75px] saturate-200 brightness-95 scale-135 opacity-55 mix-blend-screen transform-gpu will-change-transform"
              aria-hidden="true"
            />
            {/* Luminous frosted vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#5E3F47]/60 via-transparent to-[#331c23]/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-[10px]" />
          </div>

          {/* Subtle top edge specular sheen */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-20" />

          {/* Top coordinates & pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#eedbe1] uppercase tracking-widest mb-8 pb-4 border-b border-white/20 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold bg-[#5b6c4b]/30 px-2.5 py-0.5 rounded-full border border-[#B8C5A8]/30">[ {t("Creatividad", "Creativity")} ]</span>
              <span className="bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10">[ {t("Emoción", "Emotion")} ]</span>
              <span className="bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10">[ {t("Claridad", "Clarity")} ]</span>
            </div>

            {/* Circular Preview Lenses (Inspired directly by Reference Photo 2) */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full border border-white/40 bg-white/15 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-white shadow-inner" title="Blockout">
                BK
              </div>
              <div className="w-7 h-7 rounded-full border border-[#B8C5A8]/70 bg-[#B8C5A8]/25 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-[#B8C5A8] shadow-inner font-bold" title="Color & Light">
                LT
              </div>
              <div className="w-7 h-7 rounded-full border border-white/40 bg-white/15 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-white shadow-inner" title="Final Polish">
                FX
              </div>
            </div>
          </div>

          {/* Main Content Grid: Interleaved Text and Botanical Sculpture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Massive Bold Typography */}
            <div className="lg:col-span-5 select-none">
              <h3 className="text-5xl sm:text-6xl md:text-7xl font-sans font-black tracking-tighter uppercase leading-[0.85] text-[#ffd8dc] drop-shadow-[0_4px_25px_rgba(255,216,220,0.35)]">
                DESIGN<br />
                SHAPES<br />
                <span className="text-[#ffcad4] italic font-serif font-normal drop-shadow-[0_0_30px_rgba(255,202,212,0.6)]">WORLDS.</span>
              </h3>
            </div>

            {/* Center Column: Intercalated Sculpture Image (Intersecting Typography) */}
            <div className="lg:col-span-4 flex justify-center relative my-4 lg:my-0">
              {/* Circular backing ring */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center relative p-2 backdrop-blur-[2px]">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-white/15 via-transparent to-black/30 absolute inset-0 pointer-events-none" />
                <img 
                  src="/images/hero-sculpture-1.png" 
                  alt="Botanical Sculpture Concept"
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Right Column: Editorial Explanation & Tool Manifesto */}
            <div className="lg:col-span-3 space-y-4 text-left">
              <p className="text-base sm:text-lg font-serif font-light text-[#faf7f2] leading-snug">
                {t(
                  "El arte conceptual no es solo estética visual: es una herramienta de conexión.",
                  "Design is not only about visual aesthetics, it's a tool."
                )}
              </p>
              <p className="text-xs sm:text-sm font-sans text-[#eedbe1] leading-relaxed">
                {t(
                  "Funciona cuando une idea, forma y emoción en un universo indivisible que acelera la toma de decisiones creativas.",
                  "It works when it connects idea, form, and emotion into one whole that empowers the creative team."
                )}
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#B8C5A8] tracking-wider uppercase font-semibold">
                @marinaprieto.art
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* EDITORIAL CARD 2: UNIVERSAL DESIGN (Lush Moss-Green Glassmorphic Card) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.02 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="glass-panel rounded-3xl p-6 sm:p-10 md:p-14 mb-16 relative overflow-hidden backdrop-blur-2xl bg-[#37472d]/30 border border-[#B8C5A8]/30 shadow-[0_30px_80px_rgba(20,28,16,0.5),inset_0_1.5px_1.5px_rgba(255,255,255,0.4)]"
        >
          {/* Subtle top edge specular sheen */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

          {/* Interleaved Layout: Giant Typography with Sculptural Figure Cutout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Huge Universal Design Typography Overlapping with Concept Art Figure */}
            <div className="lg:col-span-8 relative">
              {/* Interleaved Concept Figure Cutting Into Typography */}
              <div className="absolute -top-10 sm:-top-16 left-1/4 sm:left-1/3 w-40 sm:w-56 h-auto pointer-events-none z-20 opacity-90 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]">
                <img 
                  src="/images/hero-figure-2.png" 
                  alt="Sculptural Form Study"
                  className="w-full h-auto object-contain"
                />
              </div>

              <h3 className="text-5xl sm:text-7xl md:text-8xl font-sans font-black tracking-tighter uppercase leading-[0.85] text-[#ffd8dc] relative z-10 select-none drop-shadow-[0_4px_25px_rgba(255,216,220,0.35)]">
                UNIVERSAL<br />
                <span className="text-[#ffcad4] tracking-normal font-serif italic font-normal drop-shadow-[0_0_30px_rgba(255,202,212,0.6)]">DESIGN</span>
              </h3>
            </div>

            {/* Right: Rounded Inset Study Frame + Statement */}
            <div className="lg:col-span-4 bg-black/20 p-5 rounded-2xl border border-white/15 backdrop-blur-md space-y-3 text-left">
              <div className="h-40 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center relative">
                <img 
                  src="/images/hero-sculpture-1.png" 
                  alt="Detail Study"
                  className="w-full h-full object-contain filter contrast-110 brightness-95"
                />
                <span className="absolute bottom-2 right-2 text-[9px] font-mono uppercase tracking-wider bg-black/70 px-2 py-0.5 rounded text-white border border-white/20">
                  {t("DETALLE ESCULTÓRICO", "SCULPTURAL STUDY")}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-serif italic text-[#faf7f2] leading-snug">
                {t(
                  "«El diseño es un lenguaje que todos comprenden. Conecta personas e ideas, ayudando a encontrar un sentido común donde las palabras pueden fallar.»",
                  "«Design is a language everyone understands. It connects people and ideas, helping find common meaning where words may fail.»"
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SEQUENTIAL 5 PRODUCTION PHASES: Frosted Glassmorphism Cards */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#B8C5A8] font-bold mb-8">
            ✦ {t("FASES DE PRODUCCIÓN SECUENCIAL", "SEQUENTIAL PRODUCTION PHASES")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-5 sm:p-6 rounded-2xl text-left border border-white/20 hover:border-[#B8C5A8]/60 transition-all group flex flex-col justify-between shadow-lg backdrop-blur-xl bg-white/[0.08] hover:bg-[#3b4c30]/20"
              >
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-xs font-mono font-bold text-[#B8C5A8] px-3.5 py-1 rounded-full bg-[#5b6c4b]/35 border border-[#B8C5A8]/50 shadow-sm tracking-wider uppercase">
                      {t("Fase", "Phase")} {step.number}
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold uppercase tracking-wider text-[#faf7f2] mb-2 group-hover:text-[#B8C5A8] transition-colors">
                    {t(step.titleEs, step.titleEn)}
                  </h4>

                  <p className="text-xs text-[#eedbe1] leading-relaxed">
                    {t(step.descEs, step.descEn)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
