import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Flame, RotateCcw, Maximize2, Check } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';
import { DiwaliFireworksCanvas } from '../components/DiwaliFireworksCanvas';
import { DiyaIllustration } from '../components/DiyaIllustration';
import { soundManager } from '../utils/audio';
import { useLightbox } from '../context/LightboxContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface PatakhaFinaleSectionProps {
  onRestart: () => void;
}

export const PatakhaFinaleSection: React.FC<PatakhaFinaleSectionProps> = ({ onRestart }) => {
  const { patakhaFinale, herMainPhoto, girlfriendName, senderName } = websiteConfig;
  const { openPhoto } = useLightbox();
  const prefersReduced = useReducedMotion();

  const [diyaLit, setDiyaLit] = useState(false);
  const [burstCount, setBurstCount] = useState(0);

  const handleLightDiya = () => {
    soundManager.playChimeSound(880); // High clear resonant chime
    setDiyaLit(true);
    setBurstCount((prev) => prev + 1);
  };

  const handleExpandFirstSight = () => {
    openPhoto({
      src: herMainPhoto,
      title: `${patakhaFinale.pageTitle} • First Sight`,
      caption: patakhaFinale.firstSightCaption,
      tag: 'Meri Jaanu',
      subnote: `${patakhaFinale.firstSightSubnote} • Happy Diwali from ${senderName}`,
    });
  };

  const handleRestartClick = () => {
    soundManager.playPageTurnSound();
    onRestart();
  };

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center text-center px-4 py-8 sm:py-14 max-w-4xl mx-auto z-20 overflow-hidden">
      {/* 1. Cinematic Midnight Evening Twilight Canvas Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none -z-20 bg-gradient-to-b from-[#1b0d18]/90 via-[#241021]/80 to-[#140713]/90 rounded-3xl"
        aria-hidden="true"
      />

      {/* 2. Deep Royal Purple & Warm Champagne Ambient Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-15 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.22)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.25)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.2)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* 3. Real-time Fireworks Canvas behind photos and text */}
      <DiwaliFireworksCanvas
        burstTrigger={burstCount}
        className="absolute inset-0 -z-10"
      />

      {/* 4. Top Header Ribbon Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2e1325]/90 border border-[#f3c053]/40 text-[#fef08a] text-xs tracking-widest uppercase font-editorial font-semibold shadow-[0_4px_16px_rgba(243,192,83,0.25)] mb-4 backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
        <span>{patakhaFinale.pageTitle} • For My Jaanu</span>
        <Heart className="w-3.5 h-3.5 fill-[#f472b6] text-[#f472b6]" />
      </motion.div>

      {/* 5. Phase 5: Cinematic Romantic Headline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 text-center"
      >
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#fffdfa] drop-shadow-[0_4px_24px_rgba(251,191,36,0.35)] leading-tight">
          {patakhaFinale.headline}
        </h1>
        <p className="font-script text-2xl sm:text-3xl text-[#fce7f3] max-w-lg mx-auto drop-shadow-sm">
          "{patakhaFinale.tagline}"
        </p>
      </motion.div>

      {/* 6. Phase 3: The Floating First Sight Polaroid Photo */}
      <motion.div
        initial={
          prefersReduced
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.92, y: 18 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: prefersReduced ? 0.3 : 0.8,
          delay: prefersReduced ? 0 : 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative mb-8 sm:mb-10 flex justify-center w-full"
      >
        <motion.div
          animate={
            prefersReduced
              ? undefined
              : {
                  y: [0, -6, 0],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={handleExpandFirstSight}
          role="button"
          tabIndex={0}
          aria-label={`View full uncropped First Sight photograph of ${girlfriendName}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleExpandFirstSight();
            }
          }}
          className="group relative cursor-pointer select-none rounded-2xl bg-[#fffdfa] p-3 sm:p-4 pb-5 shadow-[0_22px_60px_-10px_rgba(0,0,0,0.6),0_0_35px_rgba(251,191,36,0.22)] border border-[#f3c053]/60 transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24] max-w-xs sm:max-w-sm"
        >
          {/* Gold Washi Tape Accent at Top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-gradient-to-r from-[#e8c6ba] via-[#fef08a]/80 to-[#e8c6ba] border-x border-[#c49954]/60 rotate-1 backdrop-blur-sm shadow-sm z-30" />

          {/* Photo Frame Container (Preserving original aspect ratio & natural portrait composition) */}
          <div className="relative w-56 sm:w-68 aspect-[3/4] bg-[#220d1c] rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Soft Ambient Blurred Glow of her photo behind */}
            <img
              src={herMainPhoto}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40 pointer-events-none"
            />

            {/* Crisp Central Natural Photograph */}
            <img
              src={herMainPhoto}
              alt={`First Sight portrait of ${girlfriendName}`}
              className="relative z-10 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />

            {/* Soft Romantic Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none z-20" />

            {/* Gold foil corner badge */}
            <div className="absolute top-2.5 right-2.5 z-30 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#85283f]/95 text-[#fef08a] backdrop-blur-md border border-[#c49954]/50 flex items-center space-x-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#fbbf24]" />
              <span>Meri Patakha</span>
            </div>

            {/* Tap to expand prompt on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5 text-white text-xs font-editorial font-medium z-30">
              <Maximize2 className="w-4 h-4 text-[#fbbf24]" />
              <span>Tap to see full photo</span>
            </div>
          </div>

          {/* Sincere Calligraphic Caption */}
          <div className="pt-3 px-1 text-center space-y-1">
            <div className="flex items-center justify-center space-x-1.5 text-[#85283f] text-xs font-editorial font-bold">
              <Heart className="w-3.5 h-3.5 fill-[#85283f] text-[#85283f]" />
              <span>{patakhaFinale.firstSightCaption}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
            </div>

            <p className="font-script text-xl sm:text-2xl text-[#2e1f24] font-medium leading-snug">
              "You make every moment brighter, jaanu."
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* 7. Phase 6: Sincere Personal Message Card */}
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReduced ? 0.3 : 0.75,
          delay: prefersReduced ? 0 : 0.38,
        }}
        className="relative w-full max-w-xl rounded-2xl bg-[#fffdfa]/95 text-[#2e1f24] p-6 sm:p-9 shadow-[0_16px_50px_rgba(0,0,0,0.4)] border border-[#f3c053]/50 text-left select-text mb-8 backdrop-blur-sm overflow-hidden"
      >
        {/* Festive Golden Corners Accent */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#fef3c7]/60 via-[#fed7aa]/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-[#fce7f3]/60 via-[#fbcfe8]/20 to-transparent pointer-events-none" />

        <div className="border-b border-[#f0dfd2] pb-3 mb-5 flex items-center justify-between text-xs font-editorial">
          <span className="flex items-center space-x-1.5 text-[#85283f] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
            <span>To My Sweetest Jaanu, {girlfriendName}</span>
          </span>
          <span className="italic font-mono text-[11px] text-[#957880]">Diwali Finale</span>
        </div>

        {/* Message Paragraphs */}
        <div className="space-y-4 font-editorial text-[#2e1f24] text-base sm:text-lg leading-relaxed sm:leading-loose">
          {patakhaFinale.paragraphs.map((para, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#85283f] first-letter:float-left first-letter:mr-2 first-letter:leading-none'
                  : ''
              }
            >
              {para}
            </p>
          ))}
        </div>

        {/* Closing Signature */}
        <div className="mt-6 pt-4 border-t border-[#f0dfd2] flex items-center justify-between">
          <span className="font-editorial text-xs italic text-[#6f535b]">
            Always loving my little patakha —
          </span>
          <div className="flex items-center space-x-1.5 text-[#85283f]">
            <Heart className="w-4 h-4 fill-[#85283f]" />
            <span className="font-script text-3xl font-bold text-[#2e1f24]">
              {senderName}
            </span>
          </div>
        </div>
      </motion.article>

      {/* 8. Phase 8: Blooming Final Romantic Message Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: prefersReduced ? 0.3 : 0.65,
          delay: prefersReduced ? 0 : 0.48,
        }}
        className="w-full max-w-md p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2a1224]/90 via-[#3b1732]/90 to-[#2a1224]/90 border border-[#f3c053]/50 text-center shadow-lg mb-8 space-y-1.5 backdrop-blur-md"
      >
        <div className="flex items-center justify-center space-x-1.5 text-xs font-editorial uppercase tracking-widest text-[#fef08a] font-semibold">
          <Flame className="w-3.5 h-3.5 text-[#fbbf24]" />
          <span>A Love That Shines Forever</span>
          <Flame className="w-3.5 h-3.5 text-[#fbbf24]" />
        </div>
        {patakhaFinale.finalNote.map((line, idx) => (
          <p
            key={idx}
            className="font-script text-2xl sm:text-3xl text-[#fffdfa] font-medium leading-snug drop-shadow-sm"
          >
            {line}
          </p>
        ))}
      </motion.div>

      {/* 9. Phase 6: Final Elegant Interactive Diya Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="flex flex-col items-center space-y-4 w-full max-w-md mb-8"
      >
        {/* The Interactive Diya Visual */}
        <div className="mb-1">
          <DiyaIllustration
            size="sm"
            onTap={handleLightDiya}
            className="cursor-pointer"
          />
        </div>

        {/* The Action Button */}
        <button
          type="button"
          onClick={handleLightDiya}
          className="group btn-pill-primary px-8 py-3.5 text-base sm:text-lg space-x-3 shadow-[0_8px_28px_rgba(251,191,36,0.35)] hover:shadow-[0_10px_35px_rgba(251,191,36,0.55)] border border-[#fef08a]/50 focus-visible:ring-2 focus-visible:ring-[#fbbf24] cursor-pointer transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#fbbf24] group-hover:rotate-12 transition-transform" />
          <span>{patakhaFinale.diyaButtonLabel}</span>
          <Heart className="w-4 h-4 text-white fill-white/80" />
        </button>

        {/* Dynamic Diya Blessing Toast */}
        <AnimatePresence>
          {diyaLit && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="p-4 sm:p-5 rounded-2xl bg-[#fffdfa] border border-[#f3c053] text-center shadow-lg space-y-1 max-w-md"
            >
              <div className="flex items-center justify-center space-x-1.5 text-xs font-editorial font-bold text-[#85283f] uppercase tracking-wider">
                <Check className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Our Diya Is Lit</span>
                <Heart className="w-3.5 h-3.5 fill-[#85283f] text-[#85283f]" />
              </div>
              <p className="font-script text-2xl text-[#2e1f24] font-semibold leading-relaxed">
                "{patakhaFinale.diyaBlessingMessage}"
              </p>
              <p className="font-editorial text-[11px] text-[#6f535b] italic">
                Wishing my dearest jaanu an endless sky full of happiness.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 10. Restart Journey Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="pt-4 border-t border-[#f3c053]/30 w-full max-w-xs flex justify-center"
      >
        <button
          onClick={handleRestartClick}
          className="btn-pill-secondary px-6 py-2.5 text-xs sm:text-sm space-x-2 focus-visible:ring-2 focus-visible:ring-[#be6f7f] bg-[#2a1323]/80 text-[#fef08a] border border-[#f3c053]/40 hover:bg-[#381930] hover:text-white transition-all shadow-sm"
        >
          <RotateCcw className="w-4 h-4 text-[#fbbf24]" />
          <span>Read from the Beginning</span>
        </button>
      </motion.div>
    </section>
  );
};
