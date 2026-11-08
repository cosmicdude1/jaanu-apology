import React from 'react';
import { motion } from 'motion/react';
import { Mail, Sparkles } from 'lucide-react';
import { Envelope } from '../components/Envelope';
import { websiteConfig } from '../content/letterContent';

interface EnvelopeSectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const EnvelopeSection: React.FC<EnvelopeSectionProps> = ({
  isOpen,
  onToggle,
}) => {
  const { envelope } = websiteConfig;

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-6 sm:py-10 max-w-4xl mx-auto z-20 text-center">
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-2 px-3.5 py-1 rounded-full glass-blush text-[#85283f] text-xs tracking-widest uppercase font-editorial font-semibold mb-5 sm:mb-6"
      >
        <Mail className="w-3.5 h-3.5 text-[#85283f]" />
        <span>A Sealed Keepsake</span>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="space-y-2 sm:space-y-3 mb-6 sm:mb-8"
      >
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#2e1f24] tracking-tight">
          {envelope.headline}
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#6f535b] max-w-xl mx-auto">
          "A quiet truth meant only for you to hold."
        </p>
      </motion.div>

      {/* The Interactive Envelope Component */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.22 }}
        className="my-2 sm:my-4"
      >
        <Envelope
          isOpen={isOpen}
          onToggle={onToggle}
          recipientLabel={envelope.label}
          secretMessage={envelope.message}
          closingNote={envelope.closingNote}
        />
      </motion.div>

      {/* Romantic Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-6 flex items-center justify-center space-x-2 text-xs sm:text-sm text-[#6f535b] font-editorial bg-[#fffdfa]/80 px-4 py-1.5 rounded-full border border-[#ecd9b5]/60 shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-[#c49954]" />
        <span>Sealed with genuine remorse and everlasting affection.</span>
      </motion.div>
    </section>
  );
};
