"use client"


import { useEffect, useState } from "react";
import "../../styles/theme.css";
import { useNavigate } from "react-router-dom";
import { fetchMyPlaylists } from "../../services/musicService";
import { PlaylistCard } from "../../components/custom/PlaylistCard";


const MyPlaylist = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recently-added");
  const playlistsPerPage = 8
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchAndSetPlaylists = async () => {
      try {
        setLoading(true);
        const data = await fetchMyPlaylists();
        const sortedData = [...data];
        if (sortBy === "a-z") {
          sortedData.sort((a, b) => a.name.localeCompare(b.name));
        }
        setPlaylists(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetPlaylists();
  }, [sortBy]);

  // 🧮 Pagination
  const indexOfLast = currentPage * playlistsPerPage
  const indexOfFirst = indexOfLast - playlistsPerPage
  const currentPlaylists = playlists.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(playlists.length / playlistsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const getPaginationButtons = () => {
    const buttons = []
    const maxVisible = 3

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i)
      }
    } else {
      buttons.push(1)
      if (currentPage > maxVisible + 1) buttons.push("...")

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        if (!buttons.includes(i)) buttons.push(i)
      }

      if (currentPage < totalPages - maxVisible) buttons.push("...")
      if (!buttons.includes(totalPages)) buttons.push(totalPages)
    }

    return buttons
  }

  if (loading) return <p className="p-10 text-gray-500">Loading playlists...</p>
  if (error) return <p className="p-10 text-red-500">Error: {error}</p>

  return (
    <div className="playlist-main-container">
      {/* Header with title and underline */}
      <div className="playlist-header-section">
        <h2 className="page-title">Your Playlist</h2>
      </div>

      {/* Sorting dropdown */}
      <div className="playlist-controls">
        <select
          className="playlist-sort-dropdown"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option value="recently-added">Recently added</option>
          <option value="a-z">A-Z</option>
        </select>

        {/* ✅ Nhóm nút nằm bên phải */}
        <div className="playlist-action-buttons-2">
          <button className="btn-primary" onClick={() => alert("TODO: Thêm playlist")}>➕ Add new playlist</button>
          <button className="btn-primary" onClick={() => alert("TODO: Sửa playlist")}>✏ Customize created playlist</button>
          <button className="btn-primary btn-danger" onClick={() => alert("TODO: Xóa playlist")}>🗑 Delete created playlist</button>
        </div>
      </div>

      {/* Playlists grid */}
      {currentPlaylists.length === 0 ? (
        <p className="text-gray-500">You don't have any playlists yet.</p>
      ) : (
        <div className="playlist-grid-container">
          {currentPlaylists.map((p) => (
            <div key={p._id} onClick={() => navigate(`/playlists/${p._id}`)} style={{ cursor: "pointer" }}>
              <PlaylistCard
                title={p.name}
                songs={p.songs}
                isPublic={p.isPublic}
                imageUrl={p.image || p.thumbnailUrl || "/uploads/images/default-img.jpg"}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination (always show) */}
      <div className="pagination-container">
        <button
          className="pagination-btn pagination-nav-btn"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          title="First page"
        >
          ◀◀
        </button>

        <button
          className="pagination-btn pagination-nav-btn"
          onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => pageNum !== "..." && handlePageChange(pageNum)}
            disabled={pageNum === "..."}
          >
            {pageNum}
          </button>
        ))}

        <button
          className="pagination-btn pagination-nav-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Next page"
        >
          ▶
        </button>

        <button
          className="pagination-btn pagination-nav-btn"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Last page"
        >
          ▶▶
        </button>
      </div>
    </div>
  )
}

export default MyPlaylist
