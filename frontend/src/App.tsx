import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Header from "./components/Header/Header";
// import LeftSideBar from "./components/LeftSideBar/LeftSideBar";
import FavouriteSection from "./components/FavouriteSection/FavouriteSection";
import CollectionSection from "./components/CollectionSection/CollectionSection";
import CreatePalette from "./pages/CreatePalette";
import PaletteGrid from "./components/PaletteGrid/PaletteGrid";
import MainLayout from "./mainLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<PaletteGrid />} />
        <Route path="/palettes" element={<PaletteGrid />} />
        <Route path="/palettes/:filter" element={<PaletteGrid />} />
        <Route path="/favorites" element={<FavouriteSection />} />
        <Route path="/collection" element={<CollectionSection />} />

      </Route>
      
      <Route path="/create" element={<CreatePalette />} />



      <Route path="*" element={<div>404 Not Found</div>} />

    </Routes>
  );
}


