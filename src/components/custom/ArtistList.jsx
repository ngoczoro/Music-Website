import React from "react";
import { ArtistCard } from "./ArtistCard";

export function ArtistList() {
  const artists = [
    {
      name: "Luna Park",
      followers: "2.3M",
      imageUrl: "/avatars/luna.jpg",
      isFollowing: true,
    },
    {
      name: "Kai Lee",
      followers: "1.8M",
      imageUrl: "/avatars/kai.jpg",
      isFollowing: false,
    },
    {
      name: "Nova Chen",
      followers: "900K",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpghttps://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
      isFollowing: false,
    },
    {
      name: "Nova Chen",
      followers: "900K",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
      isFollowing: false,
    },
    {
      name: "Nova Chen",
      followers: "900K",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
      isFollowing: false,
    },
    {
      name: "Nova Chen",
      followers: "900K",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
      isFollowing: false,
    },
    {
      name: "Nova Chen",
      followers: "900K",
      imageUrl:
        "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg",
      isFollowing: false,
    },
  ];

  return (
    <div className="artist-list">
      {artists.map((artist, i) => (
        <ArtistCard key={i} {...artist} />
      ))}
    </div>
  );
}
