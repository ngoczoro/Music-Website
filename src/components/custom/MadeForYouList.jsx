import React from "react";
import { MusicCard } from "./MusicCard";
import "../../styles/theme.css";

export function MadeForYouList() {
  const madeForYouData = [
    {
      title: "Midnight Dreams",
      artist: "Luna Eclipse",
      duration: "3:34",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
    {
      title: "Starfall",
      artist: "Nova Quinn",
      duration: "2:58",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
    {
      title: "Lunar Echoes",
      artist: "Midnight Aura",
      duration: "4:12",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
    {
      title: "Neon Skies",
      artist: "Skywave",
      duration: "3:44",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
    {
      title: "Cosmic Bloom",
      artist: "Solaris",
      duration: "3:21",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
  ];

  return (
    <div className="home-section">
      <h2 className="home-title">Made For You</h2>

      <div className="playlist-grid">
        {madeForYouData.map((item, idx) => (
          <MusicCard
            key={idx}
            title={item.title}
            artist={item.artist}
            duration={item.duration}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
