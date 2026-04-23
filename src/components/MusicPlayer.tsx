import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Track } from "../types";
import { TRACKS, THEME } from "../constants";

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const onEnded = () => {
    skipForward();
  };

  return (
    <div id="music-player" className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-[0_0_30px_rgba(0,243,255,0.15)] overflow-hidden relative">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />

      <div className="flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-48 h-48 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-magenta-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover rounded-2xl relative z-10 border border-white/20"
            />
          </motion.div>
        </AnimatePresence>

        <div className="text-center z-10">
          <h3 className="text-xl font-bold text-white tracking-tight leading-tight mb-1">
            {currentTrack.title}
          </h3>
          <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest opacity-80">
            {currentTrack.artist}
          </p>
        </div>

        <div className="w-full space-y-4">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-cyan-400 shadow-[0_0_10px_#00f3ff]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex items-center justify-center gap-8">
            <button
              onClick={skipBackward}
              className="p-2 text-white/60 hover:text-cyan-400 transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_white]"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>

            <button
              onClick={skipForward}
              className="p-2 text-white/60 hover:text-cyan-400 transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
