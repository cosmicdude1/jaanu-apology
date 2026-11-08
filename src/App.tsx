import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { websiteConfig, SceneId } from './content/letterContent';
import { soundManager } from './utils/audio';
import { useReducedMotion } from './hooks/useReducedMotion';

// Components
import { BackgroundAtmosphere } from './components/BackgroundAtmosphere';
import { FloatingPetals } from './components/FloatingPetals';
import { ProgressIndicator } from './components/ProgressIndicator';
import { MusicToggle } from './components/MusicToggle';
import { NavigationControls } from './components/NavigationControls';

// Sections in exact narrative sequence
import { OpeningSection } from './sections/OpeningSection';
import { ApologySection } from './sections/ApologySection';
import { PromiseSection } from './sections/PromiseSection';
import { MemoriesSection } from './sections/MemoriesSection';
import { LetterSection } from './sections/LetterSection';
import { EnvelopeSection } from './sections/EnvelopeSection';
import { EndingSection } from './sections/EndingSection';

export const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  const prefersReducedMotion = useReducedMotion();

  const scenes = websiteConfig.scenes;
  const currentSceneMeta = scenes[currentSceneIndex] || scenes[0];
  const currentSceneId: SceneId = currentSceneMeta.id;

  const handleNext = useCallback(() => {
    setCurrentSceneIndex((prev) => Math.min(prev + 1, scenes.length - 1));
  }, [scenes.length]);

  const handlePrev = useCallback(() => {
    setCurrentSceneIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleSelectScene = useCallback((index: number) => {
    setCurrentSceneIndex(index);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentSceneIndex(0);
    setIsEnvelopeOpen(false);
  }, []);

  const handleToggleMusic = useCallback(() => {
    const isPlaying = soundManager.toggleMusic();
    setIsPlayingMusic(isPlaying);
  }, []);

  // Keyboard navigation support: Left / Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        soundManager.playPageTurnSound();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        soundManager.playPageTurnSound();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Render active section based on current scene ID
  const renderCurrentSection = () => {
    switch (currentSceneId) {
      case 'opening':
        return <OpeningSection onBegin={handleNext} />;
      case 'apology':
        return <ApologySection />;
      case 'promise':
        return <PromiseSection />;
      case 'memories':
        return <MemoriesSection />;
      case 'letter':
        return <LetterSection />;
      case 'envelope':
        return (
          <EnvelopeSection
            isOpen={isEnvelopeOpen}
            onToggle={() => setIsEnvelopeOpen((prev) => !prev)}
          />
        );
      case 'ending':
        return <EndingSection onRestart={handleRestart} />;
      default:
        return <OpeningSection onBegin={handleNext} />;
    }
  };

  // Coordinated, GPU-accelerated page transitions
  const pageVariants = {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 10, scale: 0.99 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.42,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -8,
          scale: 0.99,
          transition: {
            duration: 0.28,
            ease: [0.4, 0, 1, 1] as const,
          },
        },
  };

  return (
    <div className="relative min-h-screen bg-[#fbf5f2] text-[#2e1f24] overflow-x-hidden flex flex-col justify-between selection:bg-[#be6f7f]/20 selection:text-[#85283f]">
      {/* Dynamic Ambient Atmospheric Glows */}
      <BackgroundAtmosphere currentScene={currentSceneId} />

      {/* Delicate Floating Petals & Heart Particles */}
      <FloatingPetals petalCount={12} heartCount={5} />

      {/* Top Global Controls */}
      <header className="relative z-40 w-full px-4 sm:px-6 pt-4 pb-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline font-editorial text-xs tracking-[0.25em] uppercase text-[#85283f] font-semibold">
            {websiteConfig.opening.title}
          </span>

          <ProgressIndicator
            currentStep={currentSceneIndex}
            scenes={scenes}
            onSelectStep={handleSelectScene}
          />

          <MusicToggle
            isPlaying={isPlayingMusic}
            onToggle={handleToggleMusic}
          />
        </div>
      </header>

      {/* Main Narrative Stage with AnimatePresence Transitions */}
      <main className="relative z-20 flex-1 flex items-center justify-center pt-20 sm:pt-24 pb-28 sm:pb-32 px-3 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSceneId}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex items-center justify-center"
          >
            {renderCurrentSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation Controls */}
      <NavigationControls
        currentIndex={currentSceneIndex}
        totalScenes={scenes.length}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default App;
