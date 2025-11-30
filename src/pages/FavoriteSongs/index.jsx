// import React, { useState, useEffect } from "react";
// import { useNavigate, Link, useParams } from "react-router-dom";
// import { Sidebar } from "../../components/custom/Sidebar";
// import { ProfileHeader } from "../../components/custom/ProfileHeader";
// import { PlaylistList } from "../../components/custom/PlaylistList";
// import { SongList } from "../../components/custom/SongList";
// import { ArtistList } from "../../components/custom/ArtistList";
// import Breadcrumb from "../components/Breadcrumb";
// import "../styles/theme.css";

// export default function FavoriteSongs() {
//   const [favoriteSongs, setFavoriteSongs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [songsPerPage] = useState(8);
//   const [showPlayer, setShowPlayer] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState(null);

//   // TODO: replace fake API → real API call: /api/favorites
//   useEffect(() => {
//     const fakeFavorites = Array.from({ length: 20 }, (_, i) => ({
//       id: i + 1,
//       title: "Name of song",
//       artist: "name of artist",
//       cover: "https://via.placeholder.com/300",
//       duration: "4:24",
//     }));
//     setFavoriteSongs(fakeFavorites);
//   }, []);

//   const indexOfLast = currentPage * songsPerPage;
//   const indexOfFirst = indexOfLast - songsPerPage;
//   const currentSongs = favoriteSongs.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(favoriteSongs.length / songsPerPage);

//   function onPlaySong(song) {
//     setCurrentTrack(song);
//     setShowPlayer(true);
//   }

//   function unlikeSong(songId) {
//     setFavoriteSongs(prev => prev.filter(s => s.id !== songId));
//   }

//   return (
//     <div className="main-content favourite-page">
//       <h2 className="page-title">Your Favourite Songs</h2>

//       <div className="song-grid">
//         {currentSongs.map(song => (
//           <div className="playlist-card" key={song.id}>
//             <div className="cover-wrapper">
//               <img src={song.cover} alt={song.title} className="playlist-cover" />
//               <button
//                 className="play-overlay"
//                 aria-label={`Play ${song.title}`}
//                 onClick={() => onPlaySong(song)}
//               >
//                 ▶
//               </button>
//               <button
//                 className="favorite-icon active"
//                 title="Remove from Favourite"
//                 onClick={() => unlikeSong(song.id)}
//               >
//                 ❤️
//               </button>
//             </div>

//             <div className="card-meta">
//               <p className="playlist-title">{song.title}</p>
//               <p className="playlist-info">{song.artist}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
//           «
//         </button>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//         >
//           ‹
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             className={currentPage === i + 1 ? "active" : ""}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//         >
//           ›
//         </button>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(totalPages)}
//         >
//           »
//         </button>
//       </div>

//       {showPlayer && currentTrack && (
//         <div className="player-bar">
//           <div className="player-left">
//             <img src={currentTrack.cover} alt={currentTrack.title} className="player-cover" />
//             <div className="player-meta">
//               <div className="player-title">{currentTrack.title}</div>
//               <div className="player-artist">{currentTrack.artist}</div>
//             </div>
//           </div>

//           <div className="player-controls">
//             <button className="icon-btn">⤯</button>
//             <button className="icon-btn">⏮</button>
//             <button className="play-pause">⏯</button>
//             <button className="icon-btn">⏭</button>
//             <button className="icon-btn">🔁</button>
//           </div>

//           <div className="player-right">
//             <div className="time">1:29</div>
//             <div className="progress-bar">
//               <div className="progress" style={{ width: "35%" }} />
//             </div>
//             <div className="time">{currentTrack.duration}</div>
//             <div className="player-actions">
//               <button className="icon-btn">♡</button>
//               <button className="icon-btn">🔊</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        // Lấy tất cả playlist của user
        const playlists = await fetchMyPlaylists();

        // Tìm playlist "Favorites"
        const favorite = playlists.find((p) => p.name === "Favorites" || p.name === "Favourite");
        if (!favorite) {
          console.warn("Không tìm thấy playlist Favorites.");
          setFavoriteSongs([]);
          setLoading(false);
          return;
        }

        // Gọi API lấy songs trong playlist đó
        const songsData = await fetchSongsInPlaylist(favorite.id || favorite._id);
        setFavoriteSongs(songsData);
      } catch (err) {
        console.error("Lỗi khi tải playlist yêu thích:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const indexOfLast = currentPage * songsPerPage;
  const indexOfFirst = indexOfLast - songsPerPage;
  const currentSongs = favoriteSongs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(favoriteSongs.length / songsPerPage);

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
    // TODO: Implement API call to remove song from favorites
    setFavoriteSongs(prev => prev.filter(s => (s.id || s._id) !== songId));
  }

  if (loading) {
    return <div className="main-content favourite-page"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="main-content favourite-page"><p>Error: {error}</p></div>;
  }

  return (
    <div className="main-content favourite-page">
      <h2 className="page-title">Your Favourite Songs</h2>

      {favoriteSongs.length === 0 ? (
        <p>You don't have any favorite songs yet.</p>
      ) : (
        <>
          <div className="playlist-grid">
            {currentSongs.map(song => {
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
    </div>
  );
}
