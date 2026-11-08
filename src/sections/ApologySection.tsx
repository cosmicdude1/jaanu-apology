import React from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, ShieldAlert, Heart, Sparkles, Maximize2 } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';
import { useLightbox } from '../context/LightboxContext';

export const ApologySection: React.FC = () => {
  const { apology, meSorryPhoto, meSorryDetails, senderName, petNameForHer } = websiteConfig;
  const { openPhoto } = useLightbox();

  const handleExpandSorryPhoto = () => {
    openPhoto({
      src: meSorryPhoto,
      title: `${meSorryDetails.headline}`,
      caption: meSorryDetails.caption,
      tag: 'Holding Ears Sorry',
      subnote: `${meSorryDetails.diwaliWish} • ${meSorryDetails.loveNote}`,
    });
  };

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-6 sm:py-10 max-w-3xl mx-auto z-20">
      {/* Subtle Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center space-x-2 px-3.5 py-1 rounded-full glass-blush text-[#85283f] text-xs tracking-widest uppercase font-editorial font-semibold mb-4"
      >
        <HeartHandshake className="w-3.5 h-3.5 text-[#85283f]" />
        <span>Holding Myself Accountable</span>
      </motion.div>

      {/* Main Apology Heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
        className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8"
      >
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#2e1f24] tracking-tight">
          {apology.headline}
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#6f535b] max-w-xl mx-auto">
          "{apology.subtitle}"
        </p>
      </motion.div>

      {/* Real Photograph: bettu Holding Ears Saying Sorry */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
        className="w-full max-w-md mx-auto mb-6"
      >
        <div
          onClick={handleExpandSorryPhoto}
          tabIndex={0}
          role="button"
          aria-label="View complete photograph of bettu saying sorry by holding ears"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleExpandSorryPhoto();
            }
          }}
          className="group relative cursor-pointer select-none rounded-2xl bg-[#fffdfa] p-3.5 sm:p-4 shadow-[0_14px_38px_-6px_rgba(70,35,45,0.12)] border border-[#ecd9b5] transition-all duration-300 hover:shadow-2xl hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f]"
        >
          {/* Washi tape decor */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#e8cec5]/85 border-x border-[#d8b8ad]/60 rotate-1 backdrop-blur-sm shadow-sm z-30" />

          {/* Photo Frame Window */}
          <div className="relative w-full aspect-[4/3] bg-[#29171d] rounded-xl overflow-hidden shadow-inner">
            <img
              src={meSorryPhoto}
              alt="bettu saying sorry holding ears"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

            {/* Tag Badge */}
            <div className="absolute top-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#85283f]/90 text-white backdrop-blur-md flex items-center space-x-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#c49954]" />
              <span>Holding Ears For Jaanu</span>
            </div>

            {/* Tap to expand overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5 text-white text-xs font-editorial font-medium">
              <Maximize2 className="w-4 h-4 text-[#c49954]" />
              <span>Tap to see complete photo</span>
            </div>
          </div>

          {/* Sincere Personal Note & Diwali Blessing on the Card */}
          <div className="pt-3 px-1 text-center space-y-1.5">
            <div className="flex items-center justify-center space-x-2 text-[#85283f] text-xs font-editorial font-semibold">
              <Heart className="w-3.5 h-3.5 fill-[#be6f7f] text-[#be6f7f]" />
              <span>From {senderName} to {petNameForHer}</span>
            </div>

            <p className="font-script text-2xl text-[#2e1f24] leading-snug font-semibold">
              "{meSorryDetails.headline}"
            </p>

            <p className="font-editorial text-xs sm:text-sm text-[#4a353c] leading-relaxed italic">
              {meSorryDetails.caption}
            </p>

            {/* Diwali Wish & I Love You Message Banner */}
            <div className="mt-2.5 pt-2 border-t border-[#f0dfd2] flex flex-col items-center space-y-1 text-xs font-editorial">
              <span className="text-[#85283f] font-semibold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
                <span>{meSorryDetails.diwaliWish}</span>
              </span>
              <span className="font-script text-lg text-[#2e1f24] font-medium">
                "{meSorryDetails.loveNote}"
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sincere Core Statement Banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
        className="w-full p-6 sm:p-8 paper-card text-center mb-6 border-l-4 border-l-[#85283f] shadow-sm"
      >
        <p className="font-editorial text-base sm:text-lg text-[#2e1f24] leading-relaxed italic">
          "{apology.text}"
        </p>
      </motion.div>

      {/* Personal Reflection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
        {apology.reflections.map((ref, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 + idx * 0.1, ease: 'easeOut' }}
            className="p-5 sm:p-6 paper-card space-y-2.5 text-left shadow-sm"
          >
            <div className="w-9 h-9 rounded-full bg-[#fbf5f2] flex items-center justify-center border border-[#d8b8ad]">
              {idx === 0 ? (
                <ShieldAlert className="w-4 h-4 text-[#85283f]" />
              ) : (
                <Heart className="w-4 h-4 text-[#85283f]" />
              )}
            </div>
            <h3 className="font-editorial text-lg font-bold text-[#2e1f24]">
              {ref.title}
            </h3>
            <p className="font-editorial text-xs sm:text-sm text-[#4a353c] leading-relaxed">
              {ref.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
