import React, { useEffect, useState } from "react";
import { MusicCard } from "./MusicCard";
import { getPopularSongs } from "../../services/musicService";
import { useNavigate } from "react-router-dom";

function getAudioDuration(audioUrl) {
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.src = audioUrl;
    audio.preload = "metadata";

    const onLoaded = () => {
      resolve(audio.duration || 0);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("error", onError);
    };

    const onError = () => {
      resolve(0);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("error", onError);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("error", onError);
  });
}

// Optional: format giây thành mm:ss
const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export function TrendingList() {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/song/${id}`);
  };

  useEffect(() => {
    async function loadTrending() {
      try {
        // token test
        localStorage.setItem(
          "authToken",
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjM4MTk5MDAsImV4cCI6MTc2NTAyOTUwMH0.ZtbbdiBolZyc1gIdHRZlju8MrdPNDhQiw6LqEzAuLVE"
        );

        const baseSongs = await getPopularSongs();

        const normalized = baseSongs.map((s) => ({
          ...s,
          id: s.id || s._id,
        }));

        // Lấy thêm duration nếu BE chưa có
        const withDuration = await Promise.all(
          normalized.map(async (song) => {
            let duration = song.duration;

            if (!duration || isNaN(duration)) {
              // dùng luôn audioUrl trả từ BE
              duration = await getAudioDuration(song.audioUrl);
            }

            return { ...song, duration };
          })
        );

        setSongs(withDuration);
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
            artist={item.artistName || "Unknown"}
            duration={formatDuration(item.duration)}
            imageUrl={
              item.coverImageUrl?.startsWith("/")
                ? `http://localhost:8081${item.coverImageUrl}`
                : item.coverImageUrl
            }
            onClick={() => goToDetail(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
