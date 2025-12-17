import React, { useEffect, useState } from "react";
import { SongItem } from "./SongItem";
import {
  fetchMyPlaylists,
  fetchSongsInPlaylist,
} from "../../services/musicService";

export function SongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Lấy tất cả playlist của user
        const playlists = await fetchMyPlaylists();

        // Tìm playlist "Favorites"
        const favorite = playlists.find((p) => p.name === "Favorites");
        if (!favorite) {
          console.warn("Not found playlist Favorites.");
          setSongs([]);
          return;
        }

        // Gọi API lấy songs trong playlist đó
        const songsData = await fetchSongsInPlaylist(favorite.id);
        setSongs(songsData);
      } catch (err) {
        console.error("Error loading favorite playlist:", err.message);
      }
    };

    loadFavorites();
  }, []);

  return (
    <div className="song-list">
      {songs.length > 0 ? (
        songs.map((song, index) => (
          <SongItem key={song.id} index={index + 1} song={song} />
        ))
      ) : (
        <p>No songs in Favorites playlist.</p>
      )}
    </div>
  );
}
