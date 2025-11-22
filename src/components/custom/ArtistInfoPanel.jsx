import React, { useEffect, useState } from "react";
import "../../styles/theme.css";
import { Users, Music, Award } from "lucide-react";
import { fetchArtistById } from "../../services/authService";

export default function ArtistInfoPanel({ artistId, topSongs, artistData }) {
  const [artist, setArtist] = useState({
    fullName: "",
    avatarUrl: "",
    bio: "",
  });

  useEffect(() => {
    if (!artistId) return;

    const loadArtist = async () => {
      try {
        const res = await fetchArtistById(artistId);
        const data = res.data;

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
            artist.avatarUrl?.startsWith("http")
              ? artist.avatarUrl
              : `http://localhost:8081${
                  artist.avatarUrl || "/uploads/default-avatar.jpg"
                }`
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
