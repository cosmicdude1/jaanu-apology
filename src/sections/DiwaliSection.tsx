import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, SunMedium, Check } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';
import { DiyaIllustration } from '../components/DiyaIllustration';
import { soundManager } from '../utils/audio';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CelebrationParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
}

interface DiwaliSectionProps {
  onContinue?: () => void;
}

export const DiwaliSection: React.FC<DiwaliSectionProps> = ({ onContinue }) => {
  const { diwali, senderName, girlfriendName } = websiteConfig;
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [celebrationParticles, setCelebrationParticles] = useState<CelebrationParticle[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCelebrate = () => {
    soundManager.playChimeSound(880); // High clear A5 bell chime
    setHasCelebrated(true);

    if (!prefersReducedMotion) {
      const colors = ['#f59e0b', '#fbbf24', '#f3c053', '#e08a3c', '#be6f7f'];
      const particles: CelebrationParticle[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 220,
        y: -60 - Math.random() * 80,
        scale: 0.6 + Math.random() * 0.5,
        color: colors[i % colors.length],
      }));

      setCelebrationParticles(particles);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCelebrationParticles([]);
      }, 1600);
    }
  };

  return (
    <section className="relative min-h-[84vh] flex flex-col items-center justify-center text-center px-4 py-6 sm:py-10 max-w-3xl mx-auto z-20">
      {/* 1. Ambient Golden Festive Background Glow Pool */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.14)_0%,rgba(224,138,60,0.08)_40%,transparent_70%)] filter blur-2xl" />
      </div>

      {/* Floating Celebration Particles on Button Click */}
      <AnimatePresence>
        {celebrationParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.3 }}
            animate={{
              opacity: 0,
              x: p.x,
              y: p.y,
              scale: p.scale,
              rotate: (Math.random() - 0.5) * 120,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
          >
            <div
              className="w-3 h-3 rounded-full shadow-md"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 12px ${p.color}`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 2. Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-2 px-3.5 py-1 rounded-full glass-blush text-[#85283f] text-xs tracking-widest uppercase font-editorial font-semibold mb-3 sm:mb-4 border border-[#e8cec5]/70"
      >
        <SunMedium className="w-3.5 h-3.5 text-[#c49954]" />
        <span>A Festival Of Light & Love</span>
      </motion.div>

      {/* 3. The Animated Diya (Illuminates gracefully) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.8,
          delay: prefersReducedMotion ? 0 : 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mb-3 sm:mb-4"
      >
        <DiyaIllustration size="md" onTap={handleCelebrate} />
      </motion.div>

      {/* 4. Main Editorial Heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.7,
          delay: prefersReducedMotion ? 0 : 0.25,
        }}
        className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8"
      >
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#2e1f24] tracking-tight">
          {diwali.headline}
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#6f535b] max-w-lg mx-auto">
          "{diwali.subtitle}"
        </p>
      </motion.div>

      {/* 5. Heartfelt Diwali Letter Card with Warm Stationery Details */}
      <motion.article
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.75,
          delay: prefersReducedMotion ? 0 : 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full max-w-xl bg-[#fffdfa] rounded-2xl shadow-[0_16px_45px_-8px_rgba(140,56,35,0.12)] border border-[#ecd9b5] p-5 sm:p-9 text-left select-text mb-6 overflow-hidden"
      >
        {/* Subtle Marigold Corner Accents */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#fef3c7]/60 via-[#fed7aa]/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-[#fef3c7]/60 via-[#fed7aa]/20 to-transparent pointer-events-none" />

        {/* Card Header */}
        <div className="border-b border-[#f0dfd2] pb-3 mb-5 flex items-center justify-between text-xs text-[#6f535b] font-editorial">
          <span className="flex items-center space-x-1.5 text-[#85283f] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
            <span>To My Jaanu, {girlfriendName}</span>
          </span>
          <span className="italic font-mono text-[11px] text-[#957880]">Diwali Night</span>
        </div>

        {/* Salutation Greeting */}
        <h3 className="font-script text-3xl sm:text-4xl text-[#85283f] font-bold mb-4">
          {diwali.greeting}
        </h3>

        {/* Paragraphs in readable, elegant serif typography */}
        <div className="space-y-4 font-editorial text-[#2e1f24] text-base sm:text-lg leading-relaxed sm:leading-loose">
          {diwali.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-bold first-letter:text-[#85283f]'
                  : ''
              }
            >
              {p}
            </p>
          ))}
        </div>

        {/* Closing Signature */}
        <div className="mt-6 pt-4 border-t border-[#f0dfd2] flex items-center justify-between">
          <span className="font-editorial text-xs italic text-[#6f535b]">
            {diwali.closing}
          </span>
          <div className="flex items-center space-x-1 text-[#85283f]">
            <Heart className="w-4 h-4 fill-[#85283f]" />
            <span className="font-script text-2xl font-bold text-[#2e1f24]">
              {senderName}
            </span>
          </div>
        </div>
      </motion.article>

      {/* 6. Tasteful Interactive Celebrate Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.6,
          delay: prefersReducedMotion ? 0 : 0.45,
        }}
        className="w-full max-w-lg flex flex-col items-center space-y-3"
      >
        <button
          type="button"
          onClick={handleCelebrate}
          className="group btn-pill-primary px-7 py-3 text-sm sm:text-base space-x-2.5 shadow-[0_6px_22px_rgba(196,153,84,0.3)] hover:shadow-[0_8px_28px_rgba(196,153,84,0.45)] border border-[#f3c053]/50 focus-visible:ring-2 focus-visible:ring-[#c49954] cursor-pointer transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#f3c053] group-hover:rotate-12 transition-transform" />
          <span>{diwali.celebrateButtonLabel}</span>
          <Heart className="w-4 h-4 text-white fill-white/80" />
        </button>

        {/* Celebrating Feedback Toast / Warm Affirmation */}
        <AnimatePresence>
          {hasCelebrated && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="p-4 sm:p-5 rounded-2xl bg-[#fffdfa] border border-[#ecd9b5] text-left shadow-sm space-y-1 max-w-md"
            >
              <div className="flex items-center space-x-1.5 text-xs font-editorial font-semibold text-[#85283f] uppercase tracking-wider">
                <Check className="w-3.5 h-3.5 text-[#c49954]" />
                <span>A Warm Diwali Affirmation</span>
              </div>
              <p className="font-editorial text-sm sm:text-base text-[#2e1f24] leading-relaxed font-medium">
                "{diwali.celebrateResponse}"
              </p>
              <div className="pt-2 border-t border-[#ecd9b5]/50 flex items-center justify-between">
                <span className="font-editorial text-[11px] text-[#6f535b] italic">
                  Always wishing light and peace for my Chesta.
                </span>
                {onContinue && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playPageTurnSound();
                      onContinue();
                    }}
                    className="flex items-center space-x-1 text-xs text-[#85283f] font-editorial font-semibold hover:underline cursor-pointer"
                  >
                    <span>Final Words</span>
                    <Heart className="w-3 h-3 fill-[#85283f]" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
