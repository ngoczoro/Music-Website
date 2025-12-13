import React, { useEffect, useState } from "react";
import { MusicCard } from "./MusicCard";
import {
  getRecommendedSongs,
  getCurrentUser,
} from "../../services/musicService";
import { useNavigate } from "react-router-dom";

export function MadeForYouList() {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const goToSong = (id) => {
    navigate(`/song/${id}`, {
      state: { autoplay: true },
    });
  };

  useEffect(() => {
    async function load() {
      const me = await getCurrentUser();
      const userId = me.id;

      const data = await getRecommendedSongs(userId);

      const formatted = data.map((s) => ({
        id: s.id || s._id,
        title: s.title,
        artist: s.artistName || "Unknown",
        duration: s.duration,
        imageUrl: s.coverImageUrl?.startsWith("/")
          ? `http://localhost:8081${s.coverImageUrl}`
          : s.coverImageUrl,
      }));

      setSongs(formatted);
    }

    load();
  }, []);

  return (
    <div className="home-section">
      <h2 className="home-title">Made For You</h2>

      <div className="playlist-grid">
        {songs.map((item) => (
          <MusicCard
            key={item.id}
            title={item.title}
            artist={item.artist}
            duration={item.duration}
            imageUrl={item.imageUrl}
            onMouseDown={() => goToSong(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
