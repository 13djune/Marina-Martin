import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ProcessStep {
  number: string;
  titleEs: string;
  titleEn: string;
  descEs: React.ReactNode;
  descEn: React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    titleEs: "Investigación",
    titleEn: "Research",
    descEs: (
      <>Análisis del <strong className="text-bone font-semibold">briefing</strong> y recopilación de <strong className="text-bone font-semibold">referencias clave</strong>.</>
    ),
    descEn: (
      <><strong className="text-bone font-semibold">Brief analysis</strong> and gathering of <strong className="text-bone font-semibold">key references</strong>.</>
    ),
  },
  {
    number: "02",
    titleEs: "Concepto & Silueta",
    titleEn: "Concept & Silhouette",
    descEs: (
      <>Exploración rápida de <strong className="text-bone font-semibold">siluetas y composición</strong>.</>
    ),
    descEn: (
      <>Rapid exploration of <strong className="text-bone font-semibold">silhouettes and composition</strong>.</>
    ),
  },
  {
    number: "03",
    titleEs: "Color & Luz",
    titleEn: "Color & Light",
    descEs: (
      <>Pintura con <strong className="text-bone font-semibold">iluminación cinematográfica</strong> y texturas.</>
    ),
    descEn: (
      <>Painting with <strong className="text-bone font-semibold">cinematic lighting</strong> and textures.</>
    ),
  },
  {
    number: "04",
    titleEs: "Feedback & Ajustes",
    titleEn: "Feedback & Iteration",
    descEs: (
      <><strong className="text-bone font-semibold">Iteración ágil</strong> con dirección de arte.</>
    ),
    descEn: (
      <><strong className="text-bone font-semibold">Agile iteration</strong> with art direction.</>
    ),
  },
  {
    number: "05",
    titleEs: "Entrega Final",
    titleEn: "Final Delivery",
    descEs: (
      <>Archivos maestros y <strong className="text-bone font-semibold">fichas técnicas listas para producción</strong>.</>
    ),
    descEn: (
      <>Master assets and <strong className="text-bone font-semibold">production-ready model sheets</strong>.</>
    ),
  }
];

export default function Process() {
  const { t } = useLanguage();

  return (
    <section 
      id="process"
      className="py-20 md:py-28 px-4 sm:px-6 md:px-12 relative z-10 text-[#faf7f2] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#B8C5A8]/30 text-[11px] font-mono uppercase tracking-widest text-[#B8C5A8] mb-4 shadow-sm backdrop-blur-md">
            <Sparkles size={12} className="text-[#B8C5A8]" />
            <span>04</span>
            <span className="w-1 h-1 rounded-full bg-[#B8C5A8]" />
            <span>{t("METODOLOGÍA & PIPELINE", "PIPELINE & METHODOLOGY")}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black uppercase mb-4 tracking-tight text-[#faf7f2]">
            {t("PROCESO DE DISEÑO", "DESIGN PROCESS")}
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-serif max-w-3xl mx-auto text-[#eedbe1] font-light leading-relaxed">
            {t(
              <>Un <strong className="text-[#faf7f2] font-semibold">puente estructurado</strong> entre la <strong className="text-[#faf7f2] font-semibold">concepción artística</strong> y la <strong className="text-[#faf7f2] font-semibold">viabilidad técnica</strong> para <strong className="text-[#faf7f2] font-semibold">cine, animación y videojuegos</strong>.</>,
              <>A <strong className="text-[#faf7f2] font-semibold">structured bridge</strong> between <strong className="text-[#faf7f2] font-semibold">artistic conception</strong> and <strong className="text-[#faf7f2] font-semibold">technical feasibility</strong> for <strong className="text-[#faf7f2] font-semibold">cinema, animation, and video games</strong>.</>
            )}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SIMPLIFIED CLEAN TIMELINE                                                  */}
        {/* ========================================================================= */}
        <div className="relative pt-4">
          {/* DESKTOP TIMELINE (lg and above): Clean Horizontal Track */}
          <div className="hidden lg:block relative">
            {/* Horizontal Timeline Connecting Line */}
            <div className="relative mb-8 mx-12">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/20 z-0" />
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B8C5A8]/40 via-[#B8C5A8] to-[#B8C5A8]/40 z-0" />

              {/* 5 Milestone Numbered Dots */}
              <div className="grid grid-cols-5 relative z-10">
                {processSteps.map((step) => (
                  <div key={step.number} className="flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#5E3F47] border-2 border-[#B8C5A8] flex items-center justify-center font-mono font-bold text-xs text-[#faf7f2] shadow-[0_0_15px_rgba(184,197,168,0.5)]">
                      {step.number}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Simplified Step Cards */}
            <div className="grid grid-cols-5 gap-5">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="moss-card rounded-2xl p-5 border border-white/20 hover:border-[#B8C5A8]/70 transition-all duration-300 group backdrop-blur-xl bg-white/[0.08] flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#faf7f2] mb-2 group-hover:text-[#B8C5A8] transition-colors leading-snug">
                      {t(step.titleEs, step.titleEn)}
                    </h3>
                    <p className="text-xs text-[#eedbe1] leading-relaxed font-sans font-light">
                      {t(step.descEs, step.descEn)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE / TABLET TIMELINE (< lg): Minimal Vertical Rail */}
          <div className="lg:hidden relative pl-8 sm:pl-10 space-y-5">
            {/* Vertical Line */}
            <div className="absolute left-4 top-2 bottom-4 w-0.5 bg-gradient-to-b from-[#B8C5A8] via-[#B8C5A8]/50 to-transparent z-0" />

            {processSteps.map((step) => (
              <div key={step.number} className="relative z-10">
                {/* Node */}
                <div className="absolute -left-8 top-4 -translate-x-1/2 w-8 h-8 rounded-full bg-[#5E3F47] border-2 border-[#B8C5A8] flex items-center justify-center font-mono font-bold text-xs text-[#faf7f2] shadow-[0_0_10px_rgba(184,197,168,0.5)]">
                  {step.number}
                </div>

                {/* Card */}
                <div className="moss-card p-5 rounded-2xl text-left border border-white/20 backdrop-blur-xl bg-white/[0.08] shadow-sm">
                  <h3 className="text-base font-serif font-bold text-[#faf7f2] mb-1.5">
                    {t(step.titleEs, step.titleEn)}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#eedbe1] leading-relaxed font-sans font-light">
                    {t(step.descEs, step.descEn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
