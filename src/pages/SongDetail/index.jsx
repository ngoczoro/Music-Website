import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const autoplay = location.state?.autoplay;
  const navigate = useNavigate();

  // Sync khi đổi route /song/:id
  useEffect(() => {
    setCurrentSongId(id);
  }, [id]);

  useEffect(() => {
    const loadSong = async () => {
      const { data } = await fetchSongById(currentSongId);
      setSong(data);

      const token = localStorage.getItem("authToken");

      const res = await fetch(
        `http://localhost:8081/api/common/song/artist/${data.artistId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!res.ok) {
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
        autoplay={autoplay}
        onChangeSong={(newSongId) => {
          navigate(`/song/${newSongId}`, { replace: true });
        }}
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
