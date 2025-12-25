import { useState, type JSX } from 'react';
// IMPORT the Palette type from your central definitions file
import LikeButton from "../LikeButton/LikeButton"; 
import './PaletteDetails.css'
import type { Palette } from "../../types/Palette"; // Adjust the path as needed


// Define the component's props using the imported Palette type
interface PaletteDetailsProps {
  palette: Palette;
}

/**
 * Calculates the relative time difference (e.g., '2 days ago').
 */
const getDaysSince = (timestamp: string): string => {
  if (!timestamp) return 'No date available';

  const now = new Date(); 
  const createdDate = new Date(timestamp);
  const diffInMilliseconds = now.getTime() - createdDate.getTime();
  
  if (diffInMilliseconds < 0) return 'in the future';

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30.44; 
  const year = day * 365.25; 

  if (diffInMilliseconds < minute) {
    const seconds = Math.round(diffInMilliseconds / 1000);
    return seconds <= 1 ? 'just now' : `${seconds} seconds ago`;
  } else if (diffInMilliseconds < hour) {
    const minutes = Math.round(diffInMilliseconds / minute);
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else if (diffInMilliseconds < day) {
    const hours = Math.round(diffInMilliseconds / hour);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (diffInMilliseconds < month) {
    const days = Math.round(diffInMilliseconds / day);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (diffInMilliseconds < year) {
    const months = Math.round(diffInMilliseconds / month);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else {
    const years = Math.round(diffInMilliseconds / year);
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
};


export default function PaletteDetails({ palette }: PaletteDetailsProps): JSX.Element {
  
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);

    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 1000); // show "Copied!" for 1 sec
  };

  const timeAgo = getDaysSince(palette.createdAt);

  return (
    <div className="paletteCard">
      <div className="colorsRow">
        {/* Iterate over colors, accessing color.hex */}
        {palette.colors.map((color, i) => (
          <div
            key={i}
            className="colorBox"
            style={{ backgroundColor: color.hex }}
          >
            <span
              className="hexText"
              onClick={(e) => {
                e.stopPropagation(); // prevents copy if clicking background
                handleCopy(color.hex, i);
              }}

            >
              {copiedIndex === i ? "Copied!" : color.hex.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <div className="paletteInfo">
        <LikeButton
          paletteId={palette._id}                // or palette.id depending on your type
          initialLikes={palette.likes}      // fallback to 0 if undefined
          // initialLiked={false}                   // we'll improve this later
          initialLiked={palette.likedBy.includes(localStorage.getItem("userId")!)}
        />
        {/* Use the new function result here */}
        <span className="createdAt">{timeAgo}</span> 
      </div>
    </div>
  );
}