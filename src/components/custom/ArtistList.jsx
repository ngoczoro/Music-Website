import React, { useEffect, useState } from "react";
import { ArtistCard } from "./ArtistCard";
import { fetchTrendingArtists } from "../../services/musicService";

export function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // token dùng tạm
    // localStorage.setItem(
    //   "authToken",
    //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjM4MTk5MDAsImV4cCI6MTc2NTAyOTUwMH0.ZtbbdiBolZyc1gIdHRZlju8MrdPNDhQiw6LqEzAuLVE"
    // );

    const loadArtists = async () => {
      try {
        const res = await fetchTrendingArtists();
        setArtists(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  if (loading) return <p>Đang tải danh sách nghệ sĩ...</p>;
  if (error) return <p>Lỗi tải nghệ sĩ: {error}</p>;

  return (
    <div className="artist-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {artists.length > 0 ?  (
        artists.map((artist) => (
          <ArtistCard
            key={artist.id || artist._id}
            name={artist.fullName || artist.stageName || "Ẩn danh"}
            imageUrl={artist.avatarUrl || "/avatars/default.png"}
            followers={artist.totalFollowers || 0}
            views={artist.totalViews || 0}
          />
        ))
      ) : 
      (
        <p>Chưa có nghệ sĩ thịnh hành.</p>
      ) }
    </div>
  );
}
