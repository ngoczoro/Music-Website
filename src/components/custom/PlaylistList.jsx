import React from "react";
import { PlaylistCard } from "./PlaylistCard";

export function PlaylistList() {
  const playlists = [
    {
      title: "Chill Vibes",
      songs: 48,
      imageUrl: "/images/chill-vibes.jpg",
      isPublic: true,
    },
    {
      title: "Evening Jazz",
      songs: 56,
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
      isPublic: true,
    },
    {
      title: "Workout Mix",
      songs: 32,
      imageUrl: "/images/workout-mix.jpg",
      isPublic: true,
    },
    {
      title: "Lo-Fi Beats",
      songs: 27,
      imageUrl: "/images/lofi.jpg",
      isPublic: false,
    },
    {
      title: "Evening Jazz",
      songs: 56,
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
      isPublic: true,
    },
    {
      title: "Evening Jazz",
      songs: 56,
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
      isPublic: true,
    },
    {
      title: "Evening Jazz",
      songs: 56,
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
      isPublic: true,
    },
  ];

  return (
    <div className="playlist-list">
      {playlists.map((pl, i) => (
        <PlaylistCard key={i} {...pl} />
      ))}
    </div>
  );
}
