import { getUserId } from "../utils/user";
const API_BASE = import.meta.env.VITE_API_URL;


export async function getFavoritePalettes() {
  const userId = getUserId();
  const res = await fetch(`${API_BASE}/api/palettes/${userId}`);

  const data = await res.json();

  return data.data;
}
