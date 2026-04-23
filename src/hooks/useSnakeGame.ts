import { useState, useEffect, useCallback, useRef } from "react";
import { Point, Direction, GameState } from "../types";
import { GRID_SIZE, INITIAL_GAME_SPEED, MIN_GAME_SPEED, SPEED_INCREMENT } from "../constants";

const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const getRandomPoint = (): Point => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export function useSnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: getRandomPoint(),
    direction: "UP",
    isGameOver: false,
    score: 0,
    highScore: parseInt(localStorage.getItem("snakeHighScore") || "0"),
  });

  const [speed, setSpeed] = useState(INITIAL_GAME_SPEED);
  const directionRef = useRef<Direction>("UP");

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: getRandomPoint(),
      direction: "UP",
      isGameOver: false,
      score: 0,
    }));
    directionRef.current = "UP";
    setSpeed(INITIAL_GAME_SPEED);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameState.isGameOver) return;

    setGameState((prev) => {
      const newHead = { ...prev.snake[0] };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case "UP": newHead.y -= 1; break;
        case "DOWN": newHead.y += 1; break;
        case "LEFT": newHead.x -= 1; break;
        case "RIGHT": newHead.x += 1; break;
      }

      // Check collision with walls or self
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prev.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        const newHighScore = Math.max(prev.score, prev.highScore);
        localStorage.setItem("snakeHighScore", newHighScore.toString());
        return { ...prev, isGameOver: true, highScore: newHighScore };
      }

      const newSnake = [newHead, ...prev.snake];
      
      // Check collision with food
      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        const newScore = prev.score + 10;
        setSpeed(s => Math.max(MIN_GAME_SPEED, s - SPEED_INCREMENT));
        return {
          ...prev,
          snake: newSnake,
          food: getRandomPoint(),
          score: newScore,
        };
      }

      // Remove tail
      newSnake.pop();
      return { ...prev, snake: newSnake };
    });
  }, [gameState.isGameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": if (directionRef.current !== "DOWN") directionRef.current = "UP"; break;
        case "ArrowDown": if (directionRef.current !== "UP") directionRef.current = "DOWN"; break;
        case "ArrowLeft": if (directionRef.current !== "RIGHT") directionRef.current = "LEFT"; break;
        case "ArrowRight": if (directionRef.current !== "LEFT") directionRef.current = "RIGHT"; break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameState.isGameOver) return;
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, speed, gameState.isGameOver]);

  return {
    gameState,
    resetGame,
  };
}
