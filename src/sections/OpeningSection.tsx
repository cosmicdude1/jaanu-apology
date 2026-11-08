import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Maximize2 } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';
import { soundManager } from '../utils/audio';
import { useLightbox } from '../context/LightboxContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface OpeningSectionProps {
  onBegin: () => void;
}

export const OpeningSection: React.FC<OpeningSectionProps> = ({ onBegin }) => {
  const { opening, girlfriendName, herMainPhoto } = websiteConfig;
  const { openPhoto } = useLightbox();
  const prefersReducedMotion = useReducedMotion();

  const handleBegin = () => {
    soundManager.playSealPopSound();
    onBegin();
  };

  const handleExpandPortrait = () => {
    openPhoto({
      src: herMainPhoto,
      title: `${girlfriendName} • My Jaanu`,
      caption: 'The girl who owns my heart completely.',
      tag: 'Main Portrait',
      subnote: 'Tap anywhere to close • Cherished with all of bettu’s love',
    });
  };

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center text-center px-4 py-6 sm:py-10 max-w-2xl mx-auto z-20">
      {/* Editorial Ribbon Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-2 px-3.5 py-1 rounded-full glass-blush text-[#85283f] text-xs tracking-widest uppercase font-editorial font-semibold mb-4 sm:mb-5 border border-[#ecd9b5]/60 shadow-xs"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
        <span>A Personal Love Letter • For Chesta</span>
      </motion.div>

      {/* Kept-Safe Studio Portrait Card of Chesta */}
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-6 sm:mb-8"
      >
        <motion.div
          animate={
            prefersReducedMotion
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
          onClick={handleExpandPortrait}
          className="group relative cursor-pointer select-none rounded-2xl bg-[#fffdfa] p-3 sm:p-3.5 pb-4 shadow-[0_16px_40px_-8px_rgba(70,35,45,0.14)] border border-[#ecd9b5] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f]"
          tabIndex={0}
          role="button"
          aria-label="Click to view full uncropped portrait of Chesta"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleExpandPortrait();
            }
          }}
        >
          {/* Decorative Washi Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#e8cec5]/85 border-x border-[#d8b8ad]/60 rotate-1 backdrop-blur-sm shadow-sm z-30" />

          {/* Portrait Photo Container */}
          <div className="relative w-56 sm:w-64 aspect-[3/4] bg-[#2a171f] rounded-xl overflow-hidden shadow-inner">
            <img
              src={herMainPhoto}
              alt={`Portrait of ${girlfriendName}`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />

            {/* Delicate Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

            {/* Gold foil corner bracket */}
            <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#85283f]/90 text-white backdrop-blur-md flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 text-[#c49954]" />
              <span>For Jaanu</span>
            </div>

            {/* Tap to expand prompt hover overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5 text-white text-xs font-editorial font-medium">
              <Maximize2 className="w-4 h-4 text-[#c49954]" />
              <span>Tap to see full photo</span>
            </div>
          </div>

          {/* Card Handwritten Subtitle */}
          <div className="pt-2.5 px-1 flex items-center justify-between text-left">
            <div>
              <p className="font-editorial text-[11px] tracking-widest uppercase text-[#85283f] font-semibold">
                Handcrafted For
              </p>
              <p className="font-script text-2xl text-[#2e1f24] font-medium leading-tight">
                {girlfriendName}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#fbf5f2] border border-[#ecd9b5] flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 text-[#85283f] fill-[#be6f7f]" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Personal Greeting & Editorial Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-2 sm:space-y-3"
      >
        <span className="font-editorial text-xs tracking-[0.25em] uppercase text-[#85283f] font-semibold">
          {opening.greeting}
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#2e1f24] leading-tight">
          {opening.title}
        </h1>
        <p className="font-script text-2xl sm:text-3xl text-[#6f535b] max-w-md mx-auto">
          "{opening.subtitle}"
        </p>
      </motion.div>

      {/* Context Stationery Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="mt-6 sm:mt-7 p-5 sm:p-6 paper-card max-w-lg text-[#4a353c] text-sm sm:text-base font-editorial leading-relaxed shadow-sm"
      >
        <p>{opening.introductoryNote}</p>
      </motion.div>

      {/* The Clear Primary Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-7 sm:mt-8"
      >
        <button
          onClick={handleBegin}
          className="group btn-pill-primary px-8 py-3.5 text-base sm:text-lg space-x-3 shadow-[0_6px_22px_rgba(133,40,63,0.25)] hover:shadow-[0_8px_28px_rgba(133,40,63,0.38)] focus-visible:ring-2 focus-visible:ring-[#85283f]"
          aria-label="Open experience and begin reading"
        >
          <span>{opening.buttonLabel}</span>
          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="mt-3.5 text-xs text-[#957880] font-editorial italic tracking-wide">
          "Take your time, my jaanu. Whenever you feel ready, step inside."
        </p>
      </motion.div>
    </section>
  );
};
