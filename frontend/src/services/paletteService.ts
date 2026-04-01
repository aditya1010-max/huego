import type { Palette } from "../types/Palette";

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchLikedPalettes = async (userId: string): Promise<Palette[]> => {
  const response = await fetch(
    `${API_BASE}/api/palettes/liked/${userId}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }

  const data = await response.json();  // fixes: index-DB-nYvpg.js:11 Uncaught TypeError: u.map is not a function
  return data.data;
};