import React from "react";
import "../../styles/theme.css";

export function MusicCard({ title, artist, imageUrl, duration, onMouseDown }) {
  return (
    <div
      className="music-card"
      onMouseDown={onMouseDown}
      style={{ cursor: "pointer" }}
    >
      <div className="music-cover">
        <img
          src={
            imageUrl?.startsWith("http")
              ? imageUrl
              : `http://localhost:8081${imageUrl}`
          }
          alt={title}
        />

        <button
          className="music-play-btn"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <img src="./src/assets/icon/play.svg" />
        </button>
      </div>

      <div className="music-info">
        <div>
          <h3 className="music-title">{title}</h3>
          <p className="music-artist">{artist}</p>
          <p className="music-duration">{duration}</p>
        </div>

        <button className="music-more">⋮</button>
      </div>
    </div>
  );
}
