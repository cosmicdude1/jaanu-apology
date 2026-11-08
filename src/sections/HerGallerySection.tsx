import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Maximize2, Camera } from 'lucide-react';
import { websiteConfig, HerPhotoItem } from '../content/letterContent';
import { useLightbox } from '../context/LightboxContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const HerGallerySection: React.FC = () => {
  const { herGallery, girlfriendName } = websiteConfig;
  const { openGallery } = useLightbox();
  const prefersReducedMotion = useReducedMotion();

  const handleOpenPhoto = (index: number) => {
    const galleryItems = herGallery.photos.map((item) => ({
      src: item.imagePath,
      title: item.title,
      caption: item.caption,
      subnote: item.note,
      date: item.date,
      tag: item.tag,
    }));
    openGallery(galleryItems, index);
  };

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-6 sm:py-10 max-w-4xl mx-auto z-20 text-center">
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-2 px-3.5 py-1 rounded-full glass-blush text-[#85283f] text-xs tracking-widest uppercase font-editorial font-semibold mb-4 sm:mb-5"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
        <span>Portraits Of Grace</span>
      </motion.div>

      {/* Main Editorial Heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="space-y-2 sm:space-y-3 mb-6 sm:mb-8"
      >
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#2e1f24] tracking-tight">
          {herGallery.headline}
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#6f535b] max-w-xl mx-auto">
          "{herGallery.subtitle}"
        </p>
        <p className="font-editorial text-xs text-[#957880] max-w-md mx-auto pt-1">
          {herGallery.intro}
        </p>
      </motion.div>

      {/* Gallery Cards Grid - Beautiful Natural Presentation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-3xl mb-6">
        {herGallery.photos.map((photo: HerPhotoItem, idx: number) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.7,
              delay: prefersReducedMotion ? 0 : 0.2 + idx * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="flex justify-center"
          >
            <div
              onClick={() => handleOpenPhoto(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View complete photograph of ${girlfriendName}: ${photo.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenPhoto(idx);
                }
              }}
              className="group relative cursor-pointer select-none w-full max-w-sm rounded-2xl bg-[#fffdfa] p-3 sm:p-4 shadow-[0_14px_36px_-6px_rgba(70,35,45,0.1)] border border-[#ecd9b5] transition-shadow duration-300 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f]"
            >
              {/* Decorative Washi Tape Accent */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#e8cec5]/85 border-x border-[#d8b8ad]/60 ${
                  idx % 2 === 0 ? '-rotate-1' : 'rotate-2'
                } backdrop-blur-sm shadow-sm z-30`}
              />

              {/* Photo Frame Window (Maintains Aspect Ratio without Harsh Cropping) */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#24131b] shadow-inner flex items-center justify-center">
                {/* Soft ambient background fill */}
                <img
                  src={photo.imagePath}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-30 pointer-events-none"
                  aria-hidden="true"
                />

                {/* The Unaltered Crisp Natural Photograph */}
                <img
                  src={photo.imagePath}
                  alt={photo.title}
                  className="relative z-10 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gentle Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none z-20" />

                {/* Tag Badge */}
                {photo.tag && (
                  <span className="absolute top-2.5 right-2.5 z-30 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#85283f]/90 text-white backdrop-blur-md shadow-xs">
                    {photo.tag}
                  </span>
                )}

                {/* Tap to expand overlay */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5 text-white text-xs font-editorial font-medium z-30">
                  <Maximize2 className="w-4 h-4 text-[#c49954]" />
                  <span>Tap to see complete photo</span>
                </div>
              </div>

              {/* Card Calligraphic Caption */}
              <div className="pt-3 px-1 text-left space-y-1">
                <div className="flex items-center justify-between text-[11px] text-[#957880] font-mono border-b border-[#f0dfd2] pb-1.5">
                  <span className="flex items-center space-x-1 text-[#85283f] font-editorial font-semibold">
                    <Heart className="w-3 h-3 fill-[#be6f7f] text-[#be6f7f]" />
                    <span>{photo.title}</span>
                  </span>
                  {photo.date && <span>{photo.date}</span>}
                </div>

                <p className="font-script text-xl sm:text-2xl text-[#2e1f24] font-medium leading-snug pt-1">
                  "{photo.caption}"
                </p>

                {photo.note && (
                  <p className="font-editorial text-xs italic text-[#6f535b] pt-0.5 line-clamp-2">
                    {photo.note}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gentle Hint for Viewing Full Images */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center space-x-1.5 text-xs text-[#6f535b] font-editorial bg-[#fffdfa]/80 px-4 py-1.5 rounded-full border border-[#ecd9b5]/60 shadow-xs"
      >
        <Camera className="w-3.5 h-3.5 text-[#85283f]" />
        <span>Tap any portrait to admire the full, uncropped photograph</span>
      </motion.div>
    </section>
  );
};
