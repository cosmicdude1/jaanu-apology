import React from 'react';
import { motion } from 'motion/react';
import { SceneMeta } from '../content/letterContent';
import { soundManager } from '../utils/audio';

interface ProgressIndicatorProps {
  currentStep: number;
  scenes: SceneMeta[];
  onSelectStep: (step: number) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  scenes,
  onSelectStep,
}) => {
  const handleClick = (idx: number) => {
    soundManager.playPageTurnSound();
    onSelectStep(idx);
  };

  return (
    <nav
      aria-label="Story Progress"
      className="px-2 sm:px-3 py-1 rounded-full glass-blush shadow-xs flex items-center space-x-1 sm:space-x-1.5"
    >
      {scenes.map((scene, idx) => {
        const isCurrent = idx === currentStep;
        const isPast = idx < currentStep;

        return (
          <button
            key={scene.id}
            onClick={() => handleClick(idx)}
            className="group relative flex items-center p-0.5 sm:p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#be6f7f] rounded-full"
            aria-label={`Go to ${scene.navTitle} scene`}
            aria-current={isCurrent ? 'step' : undefined}
          >
            {/* Step Node */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{
                  scale: isCurrent ? 1.25 : 1,
                  backgroundColor: isCurrent
                    ? '#85283f'
                    : isPast
                    ? '#be6f7f'
                    : 'rgba(111, 83, 91, 0.25)',
                }}
                transition={{ duration: 0.3 }}
                className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full"
              />

              {isCurrent && (
                <motion.div
                  layoutId="activeIndicatorGlow"
                  className="absolute -inset-1 rounded-full ring-2 ring-[#85283f]/40"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </div>

            {/* Accessible Hover Tooltip */}
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] tracking-wider uppercase font-editorial whitespace-nowrap bg-[#fffdfa] px-2.5 py-0.5 rounded-md text-[#2e1f24] border border-[#d8b8ad] shadow-md z-50">
              {scene.navTitle}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
