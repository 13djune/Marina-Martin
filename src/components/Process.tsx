import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

const processSteps = [
  {
    number: "01",
    titleEs: "INVESTIGACIÓN",
    titleEn: "RESEARCH",
    descEs: "Comprender los objetivos del cliente y del proyecto. Desarrollar paneles de inspiración basados en la visión del cliente.",
    descEn: "Understand the client's goals and objectives of the project. Along with developing mood boards based off of the client's vision."
  },
  {
    number: "02",
    titleEs: "CONCEPTO",
    titleEn: "CONCEPT",
    descEs: "Utilizar la investigación para desarrollar 2-3 conceptos iniciales. Luego revisar con el cliente para finalizar una dirección.",
    descEn: "Use the research and develop 2-3 rough concepts. Then review with the client to finalize a direction."
  },
  {
    number: "03",
    titleEs: "DISEÑO",
    titleEn: "DESIGN",
    descEs: "Fase de diseño y producción, donde todos los recursos se desarrollan o prototipan para ser revisados por el cliente.",
    descEn: "The designing and production phase, where all the assets are developed or prototyped to be reviewed by the client."
  },
  {
    number: "04",
    titleEs: "REVISIÓN",
    titleEn: "REVIEW",
    descEs: "Feedback continuo con el cliente sobre cambios de diseño antes de la finalización de los recursos.",
    descEn: "Back and forth feedback with the client regarding design or copy changes before the finalization of the assets."
  },
  {
    number: "05",
    titleEs: "FINALIZACIÓN",
    titleEn: "FINALIZE",
    descEs: "Una vez aprobado, todos los recursos se finalizan, se empaquetan y se envían. El soporte continuo siempre es una opción.",
    descEn: "Once the project is approved, all the assets will be finalized, files packaged up and sent off to the client."
  }
];

export default function Process() {
  const { t } = useLanguage();

  return (
    <motion.section 
      id="process"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 px-6 md:px-12 bg-vampire-bg relative z-10 text-bone overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Header with Framer Motion Fade-in and subtle vertical motion */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#e8b4b8] mb-4">
            <span>04</span>
            <span className="w-1 h-1 rounded-full bg-[#e8b4b8]" />
            <span>{t("METODOLOGÍA CREATIVA", "CREATIVE WORKFLOW")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black uppercase mb-6 tracking-widest text-bone">
            {t("PROCESO", "PROCESS")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-serif max-w-3xl mx-auto text-bone-muted font-light leading-relaxed">
            {t(
              "Cada proyecto va a ser diferente, pero esta es la estructura habitual que me gusta seguir como mejores prácticas.",
              "Every project is going to be different, but this is the usual structure that I like to follow as best practices."
            )}
          </p>
          <div className="w-2.5 h-2.5 bg-[#e8b4b8] rotate-45 organic-diamond-sm mx-auto mt-10 shadow-[0_0_12px_rgba(232,180,184,0.7)]" aria-hidden="true"></div>
        </motion.div>

        {/* Timeline & Steps with Framer Motion scroll entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Background timeline line */}
          <div className="hidden md:block absolute top-[28px] left-[10%] w-[80%] h-[1px] bg-white/15"></div>
          
          {/* Animated fill line driven by Framer Motion */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute top-[28px] left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-[#e8b4b8] via-[#B8C5A8] to-[#e8b4b8] shadow-[0_0_14px_rgba(232,180,184,0.6)] z-0 origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6 relative z-10">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="step-diamond w-14 h-14 bg-[#2a1723]/80 border border-white/20 rotate-45 organic-diamond flex items-center justify-center mb-8 transition-all duration-500 group-hover:border-[#e8b4b8] group-hover:bg-[#e8b4b8]/15 relative overflow-hidden shadow-xl group-hover:shadow-[0_0_20px_rgba(232,180,184,0.4)] group-hover:scale-110">
                  <span className="-rotate-45 text-bone font-serif text-lg group-hover:text-[#e8b4b8] transition-colors duration-500 relative z-10 font-bold">{step.number}</span>
                </div>
                
                <h3 className="step-text text-lg sm:text-xl font-serif mb-3 text-bone tracking-wider uppercase italic group-hover:text-[#e8b4b8] transition-colors duration-500">
                  {t(step.titleEs, step.titleEn)}
                </h3>
                
                <p className="step-text text-xs sm:text-sm leading-relaxed text-bone-muted font-light max-w-[240px]">
                  {t(step.descEs, step.descEn)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
