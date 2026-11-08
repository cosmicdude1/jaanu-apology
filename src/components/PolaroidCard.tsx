import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Heart, RotateCw, Sparkles, Upload } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PolaroidCardProps {
  caption: string;
  title?: string;
  date?: string;
  location?: string;
  reflection?: string;
  shortDescription?: string;
  tag?: string;
  rotation?: number;
  imageUrl?: string;
  isActive?: boolean;
  onClick?: () => void;
  onPhotoUpload?: (dataUrl: string) => void;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  caption,
  title,
  date,
  location,
  reflection,
  shortDescription,
  tag,
  rotation = 0,
  imageUrl,
  isActive = false,
  onClick,
  onPhotoUpload,
}) => {
  const displayTitle = title || tag || 'Cherished Memory';
  const displayReflection = shortDescription || reflection;
  const [isFlipped, setIsFlipped] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCardClick = () => {
    soundManager.playChimeSound(600);
    if (onClick) {
      onClick();
    }
  };

  const handleFlipToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPageTurnSound();
    setIsFlipped((prev) => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onPhotoUpload) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onPhotoUpload(result);
          soundManager.playChimeSound(659.25);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="relative [perspective:1000px]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload your own photograph for this memory"
      />

      <motion.div
        onClick={handleCardClick}
        whileHover={{ scale: 1.03, rotate: 0, zIndex: 20 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          rotate: isActive ? 0 : rotation,
          scale: isActive ? 1.03 : 1,
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative w-[264px] xs:w-72 sm:w-80 h-[380px] bg-[#fffdfa] text-[#2e1f24] p-4 pb-6 rounded-xl shadow-[0_10px_30px_-5px_rgba(46,31,36,0.08)] border border-[#ecd9b5] cursor-pointer select-none transition-shadow ${
          isActive ? 'ring-2 ring-[#be6f7f]/50 shadow-2xl' : 'hover:shadow-2xl'
        }`}
      >
        {/* Decorative Washi Tape Accent at Top Center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#e8cec5]/80 border-x border-[#d8b8ad]/60 rotate-1 backdrop-blur-sm shadow-sm z-30" />

        {/* ================= FRONT SIDE ================= */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 p-4 pb-5 flex flex-col justify-between"
        >
          {/* Photo Frame Window */}
          <div className="relative w-full aspect-[4/3] bg-gradient-to-tr from-[#3a222a] via-[#4d2f38] to-[#29171d] rounded-sm overflow-hidden mb-2 shadow-inner flex flex-col justify-end p-3.5 group">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={displayTitle}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : null}

            {/* Soft atmospheric gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

            {/* Romantic tag badge */}
            {tag && (
              <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#85283f]/90 text-white backdrop-blur-md">
                {tag}
              </span>
            )}

            {/* Subtle Upload Photo Shortcut on Hover */}
            {onPhotoUpload && (
              <button
                type="button"
                onClick={triggerUpload}
                className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-[#fffdfa]/85 text-[#2e1f24] hover:bg-white shadow-sm flex items-center space-x-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                title="Replace with your own photograph"
              >
                <Upload className="w-3 h-3 text-[#85283f]" />
                <span>Add Photo</span>
              </button>
            )}

            {/* Text inside the polaroid viewport */}
            <div className="relative z-10 space-y-0.5 pointer-events-none">
              <div className="flex items-center space-x-1.5 text-white/95 text-xs font-editorial">
                <Heart className="w-3.5 h-3.5 fill-[#be6f7f] text-[#be6f7f]" />
                <span>{displayTitle}</span>
              </div>

              {location && (
                <div className="flex items-center space-x-1 text-[11px] text-[#f7ede8]">
                  <MapPin className="w-3 h-3 text-[#e6b2bd]" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Handwritten Caption Area */}
          <div className="px-1 space-y-1 flex-1 flex flex-col justify-between">
            <div>
              <p className="font-script text-xl leading-snug text-[#2e1f24] font-semibold line-clamp-2">
                "{caption}"
              </p>

              {displayReflection && (
                <p className="font-editorial text-xs italic text-[#6f535b] line-clamp-2 mt-1">
                  {displayReflection}
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-[#f0dfd2] flex items-center justify-between text-[11px] text-[#6f535b] font-mono">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-[#957880]" />
                <span>{date}</span>
              </span>

              <button
                type="button"
                onClick={handleFlipToggle}
                className="flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] uppercase font-sans font-semibold text-[#85283f] hover:bg-[#fbf5f2] transition-colors"
                title="Flip to read note on back"
              >
                <RotateCw className="w-3 h-3" />
                <span>Flip Note</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE (Handwritten Note) ================= */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 p-5 bg-[#fcf9f2] rounded-xl flex flex-col justify-between text-[#2e1f24] border border-[#ecd9b5]"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#ecd9b5] pb-2">
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#957880]">
                Memory Note #{tag || '01'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#c49954]" />
            </div>

            <h4 className="font-editorial text-lg font-bold text-[#85283f]">
              {displayTitle}
            </h4>

            <p className="font-script text-2xl text-[#2e1f24] leading-relaxed">
              "{displayReflection || caption}"
            </p>
          </div>

          <div className="pt-2 border-t border-[#ecd9b5] flex items-center justify-between">
            <span className="font-editorial text-xs text-[#85283f] italic">
              Locked in my heart
            </span>

            <button
              type="button"
              onClick={handleFlipToggle}
              className="flex items-center space-x-1 text-xs text-[#6f535b] hover:text-[#2e1f24] underline font-sans font-medium"
            >
              <RotateCw className="w-3 h-3" />
              <span>Back to photo</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
