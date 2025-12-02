import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Sidebar } from "../../components/custom/Sidebar";
import { ProfileHeader } from "../../components/custom/ProfileHeader";
import { PlaylistList } from "../../components/custom/PlaylistList";
import { SongList } from "../../components/custom/SongList";
import { ArtistList } from "../../components/custom/ArtistList";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/theme.css";
import { fetchPlaylistById, fetchSongsInPlaylist } from "../../services/musicService";
import { MusicCard } from "../../components/custom/MusicCard";


 export default function PlaylistDetail() {
   // If your router provides a playlist id, use it
   const { id } = useParams() || { id: "1" };
   const navigate = useNavigate && useNavigate();

   const [playlist, setPlaylist] = useState(null);
   const [songs, setSongs] = useState([]);
   const [sortOption, setSortOption] = useState("latest_added");
   const [currentPage, setCurrentPage] = useState(1);
   const [songsPerPage] = useState(8);
   const [showPlayer, setShowPlayer] = useState(false);
   const [currentTrack, setCurrentTrack] = useState(null);
   const [showMenu, setShowMenu] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // Fetch playlist detail + songs from real backend API
  useEffect(() => {
    const loadPlaylistDetail = async () => {
      try {
        // Lấy thông tin playlist theo ID
        const playlistData = await fetchPlaylistById(id);
        setPlaylist(playlistData);

        // Xác định playlistId để lấy danh sách bài hát
        const playlistId = playlistData?.id || playlistData?._id || id;

        // Lấy danh sách bài hát trong playlist
        const songsData = await fetchSongsInPlaylist(playlistId);
        setSongs(Array.isArray(songsData) ? songsData : []);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết playlist:", err.message || err);
        setPlaylist(null);
        setSongs([]);
      }
    };

    if (id) {
      loadPlaylistDetail();
    }
  }, [id]);

   // Sorting helper (placeholder logic)
   const sortedSongs = React.useMemo(() => {
     switch (sortOption) {
       case "oldest_added":
         return [...songs].reverse();
       case "latest_published":
       case "oldest_published":
       default:
         return songs;
     }
   }, [songs, sortOption]);

   const indexOfLast = currentPage * songsPerPage;
   const indexOfFirst = indexOfLast - songsPerPage;
   const currentSongs = sortedSongs.slice(indexOfFirst, indexOfLast);
   const totalPages = Math.ceil(sortedSongs.length / songsPerPage);

   function onPlaySong(song) {
     // open player and set current track
     setCurrentTrack(song);
     setShowPlayer(true);
   }

   function onRenamePlaylist() {
     // Placeholder: show rename dialog or navigate to edit
     // Example: navigate(`/playlists/${id}/edit`)
     alert("TODO: Open rename dialog / API call");
   }

   function onAddSong() {
     // Placeholder: open add-song modal
     alert("TODO: Open add song modal");
   }

   function onDeleteSong(songId) {
     // Placeholder: call delete API then refresh list
     alert(`TODO: Delete song ${songId} via API`);
   }

   function onOpenSongMenu(song) {
   setSelectedSong(song);
   setShowMenu(true);
   }

   if (!playlist) return null;

   return (
     <div className="main-content playlist-detail-page">
       <div className="breadcrumb">
         <Link to="/playlists">Your Playlist</Link>
         <span className="breadcrumb-sep">›</span>
         <span className="breadcrumb-current">“{playlist.name}” playlist</span>
       </div>

       <div className="page-actions-row">
         <div className="left-actions">
           <label className="playlist-sort-label">Sort</label>
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

         <div className="right-actions">
           <button className="btn-primary" onClick={onRenamePlaylist}>
             Change playlist's name
           </button>
           <button className="btn-primary" onClick={onAddSong}>
             Add new song
           </button>
           <button
             className="btn-primary btn-danger"
             onClick={() => alert("TODO: delete selected song or playlist")}
           >
             Delete song
           </button>
         </div>
       </div>

       <div className="song-grid">
         {currentSongs.map((song) => (
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
             </div>

             <div className="card-meta">
               <p className="playlist-title">{song.title}</p>
               <p className="playlist-info">{song.artist}</p>
             </div>

             <div className="card-actions">
               <button
                 className="icon-btn"
                 onClick={() => onOpenSongMenu(song)}
                 title="Options"
               >
                 ⋯
               </button>
               <button
                 className="icon-btn"
                 onClick={() => onDeleteSong(song.id)}
                 title="Delete song"
               >
                 🗑
               </button>
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
             <div className="time">4:24</div>
             <div className="player-actions">
               <button className="icon-btn">♡</button>
               <button className="icon-btn">🔊</button>
             </div>
           </div>
         </div>
       )}
      {showMenu && selectedSong && (
        <div className="modal-overlay" onClick={() => setShowMenu(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedSong.title}</h3>

            <button className="modal-item" onClick={() => alert("Play TODO")}>
              ▶ Play
            </button>
            <button className="modal-item" onClick={onRenamePlaylist}>
              ✏ Rename playlist
            </button>
            <button
              className="modal-item delete"
              onClick={() => {
                onDeleteSong(selectedSong.id);
                setShowMenu(false);
              }}
            >
              🗑 Remove from playlist
            </button>
          </div>
        </div>
      )}
     </div>
   );
 }
