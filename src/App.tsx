import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Biography from './components/Biography';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Process from './components/Process';
import Contact from './components/Contact';
import Divider from './components/Divider';
import SEO from './components/SEO';
import Preloader from './components/Preloader';
import BackToTop from './components/BackToTop';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { HelmetProvider } from 'react-helmet-async';

function MainContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  // Detect keyboard navigation for WCAG AAA
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigating');
      }
    };
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigating');
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <SmoothScroll>
      <SEO />
      <ScrollProgress />

      {/* Skip to Content Link for WCAG AAA (11.68:1 contrast) */}
      <a 
        href="#portfolio" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:bg-vampire-red focus:text-black focus:px-4 focus:py-2.5 focus:rounded-md focus:shadow-2xl focus:font-bold focus:outline-none focus:ring-2 focus:ring-white text-xs uppercase tracking-wider"
      >
        {t("Saltar al contenido principal", "Skip to main content")}
      </a>

      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <div className={`bg-[#5E3F47] min-h-screen relative overflow-hidden text-[#faf7f2] selection:bg-[#5b6c4b] selection:text-[#faf7f2] transition-opacity duration-300 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <CustomCursor />
        <BackToTop />
        {/* Rich Velvety Burgundy Mauve Canvas Foundation (#5E3F47) with Subtle Luminous Sage Accents */}
        <div 
          className="fixed inset-0 pointer-events-none z-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 25%, rgba(184, 197, 168, 0.05) 0%, transparent 45%),
              radial-gradient(circle at 80% 80%, rgba(184, 197, 168, 0.04) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 15%, rgba(122, 82, 93, 0.45) 0%, rgba(94, 63, 71, 0.95) 50%, rgba(68, 42, 49, 0.98) 100%)
            `
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <Navbar />
          <main id="main-content">
            <Hero />
            <Divider />
            <Gallery />
            <Divider />
            <Biography />
            <Divider />
            <Process />
            <Divider />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </HelmetProvider>
  );
}
