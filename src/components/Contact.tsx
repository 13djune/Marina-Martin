import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Send, CheckCircle2, XCircle, X, Mail, Copy, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('marina.martin.prieto@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
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
          <h2 className="text-4xl md:text-5xl font-serif text-[#faf7f2] italic mb-4 font-bold">
            {t("Pedir una", "Request a")}<br />
            <span className="text-[#B8C5A8] font-black not-italic uppercase tracking-widest">{t("Comisión", "Commission")}</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#B8C5A8] mx-auto mt-6 rounded-full"></div>
          <p className="text-[#eedbe1] mt-8 max-w-2xl mx-auto text-lg font-serif leading-relaxed">
            {t("¿Interesado en trabajar juntos? Cuéntame sobre tu proyecto y adjunta referencias o documentos relevantes.", "Interested in working together? Tell me about your project and attach relevant references or documents.")}
          </p>

          {/* Direct Email Highlight - Frosted Glassmorphism Card (Wider/Longer so whole email fits seamlessly) */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative group p-6 sm:p-7 rounded-3xl glass-panel transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-2xl bg-white/[0.09] border border-[#B8C5A8]/30 hover:border-[#B8C5A8]/60">
              {/* Subtle top edge specular reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" aria-hidden="true" />
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4 text-left w-full md:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/30 flex items-center justify-center text-[#B8C5A8] flex-shrink-0 shadow-inner group-hover:scale-105 group-hover:bg-white/25 transition-all">
                    <Mail size={22} className="text-[#B8C5A8]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#eedbe1] font-bold flex items-center gap-2 mb-1">
                      <span>{t("Contacto Directo", "Direct Inquiries")}</span>
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse" aria-hidden="true" />
                      <span className="text-[10px] text-emerald-200 font-sans tracking-normal font-semibold">{t("Disponible", "Available")}</span>
                    </div>
                    <a 
                      href="mailto:marina.martin.prieto@gmail.com" 
                      className="text-base sm:text-lg md:text-xl font-mono font-bold text-[#faf7f2] hover:text-[#B8C5A8] transition-colors underline decoration-white/40 hover:decoration-[#B8C5A8] tracking-tight whitespace-nowrap block"
                      title={t("Enviar correo electrónico a marina.martin.prieto@gmail.com", "Send email to marina.martin.prieto@gmail.com")}
                    >
                      marina.martin.prieto@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50 text-[#faf7f2] hover:text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
                    aria-label={t("Copiar dirección de email al portapapeles", "Copy email address to clipboard")}
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={15} className="text-emerald-300" aria-hidden="true" />
                        <span className="text-emerald-300 font-bold">{t("¡Copiado!", "Copied!")}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} className="text-[#B8C5A8]" aria-hidden="true" />
                        <span>{t("Copiar", "Copy")}</span>
                      </>
                    )}
                  </button>
                  <a
                    href="mailto:marina.martin.prieto@gmail.com"
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#faf7f2] hover:bg-[#B8C5A8] text-[#263120] text-xs font-mono font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg active:scale-95"
                    aria-label={t("Escribir correo a marina.martin.prieto@gmail.com", "Write email to marina.martin.prieto@gmail.com")}
                  >
                    <span>{t("Escribir", "Write")}</span>
                    <span aria-hidden="true" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                </div>
              </div>

              <div className="mt-3.5 pt-3.5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-[#eedbe1]">
                <span>{t("O completa el formulario a continuación:", "Or fill out the form below:")}</span>
                <span className="text-[#B8C5A8] font-medium">{t("⚡ Respuesta en 24-48h laborables", "⚡ Typical response in 24-48h")}</span>
              </div>
            </div>
          </div>
        </div>

        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="glass-panel p-6 sm:p-10 md:p-12 rounded-3xl space-y-7 relative overflow-hidden shadow-2xl backdrop-blur-2xl bg-white/[0.08] border border-white/25"
        >
          {/* Physical Glass Specular Reflections & Internal Light Sheens */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-20" aria-hidden="true" />
          <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none z-20" aria-hidden="true" />
          <div className="absolute -top-[100%] -left-[50%] w-[200%] h-[200%] pointer-events-none rotate-12 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent z-0" aria-hidden="true" />
          
          {/* Subtle frosted glass atmosphere glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B8C5A8]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B8C5A8]/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="contact-field will-change-transform">
              <label htmlFor="name" className="block text-xs uppercase tracking-wider text-bone font-bold mb-2 font-mono">{t("Nombre", "Name")}</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full glass-input rounded-xl px-4 py-3.5 text-bone placeholder:text-[#B8C5A8]/45 focus:outline-none focus:border-[#B8C5A8] focus-visible:ring-2 focus-visible:ring-[#B8C5A8] transition-all"
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
                className="w-full glass-input rounded-xl px-4 py-3.5 text-bone placeholder:text-[#B8C5A8]/45 focus:outline-none focus:border-[#B8C5A8] focus-visible:ring-2 focus-visible:ring-[#B8C5A8] transition-all"
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
              className="w-full glass-input rounded-xl px-4 py-3.5 text-bone placeholder:text-[#B8C5A8]/45 focus:outline-none focus:border-[#B8C5A8] focus-visible:ring-2 focus-visible:ring-[#B8C5A8] transition-all resize-none"
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
              className="border-2 border-dashed border-[#B8C5A8]/30 hover:border-[#B8C5A8] p-8 text-center transition-all cursor-pointer group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8] glass-panel-subtle hover:bg-white/[0.04]"
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
                <div className="absolute inset-0 border border-[#B8C5A8]/40 group-hover:border-[#B8C5A8] rotate-45 organic-diamond transition-colors"></div>
                <Upload className="text-[#B8C5A8] group-hover:scale-110 transition-transform" size={22} aria-hidden="true" />
              </div>
              
              <p className="text-bone-muted font-sans text-sm font-medium group-hover:text-[#B8C5A8] transition-colors">
                {t("Haz clic para adjuntar referencias (PDF, JPG, PNG)", "Click to attach references (PDF, JPG, PNG)")}
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-black/50 px-4 py-2.5 border border-[#B8C5A8]/30 rounded-xl backdrop-blur-md">
                    <span className="text-sm text-bone truncate mr-4">{file.name}</span>
                    <button 
                      type="button" 
                      onClick={() => removeFile(index)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-bone-muted hover:text-[#B8C5A8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C5A8] rounded-lg"
                      aria-label={`${t("Eliminar archivo", "Remove file")}: ${file.name}`}
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                  className="min-h-[44px] min-w-[44px] ml-4 flex items-center justify-center text-bone-muted hover:text-[#B8C5A8] transition-colors"
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
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-[#263120] bg-[#faf7f2] hover:bg-[#B8C5A8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[220px] cursor-pointer shadow-lg hover:shadow-xl rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
