import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { soundManager } from '../utils/audio';

interface DiyaIllustrationProps {
  isLit?: boolean;
  onTap?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface GoldenSpark {
  id: number;
  x: number;
  y: number;
  scale: number;
  duration: number;
}

export const DiyaIllustration: React.FC<DiyaIllustrationProps> = ({
  isLit = true,
  onTap,
  className = '',
  size = 'md',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [tapPulses, setTapPulses] = useState(0);
  const [sparks, setSparks] = useState<GoldenSpark[]>([]);

  const dimensions = {
    sm: { width: 140, height: 110, flameScale: 0.8 },
    md: { width: 190, height: 150, flameScale: 1.0 },
    lg: { width: 240, height: 190, flameScale: 1.2 },
  }[size];

  const handleDiyaClick = () => {
    soundManager.playChimeSound(784); // G5 warm resonant chime
    setTapPulses((prev) => prev + 1);

    if (onTap) {
      onTap();
    }

    if (!prefersReducedMotion) {
      const newSparks: GoldenSpark[] = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: (i - 2) * 16 + (Math.random() * 8 - 4),
        y: -40 - Math.random() * 30,
        scale: 0.5 + Math.random() * 0.4,
        duration: 1.2 + Math.random() * 0.4,
      }));
      setSparks(newSparks);
      setTimeout(() => setSparks([]), 1400);
    }
  };

  return (
    <div
      onClick={handleDiyaClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive glowing Diwali diya. Tap to brighten the flame."
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleDiyaClick();
        }
      }}
      className={`relative flex flex-col items-center justify-center cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c49954] rounded-full p-2 transition-transform duration-300 hover:scale-[1.03] ${className}`}
    >
      {/* Floating Golden Sparks on Click */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 1, x: 0, y: -10, scale: 0.3 }}
            animate={{
              opacity: 0,
              x: spark.x,
              y: spark.y,
              scale: spark.scale,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: spark.duration, ease: 'easeOut' }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-30"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#f59e0b] via-[#fbbf24] to-[#fffdf0] shadow-[0_0_10px_#fbbf24]" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer Diffuse Golden Candlelight Aura Glow */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 0.65 }
            : {
                scale: [1, 1.14, 0.98, 1.12, 1],
                opacity: [0.55, 0.85, 0.6, 0.8, 0.55],
              }
        }
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-6 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.38)_0%,rgba(217,119,6,0.18)_40%,transparent_70%)] pointer-events-none filter blur-sm"
      />

      {/* SVG Crafted Diya */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible drop-shadow-[0_8px_20px_rgba(140,56,35,0.18)]"
      >
        <defs>
          {/* Terracotta Diya Clay Gradient */}
          <linearGradient id="terracottaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c85a38" />
            <stop offset="50%" stopColor="#963b20" />
            <stop offset="100%" stopColor="#631e0f" />
          </linearGradient>

          {/* Diya Inner Oil Reservoir */}
          <linearGradient id="oilGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7a2a16" />
            <stop offset="50%" stopColor="#b34a2c" />
            <stop offset="100%" stopColor="#692010" />
          </linearGradient>

          {/* Outer Flame Gradient */}
          <linearGradient id="outerFlame" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>

          {/* Inner Flame Core Gradient */}
          <linearGradient id="innerFlame" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="60%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Gold Rim Gradient */}
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b8860b" />
            <stop offset="50%" stopColor="#f3c053" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>

          {/* Marigold Petal Gradient */}
          <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Subtle Marigold Petals Base Decor */}
        <g opacity="0.85">
          <ellipse cx="62" cy="142" rx="14" ry="6" transform="rotate(-18 62 142)" fill="url(#marigoldGrad)" />
          <ellipse cx="80" cy="148" rx="15" ry="6" transform="rotate(-6 80 148)" fill="#eab308" />
          <ellipse cx="100" cy="150" rx="16" ry="6" fill="url(#marigoldGrad)" />
          <ellipse cx="120" cy="148" rx="15" ry="6" transform="rotate(6 120 148)" fill="#eab308" />
          <ellipse cx="138" cy="142" rx="14" ry="6" transform="rotate(18 138 142)" fill="url(#marigoldGrad)" />
        </g>

        {/* Terracotta Diya Clay Stand & Base */}
        <ellipse cx="100" cy="142" rx="34" ry="8" fill="#52170b" opacity="0.6" />
        <path
          d="M72 136 C72 142, 128 142, 128 136 L124 130 L76 130 Z"
          fill="url(#terracottaGradient)"
        />

        {/* Sculpted Diya Clay Body Bowl */}
        <path
          d="M36 94 C36 136, 164 136, 164 94 C164 88, 140 84, 100 84 C60 84, 36 88, 36 94 Z"
          fill="url(#terracottaGradient)"
          stroke="#e0825f"
          strokeWidth="0.8"
        />

        {/* Inside Oil Reservoir Depth */}
        <ellipse cx="100" cy="94" rx="60" ry="14" fill="url(#oilGradient)" />

        {/* Decorative Gold Embossed Rim & Subtle Dots */}
        <ellipse cx="100" cy="94" rx="62" ry="14.5" fill="none" stroke="url(#goldRim)" strokeWidth="1.8" />
        <circle cx="68" cy="95" r="1.5" fill="#f3c053" />
        <circle cx="84" cy="98" r="1.5" fill="#f3c053" />
        <circle cx="100" cy="99" r="1.8" fill="#fef08a" />
        <circle cx="116" cy="98" r="1.5" fill="#f3c053" />
        <circle cx="132" cy="95" r="1.5" fill="#f3c053" />

        {/* Cotton Wick (Baati) */}
        <path
          d="M98 94 C99 84, 100 76, 101 70"
          stroke="#26130b"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Animated Natural Flame */}
        {isLit && (
          <g key={tapPulses} transform="translate(100, 70)">
            {/* Flame Halo Pulsing Layer */}
            <motion.ellipse
              cx="0"
              cy="-24"
              rx="18"
              ry="26"
              fill="url(#outerFlame)"
              opacity="0.35"
              filter="blur(4px)"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: [1, 1.15, 0.95, 1.08, 1],
                      opacity: [0.3, 0.45, 0.35, 0.4, 0.3],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Outer Teardrop Candle Flame with Natural Flicker */}
            <motion.path
              d="M0 0 C-14 -12, -18 -32, 0 -54 C18 -32, 14 -12, 0 0 Z"
              fill="url(#outerFlame)"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scaleY: [1, 1.06, 0.96, 1.04, 1],
                      scaleX: [1, 0.95, 1.04, 0.97, 1],
                      rotate: [-1.2, 1.4, -0.6, 0.8, -1.2],
                    }
              }
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: 'bottom center' }}
            />

            {/* Inner Bright Luminous Golden Core */}
            <motion.path
              d="M0 -3 C-7 -12, -9 -24, 0 -40 C9 -24, 7 -12, 0 -3 Z"
              fill="url(#innerFlame)"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scaleY: [1, 1.05, 0.97, 1.03, 1],
                      scaleX: [1, 0.96, 1.03, 0.98, 1],
                      rotate: [1, -1, 0.5, -0.5, 1],
                    }
              }
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: 'bottom center' }}
            />

            {/* Radiant Tiny Flame Spark Center */}
            <circle cx="0" cy="-20" r="3.2" fill="#ffffff" opacity="0.9" filter="blur(0.5px)" />
          </g>
        )}
      </svg>

      {/* Tap prompt */}
      <motion.p
        animate={{ opacity: [0.65, 0.95, 0.65] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-1 text-[11px] font-editorial tracking-wider uppercase text-[#85283f] flex items-center space-x-1 font-medium"
      >
        <Sparkles className="w-3 h-3 text-[#c49954]" />
        <span>Tap diya to brighten the light</span>
      </motion.p>
    </div>
  );
};
