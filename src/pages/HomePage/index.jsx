import React from "react";
import "../../styles/theme.css";

import { Sidebar } from "../../components/custom/Sidebar";
import { TrendingList } from "../../components/custom/TrendingList";
import { MadeForYouList } from "../../components/custom/MadeForYouList";
import { TopArtistList } from "../../components/custom/TopArtistList";

export default function Home() {
  return (
    <div
      className="home-page"
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar trái */}

      {/* Nội dung chính */}
      <div className="home-content">
        {/* Thanh Search */}
        <div className="profile-search-bar">
          <div className="search-container">
            <img
              src="./src/assets/icon/search.svg"
              alt="Search"
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search artist, song, playlist"
              className="profile-search-input"
            />
          </div>
        </div>

        <div className="home-section-box">
          <TrendingList />
        </div>

        <div className="home-section-box">
          <MadeForYouList />
        </div>

        <div className="home-section-box">
          <TopArtistList />
        </div>
      </div>
    </div>
  );
}
