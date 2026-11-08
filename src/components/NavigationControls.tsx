import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavigationControlsProps {
  currentIndex: number;
  totalScenes: number;
  onNext: () => void;
  onPrev: () => void;
  canGoNext?: boolean;
  nextLabel?: string;
  prevLabel?: string;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentIndex,
  totalScenes,
  onNext,
  onPrev,
  canGoNext = true,
  nextLabel,
  prevLabel,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalScenes - 1;

  const handleNextClick = () => {
    soundManager.playPageTurnSound();
    onNext();
  };

  const handlePrevClick = () => {
    soundManager.playPageTurnSound();
    onPrev();
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 flex justify-between items-center max-w-4xl mx-auto px-3.5 sm:px-6 pointer-events-none pb-[env(safe-area-inset-bottom)]">
      {/* Previous Scene Button */}
      <div className="pointer-events-auto">
        {!isFirst && (
          <motion.button
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePrevClick}
            className="btn-pill-secondary px-4 py-2 text-xs sm:text-sm space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be6f7f]"
            aria-label="Previous scene"
          >
            <ChevronLeft className="w-4 h-4 text-[#85283f]" />
            <span>{prevLabel || 'Back'}</span>
          </motion.button>
        )}
      </div>

      {/* Middle Subtle Scene Counter */}
      <div className="hidden sm:flex items-center space-x-1.5 text-xs text-[#6f535b] font-editorial bg-[#fffdfa]/80 px-3 py-1 rounded-full border border-[#ecd9b5]/60 shadow-sm backdrop-blur-sm pointer-events-auto">
        <Heart className="w-3 h-3 text-[#be6f7f] fill-[#be6f7f]/30" />
        <span>Scene {currentIndex + 1} of {totalScenes}</span>
      </div>

      {/* Next Scene Button */}
      <div className="pointer-events-auto">
        {!isLast ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNextClick}
            disabled={!canGoNext}
            className={`btn-pill-primary px-5 py-2 text-xs sm:text-sm space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f] ${
              !canGoNext ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Next scene"
          >
            <span>{nextLabel || 'Continue'}</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </motion.button>
        ) : (
          <div className="w-16" />
        )}
      </div>
    </div>
  );
};
