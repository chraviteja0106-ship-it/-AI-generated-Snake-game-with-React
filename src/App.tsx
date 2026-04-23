import React from "react";
import { SnakeGame } from "./components/SnakeGame";
import { MusicPlayer } from "./components/MusicPlayer";
import { NeonBackground } from "./components/NeonBackground";
import { motion } from "motion/react";
import { Music, Gamepad2 } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-black">
      <NeonBackground />
      
      <header className="pt-8 pb-4 px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-magenta-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            NEON<span className="text-cyan-400">SYNTH</span>
          </h1>
        </motion.div>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-mono">Precision Gaming • Retro Vibes</p>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col lg:grid lg:grid-cols-[1fr_400px_1fr] gap-12 items-center lg:items-start min-h-[calc(100vh-160px)]">
        {/* Left Section - Empty or placeholder for desktop */}
        <div className="hidden lg:flex flex-col gap-8">
           <div className="p-6 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-sm">
             <h2 className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-4">How to Play</h2>
             <ul className="space-y-3 text-sm text-white/60">
               <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">↑</div>
                 Move Up
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">↓</div>
                 Move Down
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">←</div>
                 Move Left
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">→</div>
                 Move Right
               </li>
             </ul>
           </div>
        </div>

        {/* Center - Snake Game */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center"
        >
          <SnakeGame />
        </motion.div>

        {/* Right - Music Player */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex justify-center lg:justify-start"
        >
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="flex items-center gap-3 mb-2 px-6">
              <Music className="w-4 h-4 text-magenta-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Synth Feed</span>
            </div>
            <MusicPlayer />
          </div>
        </motion.div>
      </main>

      <footer className="py-8 text-center border-t border-white/5 mt-12 bg-black/20">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
          Built for the Grid • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
