import React, { useEffect, useState } from "react";
import { PlaylistCard } from "./PlaylistCard";
import { fetchMyPlaylists } from "../../services/authService";

export function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Dòng tạm để test, sau này xóa đi
    localStorage.setItem(
      "authToken",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjIwOTEyMTgsImV4cCI6MTc2MzMwMDgxOH0.Mpul2HnCnLa5Xy0aB6KR2cQLIt2h-268BYapHeynkg4"
    );
    fetchMyPlaylists()
      .then((data) => setPlaylists(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="playlist-list">
      {playlists.length>0 && playlists.map((p) => (
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
