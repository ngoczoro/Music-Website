import React from "react";
import { SongItem } from "./SongItem";

const songs = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Park",
    duration: "3:45",
    album: "Night Sessions",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 2,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 3,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 4,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 5,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 6,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 7,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 8,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 9,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 10,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 11,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 12,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 13,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
  {
    id: 14,
    title: "Starry Nights",
    artist: "Moonlight Duo",
    duration: "4:10",
    album: "Dream Waves",
    cover:
      "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
  },
];

export function SongList() {
  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <SongItem key={song.id} index={index + 1} song={song} />
      ))}
    </div>
  );
}
