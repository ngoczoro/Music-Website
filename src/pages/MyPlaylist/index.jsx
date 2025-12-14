"use client"

import { useEffect, useState } from "react";
import "../../styles/theme.css";
import { useNavigate } from "react-router-dom";
import { fetchMyPlaylists } from "../../services/musicService";
import { PlaylistCard } from "../../components/custom/PlaylistCard";
import { createPlaylist } from "../../services/musicService";
import { updatePlaylist } from "../../services/musicService";
import { deletePlaylist } from "../../services/musicService";

const MyPlaylist = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recently-added");
  const playlistsPerPage = 8
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const selectedPlaylist = playlists.find(
  p => p._id === selectedPlaylistId
);
  const isFavoriteSelected = selectedPlaylist?.name?.toLowerCase() === "favorites";
  const [showAddForm, setShowAddForm] = useState(false);

  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    description: "",
    thumbnail: null,
  });


const loadPlaylists = async () => {
  try {
    setLoading(true);
    const data = await fetchMyPlaylists();

    console.log("🎧 PLAYLISTS FROM API:", data);

    let sortedData = [...data];

    if (sortBy === "recently-added") {
      sortedData = sortedData.reverse(); // 🔥 playlist mới lên đầu
    }

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


useEffect(() => {
  setSelectedPlaylistId(null); // 👈 clear selection khi sort
  loadPlaylists();
}, [sortBy]);


const handleCreatePlaylist = async () => {
  if (!newPlaylist.name.trim()) {
    alert("Playlist name can be not empty and playlist is NOT created");
    return;
  }

  const formData = new FormData();
  formData.append("name", newPlaylist.name);
  formData.append("description", newPlaylist.description);

  if (newPlaylist.thumbnail) {
    formData.append("thumbnail", newPlaylist.thumbnail);
  }

  try {
    await createPlaylist(formData);

    setShowAddForm(false);
    setNewPlaylist({ name: "", description: "", thumbnail: null });
    setCurrentPage(1);
    await loadPlaylists();
  } catch (err) {
    alert("Failed to create playlist");
  }
};



const handleEditPlaylist = async () => {
  if (!selectedPlaylistId) {
    alert("Please select a playlist first");
    return;
  }

  const newName = prompt("New playlist name:");
  if (!newName) return;

  await updatePlaylist(selectedPlaylistId, {
    name: newName,
  });

  await loadPlaylists(); // 🔁 refetch
};

const handleDeletePlaylist = async () => {
  if (!selectedPlaylistId) {
    alert("Please select a playlist first");
    return;
  }

  const selectedPlaylist = playlists.find(
    p => p._id === selectedPlaylistId
  );

  if (!selectedPlaylist) return;

  if (selectedPlaylist.name.toLowerCase() === "favorites") {
    alert("You cannot delete Favorites playlist");
    return;
  }

  const ok = window.confirm(
    `Delete playlist "${selectedPlaylist.name}"?`
  );
  if (!ok) return;

  await deletePlaylist(selectedPlaylist._id);
  setSelectedPlaylistId(null);
  await loadPlaylists();
};

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
        {showAddForm && (
  <div className="playlist-add-form">
    <h3>Create new playlist</h3>

    {/* Name */}
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        value={newPlaylist.name}
        onChange={(e) =>
          setNewPlaylist({ ...newPlaylist, name: e.target.value })
        }
        placeholder="Enter playlist name"
      />
    </div>

    {/* Description */}
    <div className="form-group">
      <label>Description</label>
      <textarea
        value={newPlaylist.description}
        onChange={(e) =>
          setNewPlaylist({ ...newPlaylist, description: e.target.value })
        }
        placeholder="Enter description"
      />
    </div>

    {/* Thumbnail */}
    <div className="form-group">
      <label>Thumbnail</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setNewPlaylist({ ...newPlaylist, thumbnail: e.target.files[0] })
        }
      />
    </div>

    {/* Buttons */}
    <div className="form-actions">
      <button
        className="btn-primary"
        onClick={handleCreatePlaylist}
      >
        Create
      </button>

      <button
        className="btn-secondary"
        onClick={() => {
          setShowAddForm(false);
          setNewPlaylist({ name: "", description: "", thumbnail: null });
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}

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
          <button
            className="btn-primary"
            onClick={() => setShowAddForm(true)}
          >
          ➕ Add new playlist
          </button>


          <button
            className="btn-primary"
            onClick={handleEditPlaylist}
            disabled={!selectedPlaylistId || isFavoriteSelected}
            style={{
              opacity: !selectedPlaylistId || isFavoriteSelected ? 0.5 : 1,
              cursor: !selectedPlaylistId || isFavoriteSelected ? "not-allowed" : "pointer",
            }}
>
            ✏ Customize created playlist
          </button>

          <button
            className="btn-primary btn-danger"
            onClick={handleDeletePlaylist}
            disabled={!selectedPlaylistId || isFavoriteSelected}
            style={{
              opacity: !selectedPlaylistId || isFavoriteSelected ? 0.5 : 1,
              cursor: !selectedPlaylistId || isFavoriteSelected ? "not-allowed" : "pointer",
            }}
>
            🗑 Delete created playlist
          </button>
        </div>
      </div>

      {/* Playlists grid */}
      {currentPlaylists.length === 0 ? (
        <p className="text-gray-500">You don't have any playlists yet.</p>
      ) : (
        <div
        className="playlist-grid-container"
        onClick={() => setSelectedPlaylistId(null)}
        >

          {currentPlaylists.map((p) => {
          const isSelected = selectedPlaylistId === p._id;

    return (
    <div key={p._id} style={{ display: "flex", justifyContent: "flex-start" }}>
      <div
        onClick={(e) => {
          e.stopPropagation();              // ⛔ không cho click lan ra grid
          setSelectedPlaylistId(p._id);     // ✅ chọn playlist
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();              // ⛔ không clear selection
          navigate(`/playlists/${p._id}`);  // ➡️ vào detail
        }}
        style={{
          display: "inline-block",
          border: isSelected
            ? "2px solid #4f46e5"
            : "2px solid transparent",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        <PlaylistCard
          title={p.name}
          songs={p.songs}
          isPublic={p.isPublic}
          imageUrl={
            p.image || p.thumbnailUrl || "/uploads/images/default-img.jpg"
          }
        />
      </div>
    </div>
  );
})} 
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
