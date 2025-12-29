import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../../styles/theme.css";
import { fetchPlaylistById, fetchSongsInPlaylist } from "../../services/musicService";
import { MusicCard } from "../../components/custom/MusicCard";


export default function PlaylistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [sortOption, setSortOption] = useState("latest_added");
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);


  useEffect(() => {
  const keyword = searchKeyword.trim();

  // chưa gõ gì
  if (!keyword) {
    setIsSearching(false);
    setSearchResults([]);
    return;
  }

  // gõ < 2 ký tự → KHÔNG search
  if (keyword.length < 2) {
    setIsSearching(false);
    setSearchResults([]);
    return;
  }

  setIsSearching(true);

  const timeoutId = setTimeout(() => {
    searchSongs(keyword);
  }, 300);

  return () => clearTimeout(timeoutId);
}, [searchKeyword]);




  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        setLoading(true);
        // Fetch playlist info
        const playlistData = await fetchPlaylistById(id);
        setPlaylist(playlistData);


        // Fetch songs in playlist
        const songsData = await fetchSongsInPlaylist(id);
        setSongs(songsData);
      } catch (err) {
        console.error("Error when loading current playlist:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    if (id) {
      loadPlaylist();
    }
  }, [id]);


  // Sorting helper
const sortedSongs = React.useMemo(() => {
  switch (sortOption) {
    case "oldest_added":
      return [...songs].reverse();


    case "latest_added":
      return [...songs]; // hoặc reverse tùy API trả về


    default:
      return songs;
  }
}, [songs, sortOption]);




  const indexOfLast = currentPage * songsPerPage;
  const indexOfFirst = indexOfLast - songsPerPage;
  const currentSongs = sortedSongs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedSongs.length / songsPerPage);


  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  async function searchSongs(keyword) {
  if (!keyword.trim()) {
    setSearchResults([]);
    return;
  }

  try {
    setSearchLoading(true);
    const res = await fetch(
      `http://localhost:8081/api/common/song/search?keyword=${encodeURIComponent(keyword)}`
    );
    const data = await res.json();
    setSearchResults(data || []);
  } catch (err) {
    console.error("Search song error:", err);
  } finally {
    setSearchLoading(false);
  }
}


  function onPlaySong(songId) {
    navigate(`/song/${songId}`);
  }


  function onRenamePlaylist() {
    // TODO: Implement rename playlist API call
    alert("TODO: Open rename dialog / API call");
  }


  function onAddSong() {
  setShowAddSongModal(true);
  }

function onSearchChange(e) {
  setSearchKeyword(e.target.value);
}


  function onDeleteSong(songId) {
    // TODO: Implement delete song from playlist API call
    if (window.confirm("Are you sure you want to remove this song from the playlist?")) {
      // For now, just remove from local state
      setSongs(prev => prev.filter(s => (s.id || s._id) !== songId));
    }
  }


  function onOpenSongMenu(song) {
    setSelectedSong(song);
    setShowMenu(true);
  }




  if (loading) {
    return <div className="main-content playlist-detail-page"><p>Loading...</p></div>;
  }


  if (error) {
    return <div className="main-content playlist-detail-page"><p>Error: {error}</p>
      <Link to="/playlist" className="btn-primary" style={{ marginTop: "16px", marginLeft: "500px", display: "inline-block" }}>
   ← Back to Your Playlists
      </Link>
    </div>;
  }


  if (!playlist) {
    return <div className="main-content playlist-detail-page"><p>Playlist not found.</p>
      <Link to="/playlist" className="btn-primary" style={{ marginTop: "16px", marginLeft: "500px", display: "inline-block" }}>
   ← Back to Your Playlists
      </Link>
    </div>;
  }


  return (
    <>
    <div className="main-content playlist-detail-page">
      <div className="breadcrumb" style={{ marginTop: "25px",display: "flex"}}> 
        <span style={{ fontSize: '18px' }}>
        <Link to="/playlist">Your Playlist</Link>
        <span className="breadcrumb-sep"> ›› </span>
        <span className="breadcrumb-current">"{playlist.name}" playlist</span>
        </span>

        {playlist.description && (
    <div
      className="playlist-description"
      style={{
        marginTop: "6px",
        fontSize: "14px",
        opacity: 0.7
      }}
    >
      <strong>Playlist's description:</strong>{" "}
      {playlist.description}
    </div>
  )}
      </div>


      <div className="page-actions-row">
        <div className="left-actions" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label className="playlist-sort-label">Sort by</label>

        <select
          className="playlist-sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
        <option value="latest_added">Latest added</option>
        <option value="oldest_added">Oldest added</option>
        <option value="latest_published">Latest published date</option>
        <option value="oldest_published">Oldest published date</option>
        </select>
        </div>



        <div
  className="right-actions"
  style={{
    marginLeft: "950px",
    display: "flex",
    gap: "16px"
  }}
>
  <button className="btn-primary">
    ▶ Play All
  </button>

  <button className="btn-primary" onClick={onAddSong}>
    Add new song
  </button>
</div>

      </div>


      {songs.length === 0 ? (
        <p>This playlist is empty.</p>
      ) : (
        <>
          <div className="playlist-grid">
            {currentSongs.map((song) => {
              const songId = song.id || song._id;
              const imageUrl = song.imageUrl?.startsWith("http")
                ? song.imageUrl
                : song.imageUrl
                ? `http://localhost:8081${song.imageUrl}`
                : song.coverImageUrl?.startsWith("/")
                ? `http://localhost:8081${song.coverImageUrl}`
                : song.coverImageUrl || "https://via.placeholder.com/300";
             
              return (
                <div key={songId} style={{ position: "relative" }}>
                  <MusicCard
                    title={song.title || song.name}
                    artist={song.artist || song.artistName || "Unknown Artist"}
                    duration={formatDuration(song.duration)}
                    imageUrl={imageUrl}
                    onClick={() => onPlaySong(songId)}
                  />
                  <div
                    className="card-actions"
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      display: "flex",
                      gap: "5px",
                      zIndex: 10,
                    }}
                  >
                    <button
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSongMenu(song);
                      }}
                      title="Options"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    >
                      ⋯
                    </button>
                    <button
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSong(songId);
                      }}
                      title="Delete song"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              );
            })}
          </div>


          {totalPages > 1 && (
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
          )}
        </>
      )}


      {showMenu && selectedSong && (
        <div className="modal-overlay" onClick={() => setShowMenu(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedSong.title || selectedSong.name}</h3>


            <button className="modal-item" onClick={() => {
              onPlaySong(selectedSong.id || selectedSong._id);
              setShowMenu(false);
            }}>
              ▶ Play
            </button>
            <button className="modal-item" onClick={onRenamePlaylist}>
              ✏ Rename playlist
            </button>
            <button
              className="modal-item delete"
              onClick={() => {
                onDeleteSong(selectedSong.id || selectedSong._id);
                setShowMenu(false);
              }}
            >
              🗑 Remove from playlist
            </button>
          </div>
        </div>
      )}
    </div>

    {showAddSongModal && (
  <div className="modal-overlay" onClick={() => setShowAddSongModal(false)}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ width: "500px" }}>
      <h3>Add song to playlist</h3>

      <input
        type="text"
        placeholder="Search song by name..."
        value={searchKeyword}
        onChange={onSearchChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      {searchLoading && <p>Searching...</p>}

      {/* Gõ < 2 ký tự */}
{searchKeyword.trim().length > 0 &&
 searchKeyword.trim().length < 2 && (
  <p style={{ opacity: 0.6 }}>Type at least 2 characters to search</p>
)}

{/* Đang search */}
{searchLoading && <p>Searching...</p>}

{/* Đã search xong nhưng không có kết quả */}
{isSearching &&
 !searchLoading &&
 searchResults.length === 0 && (
  <p>No song found</p>
)}



      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {searchResults.map((song) => {
          const songId = song.id || song._id;
          return (
            <div
              key={songId}
              onClick={async () => {
                // TODO: CALL ADD SONG API HERE
                await addSongToPlaylist(playlist._id, songId);
                setSongs(prev => [...prev, song]);

                setShowAddSongModal(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee"
              }}
            >
              <img
                src={
                  song.imageUrl?.startsWith("http")
                    ? song.imageUrl
                    : song.imageUrl
                    ? `http://localhost:8081${song.imageUrl}`
                    : "https://via.placeholder.com/50"
                }
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "6px" }}
              />

              <div>
                <div style={{ fontWeight: 600 }}>
                  {song.title || song.name}
                </div>
                <div style={{ fontSize: "13px", opacity: 0.7 }}>
                  {song.artistName || "Unknown artist"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: "16px" }}
        onClick={() => setShowAddSongModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
</>
  );
}


