import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongPlayer from "../../components/custom/SongPlayer";
import LyricsPanel from "../../components/custom/LyricsPanel";
import ArtistInfoPanel from "../../components/custom/ArtistInfoPanel";
import { fetchSongById } from "../../services/authService";
import "../../styles/theme.css";

const SongDetail = () => {
  const { id } = useParams(); // songId
  const [song, setSong] = useState(null);

  useEffect(() => {
    const loadSong = async () => {
      try {
        const data = await fetchSongById(id);
        // song.artistId là string (ObjectId dạng string)
        setSong(data);
      } catch (err) {
        console.error("Lỗi khi fetch song:", err.message);
      }
    };
    loadSong();
  }, [id]);

  return (
    <div
      className="songdetail-container"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div className="songplayer-section">
        <SongPlayer songId={id} />
      </div>

      <div className="panel-section" style={{ display: "flex", gap: "20px" }}>
        <LyricsPanel songId={id} />
        {song && (
          <ArtistInfoPanel
            artistId={song.artistId}
            topSongs={song.topSongs || 0}
          />
        )}
      </div>
    </div>
  );
};

export default SongDetail;
