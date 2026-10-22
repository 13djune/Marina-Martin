import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Download, FileText, ArrowDown, Briefcase, GraduationCap, Trophy, Sparkles, Award, Languages, BookOpen, Palette, Camera, ZoomIn, X } from 'lucide-react';
import ProfileCard from './ProfileCard';
import { downloadCV, downloadPortfolio } from '../utils/downloadHelpers';

export default function Biography() {
  const { t } = useLanguage();
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const [expandedAwardImage, setExpandedAwardImage] = useState<{
    url: string;
    titleEs: string;
    titleEn: string;
    subtitleEs: string;
    subtitleEn: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedAwardImage(null);
      }
    };
    if (expandedAwardImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [expandedAwardImage]);

  const skillsData = [
    { subject: 'Photoshop', A: 95, fullMark: 100 },
    { subject: 'ZBrush', A: 70, fullMark: 100 },
    { subject: 'Blender', A: 75, fullMark: 100 },
    { subject: 'Clip Studio', A: 90, fullMark: 100 },
    { subject: 'Unreal', A: 60, fullMark: 100 },
    { subject: 'Procreate', A: 95, fullMark: 100 },
  ];

  return (
    <section 
      id="about" 
      className="py-24 px-6 md:px-12 relative z-10 text-[#faf7f2] overflow-hidden"
    >
      {/* Subtle Luminous Sage Ambient Light highlighting Section without muddy color overlap */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(184, 197, 168, 0.09) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section Intro: Profile Card & Bio Content */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-24">
          
          {/* Image Side with Instant Rich Green Presence (No color loading lag) */}
          <div 
            className="w-full md:w-5/12 relative"
          >
            <div className="w-full flex justify-center">
              <ProfileCard
                name=""
                title=""
                handle="black_umi"
                status={t("Disponible para trabajo", "Available for work")}
                contactText={t("Contacto", "Contact")}
                avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                iconUrl="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%22-16%20-16%2056%2056%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M14.77%2021c1.123-4.649%202.486-6.099%206.23-7.364c-3.934-1.328-5.16-2.94-6.23-7.363c-1.124%204.649-2.488%206.098-6.232%207.363c3.93%201.327%205.163%202.95%206.231%207.364m-8.308-9.818c.512-2.42%201.502-3.512%203.461-4.091C7.963%206.512%206.973%205.42%206.462%203C5.972%205.315%205.047%206.485%203%207.09c1.959.58%202.95%201.672%203.462%204.092%22%2F%3E%3C%2Fsvg%3E"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(184, 197, 168, 0.45)"
                innerGradient="linear-gradient(145deg, rgba(91, 108, 75, 0.3) 0%, rgba(35, 48, 32, 0.85) 100%)"
                onContactClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            </div>
          </div>

          {/* Text Side with Instant Clean Rendering */}
          <div 
            className="w-full md:w-7/12 flex flex-col justify-center"
          >
            <div className="pt-6">
              <h3 className="text-xs uppercase tracking-widest text-[#B8C5A8] mb-3 font-sans font-bold">
                {t("Sobre la Artista", "About the Artist")}
              </h3>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#faf7f2] mb-6 italic font-bold">Marina Martín Prieto</h2>
              
              <div className="space-y-6 text-[#eedbe1] text-sm md:text-base font-sans font-light leading-relaxed">
                <p>
                  {t(
                    <>Hola, mi nombre es <strong className="text-[#faf7f2] font-semibold">Marina Martín Prieto</strong> y tengo 26 años. Durante mis años formativos me he centrado principalmente en la <strong className="text-[#faf7f2] font-semibold">comprensión de la luz y el color</strong> como puedes ver en mi portfolio, pudiendo asegurar con certeza mi capacidad de <strong className="text-[#faf7f2] font-semibold">traducir las ideas en ilustraciones llenas de vida, movimiento y color</strong>.</>,
                    <>Hello, my name is <strong className="text-[#faf7f2] font-semibold">Marina Martín Prieto</strong> and I am 26 years old. During my formative years I have focused mainly on the <strong className="text-[#faf7f2] font-semibold">understanding of light and color</strong> as you can see in my portfolio, being able to assure with certainty my ability to <strong className="text-[#faf7f2] font-semibold">translate ideas into illustrations full of life, movement and color</strong>.</>
                  )}
                </p>
                <p>
                  {t(
                    <>A la hora de trabajar me gusta <strong className="text-[#faf7f2] font-semibold">mostrar el proceso de la ilustración</strong> para que el equipo pueda sugerir cambios con el objetivo de acercarse lo máximo posible a su visión, combinándolo con una <strong className="text-[#faf7f2] font-semibold">gran capacidad creativa para sorprender e inventar</strong>.</>,
                    <>When working I like to <strong className="text-[#faf7f2] font-semibold">showcase the illustration process</strong> so that the team can suggest changes with the aim of getting as close to their vision as possible, combining it with a <strong className="text-[#faf7f2] font-semibold">great creative capacity to surprise and innovate</strong>.</>
                  )}
                </p>
              </div>

              {/* Glassmorphism Skills & Specializations Card */}
              <div className="mt-10 glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden backdrop-blur-2xl bg-white/[0.08] border border-white/25 shadow-[0_24px_60px_rgba(28,14,20,0.5),inset_0_1.5px_1px_rgba(255,255,255,0.4)]">
                {/* Physical Glass Specular Reflections */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-20" aria-hidden="true" />
                <div className="absolute -top-[100%] -left-[50%] w-[200%] h-[200%] pointer-events-none rotate-12 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent z-0" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#B8C5A8]/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                  <div className="space-y-7">
                    <div>
                      <span className="block text-xl font-serif text-[#B8C5A8] mb-1 font-bold">{t("Concept Art", "Concept Art")}</span>
                      <span className="text-xs uppercase tracking-[0.3em] font-sans text-bone-muted font-semibold">
                        {t("Entornos & Props", "Environments & Props")}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xl font-serif text-[#B8C5A8] mb-1 font-bold">{t("Ilustración", "Illustration")}</span>
                      <span className="text-xs uppercase tracking-[0.3em] font-sans text-bone-muted font-semibold">
                        {t("Luz & Color", "Light & Color")}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xl font-serif text-[#B8C5A8] mb-1 font-bold">{t("Desarrollo Visual", "Visual Development")}</span>
                      <span className="text-xs uppercase tracking-[0.3em] font-sans text-bone-muted font-semibold">
                        {t("Narrativa visual", "Visual storytelling")}
                      </span>
                    </div>
                  </div>

                  <div ref={chartWrapperRef} className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                        <PolarGrid stroke="rgba(184, 197, 168, 0.25)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#B8C5A8', fontSize: 11, fontFamily: 'sans-serif', fontWeight: 600 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: 'rgba(56, 30, 38, 0.95)', borderColor: '#B8C5A8', color: '#faf7f2', borderRadius: '12px' }}
                          itemStyle={{ color: '#B8C5A8' }}
                        />
                        <Radar name="Skills" dataKey="A" stroke="#B8C5A8" fill="#B8C5A8" fillOpacity={0.35} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons with frosted glass and high contrast against #5E3F47 */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                {/* 1. Descargar CV */}
                <button 
                  type="button"
                  onClick={downloadCV}
                  className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/12 hover:bg-white/20 text-[#faf7f2] hover:text-white text-xs uppercase tracking-[0.2em] px-6 py-3.5 font-bold transition-all duration-300 rounded-xl cursor-pointer shadow-lg hover:shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 group min-h-[44px] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8]"
                  title={t("Descargar Curriculum Vitae en PDF", "Download Resume PDF")}
                >
                  <Download size={16} className="text-[#B8C5A8] group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
                  <span>{t("DESCARGAR CV", "DOWNLOAD CV")}</span>
                </button>

                {/* 2. Descargar Portfolio */}
                <button 
                  type="button"
                  onClick={downloadPortfolio}
                  className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/12 hover:bg-white/20 text-[#faf7f2] hover:text-white text-xs uppercase tracking-[0.2em] px-6 py-3.5 font-bold transition-all duration-300 rounded-xl cursor-pointer shadow-lg hover:shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 group min-h-[44px] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8]"
                  title={t("Descargar Dossier de Portfolio en PDF", "Download Portfolio Dossier PDF")}
                >
                  <FileText size={16} className="text-[#B8C5A8] group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
                  <span>{t("DESCARGAR PORTFOLIO", "DOWNLOAD PORTFOLIO")}</span>
                </button>

                {/* 3. Trabaja Conmigo */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('contact');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.hash = '#contact';
                    }
                  }}
                  className="inline-flex items-center gap-2.5 bg-[#faf7f2] hover:bg-[#ffd8dc] text-[#263120] hover:text-[#263120] text-xs uppercase tracking-[0.2em] px-7 py-3.5 font-black transition-all duration-300 rounded-xl cursor-pointer shadow-xl hover:shadow-[0_6px_30px_rgba(255,216,220,0.4)] hover:scale-105 active:scale-95 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  title={t("Ir a la sección de contacto", "Scroll to contact section")}
                >
                  <span className="text-[#263120] font-black">{t("TRABAJA CONMIGO", "WORK WITH ME")}</span>
                  <ArrowDown size={15} className="text-[#263120] group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Resume / Experience Section: Master Curated 2-Tier Balanced Layout (Instant color presence, no delay) */}
        <div className="pt-16 border-t border-white/15 space-y-12">
          {/* Section Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-mono uppercase tracking-widest text-[#B8C5A8] mb-3 backdrop-blur-md">
                <Sparkles size={12} className="text-[#B8C5A8]" />
                <span>{t("TRAYECTORIA & CURRÍCULUM", "CAREER & RESUME")}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#faf7f2] font-bold italic">
                {t("Experiencia, Formación y Logros", "Experience, Education & Milestones")}
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-sans text-[#eedbe1] max-w-md font-normal leading-relaxed">
              {t(
                "Recorrido profesional combinando fundamentos plásticos tradicionales de Bellas Artes con producción digital avanzada para cine y medios audiovisuales.",
                "Professional path combining traditional Fine Arts plastic foundations with advanced digital production for cinema and audiovisual media."
              )}
            </p>
          </div>

          {/* Tier 1: Experiencia Profesional (3 Full-Width Cards in Grid) */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center text-[#B8C5A8] shadow-sm shrink-0">
                <Briefcase size={15} />
              </div>
              <h4 className="text-xl font-serif text-[#faf7f2] font-bold italic">{t("Experiencia Profesional", "Professional Experience")}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Job 1: Ilustradora Freelance */}
              <div className="moss-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-[#B8C5A8]/50 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B8C5A8] font-semibold shadow-xs">
                      {t("2022 — Presente", "2022 — Present")}
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-bone leading-snug mb-1">{t("Ilustradora Freelance", "Freelance Illustrator")}</h5>
                  <div className="text-xs uppercase tracking-wider text-[#d5decb] font-mono font-semibold mb-3">
                    {t("Autónoma · Trabajo Remoto", "Freelance · Remote Work")}
                  </div>
                  <p className="text-sm text-bone-muted font-normal leading-relaxed font-sans mb-5">
                    {t(
                      <>Trabajo independiente y encargos personalizados. Creación de <strong className="text-bone font-semibold">ilustraciones para portadas de libros</strong>, diseño visual para una <strong className="text-bone font-semibold">asociación sin ánimo de lucro</strong> y gestión continua de <strong className="text-bone font-semibold">comisiones artísticas internacionales</strong>.</>,
                      <>Independent artwork and custom assignments. Creation of <strong className="text-bone font-semibold">book cover illustrations</strong>, visual design for a <strong className="text-bone font-semibold">non-profit association</strong>, and ongoing management of <strong className="text-bone font-semibold">international art commissions</strong>.</>
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 relative z-10">
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/[0.08] text-bone border border-white/10">Portadas de Libros</span>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/[0.08] text-bone border border-white/10">Ilustración Editorial</span>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/[0.08] text-bone border border-white/10">Comisiones</span>
                </div>
              </div>

              {/* Job 2: Artista Conceptual - Nocturnia Studios (Featured Card in Rich Botanical Green) */}
              <div className="rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group border-2 border-[#B8C5A8]/50 bg-gradient-to-br from-[#4d6040]/80 via-[#3d4d32]/90 to-[#273421]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(20,30,18,0.5),inset_0_1.5px_2px_rgba(184,197,168,0.35)] hover:border-[#B8C5A8] transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B8C5A8]/70 to-transparent pointer-events-none z-20" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#2a3623]/80 border border-[#B8C5A8]/40 text-[#faf7f2] font-semibold shadow-xs">
                      {t("Ago 2023 — Presente", "Aug 2023 — Present")}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#B8C5A8]/20 border border-[#B8C5A8]/50 text-[#faf7f2] font-bold">
                      ★ {t("ROL DESTACADO", "FEATURED ROLE")}
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-[#faf7f2] leading-snug mb-1">{t("Artista Conceptual", "Concept Artist")}</h5>
                  <div className="text-xs uppercase tracking-wider text-[#d5decb] font-mono font-semibold mb-3">
                    <a 
                      href="https://www.linkedin.com/company/nocturnia-studios/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#B8C5A8] hover:text-[#ffd8dc] font-semibold transition-colors underline decoration-[#B8C5A8]/50 hover:decoration-[#ffd8dc]"
                    >
                      Nocturnia Studios ↗
                    </a>
                  </div>
                  <p className="text-sm text-[#eedbe1] font-normal leading-relaxed font-sans mb-5">
                    {t(
                      <>Trabajo autónomo en remoto. Diseño y desarrollo visual de <strong className="text-white font-semibold">fondos, entornos y personajes</strong> utilizando <strong className="text-white font-semibold">Adobe Photoshop</strong> para <strong className="text-white font-semibold">proyectos cinematográficos</strong>.</>,
                      <>Freelance remote work. Design and visual development of <strong className="text-white font-semibold">backgrounds, environments and characters</strong> using <strong className="text-white font-semibold">Adobe Photoshop</strong> for <strong className="text-white font-semibold">cinematic projects</strong>.</>
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#B8C5A8]/20 relative z-10">
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-[#25311f]/90 text-[#faf7f2] border border-[#B8C5A8]/30">Personajes</span>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-[#25311f]/90 text-[#faf7f2] border border-[#B8C5A8]/30">Entornos & Props</span>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-[#25311f]/90 text-[#faf7f2] border border-[#B8C5A8]/30">Photoshop</span>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-[#25311f]/90 text-[#faf7f2] border border-[#B8C5A8]/30">Procreate</span>
                </div>
              </div>

              {/* Job 3: Azafata de Eventos, AULA */}
              <div className="moss-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-[#B8C5A8]/50 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B8C5A8] font-semibold shadow-xs">
                      {t("Marzo 2023", "March 2023")}
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-bone leading-snug mb-1">{t("Azafata de Eventos, AULA", "Event Hostess, AULA")}</h5>
                  <div className="text-xs uppercase tracking-wider text-[#d5decb] font-mono font-semibold mb-3">
                    Lightbox Academy · Madrid
                  </div>
                  <p className="text-sm text-bone-muted font-normal leading-relaxed font-sans mb-5">
                    {t(
                      <>Contrato de prácticas en Madrid. Asistencia y representación académica en el <strong className="text-bone font-semibold">Salón Internacional del Estudiante y la Oferta Educativa (AULA)</strong>, asesorando y orientando a futuros estudiantes de <strong className="text-bone font-semibold">artes digitales</strong>.</>,
                      <>Internship in Madrid. Attendance and academic representation at the <strong className="text-bone font-semibold">International Educational Opportunities Exhibition (AULA)</strong>, advising future students of <strong className="text-bone font-semibold">digital arts</strong>.</>
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 relative z-10">
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/[0.08] text-bone border border-white/10">Representación</span>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/[0.08] text-bone border border-white/10">Orientación Artística</span>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/[0.08] text-bone border border-white/10">AULA Madrid</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2: Dual Pillars Grid (Educación & Reconocimientos Side-by-Side with Harmonious Height) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Column Left: Educación & Formación Superior (Rich & Complete - No Void) */}
            <div className="moss-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-20" aria-hidden="true" />

              <div className="relative z-10 space-y-7">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/20 backdrop-blur-md flex items-center justify-center text-[#B8C5A8] shadow-sm shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-serif text-bone font-bold italic">{t("Educación & Formación", "Education & Training")}</h4>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#B8C5A8]/70">
                      {t("Base Académica Superior & Bellas Artes", "Higher Education & Fine Arts")}
                    </span>
                  </div>
                </div>

                {/* Degree 1: Lightbox Academy */}
                <div className="relative pl-6 border-l-2 border-[#B8C5A8]/40">
                  <div className="absolute w-2.5 h-2.5 bg-[#B8C5A8] rotate-45 organic-diamond-sm -left-[6px] top-2 shadow-[0_0_8px_rgba(184,197,168,0.7)]" aria-hidden="true" />
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="text-base sm:text-lg font-bold text-bone leading-snug">
                      <a 
                        href="https://lboxacademy.es/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#B8C5A8] hover:text-[#ffd8dc] font-semibold transition-colors underline decoration-[#B8C5A8]/50 hover:decoration-[#ffd8dc]"
                      >
                        Lightbox Academy ↗
                      </a>
                    </h5>
                    <span className="text-[11px] font-mono px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B8C5A8] font-semibold shadow-xs">
                      {t("2023 · Madrid", "2023 · Madrid")}
                    </span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#B8C5A8] font-mono font-semibold mb-2">
                    {t("Máster / Especialización en Concept Art", "Master / Specialization in Concept Art")}
                  </div>
                  <p className="text-sm text-bone-muted font-normal leading-relaxed font-sans">
                    {t(
                      <>Especialización en <strong className="text-bone font-semibold">desarrollo visual</strong>: <strong className="text-bone font-semibold">diseño de personajes, entornos y atrezo</strong>, <strong className="text-bone font-semibold">ilustración digital</strong>, <strong className="text-bone font-semibold">teoría del color e iluminación cinematográfica</strong>.</>,
                      <>Specialization in <strong className="text-bone font-semibold">visual development</strong>: <strong className="text-bone font-semibold">character design, environments and props</strong>, <strong className="text-bone font-semibold">digital illustration</strong>, <strong className="text-bone font-semibold">color theory and cinematic lighting</strong>.</>
                    )}
                  </p>
                </div>

                {/* Degree 2: Universidad de Granada */}
                <div className="relative pl-6 border-l-2 border-[#B8C5A8]/40">
                  <div className="absolute w-2.5 h-2.5 bg-[#B8C5A8] rotate-45 organic-diamond-sm -left-[6px] top-2 shadow-[0_0_8px_rgba(184,197,168,0.7)]" aria-hidden="true" />
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="text-base sm:text-lg font-bold text-bone leading-snug">{t("Grado en Bellas Artes", "Degree in Fine Arts")}</h5>
                    <span className="text-[11px] font-mono px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B8C5A8] font-semibold shadow-xs">
                      {t("2017 — 2021 · Granada", "2017 — 2021 · Granada")}
                    </span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#B8C5A8] font-mono font-semibold mb-2">
                    Universidad de Granada
                  </div>
                  <p className="text-sm text-bone-muted font-normal leading-relaxed font-sans">
                    {t(
                      <>Cuatro años de <strong className="text-bone font-semibold">formación plástica integral</strong>: <strong className="text-bone font-semibold">dibujo del natural, pintura al óleo y acrílico, anatomía artística</strong>, <strong className="text-bone font-semibold">pensamiento visual crítico</strong> y <strong className="text-bone font-semibold">composición clásica</strong>.</>,
                      <>Four years of <strong className="text-bone font-semibold">comprehensive plastic training</strong>: <strong className="text-bone font-semibold">life drawing, oil & acrylic painting, artistic anatomy</strong>, <strong className="text-bone font-semibold">critical visual thinking</strong> and <strong className="text-bone font-semibold">classical composition</strong>.</>
                    )}
                  </p>
                </div>

                {/* Sub-block: Idiomas & Comunicación Global */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                  <div className="flex items-center gap-2.5">
                    <Languages size={15} className="text-[#B8C5A8]" />
                    <div>
                      <span className="block text-xs font-mono uppercase tracking-widest text-[#B8C5A8] font-bold">
                        {t("Idiomas de Trabajo", "Working Languages")}
                      </span>
                      <span className="text-xs text-bone-muted font-sans">
                        {t("Comunicación y coordinación fluida", "Fluent communication and coordination")}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Español: Native language (Prominently marked with rounded pill) */}
                    <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#5D6E4D]/60 border border-[#B8C5A8] text-[#faf7f2] font-bold shadow-[0_0_12px_rgba(184,197,168,0.25)] flex items-center gap-1.5">
                      ★ <strong className="text-[#faf7f2]">{t("Español", "Spanish")}:</strong> {t("Nativo", "Native")}
                    </span>
                    {/* English: Neutral rounded pill */}
                    <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-bone">
                      <strong className="text-[#faf7f2]">{t("Inglés", "English")}:</strong> B2 {t("Profesional", "Professional")}
                    </span>
                    {/* Japanese: Unmarked neutral rounded pill */}
                    <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-bone">
                      <strong className="text-[#faf7f2]">{t("Japonés", "Japanese")}:</strong> N5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column Right: Reconocimientos & Premios Oficiales (Rich Botanical Green Card) */}
            <div className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border border-[#B8C5A8]/50 bg-gradient-to-br from-[#45583b]/65 via-[#35452f]/75 to-[#243020]/90 backdrop-blur-xl shadow-[0_24px_55px_rgba(20,32,18,0.45),inset_0_1.5px_1.5px_rgba(184,197,168,0.35)] hover:border-[#B8C5A8]/80 transition-all">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B8C5A8]/70 to-transparent pointer-events-none z-20" aria-hidden="true" />

              <div className="relative z-10 space-y-7">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/20 backdrop-blur-md flex items-center justify-center text-[#B8C5A8] shadow-sm shrink-0">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-serif text-bone font-bold italic">{t("Reconocimientos & Premios", "Awards & Honors")}</h4>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#B8C5A8]/70">
                      {t("2 Galardones Artísticos Oficiales", "2 Official Artistic Awards")}
                    </span>
                  </div>
                </div>

                {/* Premio 1: Certamen Caja Rural Granada 2026 */}
                <div className="relative pl-6 border-l-2 border-[#B8C5A8]/40 bg-white/[0.03] p-4 sm:p-5 -ml-3 rounded-2xl border border-white/10 space-y-3">
                  <div className="absolute w-2.5 h-2.5 bg-[#B8C5A8] rotate-45 organic-diamond-sm -left-[6px] top-4 shadow-[0_0_10px_rgba(184,197,168,0.8)]" aria-hidden="true" />
                  
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8C5A8] font-bold bg-[#5b6c4b]/20 px-2.5 py-0.5 rounded-full border border-[#B8C5A8]/30 flex items-center gap-1">
                      <Award size={11} /> {t("PREMIO JOVEN", "YOUTH PRIZE")}
                    </span>
                    <span className="text-[11px] font-mono px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B8C5A8] font-semibold shadow-xs">{t("Sep 2026 · Granada", "Sep 2026 · Granada")}</span>
                  </div>

                  {/* Disposición al lado del texto */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
                    <div className="flex-1 space-y-1.5">
                      <h5 className="text-base sm:text-lg font-bold text-bone leading-snug">
                        {t("Certamen de Pintura Rápida 2026", "2026 Quick Painting Contest")}
                      </h5>
                      <div className="text-xs uppercase tracking-wider text-[#B8C5A8] font-mono font-semibold">
                        <a 
                          href="https://fundacioncrg.com/fundacion-caja-rural-granada-entrega-el-primer-premio-de-su-xviii-certamen-de-pintura-rapida-a-pepe-bonano/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#B8C5A8] hover:text-[#ffd8dc] font-semibold transition-colors inline-block underline decoration-[#B8C5A8]/50 hover:decoration-[#ffd8dc]"
                          title={t("Ver enlace oficial en Fundación Caja Rural Granada", "View official link at Fundación Caja Rural Granada")}
                        >
                          Fundación Caja Rural Granada ↗
                        </a> · {t("Obra:", "Artwork:")} <span className="italic text-bone">«Plaza Berrocal»</span>
                      </div>
                      <p className="text-sm text-bone-muted font-normal leading-relaxed font-sans pt-1">
                        {t(
                          <>Ganadora del <strong className="text-bone font-semibold">Premio Joven</strong> con mi cuadro <strong className="text-bone font-semibold">«Plaza Berrocal»</strong>, capturando la <strong className="text-bone font-semibold">luz, la memoria y la atmósfera</strong> de mi infancia en <strong className="text-bone font-semibold">Granada</strong>.</>,
                          <>Winner of the <strong className="text-bone font-semibold">Youth Prize</strong> with my painting <strong className="text-bone font-semibold">«Plaza Berrocal»</strong>, capturing the <strong className="text-bone font-semibold">light, memory and atmosphere</strong> of my childhood in <strong className="text-bone font-semibold">Granada</strong>.</>
                        )}
                      </p>
                    </div>

                    {/* Foto pequeña ampliable al lado del texto */}
                    <button
                      type="button"
                      onClick={() => setExpandedAwardImage({
                        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop",
                        titleEs: "«Plaza Berrocal» — Premio Joven 2026",
                        titleEn: "«Plaza Berrocal» — Youth Prize 2026",
                        subtitleEs: "Pintura al Aire Libre · Fundación Caja Rural Granada",
                        subtitleEn: "Plein Air Painting · Caja Rural Granada Foundation"
                      })}
                      className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-white/20 hover:border-[#B8C5A8] group/thumb cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(184,197,168,0.35)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8]"
                      title={t("Clic para ampliar fotografía de la obra", "Click to enlarge artwork photograph")}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=500&auto=format&fit=crop" 
                        alt="Obra galardonada Plaza Berrocal"
                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/15 transition-colors flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 flex items-center justify-center text-bone group-hover/thumb:text-[#B8C5A8] group-hover/thumb:scale-110 transition-all shadow-md">
                          <ZoomIn size={14} />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono uppercase tracking-wider bg-black/70 text-bone px-1 rounded border border-white/10">
                        {t("AMPLIAR", "ZOOM")}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Premio 2: Speedpainting 2022 */}
                <div className="relative pl-6 border-l-2 border-[#B8C5A8]/40 bg-white/[0.03] p-4 sm:p-5 -ml-3 rounded-2xl border border-white/10 space-y-3">
                  <div className="absolute w-2.5 h-2.5 bg-[#B8C5A8] rotate-45 organic-diamond-sm -left-[6px] top-4 shadow-[0_0_10px_rgba(184,197,168,0.8)]" aria-hidden="true" />
                  
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8C5A8] font-bold bg-[#5b6c4b]/20 px-2.5 py-0.5 rounded-full border border-[#B8C5A8]/30 flex items-center gap-1">
                      <Award size={11} /> {t("1º PREMIO", "1ST PRIZE")}
                    </span>
                    <span className="text-[11px] font-mono px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B8C5A8] font-semibold shadow-xs">{t("Nov 2022 · Madrid", "Nov 2022 · Madrid")}</span>
                  </div>

                  {/* Disposición al lado del texto */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
                    <div className="flex-1 space-y-1.5">
                      <h5 className="text-base sm:text-lg font-bold text-bone leading-snug">
                        <a 
                          href="https://lboxacademy.es/eventos/entrega-del-premio-de-la-sexta-edicion-speed-painting-2022/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#B8C5A8] hover:text-[#ffd8dc] font-semibold transition-colors underline decoration-[#B8C5A8]/50 hover:decoration-[#ffd8dc]"
                        >
                          {t("VI Edición Speed Painting", "VI Speed Painting Edition")} ↗
                        </a>
                      </h5>
                      <div className="text-xs uppercase tracking-wider text-[#B8C5A8] font-mono font-semibold">
                        Lightbox Academy & NVIDIA
                      </div>
                      <p className="text-sm text-bone-muted font-normal leading-relaxed font-sans pt-1">
                        {t(
                          <>Reto en directo de crear una <strong className="text-bone font-semibold">ilustración conceptual sobre el Japón medieval</strong> con un toque de fantasía en <strong className="text-bone font-semibold">tres horas</strong> bajo <strong className="text-bone font-semibold">estricto límite temporal</strong>.</>,
                          <>Live challenge to create a <strong className="text-bone font-semibold">concept illustration inspired by medieval Japan</strong> with a fantasy twist in <strong className="text-bone font-semibold">three hours</strong> under <strong className="text-bone font-semibold">strict time limit</strong>.</>
                        )}
                      </p>
                    </div>

                    {/* Foto pequeña ampliable al lado del texto */}
                    <button
                      type="button"
                      onClick={() => setExpandedAwardImage({
                        url: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1600&auto=format&fit=crop",
                        titleEs: "VI Edición Speed Painting — 1º Premio 2022",
                        titleEn: "VI Speed Painting Edition — 1st Prize 2022",
                        subtitleEs: "Ilustración Japón Medieval · Lightbox Academy & NVIDIA",
                        subtitleEn: "Medieval Japan Illustration · Lightbox Academy & NVIDIA"
                      })}
                      className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-white/20 hover:border-[#B8C5A8] group/thumb cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(184,197,168,0.35)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8]"
                      title={t("Clic para ampliar fotografía de la obra", "Click to enlarge artwork photograph")}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=500&auto=format&fit=crop" 
                        alt="Ilustración Ganadora Speed Painting 2022"
                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/15 transition-colors flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 flex items-center justify-center text-bone group-hover/thumb:text-[#B8C5A8] group-hover/thumb:scale-110 transition-all shadow-md">
                          <ZoomIn size={14} />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono uppercase tracking-wider bg-black/70 text-bone px-1 rounded border border-white/10">
                        {t("AMPLIAR", "ZOOM")}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal para ampliar las fotos de los premios */}
      <AnimatePresence>
        {expandedAwardImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setExpandedAwardImage(null)}
            className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex flex-col justify-start sm:justify-center items-center overflow-y-auto p-3 sm:p-6 md:p-8 cursor-zoom-out pt-[max(env(safe-area-inset-top),1.25rem)] pb-[max(env(safe-area-inset-bottom),1.25rem)]"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="my-auto relative max-w-4xl w-full max-h-[calc(100dvh-2.5rem)] glass-panel rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col items-center cursor-default overflow-hidden shrink-0"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setExpandedAwardImage(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#5b6c4b] border border-white/20 text-bone hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8]"
                title={t("Cerrar ampliación (Esc)", "Close image (Esc)")}
              >
                <X size={20} />
              </button>

              {/* Large Image */}
              <div className="relative w-full max-h-[52vh] sm:max-h-[64vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center">
                <img
                  src={expandedAwardImage.url}
                  alt={t(expandedAwardImage.titleEs, expandedAwardImage.titleEn)}
                  className="w-full h-full max-h-[52vh] sm:max-h-[64vh] object-contain rounded-xl sm:rounded-2xl"
                />
              </div>

              {/* Image Info & Caption */}
              <div className="w-full pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/10 mt-4">
                <div>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-bone">
                    {t(expandedAwardImage.titleEs, expandedAwardImage.titleEn)}
                  </h4>
                  <p className="text-xs font-mono text-[#B8C5A8]">
                    {t(expandedAwardImage.subtitleEs, expandedAwardImage.subtitleEn)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedAwardImage(null)}
                  className="text-xs font-mono uppercase tracking-widest text-[#B8C5A8] hover:text-white px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 transition-colors"
                >
                  {t("CERRAR [ESC]", "CLOSE [ESC]")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
