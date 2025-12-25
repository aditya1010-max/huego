// src/layouts/MainLayout.tsx
import Header from "../src/components/Header/Header";
import LeftSideBar from "../src/components/LeftSideBar/LeftSideBar";
import { Outlet } from "react-router-dom";
import Favorites from "./components/FavouriteSection/FavouriteSection";
import "./App.css";

export default function MainLayout() {
  return (
    <div className="appContainer">
      {/* spacer for the fixed header */}
      <div className="headerWrapper">
        <Header />
      </div>

      <div className="contentWrapper">
        <div className="sidebarWrapper">
          <LeftSideBar />
        </div>

        <div className="centerWrapper">
          <Outlet />
        </div>

        <div className="favoritesWrapper">
          <Favorites />
        </div>
      </div>
    </div>
  );
}
