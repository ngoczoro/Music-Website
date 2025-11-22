import React, { useEffect, useState } from "react";
import { PlaylistCard } from "./PlaylistCard";
import { fetchMyPlaylists } from "../../services/musicService";

export function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Token test
    localStorage.setItem(
      "authToken",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjM4MTk5MDAsImV4cCI6MTc2NTAyOTUwMH0.ZtbbdiBolZyc1gIdHRZlju8MrdPNDhQiw6LqEzAuLVE"
    );

    fetchMyPlaylists()
      .then((data) => {
        console.log("Playlists FE nhận:", data);
        if (Array.isArray(data)) setPlaylists(data);
        else setPlaylists([]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="playlist-list">
      {Array.isArray(playlists) &&
        playlists.map((p) => (
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
