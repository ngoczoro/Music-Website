import React from "react";
import "../../styles/theme.css";

export function ArtistCard({ name, followers, imageUrl }) {
  return (
    <div className="artist-card">
      <div className="artist-avatar">
        <img src={imageUrl} alt={name} />
      </div>

      <h3 className="artist-name">{name}</h3>
      <p className="artist-followers">{followers} followers</p>

      <button className="artist-button following">Following</button>
    </div>
  );
}
