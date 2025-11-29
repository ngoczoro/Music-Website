import React, { useEffect, useState } from "react";
import { MusicCard } from "./MusicCard";
import { getPopularSongs } from "../../services/musicService";

export function TrendingList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function loadTrending() {
      try {
        // ❗ Token test tạm thời
        localStorage.setItem(
          "authToken",
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjM4MTk5MDAsImV4cCI6MTc2NTAyOTUwMH0.ZtbbdiBolZyc1gIdHRZlju8MrdPNDhQiw6LqEzAuLVE"
        );

        const baseSongs = await getPopularSongs(); // lấy từ BE

        // 🔥 Fetch artistName cho mỗi bài
        const fullSongs = await Promise.all(
          baseSongs.map(async (song) => {
            let artistName = "Unknown";

            try {
              const token = localStorage.getItem("authToken");
              const res = await fetch(
                `http://localhost:8081/api/common/song/artist/${song.artistId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (res.ok) {
                const artist = await res.json();
                artistName = artist.fullName || "Unknown";
              }
            } catch (err) {
              console.log("Không lấy đc artist:", err);
            }

            return {
              ...song,
              artistName,
            };
          })
        );

        setSongs(fullSongs);
      } catch (err) {
        console.error("Lỗi lấy trending:", err);
      }
    }

    loadTrending();
  }, []);

  return (
    <div className="home-section">
      <h2 className="home-title">Trending</h2>

      <div className="playlist-grid">
        {songs.map((item) => (
          <MusicCard
            key={item.id}
            title={item.title}
            artist={item.artistName}
            duration={item.duration ? `${Math.floor(item.duration)}s` : ""}
            imageUrl={
              item.coverImageUrl?.startsWith("/")
                ? `http://localhost:8081${item.coverImageUrl}`
                : item.coverImageUrl
            }
          />
        ))}
      </div>
    </div>
  );
}
