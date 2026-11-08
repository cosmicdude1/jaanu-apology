import React from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, ShieldAlert, Heart } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';

export const ApologySection: React.FC = () => {
  const { apology } = websiteConfig;

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

      {/* Sincere Core Statement Banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22, ease: 'easeOut' }}
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
            transition={{ duration: 0.6, delay: 0.32 + idx * 0.1, ease: 'easeOut' }}
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
