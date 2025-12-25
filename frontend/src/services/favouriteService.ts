import { getUserId } from "../utils/user";

export async function getFavoritePalettes() {
  const userId = getUserId();
  const res = await fetch(`http://localhost:5000/api/palettes/favorites/${userId}`);

  return await res.json();
}
