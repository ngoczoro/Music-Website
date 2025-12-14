import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/theme.css";
import { fetchMyPlaylists, fetchSongsInPlaylist } from "../../services/musicService";
import { MusicCard } from "../../components/custom/MusicCard";

export default function FavoriteSongs() {
  const navigate = useNavigate();
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("recently-added"); // ✅ thêm state sort

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const playlists = await fetchMyPlaylists();
        const favorite = playlists.find((p) => p.name === "Favorites" || p.name === "Favourite");
        if (!favorite) {
          console.warn("Không tìm thấy playlist Favorites.");
          setFavoriteSongs([]);
          setLoading(false);
          return;
        }
        const songsData = await fetchSongsInPlaylist(favorite.id || favorite._id);
        setFavoriteSongs(songsData);
      } catch (err) {
        console.error("Error when loading favorite playlist:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  // ✅ Sort logic
  const sortedSongs = React.useMemo(() => {
    const data = [...favoriteSongs];
    if (sortBy === "a-z") {
      data.sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
    }
    return data;
  }, [favoriteSongs, sortBy]);

  const indexOfLast = currentPage * songsPerPage;
  const indexOfFirst = indexOfLast - songsPerPage;
  const currentSongs = sortedSongs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(sortedSongs.length / songsPerPage));

  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 3;
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
    } else {
      buttons.push(1);
      if (currentPage > maxVisible + 1) buttons.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) if (!buttons.includes(i)) buttons.push(i);
      if (currentPage < totalPages - maxVisible) buttons.push("...");
      if (!buttons.includes(totalPages)) buttons.push(totalPages);
    }
    return buttons;
  };

  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  function onPlaySong(songId) {
    navigate(`/song/${songId}`);
  }

  function unlikeSong(songId) {
    setFavoriteSongs(prev => prev.filter(s => (s.id || s._id) !== songId));
  }

  if (loading) return <div className="main-content favourite-page"><p>Loading...</p></div>;
  if (error) return <div className="main-content favourite-page"><p>Error: {error}</p></div>;

  return (
    <div className="main-content favourite-page">
      <h2 className="page-title">Your Favorites</h2>

      {/* ✅ Controls: sort + action buttons */}
      <div className="playlist-controls" style={{ display: "flex", alignItems: "center" }}>
        <select
          className="playlist-sort-dropdown"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="recently-added">Recently added</option>
          <option value="a-z">A-Z</option>
        </select>

        <div className="playlist-action-buttons">
          <button className="btn-primary" onClick={() => alert("TODO: Thêm bài hát vào Favorites")}>➕ Add new favorite song</button>
        </div>
      </div>

      {sortedSongs.length === 0 ? (
        <p>You don't have any favorite songs yet.</p>
      ) : (
        <div className="playlist-grid">
          {currentSongs.map(song => {
            const songId = song.id || song._id;
            const imageUrl = song.imageUrl || song.coverImageUrl || "https://via.placeholder.com/300";
            return (
              <div key={songId} style={{ position: "relative" }}>
                <MusicCard
                  title={song.title || song.name}
                  artist={song.artist || song.artistName || "Unknown Artist"}
                  duration={formatDuration(song.duration)}
                  imageUrl={imageUrl}
                  onClick={() => onPlaySong(songId)}
                />
                <button
                  className="favorite-icon active"
                  title="Remove from Favourite"
                  onClick={(e) => {
                    e.stopPropagation();
                    unlikeSong(songId);
                  }}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  ❤️
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination giữ nguyên */}
      <div className="pagination-container">
        <button
          className="pagination-btn pagination-nav-btn"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          title="First page"
        >
          ◀◀
        </button>

        <button
          className="pagination-btn pagination-nav-btn"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          title="Previous page"
        >
          ◀
        </button>

        {getPaginationButtons().map((pageNum, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              pageNum === currentPage ? "pagination-btn-active" : ""
            } ${pageNum === "..." ? "pagination-ellipsis" : ""}`}
            onClick={() => pageNum !== "..." && setCurrentPage(pageNum)}
            disabled={pageNum === "..."}
          >
            {pageNum}
          </button>
        ))}

        <button
          className="pagination-btn pagination-nav-btn"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          title="Next page"
        >
          ▶
        </button>

        <button
          className="pagination-btn pagination-nav-btn"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          title="Last page"
        >
          ▶▶
        </button>
      </div>
    </div>
  );
}
