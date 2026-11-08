import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';
import { soundManager } from '../utils/audio';

export const PromiseSection: React.FC = () => {
  const { promise } = websiteConfig;
  const [sealedVows, setSealedVows] = useState<Record<string, boolean>>({});

  const handleToggleSeal = (vowId: string) => {
    soundManager.playChimeSound(698.46); // F5 note
    setSealedVows((prev) => ({
      ...prev,
      [vowId]: !prev[vowId],
    }));
  };

  const sealedCount = Object.values(sealedVows).filter(Boolean).length;

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-6 sm:py-10 max-w-4xl mx-auto z-20">
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-2 px-3.5 py-1 rounded-full glass-blush text-[#85283f] text-xs tracking-widest uppercase font-editorial font-semibold mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
        <span>My Heartfelt Vows</span>
      </motion.div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="text-center space-y-2 sm:space-y-3 mb-5 sm:mb-6"
      >
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#2e1f24] tracking-tight">
          {promise.headline}
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#6f535b] max-w-xl mx-auto">
          "{promise.subtitle}"
        </p>
      </motion.div>

      {/* Restrained Fine-Line Botanical / Entwined Thread Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-md flex justify-center mb-6"
      >
        <svg
          viewBox="0 0 320 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 sm:w-64 h-auto opacity-70"
          aria-hidden="true"
        >
          <path
            d="M10 20 C 60 20, 100 8, 140 20 C 150 23, 155 24, 160 20 C 165 16, 170 17, 180 20 C 220 32, 260 20, 310 20"
            stroke="#c49954"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="160" cy="20" r="3.5" fill="#85283f" />
          <path
            d="M110 14 C 114 9, 122 10, 126 15"
            stroke="#be6f7f"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M200 24 C 204 29, 212 28, 216 23"
            stroke="#be6f7f"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Personal Statement Card on Relationship Importance */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28 }}
        className="p-5 sm:p-7 paper-card max-w-2xl text-center mb-6"
      >
        <p className="font-editorial text-base sm:text-lg text-[#3a252c] leading-relaxed italic">
          "{promise.text}"
        </p>
      </motion.div>

      {/* Structured Vows Grid with Interactive Sealing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-4">
        {promise.vows.map((vow, idx) => {
          const isSealed = sealedVows[vow.id];

          return (
            <motion.div
              key={vow.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 + idx * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`p-5 paper-card flex flex-col justify-between text-left space-y-3 transition-colors ${
                isSealed ? 'border-[#85283f]/60 bg-[#fffdf9]' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#85283f] font-semibold tracking-wider">
                    {vow.number}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleSeal(vow.id)}
                    className="p-1 rounded-full hover:bg-[#fbf5f2] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#85283f]"
                    title={isSealed ? 'Unseal vow' : 'Seal vow with devotion'}
                    aria-label={`Seal vow ${vow.number}`}
                  >
                    {isSealed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#85283f]" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
                    )}
                  </button>
                </div>

                <h3 className="font-editorial text-lg font-bold text-[#2e1f24] mb-1">
                  {vow.title}
                </h3>
                <p className="font-script text-xl text-[#85283f] font-semibold leading-snug mb-2">
                  "{vow.vow}"
                </p>
                <p className="font-editorial text-xs text-[#4a353c] leading-relaxed">
                  {vow.detail}
                </p>
              </div>

              <div className="pt-2 border-t border-[#f0dfd2] flex items-center justify-between text-[11px] text-[#6f535b] font-editorial">
                <span className="flex items-center space-x-1">
                  <Heart
                    className={`w-3 h-3 transition-colors ${
                      isSealed
                        ? 'text-[#85283f] fill-[#85283f]'
                        : 'text-[#be6f7f] fill-[#be6f7f]/30'
                    }`}
                  />
                  <span>{isSealed ? 'Sealed with love' : 'Tap to seal vow'}</span>
                </span>
                {isSealed && (
                  <span className="text-[10px] font-sans font-semibold text-[#85283f] uppercase">
                    Affirmed
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Devotion Counter Badge */}
      <AnimatePresence>
        {sealedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-xs font-editorial text-[#85283f] bg-[#fffdfa] px-3.5 py-1 rounded-full border border-[#ecd9b5] shadow-sm flex items-center space-x-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#c49954]" />
            <span>
              {sealedCount} of {promise.vows.length} vows affirmed in my heart
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
