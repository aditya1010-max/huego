import type { Palette } from "../types/Palette";

export const fetchLikedPalettes = async (userId: string): Promise<Palette[]> => {

  const response = await fetch(`/api/palettes/liked/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }
  
  return response.json();
};