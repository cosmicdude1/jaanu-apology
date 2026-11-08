import React from 'react';
import { motion } from 'motion/react';
import { Feather, Heart } from 'lucide-react';
import { websiteConfig } from '../content/letterContent';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const LetterSection: React.FC = () => {
  const { letter } = websiteConfig;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-6 sm:py-10 max-w-3xl mx-auto z-20">
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-2 px-3.5 py-1 rounded-full glass-blush text-[#85283f] text-xs tracking-widest uppercase font-editorial font-semibold mb-4 sm:mb-6"
      >
        <Feather className="w-3.5 h-3.5 text-[#85283f]" />
        <span>Written by Hand & Soul</span>
      </motion.div>

      {/* The Warm Ivory Stationery Paper Letter */}
      <motion.article
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 18, scale: 0.985 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0.2 : 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full bg-[#fffdfa] text-[#2e1f24] rounded-2xl shadow-[0_12px_45px_-8px_rgba(70,35,45,0.08)] border border-[#ecd9b5] p-6 sm:p-12 md:p-16 select-text overflow-hidden"
      >
        {/* Subtle Decorative Paper Corner Gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#f7ede8] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#f7ede8] to-transparent pointer-events-none" />

        {/* Date and Salutation Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.12 }}
          className="flex justify-between items-center text-xs sm:text-sm text-[#6f535b] font-editorial italic border-b border-[#f0dfd2] pb-4 mb-6"
        >
          <span>For {websiteConfig.girlfriendName}</span>
          <span>{letter.dateString}</span>
        </motion.div>

        {/* Salutation */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="font-script text-3xl sm:text-4xl text-[#85283f] font-bold mb-4"
        >
          {letter.salutation}
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.26 }}
          className="font-editorial text-base sm:text-lg font-medium text-[#4a353c] italic mb-6 leading-relaxed"
        >
          {letter.intro}
        </motion.p>

        {/* Highly Readable Body Paragraphs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.32 }}
          className="space-y-5 sm:space-y-6 font-editorial text-[#2e1f24] text-base sm:text-lg md:text-[19px] leading-relaxed sm:leading-loose border-l-2 border-[#ecd9b5]/60 pl-3.5 sm:pl-6"
        >
          {letter.paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#85283f] first-letter:float-left first-letter:mr-2.5 first-letter:leading-none'
                  : ''
              }
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Closing & Handwritten Signature */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.42 }}
          className="mt-8 pt-6 border-t border-[#f0dfd2] flex flex-col items-end"
        >
          <p className="font-editorial text-sm italic text-[#6f535b]">
            {letter.closing}
          </p>
          <p className="font-script text-3xl sm:text-4xl text-[#2e1f24] font-bold mt-1">
            {websiteConfig.senderName}
          </p>
          <div className="flex items-center space-x-1.5 mt-2 text-[#85283f]">
            <Heart className="w-4 h-4 fill-[#85283f]" />
            <span className="text-[11px] uppercase font-editorial tracking-wider font-semibold">
              Forever Devoted
            </span>
          </div>
        </motion.div>

        {/* Tender Postscript */}
        {letter.postscript && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.5 }}
            className="mt-8 pt-4 border-t border-dashed border-[#ecd9b5]"
          >
            <p className="font-script text-xl sm:text-2xl text-[#6f535b]">
              {letter.postscript}
            </p>
          </motion.div>
        )}
      </motion.article>
    </section>
  );
};
