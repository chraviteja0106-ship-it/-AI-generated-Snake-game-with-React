import { Track } from "./types";

export const TRACKS: Track[] = [
  {
    id: "1",
    title: "Neon Pulse",
    artist: "SynthAI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Cyber Drift",
    artist: "LofiBot",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1614850523296-e811cfbfe06d?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Digital Horizon",
    artist: "RetroFuture",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=300&h=300&auto=format&fit=crop",
  },
];

export const GRID_SIZE = 20;
export const INITIAL_GAME_SPEED = 150;
export const MIN_GAME_SPEED = 60;
export const SPEED_INCREMENT = 2;

export const THEME = {
  bg: "#050505",
  card: "#111111",
  primary: "#00f3ff", // Cyan neon
  secondary: "#ff00ff", // Magenta neon
  accent: "#39ff14", // Green neon
  danger: "#ff3131", // Red neon
};
