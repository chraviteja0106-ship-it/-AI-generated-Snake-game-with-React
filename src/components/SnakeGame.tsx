import React, { useRef, useEffect } from "react";
import { useSnakeGame } from "../hooks/useSnakeGame";
import { GRID_SIZE, THEME } from "../constants";
import { motion } from "motion/react";
import { Trophy, RotateCcw } from "lucide-react";

export const SnakeGame: React.FC = () => {
  const { gameState, resetGame } = useSnakeGame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear canvas
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Subtle)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw Food
    ctx.shadowBlur = 15;
    ctx.shadowColor = THEME.secondary;
    ctx.fillStyle = THEME.secondary;
    ctx.beginPath();
    ctx.roundRect(
      gameState.food.x * cellSize + 2,
      gameState.food.y * cellSize + 2,
      cellSize - 4,
      cellSize - 4,
      4
    );
    ctx.fill();

    // Draw Snake
    gameState.snake.forEach((segment, index) => {
      ctx.shadowBlur = index === 0 ? 20 : 10;
      ctx.shadowColor = THEME.primary;
      ctx.fillStyle = index === 0 ? THEME.primary : "rgba(0, 243, 255, 0.7)";
      
      ctx.beginPath();
      ctx.roundRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2,
        4
      );
      ctx.fill();
    });

    ctx.shadowBlur = 0;
  }, [gameState]);

  return (
    <div id="snake-container" className="flex flex-col items-center gap-6 p-4">
      <div className="flex justify-between w-full max-w-[400px] gap-4">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-white/50 mb-1 font-mono">Current Score</span>
          <span className="text-3xl font-bold text-cyan-400 font-sans tabular-nums">{gameState.score}</span>
        </div>
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-3 h-3 text-yellow-500" />
            <span className="text-[10px] uppercase tracking-widest text-white/50 font-mono">High Score</span>
          </div>
          <span className="text-3xl font-bold text-magenta-400 font-sans tabular-nums">{gameState.highScore}</span>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="relative bg-black rounded-lg shadow-2xl border border-white/10"
        />

        {gameState.isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-20"
          >
            <h2 className="text-4xl font-bold text-white mb-2 tracking-tighter">GAME OVER</h2>
            <p className="text-white/60 mb-8 font-mono text-sm tracking-widest">FINAL SCORE: {gameState.score}</p>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
            >
              <RotateCcw className="w-5 h-5" />
              PLAY AGAIN
            </button>
          </motion.div>
        )}
      </div>

      <div className="text-white/30 text-[10px] font-mono tracking-widest uppercase">
        Use arrow keys to navigate the grid
      </div>
    </div>
  );
};
