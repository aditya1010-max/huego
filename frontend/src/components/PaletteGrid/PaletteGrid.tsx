import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import type { Palette } from "../../types/Palette";
import PaletteDetails from "../PaletteDetails/PaletteDetails";
import "./PaletteGrid.css";
import { useParams } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_URL;

const PAGE_SIZE = 40;

export default function PaletteGrid() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { filter } = useParams();

  const fetchPalettes = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const baseUrl = filter
      ? `${API_BASE}/api/palettes/${filter}`
      : `${API_BASE}/api/palettes`;

    const url = `${baseUrl}?skip=${skip}&limit=${PAGE_SIZE}`;

    try {
      const res = await axios.get(url);
      const newPalettes: Palette[] = res.data.data ?? [];

      // Replace if first load for filter, otherwise append
      setPalettes(prev =>
        skip === 0 ? newPalettes : [...prev, ...newPalettes]
      );

      if (newPalettes.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter, skip]); // ⬅️ ONLY depend on skip + filter

  // Reset when filter changes
  useEffect(() => {
    setPalettes([]);
    setSkip(0);
    setHasMore(true);
  }, [filter]);

  // Fetch when skip/filter updates
  useEffect(() => {
    fetchPalettes();
  }, [fetchPalettes]);

  // Infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300;

      if (bottom) {
        setSkip(prev => prev + PAGE_SIZE);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="paletteGrid">
      {palettes.map((palette, index) => (
        <PaletteDetails
          key={`${palette._id}-${index}`}
          palette={palette}
        />
      ))}

      {loading && (
        <p style={{ textAlign: "center", opacity: 0.6 }}>Loading…</p>
      )}

      {!loading && !hasMore && palettes.length > 0 && (
        <p style={{ textAlign: "center", margin: "1rem 0", opacity: 0.55 }}>
          🎉 You reached the end!
        </p>
      )}
    </div>
  );
}
