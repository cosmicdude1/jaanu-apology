import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

export interface LightboxPhotoData {
  src: string;
  caption?: string;
  title?: string;
  date?: string;
  location?: string;
  tag?: string;
  subnote?: string;
}

interface PhotoLightboxModalProps {
  photo: LightboxPhotoData | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photo,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}) => {
  const handleClose = useCallback(() => {
    soundManager.playPageTurnSound();
    onClose();
  }, [onClose]);

  const handleNext = useCallback(() => {
    if (onNext && hasNext) {
      soundManager.playPageTurnSound();
      onNext();
    }
  }, [onNext, hasNext]);

  const handlePrev = useCallback(() => {
    if (onPrev && hasPrev) {
      soundManager.playPageTurnSound();
      onPrev();
    }
  }, [onPrev, hasPrev]);

  // Keyboard controls: Escape to close, Left/Right arrows to browse
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' && hasNext) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, handleNext, handlePrev, hasNext, hasPrev]);

  // Sound effect when modal opens
  useEffect(() => {
    if (isOpen) {
      soundManager.playChimeSound(784); // G5 resonant chime
    }
  }, [isOpen]);

  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={photo.title || 'Complete photo view'}
      >
        {/* Dark romantic blurred backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="absolute inset-0 bg-[#1a0c12]/85 backdrop-blur-md"
        />

        {/* Ambient Candlelight Warmth behind the image */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(190,111,127,0.18)_0%,transparent_70%)]" />

        {/* Top Control Bar with Close Button */}
        <div className="absolute top-4 right-4 z-50 flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-[#fffdfa]/90 hover:bg-white text-[#2e1f24] shadow-lg flex items-center justify-center border border-[#ecd9b5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f]"
            aria-label="Close complete photo view"
          >
            <X className="w-5 h-5 text-[#85283f]" />
          </motion.button>
        </div>

        {/* Previous Navigation Arrow (if gallery) */}
        {hasPrev && (
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-[#fffdfa]/85 hover:bg-white text-[#85283f] shadow-lg items-center justify-center border border-[#ecd9b5] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f]"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Navigation Arrow (if gallery) */}
        {hasNext && (
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-[#fffdfa]/85 hover:bg-white text-[#85283f] shadow-lg items-center justify-center border border-[#ecd9b5] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f]"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Modal Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl max-h-[92vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Framed Image Container */}
          <div className="relative rounded-2xl bg-[#fffdfa] p-2.5 sm:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border border-[#ecd9b5]/80 flex flex-col items-center max-h-[85vh] overflow-hidden">
            {/* Washi tape header decor */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#e8cec5]/90 border-x border-[#d8b8ad]/80 rotate-1 backdrop-blur-sm shadow-sm z-30" />

            {/* Tag Badge */}
            {photo.tag && (
              <span className="absolute top-4 left-4 z-20 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#85283f]/90 text-white backdrop-blur-md shadow-sm">
                {photo.tag}
              </span>
            )}

            {/* The Uncropped Complete Photo */}
            <div className="relative overflow-hidden rounded-xl bg-[#2a1820] flex items-center justify-center max-h-[62vh] sm:max-h-[68vh]">
              <img
                src={photo.src}
                alt={photo.caption || photo.title || 'Complete memory photograph'}
                className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain block select-none"
              />
            </div>

            {/* Caption & Romantic Plaque */}
            <div className="w-full pt-3 px-2 sm:px-3 text-center space-y-1">
              <div className="flex items-center justify-center space-x-2 text-xs font-editorial text-[#85283f] font-semibold">
                <Heart className="w-3.5 h-3.5 fill-[#be6f7f] text-[#be6f7f]" />
                <span>{photo.title || 'For Chesta (jaanu)'}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
              </div>

              {photo.caption && (
                <p className="font-script text-xl sm:text-2xl text-[#2e1f24] leading-snug font-medium">
                  "{photo.caption}"
                </p>
              )}

              {photo.subnote && (
                <p className="font-editorial text-xs italic text-[#6f535b] max-w-md mx-auto">
                  {photo.subnote}
                </p>
              )}

              {(photo.date || photo.location) && (
                <div className="pt-1.5 flex items-center justify-center space-x-4 text-[11px] text-[#957880] font-mono">
                  {photo.date && (
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-[#be6f7f]" />
                      <span>{photo.date}</span>
                    </span>
                  )}
                  {photo.location && (
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-[#be6f7f]" />
                      <span>{photo.location}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
