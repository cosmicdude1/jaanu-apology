import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { websiteConfig, SceneId } from './content/letterContent';
import { soundManager } from './utils/audio';
import { useReducedMotion } from './hooks/useReducedMotion';
import { LightboxProvider } from './context/LightboxContext';

// Components
import { BackgroundAtmosphere } from './components/BackgroundAtmosphere';
import { FloatingPetals } from './components/FloatingPetals';
import { ProgressIndicator } from './components/ProgressIndicator';
import { MusicToggle } from './components/MusicToggle';
import { NavigationControls } from './components/NavigationControls';

// Sections in exact narrative sequence
import { OpeningSection } from './sections/OpeningSection';
import { ApologySection } from './sections/ApologySection';
import { PersonalApologySection } from './sections/PersonalApologySection';
import { PromiseSection } from './sections/PromiseSection';
import { MemoriesSection } from './sections/MemoriesSection';
import { HerGallerySection } from './sections/HerGallerySection';
import { DiwaliSection } from './sections/DiwaliSection';
import { LetterSection } from './sections/LetterSection';
import { EnvelopeSection } from './sections/EnvelopeSection';
import { EndingSection } from './sections/EndingSection';
import { PatakhaFinaleSection } from './sections/PatakhaFinaleSection';

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
      case 'her-gallery':
        return <HerGallerySection />;
      case 'personal-apology':
        return <PersonalApologySection />;
      case 'letter':
        return <LetterSection />;
      case 'envelope':
        return (
          <EnvelopeSection
            isOpen={isEnvelopeOpen}
            onToggle={() => setIsEnvelopeOpen((prev) => !prev)}
          />
        );
      case 'diwali':
        return <DiwaliSection onContinue={handleNext} />;
      case 'ending':
        return <EndingSection onRestart={handleRestart} />;
      case 'patakha-finale':
        return <PatakhaFinaleSection onRestart={handleRestart} />;
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
    <LightboxProvider>
      <div className="relative min-h-screen bg-[#fbf5f2] text-[#2e1f24] overflow-x-hidden flex flex-col justify-between selection:bg-[#be6f7f]/20 selection:text-[#85283f]">
        {/* Dynamic Ambient Atmospheric Glows */}
        <BackgroundAtmosphere currentScene={currentSceneId} />

        {/* Delicate Floating Petals & Heart Particles */}
        <FloatingPetals petalCount={12} heartCount={5} />

        {/* Top Global Controls - Fixed Header Bar with Frosting */}
        <header className="fixed top-0 inset-x-0 z-40 w-full px-3 sm:px-6 py-2 sm:py-2.5 pt-[max(0.5rem,env(safe-area-inset-top))] bg-[#fbf5f2]/90 backdrop-blur-md border-b border-[#ecd9b5]/40 shadow-xs">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 shrink-0">
              <span className="hidden md:inline font-editorial text-xs tracking-[0.22em] uppercase text-[#85283f] font-semibold">
                {websiteConfig.opening.title}
              </span>
              <span className="md:hidden font-editorial text-[11px] tracking-wider uppercase text-[#85283f] font-semibold">
                For {websiteConfig.girlfriendName}
              </span>
            </div>

            <div className="flex-1 flex justify-center max-w-md mx-auto">
              <ProgressIndicator
                currentStep={currentSceneIndex}
                scenes={scenes}
                onSelectStep={handleSelectScene}
              />
            </div>

            <div className="shrink-0 flex items-center">
              <MusicToggle
                isPlaying={isPlayingMusic}
                onToggle={handleToggleMusic}
              />
            </div>
          </div>
        </header>

        {/* Main Narrative Stage with AnimatePresence Transitions */}
        <main className="relative z-20 flex-1 flex items-center justify-center pt-16 sm:pt-20 pb-24 sm:pb-28 px-3 sm:px-6">
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
    </LightboxProvider>
  );
};

export default App;
