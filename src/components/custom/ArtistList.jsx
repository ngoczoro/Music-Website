import React, { useEffect, useState } from "react";
import { ArtistCard } from "./ArtistCard";
import { fetchTrendingArtists } from "../../services/authService";

export function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dòng tạm để test, sau này xóa đi
    localStorage.setItem(
      "authToken",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjE3OTk5MDIsImV4cCI6MTc2MzAwOTUwMn0.f1L30XSRBfVQU9xnVISSMSh4lYP-zASa2XOzBnZT30k"
    );
    const loadArtists = async () => {
      try {
        const data = await fetchTrendingArtists();
        setArtists(data);
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
      {artists.length === 0 ? (
        <p>Chưa có nghệ sĩ thịnh hành.</p>
      ) : (
        artists.map((artist) => (
          <ArtistCard
            key={artist.id || artist._id}
            name={artist.fullName || artist.stageName || "Ẩn danh"}
            imageUrl={artist.avatarUrl || "/avatars/default.png"}
            followers={artist.totalFollowers || 0}
            views={artist.totalViews || 0}
          />
        ))
      )}
    </div>
  );
}
