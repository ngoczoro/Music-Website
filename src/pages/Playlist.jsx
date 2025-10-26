import React, { useEffect, useState } from "react";
import "./playlist.css";

const Playlist = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8081"}/api/songs`)
      .then((res) => res.json())
      .then((data) => { setSongs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="playlist-container">
      <h2>My Playlist</h2>
      <div className="playlist-grid">
        {songs.map((s) => (
          <div key={s._id}>
            <img src={s.cover} alt={s.title} width="100" />
            <p>{s.title}</p>
            <p>{s.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Playlist;
