import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/theme.css";

export function SongItem({ index, song }) {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/song/${song._id || song.id}`); // Chuyển sang trang chi tiết bài hát
  };

  const coverUrl = song.coverImageUrl?.startsWith("/")
    ? `http://localhost:8081${song.coverImageUrl}`
    : song.coverImageUrl;

  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
        <button className="heart-btn">
          <img src="./src/assets/icon/redheart.svg" alt="Heart" />
        </button>
        <span className="song-time">{formatDuration(song.duration)}</span>
        <button className="more-btn">
          <img src="./src/assets/icon/more.svg" alt="More" />
        </button>
      </div>
    </div>
  );
}
