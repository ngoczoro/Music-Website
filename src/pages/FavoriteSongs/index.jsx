import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Sidebar } from "../../components/custom/Sidebar";
import { ProfileHeader } from "../../components/custom/ProfileHeader";
import { PlaylistList } from "../../components/custom/PlaylistList";
import { SongList } from "../../components/custom/SongList";
import { ArtistList } from "../../components/custom/ArtistList";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/theme.css";

export default function FavoriteSongs() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(8);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  // TODO: replace fake API → real API call: /api/favorites
  useEffect(() => {
    const fakeFavorites = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: "Name of song",
      artist: "name of artist",
      cover: "https://via.placeholder.com/300",
      duration: "4:24",
    }));
    setFavoriteSongs(fakeFavorites);
  }, []);

  const indexOfLast = currentPage * songsPerPage;
  const indexOfFirst = indexOfLast - songsPerPage;
  const currentSongs = favoriteSongs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(favoriteSongs.length / songsPerPage);

  function onPlaySong(song) {
    setCurrentTrack(song);
    setShowPlayer(true);
  }

  function unlikeSong(songId) {
    setFavoriteSongs(prev => prev.filter(s => s.id !== songId));
  }

  return (
    <div className="main-content favourite-page">
      <h2 className="page-title">Your Favourite Songs</h2>

      <div className="song-grid">
        {currentSongs.map(song => (
          <div className="playlist-card" key={song.id}>
            <div className="cover-wrapper">
              <img src={song.cover} alt={song.title} className="playlist-cover" />
              <button
                className="play-overlay"
                aria-label={`Play ${song.title}`}
                onClick={() => onPlaySong(song)}
              >
                ▶
              </button>
              <button
                className="favorite-icon active"
                title="Remove from Favourite"
                onClick={() => unlikeSong(song.id)}
              >
                ❤️
              </button>
            </div>

            <div className="card-meta">
              <p className="playlist-title">{song.title}</p>
              <p className="playlist-info">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
          «
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          ›
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          »
        </button>
      </div>

      {showPlayer && currentTrack && (
        <div className="player-bar">
          <div className="player-left">
            <img src={currentTrack.cover} alt={currentTrack.title} className="player-cover" />
            <div className="player-meta">
              <div className="player-title">{currentTrack.title}</div>
              <div className="player-artist">{currentTrack.artist}</div>
            </div>
          </div>

          <div className="player-controls">
            <button className="icon-btn">⤯</button>
            <button className="icon-btn">⏮</button>
            <button className="play-pause">⏯</button>
            <button className="icon-btn">⏭</button>
            <button className="icon-btn">🔁</button>
          </div>

          <div className="player-right">
            <div className="time">1:29</div>
            <div className="progress-bar">
              <div className="progress" style={{ width: "35%" }} />
            </div>
            <div className="time">{currentTrack.duration}</div>
            <div className="player-actions">
              <button className="icon-btn">♡</button>
              <button className="icon-btn">🔊</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
