import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryItem } from '../content/letterContent';
import { PolaroidCard } from './PolaroidCard';
import { X, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MemoryGalleryProps {
  memories: MemoryItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  memories,
  selectedId,
  onSelect,
}) => {
  const selectedMemory = memories.find((m) => m.id === selectedId);

  const handleClose = () => {
    soundManager.playPageTurnSound();
    onSelect(null);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 py-6">
      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center items-start">
        {memories.map((memory) => (
          <PolaroidCard
            key={memory.id}
            tag={memory.tag}
            date={memory.date}
            location={memory.location}
            caption={memory.caption}
            shortDescription={memory.shortDescription}
            imageUrl={memory.imagePath}
            rotation={memory.rotation}
            isActive={selectedId === memory.id}
            onClick={() => onSelect(selectedId === memory.id ? null : memory.id)}
          />
        ))}
      </div>

      {/* Expanded Spotlight Modal for Selected Memory */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2e1f24]/40 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#fffdfa] text-[#2e1f24] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#ecd9b5]"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full text-[#6f535b] hover:text-[#2e1f24] hover:bg-[#fbf5f2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be6f7f]"
                aria-label="Close memory modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-[#85283f] mb-2">
                <Sparkles className="w-4 h-4 text-[#c49954]" />
                <span className="text-[11px] uppercase tracking-widest font-semibold font-editorial">
                  {selectedMemory.tag || 'Cherished Memory'}
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2e1f24] mb-1">
                {selectedMemory.caption}
              </h3>

              <div className="flex items-center space-x-3 text-xs text-[#6f535b] font-mono mb-6">
                {selectedMemory.date && <span>{selectedMemory.date}</span>}
                {selectedMemory.location && <span>• {selectedMemory.location}</span>}
              </div>

              {selectedMemory.shortDescription && (
                <blockquote className="border-l-2 border-[#be6f7f] pl-4 my-4 italic text-[#85283f] font-script text-2xl leading-relaxed">
                  "{selectedMemory.shortDescription}"
                </blockquote>
              )}

              <div className="pt-4 border-t border-[#f0dfd2] flex items-center justify-between text-xs text-[#6f535b]">
                <span className="flex items-center space-x-1.5 text-[#85283f] font-medium">
                  <Heart className="w-4 h-4 fill-[#be6f7f] text-[#be6f7f]" />
                  <span>Held close to my heart</span>
                </span>
                <button
                  onClick={handleClose}
                  className="btn-pill-primary px-4 py-1.5 text-xs font-sans font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
