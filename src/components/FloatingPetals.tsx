import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ParticleConfig {
  id: number;
  type: 'petal' | 'heart';
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  swayAmount: number; // px
  rotateStart: number;
  rotateEnd: number;
  opacity: number;
}

interface FloatingPetalsProps {
  petalCount?: number;
  heartCount?: number;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  petalCount = 14,
  heartCount = 6,
}) => {
  const prefersReduced = useReducedMotion();

  // Generate deterministic particles for calm, serene visual rhythm
  const particles = useMemo<ParticleConfig[]>(() => {
    const list: ParticleConfig[] = [];

    // Rose Petals
    for (let i = 0; i < petalCount; i++) {
      list.push({
        id: i,
        type: 'petal',
        left: Math.round(((i * 19 + 7) % 94) + 3), // Well distributed between 3% and 97%
        size: 16 + (i % 4) * 4, // 16px to 28px
        duration: 16 + (i % 5) * 3, // 16s to 28s: soft, slow drift
        delay: (i * 1.3) % 10,
        swayAmount: 20 + (i % 3) * 15, // 20px to 50px
        rotateStart: (i * 45) % 360,
        rotateEnd: (i * 45 + 180) % 540,
        opacity: 0.45 + (i % 4) * 0.12, // 0.45 to 0.81
      });
    }

    // Small Heart Particles
    for (let j = 0; j < heartCount; j++) {
      list.push({
        id: petalCount + j,
        type: 'heart',
        left: Math.round(((j * 23 + 13) % 90) + 5),
        size: 10 + (j % 3) * 3, // 10px to 16px: delicate and small
        duration: 18 + (j % 4) * 3,
        delay: 2 + (j * 1.8) % 9,
        swayAmount: 15 + (j % 2) * 12,
        rotateStart: -15 + (j % 3) * 15,
        rotateEnd: 15 - (j % 3) * 15,
        opacity: 0.35 + (j % 3) * 0.15,
      });
    }

    return list;
  }, [petalCount, heartCount]);

  if (prefersReduced) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: -40,
            x: 0,
            rotate: p.rotateStart,
            opacity: 0,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.swayAmount, -p.swayAmount * 0.6, p.swayAmount * 0.4, 0],
            rotate: [p.rotateStart, p.rotateEnd],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.type === 'petal' ? p.size * 1.3 : p.size}px`,
          }}
        >
          {p.type === 'petal' ? (
            /* Delicate Watercolor Rose Petal */
            <svg
              viewBox="0 0 30 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_2px_6px_rgba(190,111,127,0.2)]"
            >
              <path
                d="M15 2C8 6 3 13 3 22C3 30 8 36 15 36C22 36 27 30 27 22C27 13 22 6 15 2Z"
                fill="url(#blushPetalGrad)"
              />
              <path
                d="M15 5C11 11 8 17 9 24C10 29 12 33 15 34"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="blushPetalGrad"
                  x1="5"
                  y1="2"
                  x2="25"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#e8a8b5" stopOpacity="0.85" />
                  <stop offset="0.55" stopColor="#c47b89" stopOpacity="0.80" />
                  <stop offset="1" stopColor="#9e3c54" stopOpacity="0.75" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            /* Delicate Heart Particle */
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(190,111,127,0.25)]"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="url(#blushHeartGrad)"
              />
              <defs>
                <linearGradient
                  id="blushHeartGrad"
                  x1="4"
                  y1="3"
                  x2="20"
                  y2="21"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#eebec7" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#c47b89" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};
