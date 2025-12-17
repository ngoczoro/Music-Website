import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addSongToFavorites,
  removeSongFromFavorites,
  fetchMyPlaylists,
} from "../../services/musicService";
import "../../styles/theme.css";

export function SongItem({ index, song }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if this song is in Favorites
    const checkFavorite = async () => {
      try {
        const playlists = await fetchMyPlaylists();
        const favorite = playlists.find((p) => p.name === "Favorites");
        setIsFavorite(
          favorite &&
            favorite.songs &&
            favorite.songs.includes(song._id || song.id)
        );
      } catch {
        setIsFavorite(false);
      }
    };
    checkFavorite();
  }, [song._id, song.id]);

  const handlePlayClick = () => {
    navigate(`/song/${song._id || song.id}`);
  };

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      if (isFavorite) {
        await removeSongFromFavorites(song._id || song.id);
        setIsFavorite(false);
        window.dispatchEvent(
          new CustomEvent("favorite-updated", {
            detail: { songId: song._id || song.id, action: "remove" },
          })
        );
      } else {
        await addSongToFavorites(song._id || song.id);
        setIsFavorite(true);
        window.dispatchEvent(
          new CustomEvent("favorite-updated", {
            detail: { songId: song._id || song.id, action: "add" },
          })
        );
      }
    } catch (err) {
      alert("Lỗi khi cập nhật yêu thích: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const coverUrl = song.coverImageUrl?.startsWith("/")
    ? `http://localhost:8081${song.coverImageUrl}`
    : song.coverImageUrl;

  return (
    <div
      className="song-item"
      onClick={handlePlayClick}
      style={{ cursor: "pointer" }}
    >
      <div className="song-index">
        <span>{index}</span>
        <button className="play-btn">
          <img src="./src/assets/icon/play.svg" alt="Play" />
        </button>
      </div>

      <div className="song-cover">
        <img src={coverUrl} alt={song.title} />
      </div>

      <div className="song-info">
        <div className="song-title">{song.title || "Untitled"}</div>
        <div className="song-artist">{song.artistName || "Unknown Artist"}</div>
      </div>

      <div className="song-actions">
        <button
          className={`heart-btn${isFavorite ? " active" : ""}`}
          onClick={handleHeartClick}
          disabled={loading}
        >
          <img
            src={
              isFavorite
                ? "./src/assets/icon/redheart.svg"
                : "./src/assets/icon/heart.svg"
            }
            alt="Heart"
          />
        </button>

        <button className="more-btn">
          <img src="./src/assets/icon/more.svg" alt="More" />
        </button>
      </div>
    </div>
  );
}
