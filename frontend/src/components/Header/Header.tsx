import { useState, useRef, useEffect } from "react";
import MenuPop from "../../pages/MenuPop";
import "./Header.css";
import Logo from "../../assets/huego1.png";
import searchIcon from "../../assets/searchnew.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [gifKey, setGifKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlegifclick = () => {
    if (isPlaying) return; // avoid spam-click

    setIsPlaying(true);
    setGifKey(prev => prev + 0.5); // forces GIF restart

    setTimeout(() => {
      setIsPlaying(false); // pause after 0.7s
    }, 200);
  };
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logoandname">
        <div className="logo">
          <img src={Logo} alt="Huego Logo"  style={{width: 60, height: 60}} />
        </div>
        <h2>Huego</h2>
      </div>

      <div className="searchBox">
        <button className="searchBtn">
            <img src={searchIcon} alt="Search" style={{width:24, height: 24}} />
        </button>
        <span>Search palette</span>
      </div>

      <div className="menuWrapper" ref={menuRef}>
        <button
          className="gif-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
            handlegifclick();
          }}
        > {
          gifKey ?
        (
          <img src="../../public/menugifloop1.gif" alt="" />
        ) : (
          "click me"
        )}  
        </button>

        {isMenuOpen && <MenuPop />}
      </div>
    </header>
  );
}