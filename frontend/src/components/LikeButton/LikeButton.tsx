import { useState, useEffect } from "react";
import './LikeButton.css';
import { getUserId } from "../../utils/user";
import Heart from "../../assets/heart-red.svg"
import heartFilled from "../../assets/heart-black.svg"

const API_BASE = import.meta.env.VITE_API_URL;


interface LikeButtonProps {
  paletteId: string;
  initialLikes: number;
  initialLiked: boolean;
}

export default function LikeButton({ paletteId, initialLikes, initialLiked }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);


  const handleLike = async () => {
    const res = await fetch(`${API_BASE}/api/palettes/${paletteId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: getUserId() })
    });

    const data = await res.json();
    setLikes(data.likes);
    setLiked(data.liked);
    window.dispatchEvent(new CustomEvent("palette-like-changed", {
      detail: { paletteId, liked: data.liked }
    }));

  };

  useEffect(() => {
    const listener = (e: CustomEvent<{ paletteId: string; liked: boolean; likes: number }>) => {
      const { paletteId: id, liked, likes } = e.detail;

      if (id === paletteId) {
        if (typeof liked === "boolean") setLiked(liked);
        if (typeof likes === "number") setLikes(likes);
      }
    };

    window.addEventListener("palette-like-changed", listener as EventListener);

    return () =>
      window.removeEventListener("palette-like-changed", listener as EventListener);
  }, [paletteId]);



  return (
    <button onClick={handleLike} className="likeBtn">
       <img src={liked ? Heart : heartFilled} alt="Like" /> {likes}
    </button>
  );
}
