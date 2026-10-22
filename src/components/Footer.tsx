import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#3f252c] px-6 border-t border-white/15 text-center relative overflow-hidden transition-all duration-700 py-12 text-[#faf7f2]">
      {/* Background glow (Hardware-friendly radial gradient, no expensive blur filter) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-28 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(184, 197, 168, 0.16) 0%, transparent 70%)'
        }}
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-mono uppercase tracking-[0.25em] text-[#eedbe1] gap-4 md:gap-0 font-medium">
          <div>© {new Date().getFullYear()} Marina Martín Prieto</div>
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/black_umi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#B8C5A8] hover:text-[#ffd8dc] font-semibold transition-colors min-h-[44px] flex items-center px-1 underline decoration-[#B8C5A8]/50 hover:decoration-[#ffd8dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8]"
              aria-label="Instagram de Marina Martín Prieto (abre en pestaña nueva)"
            >
              Instagram ↗
            </a>
            <a 
              href="https://www.linkedin.com/in/marina-martin-prieto/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#B8C5A8] hover:text-[#ffd8dc] font-semibold transition-colors min-h-[44px] flex items-center px-1 underline decoration-[#B8C5A8]/50 hover:decoration-[#ffd8dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8]"
              aria-label="LinkedIn de Marina Martín Prieto (abre en pestaña nueva)"
            >
              LinkedIn ↗
            </a>
          </div>
          <div className="text-[#B8C5A8] font-bold">{t("Concept Artist", "Concept Artist")}</div>
        </div>
      </div>
    </footer>
  );
}
