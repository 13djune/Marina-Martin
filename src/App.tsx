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
      
      <div className={`bg-[#22121b] min-h-screen relative overflow-hidden text-[#B8C5A8] selection:bg-[#B8C5A8] selection:text-[#162012] transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <CustomCursor />
        <BackToTop />
        {/* Dark Moody Editorial Background Foundation: Darker Muted Plum (#22121b) with Kombu Green (#24301d) shadows */}
        <div 
          className="fixed inset-0 pointer-events-none z-0" 
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(210, 167, 170, 0.05) 0%, rgba(34, 18, 27, 0.95) 45%, rgba(26, 36, 21, 0.98) 85%, #10180d 100%)'
          }}
          aria-hidden="true"
        />
        <div 
          className="fixed inset-0 opacity-40 pointer-events-none z-0 transform-gpu will-change-transform" 
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, #24301d 0%, transparent 60%), radial-gradient(circle at 80% 70%, #162012 0%, transparent 60%)'
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
