import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowRight, Download, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { downloadCV } from '../utils/downloadHelpers';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { number: '01', nameEs: 'Portfolio', nameEn: 'Portfolio', href: '#portfolio' },
    { number: '02', nameEs: 'Sobre Mí', nameEn: 'About', href: '#about' },
    { number: '03', nameEs: 'Proceso', nameEn: 'Process', href: '#process' },
    { number: '04', nameEs: 'Contacto', nameEn: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    if (!targetId) {
      const lenis = (window as any).lenis;
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -60, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#5E3F47]/92 backdrop-blur-xl py-3.5 sm:py-4 border-b border-white/20 shadow-[0_4px_30px_rgba(28,14,20,0.5)]' 
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, '#')}
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter uppercase border-b-2 border-[#B8C5A8] pb-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8] text-[#faf7f2] hover:text-[#ffd8dc] transition-colors"
            aria-label="Marina Martín Prieto · Inicio"
          >
            MARINA • MARTÍN PRIETO
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.25em] font-sans text-[#faf7f2] font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.nameEn}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#ffd8dc] transition-colors min-h-[44px] flex items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8]"
              >
                {t(link.nameEs, link.nameEn)}
              </a>
            ))}
            <button 
              type="button"
              onClick={toggleLang}
              className="flex items-center gap-2 hover:text-[#ffd8dc] hover:border-[#ffd8dc] transition-colors ml-2 border border-white/25 px-3.5 min-h-[44px] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8] cursor-pointer font-bold text-[#faf7f2] backdrop-blur-md bg-white/10 hover:bg-white/20"
              aria-label={lang === 'es' ? 'Cambiar idioma a Inglés (EN)' : 'Switch language to Spanish (ES)'}
              title={lang === 'es' ? 'Cambiar idioma a Inglés (EN)' : 'Switch language to Spanish (ES)'}
            >
              <Globe size={15} className="text-[#B8C5A8]" aria-hidden="true" />
              <span>{lang === 'es' ? 'EN' : 'ES'}</span>
            </button>
          </div>

          {/* Mobile Hamburguer Toggle Button (Min 44x44px for WCAG AAA) */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-11 h-11 relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8] rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? t("Cerrar menú de navegación", "Close navigation menu") : t("Abrir menú de navegación", "Open navigation menu")}
          >
            {/* Diamond shape backdrop */}
            <div className="absolute inset-1 bg-white/15 backdrop-blur-md border border-white/25 rotate-45 organic-diamond transition-all duration-300 group-hover:border-[#B8C5A8] group-hover:bg-[#B8C5A8]/20 shadow-sm"></div>
            
            {/* Animated 3-line hamburger to X morph */}
            <div className="relative z-10 w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
              <span 
                className={`w-5 h-[2px] bg-[#faf7f2] rounded-full transition-all duration-300 transform origin-center ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[7px] bg-[#B8C5A8]' : ''
                }`}
              />
              <span 
                className={`w-3.5 h-[2px] bg-[#B8C5A8] rounded-full transition-all duration-200 ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'group-hover:w-5'
                }`}
              />
              <span 
                className={`w-5 h-[2px] bg-[#faf7f2] rounded-full transition-all duration-300 transform origin-center ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[7px] bg-[#B8C5A8]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[85] md:hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Menu Drawer Content */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-h-[100dvh] overflow-y-auto bg-[#5E3F47] border-b border-white/20 shadow-[0_20px_50px_rgba(28,14,20,0.5)] px-6 pt-safe pb-8 flex flex-col justify-between text-[#faf7f2]"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pt-4 pb-5 border-b border-white/15">
                <div className="flex flex-col">
                  <span className="text-sm font-serif font-bold text-[#faf7f2] uppercase tracking-wider">
                    MARINA MARTÍN PRIETO
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#B8C5A8] uppercase flex items-center gap-1 mt-0.5">
                    <Sparkles size={11} className="text-[#B8C5A8]" />
                    {t("Concept Art & Bellas Artes", "Concept Art & Fine Arts")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#faf7f2] hover:text-[#B8C5A8] hover:border-[#B8C5A8] transition-all cursor-pointer"
                  aria-label={t("Cerrar menú", "Close menu")}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links with Numbers */}
              <nav className="py-6 flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.nameEn}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (index + 1), duration: 0.3 }}
                    className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-white/10 border border-transparent hover:border-white/20 transition-all group min-h-[52px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#B8C5A8] font-bold">
                        {link.number}
                      </span>
                      <span className="text-xl font-serif font-bold text-[#faf7f2] group-hover:text-[#ffd8dc] transition-colors italic">
                        {t(link.nameEs, link.nameEn)}
                      </span>
                    </div>
                    <ArrowRight size={18} className="text-[#eedbe1] group-hover:text-[#ffd8dc] group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </nav>

              {/* Bottom Actions & Language Selector */}
              <div className="pt-5 border-t border-white/15 space-y-4">
                {/* Language Switcher */}
                <div className="flex items-center justify-between p-2 rounded-2xl bg-white/[0.06] border border-white/15">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#eedbe1] pl-2 flex items-center gap-1.5 font-bold">
                    <Globe size={14} className="text-[#B8C5A8]" />
                    {t("Idioma", "Language")}:
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (lang !== 'es') toggleLang();
                      }}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl font-bold transition-all ${
                        lang === 'es'
                          ? 'bg-[#5b6c4b] text-[#faf7f2] border border-[#7e946a] shadow-md'
                          : 'text-[#faf7f2] hover:text-[#B8C5A8] bg-white/10'
                      }`}
                    >
                      ESPAÑOL
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (lang !== 'en') toggleLang();
                      }}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl font-bold transition-all ${
                        lang === 'en'
                          ? 'bg-[#5b6c4b] text-[#faf7f2] border border-[#7e946a] shadow-md'
                          : 'text-[#faf7f2] hover:text-[#B8C5A8] bg-white/10'
                      }`}
                    >
                      ENGLISH
                    </button>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      downloadCV();
                    }}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-mono uppercase tracking-wider text-[#faf7f2] font-bold transition-all active:scale-95 shadow-sm"
                  >
                    <Download size={14} className="text-[#B8C5A8]" />
                    <span>{t("CURRÍCULUM", "RESUME")}</span>
                  </button>

                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#faf7f2] hover:bg-[#B8C5A8] text-xs font-mono uppercase tracking-wider text-[#263120] font-black transition-all active:scale-95 shadow-md"
                  >
                    <span>{t("CONTACTO", "CONTACT")}</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

                {/* Subtle Status Line */}
                <p className="text-[11px] font-mono text-center text-[#eedbe1] pt-2 font-medium">
                  ✦ {t("Disponible para comisiones & estudios de arte", "Available for commissions & art studios")}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
