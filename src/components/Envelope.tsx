import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface EnvelopeProps {
  isOpen: boolean;
  onToggle: () => void;
  interactive?: boolean;
  recipientLabel?: string;
  secretMessage?: string;
  closingNote?: string;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  isOpen,
  onToggle,
  interactive = true,
  recipientLabel = 'For My Love',
  secretMessage = 'No matter what tomorrow brings, my love for you remains steadfast, honest, and forever devoted.',
  closingNote = 'Whenever you feel ready, my arms and heart are open for you.',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    if (!interactive) return;
    if (!isOpen) {
      soundManager.playSealPopSound();
    } else {
      soundManager.playPageTurnSound();
    }
    onToggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2 sm:py-4">
      {/* Outer Envelope Wrapper */}
      <motion.div
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-expanded={interactive ? isOpen : undefined}
        aria-label={isOpen ? 'Fold keepsake envelope' : 'Open keepsake envelope'}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        whileHover={interactive && !isOpen ? { scale: 1.015, y: -2 } : undefined}
        whileTap={interactive && !isOpen ? { scale: 0.985 } : undefined}
        className={`relative w-72 sm:w-84 md:w-96 h-52 sm:h-56 md:h-64 rounded-2xl cursor-${
          interactive ? 'pointer' : 'default'
        } transition-shadow duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f] ${
          isOpen
            ? 'shadow-[0_22px_55px_-8px_rgba(133,40,63,0.16)]'
            : 'shadow-[0_12px_36px_-6px_rgba(70,35,45,0.1)]'
        }`}
      >
        {/* Envelope Backboard & Soft Ivory Lining */}
        <div className="absolute inset-0 bg-[#e8cec5] rounded-2xl border border-[#d8b8ad] overflow-hidden">
          {/* Delicate stationery floral pattern inside the pocket */}
          <div className="absolute inset-0 bg-[#f7ebe6] opacity-90" />
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#85283f_1px,transparent_1px)] [background-size:14px_14px]" />
        </div>

        {/* The Folded Letter Peek (Emerges smoothly from the pocket) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: isOpen ? 1 : 0.85 }
              : isOpen
              ? { y: -88, scale: 1.02, opacity: 1 }
              : { y: 0, scale: 0.96, opacity: 0.85 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`absolute inset-x-3 sm:inset-x-4 top-2 h-44 sm:h-52 bg-[#fffdfa] rounded-xl p-4 text-[#2e1f24] border border-[#ecd9b5] flex flex-col justify-between z-10 transition-shadow ${
            isOpen ? 'shadow-[0_12px_36px_rgba(70,35,45,0.15)]' : 'shadow-sm'
          }`}
        >
          <div className="border-b border-[#f0dfd2] pb-1.5 flex items-center justify-between">
            <span className="font-editorial text-[11px] tracking-widest uppercase text-[#85283f] font-semibold">
              The Final Keepsake
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
          </div>

          <div className="my-auto text-center px-1 space-y-1.5">
            <p className="font-script text-xl sm:text-2xl text-[#2e1f24] font-medium leading-relaxed">
              "{secretMessage}"
            </p>
            {isOpen && (
              <p className="font-editorial text-xs italic text-[#6f535b] pt-1">
                {closingNote}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center text-[10px] text-[#957880] font-mono border-t border-[#f0dfd2] pt-1.5">
            <span>Sealed In Devotion</span>
            <span>Always & Forever</span>
          </div>
        </motion.div>

        {/* Envelope Front Left & Right Folded Flaps */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Left flap triangle */}
          <div
            className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#ecd2c9] border-l border-b border-[#ddbfb4]"
            style={{
              clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
            }}
          />
          {/* Right flap triangle */}
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#e5c7bd] border-r border-b border-[#ddbfb4]"
            style={{
              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
            }}
          />
          {/* Bottom flap triangle */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#f0dad3] border-b border-[#d8b8ad]"
            style={{
              clipPath: 'polygon(0 100%, 50% 0%, 100% 100%)',
            }}
          />
        </div>

        {/* Top Triangular Flap (Rotates open 180 degrees) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: isOpen ? 0.3 : 1 }
              : isOpen
              ? { rotateX: 180, zIndex: 5 }
              : { rotateX: 0, zIndex: 30 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.6,
            ease: [0.25, 1, 0.5, 1],
          }}
          style={{
            transformOrigin: 'top center',
            perspective: 1000,
          }}
          className="absolute inset-x-0 top-0 h-1/2 bg-[#e8cec5] border-t border-[#ddbfb4] rounded-t-2xl shadow-sm"
        >
          <div
            className="w-full h-full bg-[#f2dfd8]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        </motion.div>

        {/* Deep Rose Wax Seal with Gold Trim & Heart Emblem */}
        <motion.div
          animate={
            isOpen
              ? { scale: 0.75, opacity: 0, y: -20 }
              : { scale: 1, opacity: 1, y: 0 }
          }
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#9e344e] via-[#85283f] to-[#5a1727] flex items-center justify-center shadow-[0_4px_16px_rgba(90,23,39,0.35)] border border-[#e6b2bd]/40 ring-4 ring-[#fbf5f2]">
            <Heart className="w-6 h-6 text-[#fffdfa] fill-[#fffdfa] drop-shadow-sm" />
            <div className="absolute inset-1 rounded-full border border-[#c49954]/50 pointer-events-none" />
          </div>
        </motion.div>

        {/* Recipient Calligraphy Label */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
          <span className="font-script text-xl tracking-wider text-[#6f535b] font-medium drop-shadow-sm">
            {recipientLabel}
          </span>
        </div>
      </motion.div>

      {/* Interactive Helper Text */}
      {interactive && (
        <motion.p
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-6 text-xs tracking-wider uppercase font-editorial text-[#6f535b] font-medium"
        >
          {isOpen ? 'Click envelope to fold' : 'Touch wax seal to break & reveal final message'}
        </motion.p>
      )}
    </div>
  );
};
