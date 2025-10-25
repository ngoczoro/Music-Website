import React from "react";
import "../../styles/theme.css";

export function SongItem({ index, song }) {
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
        <img src={song.cover} alt={song.title} />
      </div>

      {/* Thông tin bài hát */}
      <div className="song-info">
        <div className="song-title">{song.title}</div>
        <div className="song-artist">{song.artist}</div>
      </div>

      {/* Album */}
      <div className="song-album">{song.album}</div>

      {/* Hành động bên phải */}
      <div className="song-actions">
        <button className="heart-btn">
          <img src="./src/assets/icon/redheart.svg" alt="Heart" />
        </button>
        <span className="song-time">{song.duration}</span>
        <button className="more-btn">
          <img src="./src/assets/icon/more.svg" alt="More" />
        </button>
      </div>
    </div>
  );
}
