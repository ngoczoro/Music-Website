import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongPlayer from "../../components/custom/SongPlayer";
import LyricsPanel from "../../components/custom/LyricsPanel";
import ArtistInfoPanel from "../../components/custom/ArtistInfoPanel";
import { fetchSongById } from "../../services/musicService";

const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongId, setCurrentSongId] = useState(id);
  useEffect(() => {
    const loadSong = async () => {
      const { data } = await fetchSongById(currentSongId);
      setSong(data);

      const token = localStorage.getItem("authToken");

      const res = await fetch(
        `http://localhost:8081/api/common/song/artist/${data.artistId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!res.ok) {
        console.error("❌ Lỗi fetch songs:", res.status);
        setQueue([]);
        return;
      }

      const artistSongs = await res.json();

      setQueue(artistSongs);
    };

    loadSong();
  }, [currentSongId]);

  if (!song) return <div>Loading...</div>;

  return (
    <div className="songdetail-container">
      <SongPlayer
        songId={currentSongId}
        songList={queue}
        onChangeSong={setCurrentSongId}
        onTimeUpdate={setCurrentTime}
      />

      <div className="panel-section">
        <LyricsPanel songId={currentSongId} currentTime={currentTime} />
        <ArtistInfoPanel artistId={song.artistId} />
      </div>
    </div>
  );
};

export default SongDetail;
