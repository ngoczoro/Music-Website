import React, { useEffect, useState } from "react";
import "../../styles/theme.css";
import { Users, Music, Award } from "lucide-react";
import { fetchArtistById } from "../../services/authService";

export default function ArtistInfoPanel({ artistId, topSongs }) {
  const [artist, setArtist] = useState({
    fullName: "",
    avatarUrl: "",
    bio: "",
  });

  useEffect(() => {
    if (!artistId) return;

    const loadArtist = async () => {
      try {
        const data = await fetchArtistById(artistId.toString()); // chắc chắn là string
        setArtist({
          fullName: data.fullName || "Unknown Artist",
          avatarUrl: data.avatarUrl || "",
          bio: data.bio || "",
        });
      } catch (err) {
        console.error("Lỗi khi load artist:", err.message);
      }
    };

    loadArtist();
  }, [artistId]);

  return (
    <div className="artist-info-panel">
      <h2 className="artist-info-title">Artist Information</h2>

      <div className="artist-info-header">
        <img
          src={
            artist.avatarUrl ||
            "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg"
          }
          alt={artist.fullName}
          className="artist-avatar"
        />

        <div className="artist-details">
          <h3 className="artist-name">{artist.fullName}</h3>

          <div className="artist-stats">
            <div className="artist-stat">
              <Users className="artist-icon" />
              <span>2.1M followers</span>
            </div>

            <div className="artist-stat">
              <Music className="artist-icon" />
              <span>8.7M monthly listeners</span>
            </div>
          </div>
        </div>
      </div>

      <div className="artist-about">
        <h4>About</h4>
        <p>{artist.bio || "No information available."}</p>
      </div>

      <div className="artist-achievement">
        <Award className="artist-icon" />
        <span>{topSongs || 0} songs in Top 100</span>
      </div>
    </div>
  );
}
