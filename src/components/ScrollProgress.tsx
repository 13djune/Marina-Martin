import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5D6E4D] via-[#B8C5A8] to-[#99b380] origin-left z-[100] shadow-[0_0_12px_rgba(184,197,168,0.9)]"
      style={{ scaleX }}
    />
  );
}
