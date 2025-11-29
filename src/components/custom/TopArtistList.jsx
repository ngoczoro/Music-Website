import React from "react";
import { ArtistCard } from "./ArtistCard";
import "../../styles/theme.css";

export function TopArtistList() {
  const mockArtists = [
    {
      name: "Yura Yunita",
      followers: "2.4M",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
    {
      name: "Ziva Magnolya",
      followers: "1.9M",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
    {
      name: "Tiara Andini",
      followers: "3.1M",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
    {
      name: "Lyodra",
      followers: "4.5M",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
    {
      name: "Mahalini",
      followers: "3.8M",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
    {
      name: "Rizky Febian",
      followers: "5.2M",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
    },
  ];

  return (
    <div className="home-section">
      <h2 className="home-title">Top Artist</h2>

      <div className="artist-scroll">
        {mockArtists.map((artist, idx) => (
          <ArtistCard
            key={idx}
            name={artist.name}
            followers={artist.followers}
            imageUrl={artist.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
