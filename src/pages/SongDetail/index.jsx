import React from "react";
import SongPlayer from "../../components/custom/SongPlayer";
import LyricsPanel from "../../components/custom/LyricsPanel";
import ArtistInfoPanel from "../../components/custom/ArtistInfoPanel";
import "../../styles/theme.css";

const SongDetail = () => {
  return (
    <div className="songdetail-container">
      <div className="songplayer-section">
        <SongPlayer />
      </div>

      <div className="panel-section">
        <LyricsPanel />
        <ArtistInfoPanel />
      </div>
    </div>
  );
};

export default SongDetail;
