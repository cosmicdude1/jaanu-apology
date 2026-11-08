import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';
import { soundManager } from '../utils/audio';

interface OpeningSectionProps {
  onBegin: () => void;
}

export const OpeningSection: React.FC<OpeningSectionProps> = ({ onBegin }) => {
  const { opening, girlfriendName } = websiteConfig;

  const handleBegin = () => {
    soundManager.playSealPopSound();
    onBegin();
  };

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center text-center px-4 py-6 sm:py-10 max-w-2xl mx-auto z-20">
      {/* Animated Decorative Stationery Envelope */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-6 sm:mb-8"
      >
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-64 sm:w-72 h-40 sm:h-44 bg-[#ecd2c9] rounded-2xl border border-[#d8b8ad] shadow-[0_14px_36px_-6px_rgba(70,35,45,0.12)] p-3 flex flex-col justify-between overflow-hidden"
        >
          {/* Top Flap Geometry */}
          <div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#e5c7bd] border-b border-[#d8b8ad]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />

          {/* Envelope Pocket Lining */}
          <div className="relative z-10 w-full h-full bg-[#fffdfa] rounded-xl border border-[#ecd9b5]/70 p-3 flex flex-col items-center justify-center space-y-1 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#c49954]" />
            <p className="font-editorial text-[11px] tracking-widest uppercase text-[#85283f] font-semibold">
              Handcrafted For
            </p>
            <p className="font-script text-2xl text-[#2e1f24] font-medium">
              {girlfriendName}
            </p>
          </div>

          {/* Deep Rose Wax Seal Center Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-gradient-to-br from-[#9e344e] via-[#85283f] to-[#5a1727] flex items-center justify-center shadow-md border border-[#e6b2bd]/40 ring-4 ring-[#fbf5f2]">
            <Heart className="w-5 h-5 text-white fill-white" />
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
        className="mt-6 sm:mt-7 p-5 sm:p-6 paper-card max-w-lg text-[#4a353c] text-sm sm:text-base font-editorial leading-relaxed"
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
      </motion.div>
    </section>
  );
};
