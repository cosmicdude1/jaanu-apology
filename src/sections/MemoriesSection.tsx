import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Camera, ChevronLeft, ChevronRight, Heart, Sparkles, Maximize2 } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';
import { PolaroidCard } from '../components/PolaroidCard';
import { soundManager } from '../utils/audio';
import { useLightbox } from '../context/LightboxContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const MemoriesSection: React.FC = () => {
  const { memories } = websiteConfig;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const { openGallery } = useLightbox();
  const prefersReducedMotion = useReducedMotion();

  const activeMemory = memories[currentIndex] || memories[0];

  const handleNext = () => {
    soundManager.playPageTurnSound();
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    soundManager.playPageTurnSound();
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  // Touch & Pointer Drag Swipe Handler
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 45;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const handlePhotoUpload = (memoryId: string, dataUrl: string) => {
    setCustomPhotos((prev) => ({ ...prev, [memoryId]: dataUrl }));
  };

  const handleOpenLightbox = (index: number) => {
    const galleryItems = memories.map((m) => ({
      src: customPhotos[m.id] || m.imagePath,
      title: m.tag || 'Our Memory',
      caption: m.caption,
      subnote: m.shortDescription,
      date: m.date,
      location: m.location,
      tag: m.tag,
    }));
    openGallery(galleryItems, index);
  };

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-6 sm:py-10 max-w-4xl mx-auto z-20">
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-2 px-3.5 py-1 rounded-full glass-blush text-[#85283f] text-xs tracking-widest uppercase font-editorial font-semibold mb-4"
      >
        <Camera className="w-3.5 h-3.5 text-[#85283f]" />
        <span>Fragments of Us</span>
      </motion.div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center space-y-1.5 sm:space-y-2 mb-4 sm:mb-5"
      >
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#2e1f24] tracking-tight">
          The Moments That Define Us
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#6f535b]">
          "Every video call, every laugh across screens felt like home."
        </p>
        <div className="flex items-center justify-center space-x-2 text-xs text-[#957880] pt-0.5">
          <Sparkles className="w-3 h-3 text-[#c49954]" />
          <span>Swipe or tap arrows • Tap photo or "View" to see uncropped full picture</span>
        </div>
      </motion.div>

      {/* Carousel Container with Touch Drag Swipe */}
      <div className="relative w-full flex items-center justify-center py-2 sm:py-4">
        {/* Left Arrow Control */}
        <button
          onClick={handlePrev}
          className="absolute left-0 sm:left-4 z-30 p-2 sm:p-2.5 rounded-full glass-blush text-[#85283f] hover:bg-[#fffdfa] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be6f7f]"
          aria-label="Previous memory"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Swipeable Active Polaroid Card */}
        <div className="w-full max-w-sm flex justify-center px-1 xs:px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMemory.id}
              drag={prefersReducedMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={handleDragEnd}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, rotate: activeMemory.rotation || -1 }
              }
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.96,
                      rotate: -(activeMemory.rotation || -1),
                      transition: { duration: 0.25, ease: 'easeIn' },
                    }
              }
              className="cursor-grab active:cursor-grabbing select-none"
            >
              <PolaroidCard
                caption={activeMemory.caption}
                date={activeMemory.date}
                location={activeMemory.location}
                shortDescription={activeMemory.shortDescription}
                imageUrl={customPhotos[activeMemory.id] || activeMemory.imagePath}
                tag={activeMemory.tag}
                isActive={true}
                onExpand={() => handleOpenLightbox(currentIndex)}
                onPhotoUpload={(dataUrl) => handlePhotoUpload(activeMemory.id, dataUrl)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Control */}
        <button
          onClick={handleNext}
          className="absolute right-0 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full glass-blush text-[#85283f] hover:bg-[#fffdfa] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be6f7f]"
          aria-label="Next memory"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Memory Staggered Pagination Dots */}
      <div className="mt-4 flex items-center space-x-2">
        {memories.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => {
              soundManager.playPageTurnSound();
              setCurrentIndex(idx);
            }}
            className="p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be6f7f] rounded-full"
            aria-label={`Jump to memory ${idx + 1}`}
          >
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 bg-[#85283f]'
                  : 'w-2 bg-[#d8b8ad] hover:bg-[#be6f7f]'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Bottom sentiment badge with Full View shortcut */}
      <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center space-x-1.5 text-xs text-[#6f535b] font-editorial bg-[#fffdfa]/80 px-3.5 py-1 rounded-full border border-[#ecd9b5]/60 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-[#85283f] fill-[#be6f7f]/30" />
          <span>Memory {currentIndex + 1} of {memories.length}: {activeMemory.tag || `Memory ${currentIndex + 1}`}</span>
        </div>

        <button
          type="button"
          onClick={() => handleOpenLightbox(currentIndex)}
          className="flex items-center space-x-1 text-xs text-[#85283f] font-editorial font-medium bg-[#fffdfa] hover:bg-white px-3 py-1 rounded-full border border-[#ecd9b5] shadow-xs transition-colors"
        >
          <Maximize2 className="w-3 h-3" />
          <span>View Uncropped Photo</span>
        </button>
      </div>
    </section>
  );
};
