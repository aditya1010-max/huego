import { useEffect, useState } from "react";
import { getFavoritePalettes } from "../../services/favouriteService";
import type { Palette } from "../../types/Palette";
import './FavouriteSection.css'
import { getUserId } from "../../utils/user";

const API_BASE = import.meta.env.VITE_API_URL;


export default function Favorites() {
  const [favorites, setFavorites] = useState<Palette[]>([]);

  const fetchFavs = async () => {
    const data = await getFavoritePalettes();
    setFavorites(data);
  };

  useEffect(() => {
    async function loadFavorites() {
      await fetchFavs();
    }

    loadFavorites(); // Initial load

    const refresh = () => fetchFavs();
    window.addEventListener("palette-like-changed", refresh);

    return () => {
      window.removeEventListener("palette-like-changed", refresh);
      
    };
  }, []);


  const handleRemoveLike = async (paletteId: string) => {
    const oldFavorites = [...favorites]; // backup UI state

    // ui update – instant remove
    setFavorites(prev => prev.filter(p => p._id !== paletteId));

    try {
      const res = await fetch(`${API_BASE}/api/palettes/${paletteId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: getUserId() })
      });

      const data = await res.json();

      // if api call failed, restore old state
      if (data.liked) {
        setFavorites(oldFavorites);
      } else {
        // slient background sync 
        fetchFavs();
      }

      window.dispatchEvent(new CustomEvent("palette-like-changed", {
        detail: { 
          paletteId, 
          liked: false,
          likes: data.likes   
        }
      }));

    } catch (err) {
      console.error("Remove failed:", err);
      setFavorites(oldFavorites);
    }

  };


  return (
    <div className="classforborderbelowheading">
      <div className="divforheading">
         <h1>favourites </h1>
      </div>
      <div className="favoritesContainer">
        <div className="favoritesGrid">
          {favorites.map(palette => (
            <div key={palette._id} className="favoriteCard">

              <button className="removeBtn" onClick={() => handleRemoveLike(palette._id)}>
                ✕
              </button>

              <div className="miniPaletteRow">
                {palette.colors.map((c, i) => (
                  <div key={i} className="miniColor" style={{ backgroundColor: c.hex }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}
