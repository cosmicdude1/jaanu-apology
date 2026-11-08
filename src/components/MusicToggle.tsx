import React from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
  trackTitle?: string;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({
  isPlaying,
  onToggle,
  trackTitle = 'Ambient Romantic Melody',
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onToggle}
      className="glass-blush px-2.5 sm:px-3 py-1.5 rounded-full flex items-center space-x-1.5 sm:space-x-2 text-[#2e1f24] hover:border-[#be6f7f]/40 shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be6f7f]"
      aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
      title={trackTitle}
    >
      <span className="relative flex items-center justify-center">
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#85283f]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#957880]" />
        )}
      </span>

      {/* Animated Sound Wave Bars when playing */}
      <div className="flex items-center space-x-0.5 h-3 px-0.5" aria-hidden="true">
        {[0.6, 1.2, 0.8, 1.4].map((scale, i) => (
          <motion.div
            key={i}
            animate={
              isPlaying
                ? {
                    height: ['2px', `${10 * scale}px`, '2px'],
                  }
                : { height: '2px' }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.8 + i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : undefined
            }
            className={`w-0.5 rounded-full ${
              isPlaying ? 'bg-[#85283f]' : 'bg-[#c4a9b0]'
            }`}
          />
        ))}
      </div>

      <span className="hidden md:inline font-editorial text-xs tracking-wider text-[#6f535b] font-medium">
        {isPlaying ? 'Music On' : 'Music Off'}
      </span>
    </motion.button>
  );
};
