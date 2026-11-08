import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Maximize2, UserCheck } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';
import { useLightbox } from '../context/LightboxContext';

export const PersonalApologySection: React.FC = () => {
  const { apologyPhoto, senderName, petNameForHer } = websiteConfig;
  const { openPhoto } = useLightbox();

  const handleExpandPhoto = () => {
    openPhoto({
      src: apologyPhoto.imagePath,
      title: apologyPhoto.heading,
      caption: apologyPhoto.caption,
      tag: apologyPhoto.badge,
      subnote: `${apologyPhoto.diwaliWish} • ${apologyPhoto.loveMessage}`,
    });
  };

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-6 sm:py-10 max-w-2xl mx-auto z-20 text-center">
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-2 px-3.5 py-1 rounded-full glass-blush text-[#85283f] text-xs tracking-widest uppercase font-editorial font-semibold mb-4 sm:mb-5"
      >
        <UserCheck className="w-3.5 h-3.5 text-[#85283f]" />
        <span>A Moment Of Truth</span>
      </motion.div>

      {/* Main Editorial Heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="space-y-2 sm:space-y-3 mb-6 sm:mb-8"
      >
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#2e1f24] tracking-tight">
          {apologyPhoto.heading}
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#6f535b] max-w-lg mx-auto">
          "{apologyPhoto.subtitle}"
        </p>
      </motion.div>

      {/* Central Apology Photograph Card (Emotional Focal Point) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto mb-6"
      >
        <div
          onClick={handleExpandPhoto}
          role="button"
          tabIndex={0}
          aria-label="Click to view full uncropped photograph of bettu saying sorry by holding ears"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleExpandPhoto();
            }
          }}
          className="group relative cursor-pointer select-none rounded-2xl bg-[#fffdfa] p-3.5 sm:p-4 shadow-[0_16px_45px_-8px_rgba(70,35,45,0.14)] border border-[#ecd9b5] transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f]"
        >
          {/* Decorative Washi Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#e8cec5]/85 border-x border-[#d8b8ad]/60 rotate-1 backdrop-blur-sm shadow-sm z-30" />

          {/* Photo Frame Container with Controlled Aspect Ratio & Ambient Blur Fill */}
          <div className="relative w-full aspect-[4/3] bg-[#29171d] rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Ambient Background Fill */}
            <img
              src={apologyPhoto.imagePath}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-30 pointer-events-none"
              aria-hidden="true"
            />

            {/* Crisp Foreground Photograph - Preserving Faces Without Harsh Cropping */}
            <img
              src={apologyPhoto.imagePath}
              alt="bettu holding ears saying sorry"
              className="relative z-10 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />

            {/* Soft Romantic Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none z-20" />

            {/* Tag Badge */}
            <div className="absolute top-2.5 right-2.5 z-30 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#85283f]/90 text-white backdrop-blur-md flex items-center space-x-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#c49954]" />
              <span>{apologyPhoto.badge}</span>
            </div>

            {/* Tap to expand overlay */}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5 text-white text-xs font-editorial font-medium z-30">
              <Maximize2 className="w-4 h-4 text-[#c49954]" />
              <span>Tap to view complete photo</span>
            </div>
          </div>

          {/* Sincere Calligraphic Caption */}
          <div className="pt-3 px-1 text-center space-y-1">
            <div className="flex items-center justify-center space-x-1.5 text-[#85283f] text-xs font-editorial font-semibold">
              <Heart className="w-3.5 h-3.5 fill-[#be6f7f] text-[#be6f7f]" />
              <span>Holding Ears For My {petNameForHer}</span>
            </div>

            <p className="font-script text-xl sm:text-2xl text-[#2e1f24] font-medium leading-snug">
              "{apologyPhoto.caption}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* Sincere Supporting Message Stationery Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.32 }}
        className="w-full p-5 sm:p-7 paper-card text-center mb-5 shadow-sm border-l-4 border-l-[#85283f]"
      >
        <p className="font-editorial text-base sm:text-lg text-[#2e1f24] leading-relaxed italic">
          "{apologyPhoto.supportingMessage}"
        </p>

        {/* Festive Diwali Wish & I Love You Devotion */}
        <div className="mt-4 pt-3.5 border-t border-[#f0dfd2] space-y-1">
          <div className="flex items-center justify-center space-x-1.5 text-xs text-[#85283f] font-editorial font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
            <span>{apologyPhoto.diwaliWish}</span>
          </div>
          <p className="font-script text-2xl text-[#2e1f24] font-bold">
            "{apologyPhoto.loveMessage}"
          </p>
          <p className="font-editorial text-[11px] uppercase tracking-wider text-[#957880] pt-1">
            From {senderName} with all my heart
          </p>
        </div>
      </motion.div>

      {/* Gentle Unpressured Reassurance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.42 }}
        className="text-xs text-[#6f535b] font-editorial italic bg-[#fffdfa]/70 px-4 py-1.5 rounded-full border border-[#ecd9b5]/50 shadow-xs"
      >
        <span>No expectations, no pressure. Only honest remorse and everlasting love.</span>
      </motion.div>
    </section>
  );
};
