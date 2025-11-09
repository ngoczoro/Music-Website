import React from "react";
import "../../styles/theme.css";
import { Users, Music, Award } from "lucide-react";

export default function ArtistInfoPanel({ image, topSongs }) {
  return (
    <div className="artist-info-panel">
      <h2 className="artist-info-title">Artist Information</h2>

      <div className="artist-info-header">
        <img
          src="https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg"
          alt={name}
          className="artist-avatar"
        />

        <div className="artist-details">
          <h3 className="artist-name">Luna Martinez</h3>

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
        <p>
          Luna Martinez is an award-winning singer-songwriter known for her
          ethereal vocals and captivating melodies. With influences ranging from
          indie pop to electronic music, she creates atmospheric soundscapes
          that resonate with listeners worldwide. Her debut album "Starlight"
          reached platinum status and established her as one of the most
          promising artists. Luna Martinez is an award-winning singer-songwriter
          known for her ethereal vocals and captivating melodies. With
          influences ranging from indie pop to electronic music, she creates
          atmospheric soundscapes that resonate with listeners worldwide. Her
          debut album "Starlight" reached platinum status and established her as
          one of the most promising artists.
        </p>
      </div>

      <div className="artist-achievement">
        <Award className="artist-icon" />
        <span>{topSongs} songs in Top 100</span>
      </div>
    </div>
  );
}
