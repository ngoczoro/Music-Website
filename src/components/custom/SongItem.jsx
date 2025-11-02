import React from "react";
import "../../styles/theme.css";

export function SongItem({ index, song }) {
  // Xử lý ảnh và định dạng thời lượng
  const coverUrl = song.coverImageUrl
    ? `http://localhost:8081${song.coverImageUrl}` // đúng đường dẫn BE
    : "https://via.placeholder.com/80"; // fallback nếu không có ảnh

  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="song-item">
      {/* STT / Nút Play */}
      <div className="song-index">
        <span>{index}</span>
        <button className="play-btn">
          <img src="./src/assets/icon/play.svg" alt="Play" />
        </button>
      </div>

      {/* Ảnh bài hát */}
      <div className="song-cover">
        <img src={coverUrl} alt={song.title} />
      </div>

      {/* Thông tin bài hát */}
      <div className="song-info">
        <div className="song-title">{song.title || "Untitled"}</div>
        <div className="song-artist">{song.artistName || "Unknown Artist"}</div>
      </div>

      {/* Hành động bên phải */}
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
