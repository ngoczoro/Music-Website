import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import { fetchMyPlaylists } from "../../services/musicService";

const MyPlaylist = () => {
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const playlistsPerPage = 8;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("recent");

  // Load playlists from real backend API
  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        const data = await fetchMyPlaylists();
        setPlaylists(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi khi tải playlist:", err.message || err);
        setError(err.message || "Failed to load playlists");
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  // Sort playlists (Recently added / A-Z)
  const sortedPlaylists = useMemo(() => {
    if (sortOption === "az") {
      return [...playlists].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }
    // "recent" → giữ nguyên thứ tự trả về từ backend
    return playlists;
  }, [playlists, sortOption]);

  // Pagination based on sorted playlists
  const indexOfLast = currentPage * playlistsPerPage;
  const indexOfFirst = indexOfLast - playlistsPerPage;
  const currentPlaylists = sortedPlaylists.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedPlaylists.length / playlistsPerPage) || 1;

  if (loading) {
    return <p className="p-10 text-gray-500">Loading playlists...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="main-content playlist-page">
      <h2 className="page-title">Your Playlist</h2>

      <div className="page-actions-row">
        <div className="left-actions">
          <select
            className="playlist-sort"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="recent">Recently added</option>
            <option value="az">A-Z</option>
          </select>
        </div>
      </div>

      {currentPlaylists.length === 0 ? (
        <p className="empty-state-text">
          You don’t have any playlists yet. Create one to get started!
        </p>
      ) : (
        <div className="song-grid">
          {currentPlaylists.map((p) => (
            <div
              key={p.id || p._id}
              className="playlist-card"
              onClick={() => navigate(`/playlists/${p.id || p._id}`)}
            >
              <div className="cover-wrapper">
                <img
                  src={
                    p.thumbnailUrl ||
                    p.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={p.name}
                  className="playlist-cover"
                />
              </div>

              <div className="card-meta">
                <p className="playlist-title">{p.name}</p>
                {/* Backend PlaylistResponse currently has no owner field,
                    nên hiển thị mô tả hoặc để trống tùy trường hợp */}
                <p className="playlist-info">{p.description || ""}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            «
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
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
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
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
      )}
    </div>
  );
};

export default MyPlaylist;
