import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Send, CheckCircle2, XCircle, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.contact-field');
        tl.fromTo(
          fields,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power2.out' },
          '-=0.5'
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add files to FormData
    files.forEach(file => {
      formData.append('attachments', file);
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData, // fetch will set the correct multipart/form-data boundary automatically
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(data.message || t("Mensaje enviado con éxito", "Message sent successfully"));
        form.reset();
        setFiles([]);
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || t("Error al enviar el mensaje", "Error sending message"));
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(t("Error de red al enviar el mensaje", "Network error while sending message"));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 relative z-10 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <div
          ref={headerRef}
          className="text-center mb-16 will-change-transform"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-bone italic mb-4">
            {t("Pedir una", "Request a")}<br />
            <span className="text-vampire-red font-black not-italic uppercase tracking-widest">{t("Comisión", "Commission")}</span>
          </h2>
          <div className="w-24 h-1 bg-vampire-red mx-auto mt-6"></div>
          <p className="text-bone-muted mt-8 max-w-2xl mx-auto text-lg font-serif">
            {t("¿Interesado en trabajar juntos? Cuéntame sobre tu proyecto y adjunta referencias o documentos relevantes.", "Interested in working together? Tell me about your project and attach relevant references or documents.")}
          </p>
        </div>

        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="glass-panel p-6 sm:p-10 md:p-12 rounded-3xl space-y-7 relative overflow-hidden"
        >
          {/* Physical Glass Specular Reflections & Internal Light Sheens */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-20" aria-hidden="true" />
          <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-20" aria-hidden="true" />
          <div className="absolute -top-[100%] -left-[50%] w-[200%] h-[200%] pointer-events-none rotate-12 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent z-0" aria-hidden="true" />
          
          {/* Subtle botanical glass atmosphere glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e8b4b8]/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B8C5A8]/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="contact-field will-change-transform">
              <label htmlFor="name" className="block text-xs uppercase tracking-wider text-bone font-bold mb-2 font-mono">{t("Nombre", "Name")}</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full glass-input rounded-xl px-4 py-3.5 text-bone placeholder:text-[#B8C5A8]/45 focus:outline-none focus:border-[#e8b4b8] focus-visible:ring-2 focus-visible:ring-[#e8b4b8] transition-all"
                placeholder={t("Tu nombre completo", "Your full name")}
              />
            </div>
            <div className="contact-field will-change-transform">
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-bone font-bold mb-2 font-mono">{t("Email", "Email")}</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full glass-input rounded-xl px-4 py-3.5 text-bone placeholder:text-[#B8C5A8]/45 focus:outline-none focus:border-[#e8b4b8] focus-visible:ring-2 focus-visible:ring-[#e8b4b8] transition-all"
                placeholder={t("tu@email.com", "you@email.com")}
              />
            </div>
          </div>

          <div className="contact-field will-change-transform relative z-10">
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-bone font-bold mb-2 font-mono">{t("Mensaje", "Message")}</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full glass-input rounded-xl px-4 py-3.5 text-bone placeholder:text-[#B8C5A8]/45 focus:outline-none focus:border-[#e8b4b8] focus-visible:ring-2 focus-visible:ring-[#e8b4b8] transition-all resize-none"
              placeholder={t("Cuéntame los detalles de la comisión...", "Tell me the details of the commission...")}
            ></textarea>
          </div>

          {/* File Upload Glass Area */}
          <div className="contact-field will-change-transform relative z-10">
            <label className="block text-xs uppercase tracking-wider text-bone font-bold mb-2 font-mono">{t("Archivos Adjuntos", "Attachments")}</label>
            
            <div 
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className="border-2 border-dashed border-[#e8b4b8]/30 hover:border-[#e8b4b8] p-8 text-center transition-all cursor-pointer group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b4b8] glass-panel-subtle hover:bg-white/[0.04]"
              onClick={() => fileInputRef.current?.click()}
              aria-label={t("Haz clic para adjuntar referencias (PDF, JPG, PNG)", "Click to attach references (PDF, JPG, PNG)")}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                multiple
                onChange={handleFileChange}
              />
              
              <div className="w-12 h-12 mx-auto mb-4 relative flex items-center justify-center">
                <div className="absolute inset-0 border border-[#e8b4b8]/40 group-hover:border-[#e8b4b8] rotate-45 organic-diamond transition-colors"></div>
                <Upload className="text-[#e8b4b8] group-hover:scale-110 transition-transform" size={22} aria-hidden="true" />
              </div>
              
              <p className="text-bone-muted font-sans text-sm font-medium group-hover:text-[#e8b4b8] transition-colors">
                {t("Haz clic para adjuntar referencias (PDF, JPG, PNG)", "Click to attach references (PDF, JPG, PNG)")}
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-black/50 px-4 py-2.5 border border-[#e8b4b8]/30 rounded-xl backdrop-blur-md">
                    <span className="text-sm text-bone truncate mr-4">{file.name}</span>
                    <button 
                      type="button" 
                      onClick={() => removeFile(index)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-bone-muted hover:text-[#e8b4b8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b4b8] rounded-lg"
                      aria-label={`${t("Eliminar archivo", "Remove file")}: ${file.name}`}
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Direct Email Highlight Link */}
          <div className="text-center text-xs font-mono text-bone-muted relative z-10 pt-1">
            {t("O si prefieres, escribe directamente a:", "Or if you prefer, email directly to:")}{' '}
            <a 
              href="mailto:marinaprieto.art@gmail.com" 
              className="text-[#e8b4b8] hover:text-[#fce4e6] font-bold underline decoration-[#e8b4b8]/50 hover:decoration-[#fce4e6] transition-colors ml-1 inline-block"
            >
              marinaprieto.art@gmail.com ↗
            </a>
          </div>

          <AnimatePresence>
            {submitStatus !== 'idle' && (
              <motion.div
                role="alert"
                aria-live="assertive"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className={`fixed bottom-6 right-6 z-50 flex items-center p-4 border shadow-2xl backdrop-blur-md rounded-xl ${submitStatus === 'success' ? 'bg-[#1c2a1a]/95 border-[#B8C5A8] text-bone' : 'bg-[#2d1218]/95 border-[#e8b4b8] text-bone'}`}
              >
                {submitStatus === 'success' ? <CheckCircle2 className="mr-3 flex-shrink-0 text-[#B8C5A8]" size={24} /> : <XCircle className="mr-3 flex-shrink-0 text-[#e8b4b8]" size={24} />}
                <div>
                  <h4 className="font-bold text-bone mb-0.5">{submitStatus === 'success' ? t("¡Éxito!", "Success!") : t("Error", "Error")}</h4>
                  <span className="text-sm text-bone">{statusMessage}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setSubmitStatus('idle')}
                  className="min-h-[44px] min-w-[44px] ml-4 flex items-center justify-center text-bone-muted hover:text-[#e8b4b8] transition-colors"
                  aria-label={t("Cerrar notificación", "Dismiss alert")}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="contact-field text-center pt-4 will-change-transform relative z-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-black bg-[#e8b4b8] hover:bg-[#fce4e6] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[220px] cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(232,180,184,0.5)] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="relative z-10 flex items-center tracking-widest uppercase text-sm font-black">
                {isSubmitting ? t("Enviando...", "Sending...") : t("Enviar Solicitud", "Send Request")}
                {!isSubmitting && <Send size={16} className="ml-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
