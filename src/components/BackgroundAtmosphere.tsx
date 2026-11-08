import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SceneId } from '../content/letterContent';

interface BackgroundAtmosphereProps {
  currentScene?: SceneId;
}

export const BackgroundAtmosphere: React.FC<BackgroundAtmosphereProps> = ({ currentScene }) => {
  const prefersReduced = useReducedMotion();

  // Subtle tonal adjustments for emotional storytelling scenes
  const getSceneTones = () => {
    switch (currentScene) {
      case 'apology':
      case 'personal-apology':
        return {
          orb1: 'rgba(238, 203, 198, 0.45)', // gentle reflective rose
          orb2: 'rgba(245, 222, 215, 0.35)',
          orb3: 'rgba(230, 195, 190, 0.30)',
        };
      case 'diwali':
        return {
          orb1: 'rgba(251, 191, 36, 0.40)', // warm festive golden candle glow
          orb2: 'rgba(245, 218, 208, 0.50)',
          orb3: 'rgba(224, 138, 60, 0.30)', // subtle marigold warmth
        };
      case 'letter':
      case 'envelope':
        return {
          orb1: 'rgba(255, 243, 230, 0.65)', // warm candlelit stationery glow
          orb2: 'rgba(245, 218, 208, 0.45)',
          orb3: 'rgba(250, 232, 215, 0.40)',
        };
      case 'ending':
        return {
          orb1: 'rgba(244, 204, 214, 0.55)', // blooming tender rose
          orb2: 'rgba(255, 238, 230, 0.50)',
          orb3: 'rgba(240, 198, 208, 0.40)',
        };
      case 'patakha-finale':
        return {
          orb1: 'rgba(126, 34, 206, 0.45)', // midnight royal purple
          orb2: 'rgba(251, 191, 36, 0.50)', // radiant champagne gold
          orb3: 'rgba(225, 29, 72, 0.35)',  // romantic deep rose
        };
      default:
        return {
          orb1: 'rgba(245, 216, 210, 0.45)',
          orb2: 'rgba(255, 240, 230, 0.40)',
          orb3: 'rgba(240, 205, 200, 0.35)',
        };
    }
  };

  const tones = getSceneTones();

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Warm Blush Pink Base Canvas */}
      <div className="absolute inset-0 bg-[#fbf5f2]" />

      {/* Soft Vignette Frame */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(190,111,127,0.06)_100%)]" />

      {/* Atmospheric Diffuse Light Pool 1 - Top Left */}
      <motion.div
        animate={
          prefersReduced
            ? undefined
            : {
                x: [0, 20, 0],
                y: [0, -15, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          backgroundColor: tones.orb1,
        }}
        className="absolute -top-32 -left-32 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full blur-[90px] sm:blur-[120px] transition-colors duration-1000"
      />

      {/* Atmospheric Diffuse Light Pool 2 - Center Right Warm Ivory Sunlight */}
      <motion.div
        animate={
          prefersReduced
            ? undefined
            : {
                x: [0, -25, 0],
                y: [0, 20, 0],
                scale: [1, 1.12, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          backgroundColor: tones.orb2,
        }}
        className="absolute top-1/4 -right-28 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full blur-[100px] sm:blur-[130px] transition-colors duration-1000"
      />

      {/* Atmospheric Diffuse Light Pool 3 - Bottom Warm Blush */}
      <motion.div
        animate={
          prefersReduced
            ? undefined
            : {
                x: [0, 15, 0],
                y: [0, -18, 0],
                scale: [1, 1.06, 1],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        style={{
          backgroundColor: tones.orb3,
        }}
        className="absolute -bottom-36 left-1/3 w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] rounded-full blur-[95px] sm:blur-[120px] transition-colors duration-1000"
      />

      {/* Tactile Paper Fiber & Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 paper-texture pointer-events-none opacity-60 mix-blend-multiply" />
    </div>
  );
};
