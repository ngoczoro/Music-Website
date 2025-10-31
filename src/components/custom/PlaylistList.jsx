import React, { useEffect, useState } from "react";
import { PlaylistCard } from "./PlaylistCard";
import { fetchMyPlaylists } from "../../services/authService";

export function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Dòng tạm để test, sau này xóa đi
    localStorage.setItem(
      "authToken",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjE3OTk5MDIsImV4cCI6MTc2MzAwOTUwMn0.f1L30XSRBfVQU9xnVISSMSh4lYP-zASa2XOzBnZT30k"
    );
    fetchMyPlaylists()
      .then((data) => setPlaylists(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="playlist-list">
      {playlists.map((p) => (
        <PlaylistCard
          key={p.id}
          title={p.name}
          description={p.description}
          songs={p.songs}
          isPublic={p.isPublic}
          imageUrl={p.thumbnailUrl}
        />
      ))}
    </div>
  );
}
