import React from "react";
import "../../styles/theme.css";

export function PlaylistCard({ title, songs, isPublic = true, imageUrl }) {
  return (
    <div className="playlist-card">
      <div className="playlist-cover">
        <img
          src={
            imageUrl?.startsWith("http")
              ? imageUrl
              : `http://localhost:8081${imageUrl}`
          }
          alt={title}
          className="playlist-image"
        />
        <button className="playlist-play-btn">
          <img src="./src/assets/icon/play.svg" />
        </button>
      </div>

      <h3 className="playlist-title">{title}</h3>
      <p className="playlist-info">
        {Array.isArray(songs) ? songs.length : 0} songs •{" "}
        {isPublic ? "Public" : "Private"}
      </p>

      <button className="playlist-more">
        <span>⋮</span>
      </button>
    </div>
  );
}
