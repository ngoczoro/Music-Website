// Home.jsx
import React from "react";
import "../../styles/theme.css";
import HomeSearch from "../../components/custom/HomeSearch";
import { TrendingList } from "../../components/custom/TrendingList";
import { MadeForYouList } from "../../components/custom/MadeForYouList";
import { TopArtistList } from "../../components/custom/TopArtistList";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-content">
        <HomeSearch />

        <div className="home-section-box">
          <TrendingList />
        </div>

        <div className="home-section-box">
          <MadeForYouList />
        </div>
      </div>
    </div>
  );
}
