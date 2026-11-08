import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Mic, Heart, AlertCircle, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface VoiceNoteCardProps {
  audioSrc?: string;
  heading?: string;
  className?: string;
}

export const VoiceNoteCard: React.FC<VoiceNoteCardProps> = ({
  audioSrc = '/audio/jaanu-voice-note.mp3',
  heading = 'Jaanu, ek aakhri baat… ❤️',
  className = '',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Format seconds to M:SS
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if audio has already loaded metadata
    if (audio.readyState >= 1) {
      setDuration(audio.duration || 31.4);
      setHasError(false);
    }

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
        setDuration(audio.duration);
      } else {
        setDuration(31.4); // Fallback to verified file duration
      }
      setHasError(false);
    };

    const handleCanPlay = () => {
      setHasError(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsEnded(false);
      // Pause background chord music while listening to voice note
      soundManager.stopMusic();
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsEnded(true);
      setCurrentTime(audio.duration || duration);
    };

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc, duration]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (isEnded) {
      audio.currentTime = 0;
      setCurrentTime(0);
      setIsEnded(false);
    }

    if (isPlaying) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play interrupted or blocked:', err);
          setIsPlaying(false);
        });
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    if (isEnded) {
      setIsEnded(false);
    }
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    audio.currentTime = 0;
    setCurrentTime(0);
    setIsEnded(false);
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setIsPlaying(false));
    }
  };

  const progressPercentage = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <div
      className={`relative w-full max-w-lg mx-auto bg-[#fffdfa] rounded-2xl border border-[#ecd9b5] p-5 sm:p-7 shadow-[0_14px_40px_-8px_rgba(70,35,45,0.12)] text-left select-none overflow-hidden ${className}`}
    >
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        className="hidden"
      />

      {/* Decorative Washi Tape Accent */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#e8cec5]/90 border-x border-[#d8b8ad]/70 rotate-1 backdrop-blur-sm shadow-xs pointer-events-none z-20" />

      {/* Top Badge: Audio Note Identifier */}
      <div className="flex items-center justify-between border-b border-[#f0dfd2] pb-3 mb-4">
        <div className="flex items-center space-x-1.5 text-xs font-editorial font-semibold text-[#85283f] uppercase tracking-wider">
          <Mic className="w-3.5 h-3.5 text-[#85283f]" />
          <span>Personal Voice Note</span>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-[#957880] font-mono">
          <Heart className="w-3.5 h-3.5 text-[#85283f] fill-[#be6f7f]/30" />
          <Sparkles className="w-3 h-3 text-[#c49954]" />
          <span>From Bettu</span>
        </div>
      </div>

      {/* Main Heading Required */}
      <div className="space-y-1 mb-5">
        <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#2e1f24] tracking-tight flex items-center space-x-1.5">
          <span>{heading}</span>
        </h3>
        <p className="font-script text-lg sm:text-xl text-[#6f535b] leading-tight">
          "Press play to listen to my voice, whenever you are ready."
        </p>
      </div>

      {/* Player Controls Bar */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-[#fbf5f2] border border-[#ecd9b5]/80 shadow-inner flex items-center space-x-3.5 sm:space-x-4">
        {/* Play / Pause / Replay Button */}
        {isEnded ? (
          <button
            type="button"
            onClick={handleReplay}
            disabled={hasError}
            className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-[#85283f] text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Replay voice note"
            title="Replay from beginning"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button
            type="button"
            onClick={togglePlay}
            disabled={hasError}
            className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-[#85283f] text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85283f] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
            title={isPlaying ? 'Pause' : 'Play voice note'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
            )}
          </button>
        )}

        {/* Progress Slider and Timing Display */}
        <div className="flex-1 space-y-1.5">
          {/* Custom Accessible Range Scrubber */}
          <div className="relative flex items-center w-full">
            <input
              type="range"
              min="0"
              max={duration || 31}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              disabled={hasError}
              aria-label="Audio playback scrubber"
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#e5cfc8] accent-[#85283f] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#85283f] disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, #85283f ${progressPercentage}%, #e5cfc8 ${progressPercentage}%)`,
              }}
            />
          </div>

          {/* Timing Row */}
          <div className="flex justify-between items-center text-[11px] font-mono text-[#6f535b]">
            <span className="font-medium text-[#85283f]">{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 31.4)}</span>
          </div>
        </div>

        {/* Replay Shortcut Button if Playing or Paused */}
        {!isEnded && currentTime > 0 && (
          <button
            type="button"
            onClick={handleReplay}
            disabled={hasError}
            className="p-2 rounded-full hover:bg-white text-[#85283f] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#85283f] cursor-pointer"
            aria-label="Restart audio from beginning"
            title="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Helpful Status Messages */}
      {hasError ? (
        <div className="mt-3 flex items-center space-x-1.5 text-xs text-[#957880] font-editorial italic bg-[#fffdfa] p-2 rounded-lg border border-dashed border-[#ecd9b5]">
          <AlertCircle className="w-3.5 h-3.5 text-[#c49954] shrink-0" />
          <span>Your voice note is waiting to be added.</span>
        </div>
      ) : isPlaying ? (
        <div className="mt-3 flex items-center space-x-1.5 text-xs text-[#85283f] font-editorial font-medium">
          <Volume2 className="w-3.5 h-3.5 text-[#85283f] animate-pulse" />
          <span>Playing bettu's voice note for jaanu...</span>
        </div>
      ) : isEnded ? (
        <div className="mt-3 flex items-center justify-between text-xs text-[#6f535b] font-editorial italic">
          <span>Voice note completed.</span>
          <button
            type="button"
            onClick={handleReplay}
            className="text-[#85283f] font-semibold underline hover:text-[#5a1727] cursor-pointer"
          >
            Play again
          </button>
        </div>
      ) : (
        <p className="mt-3 text-[11px] text-[#957880] font-editorial italic text-center">
          Listen with your earphones for a warm, quiet experience. ❤️
        </p>
      )}
    </div>
  );
};
