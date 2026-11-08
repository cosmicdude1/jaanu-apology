import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RotateCcw, Sparkles, MessageCircleHeart, Check } from 'lucide-react';
import { websiteConfig, EndingResponseOption } from '../content/letterContent';
import { soundManager } from '../utils/audio';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface FloatingSparkle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface EndingSectionProps {
  onRestart: () => void;
}

export const EndingSection: React.FC<EndingSectionProps> = ({ onRestart }) => {
  const { ending, senderName } = websiteConfig;
  const [responseIndex, setResponseIndex] = useState(0);
  const [hasInteractedWithHeart, setHasInteractedWithHeart] = useState(false);
  const [heartPulses, setHeartPulses] = useState(0);
  const [sparkles, setSparkles] = useState<FloatingSparkle[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const prefersReducedMotion = useReducedMotion();

  // Heart Click Interaction
  const handleHeartClick = () => {
    soundManager.playChimeSound(659.25); // E5 resonant chime
    setHeartPulses((prev) => prev + 1);
    setHasInteractedWithHeart(true);
    setResponseIndex((prev) => (prev + 1) % ending.heartResponses.length);

    if (!prefersReducedMotion) {
      // Spawn 5 tasteful floating mini-hearts drifting upwards
      const newSparkles: FloatingSparkle[] = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: (i - 2) * 20 + (Math.random() * 8 - 4),
        y: -42 - Math.random() * 32,
        scale: 0.6 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 28,
      }));

      setSparkles(newSparkles);
      setTimeout(() => {
        setSparkles([]);
      }, 1400);
    }
  };

  // Optional Response Interaction (Zero server data, pure local validation)
  const handleSelectOption = (option: EndingResponseOption) => {
    soundManager.playChimeSound(587.33); // D5 chime
    setSelectedOptionId(option.id);
  };

  const handleRestart = () => {
    soundManager.playPageTurnSound();
    onRestart();
  };

  const activeOption = ending.responseOptions.find((opt) => opt.id === selectedOptionId);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 max-w-2xl mx-auto z-20">
      {/* 1. Softly Glowing Interactive Heart */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative mb-5 sm:mb-6"
      >
        {/* Floating Heart Sparks on Tap */}
        <AnimatePresence>
          {sparkles.map((sp) => (
            <motion.div
              key={sp.id}
              initial={{ opacity: 0.95, x: 0, y: 0, scale: 0.4 }}
              animate={{
                opacity: 0,
                x: sp.x,
                y: sp.y,
                scale: sp.scale,
                rotate: sp.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.25, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
            >
              <Heart className="w-5 h-5 text-[#85283f] fill-[#be6f7f]" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* The Heart Button with Soft Glow */}
        <motion.button
          onClick={handleHeartClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [1, 1.04, 1],
                  boxShadow: [
                    '0 0 15px rgba(190, 111, 127, 0.25)',
                    '0 0 35px rgba(190, 111, 127, 0.45)',
                    '0 0 15px rgba(190, 111, 127, 0.25)',
                  ],
                }
          }
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#fffdfa] border-2 border-[#d8b8ad] flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f] transition-all"
          aria-label="Tap to interact with the heart"
        >
          <motion.div
            key={heartPulses}
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 1.2, 1] }
            }
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#85283f] fill-[#be6f7f]/30 group-hover:fill-[#be6f7f]/50 transition-colors" />
          </motion.div>

          <Sparkles className="w-4 h-4 text-[#c49954] absolute -top-1 -right-1" />
        </motion.button>

        <p className="font-editorial text-xs text-[#957880] mt-3 tracking-wider uppercase font-medium">
          {ending.heartPrompt}
        </p>

        {/* Dynamic Warm Response Message Toast */}
        <div className="min-h-[44px] flex items-center justify-center mt-2">
          <AnimatePresence mode="wait">
            {hasInteractedWithHeart && (
              <motion.div
                key={responseIndex}
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.28 }}
                className="px-4 py-1.5 rounded-full bg-[#fffdfa] border border-[#ecd9b5] text-[#85283f] font-script text-xl shadow-sm"
              >
                "{ending.heartResponses[responseIndex]}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 2. Main Ending Editorial Typography */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6"
      >
        <span className="font-editorial text-xs sm:text-sm uppercase tracking-[0.25em] text-[#85283f] font-semibold">
          Quiet Grace
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#2e1f24]">
          {ending.headline}
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#6f535b] max-w-lg mx-auto">
          "{ending.subtitle}"
        </p>
      </motion.div>

      {/* 3. Sincere, Peaceful Unpressured Final Message Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="p-6 sm:p-8 paper-card max-w-lg text-[#3a252c] font-editorial text-base sm:text-lg leading-relaxed shadow-sm text-left sm:text-center mb-6"
      >
        <p className="italic">
          "{ending.finalMessage}"
        </p>
        <div className="mt-5 pt-4 border-t border-[#f0dfd2] flex items-center justify-center space-x-2 text-[#85283f]">
          <Sparkles className="w-4 h-4 text-[#c49954]" />
          <span className="font-script text-2xl font-bold text-[#2e1f24]">
            {senderName}
          </span>
        </div>
      </motion.div>

      {/* 4. Optional Gentle Response Interaction (100% Client-Side & Non-Pressuring) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="w-full max-w-lg mb-6"
      >
        <div className="flex items-center justify-center space-x-1.5 text-xs text-[#6f535b] font-editorial uppercase tracking-wider font-semibold mb-3">
          <MessageCircleHeart className="w-3.5 h-3.5 text-[#85283f]" />
          <span>If you'd like to leave a quiet thought for your heart:</span>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {ending.responseOptions.map((opt) => {
            const isSelected = selectedOptionId === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-editorial transition-all flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f] ${
                  isSelected
                    ? 'bg-[#85283f] text-white shadow-md ring-2 ring-[#be6f7f]/40'
                    : 'bg-[#fffdfa] text-[#4a353c] border border-[#d8b8ad] hover:border-[#85283f] shadow-sm'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Validating Response Card to Her Choice */}
        <AnimatePresence mode="wait">
          {activeOption && (
            <motion.div
              key={activeOption.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mt-4 p-5 rounded-2xl bg-[#fffdfa] border border-[#ecd9b5] text-left shadow-sm space-y-1.5"
            >
              <div className="flex items-center space-x-1.5 text-[#85283f] text-xs font-editorial font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-[#be6f7f] text-[#be6f7f]" />
                <span>From bettu to jaanu</span>
              </div>
              <p className="font-editorial text-sm sm:text-base text-[#2e1f24] leading-relaxed font-medium">
                "{activeOption.replyMessage}"
              </p>
              <p className="font-editorial text-xs italic text-[#6f535b]">
                {activeOption.subnote}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 5. Restart Journey Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-2 sm:mt-4"
      >
        <button
          onClick={handleRestart}
          className="btn-pill-secondary px-6 py-2.5 text-xs sm:text-sm space-x-2 focus-visible:ring-2 focus-visible:ring-[#be6f7f]"
        >
          <RotateCcw className="w-4 h-4 text-[#85283f]" />
          <span>Read from the Beginning</span>
        </button>
      </motion.div>
    </section>
  );
};
