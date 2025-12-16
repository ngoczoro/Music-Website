import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getCurrentUser, fetchMyPlaylists } from "../../services/musicService";
import "../../styles/theme.css";
import { MusicCard } from "../../components/custom/MusicCard";
import { searchSongs } from "../../services/searchService";

export function ProfileHeader({
  onEditClick,
  onSearchModeChange,
  isSearching,
}) {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // Khi rời trang profile → reset search
    if (!location.pathname.startsWith("/profile")) {
      setKeyword("");
      onSearchModeChange?.(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // (Chỉ dùng dòng này để test, sau này có thể bỏ)
        // localStorage.setItem(
        //   "authToken",
        //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjM4MTk5MDAsImV4cCI6MTc2NTAyOTUwMH0.ZtbbdiBolZyc1gIdHRZlju8MrdPNDhQiw6LqEzAuLVE"
        // );

        // Lấy thông tin người dùng
        const userData = await getCurrentUser();
        console.log("Nguoi dung:", userData);
        setUser(userData);

        // Lấy danh sách playlist của người dùng
        const playlistsData = await fetchMyPlaylists();
        setPlaylists(playlistsData || []);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("User not found or failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearching(true);
        const data = await searchSongs(keyword);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  const navigate = useNavigate();

  if (loading) return <p style={{ textAlign: "center" }}>Đang tải...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="profile-page">
      {/* SEARCH BAR – LUÔN HIỆN */}
      <div className="profile-search-bar">
        <div className="search-container">
          <img
            src="./src/assets/icon/search.svg"
            alt="Search"
            className="search-icon"
          />
          <input
            type="text"
            placeholder="Search song title or artist"
            className="profile-search-input"
            value={keyword}
            onChange={(e) => {
              const value = e.target.value;
              setKeyword(value);
              onSearchModeChange?.(value.trim().length > 0);
            }}
          />
        </div>
      </div>

      {/*SEARCH RESULT */}
      {isSearching && (
        <div className="profile-search-horizontal">
          {searching && <div>Searching...</div>}

          {!searching &&
            results.map((song) => (
              <MusicCard
                key={song.id}
                title={song.title}
                artist={song.artistName || "Unknown Artist"}
                imageUrl={song.coverImageUrl}
                duration={song.duration}
                onMouseDown={(e) => {
                  e.preventDefault();
                  navigate(`/song/${song.id}`, { state: { autoplay: true } });
                }}
              />
            ))}
        </div>
      )}

      {/* PROFILE INFO – CHỈ HIỆN KHI KHÔNG SEARCH */}
      {!isSearching && (
        <div className="profile-header">
          <div className="profile-cover">
            <img
              src="https://images.unsplash.com/photo-1656283384093-1e227e621fad?auto=format&fit=crop&w=1080&q=80"
              alt="cover"
            />
          </div>

          <div className="profile-info">
            <div className="profile-left">
              <div className="profile-avatar">
                <img
                  src={
                    user?.avatarUrl?.startsWith("http")
                      ? user.avatarUrl
                      : `http://localhost:8081${
                          user?.avatarUrl || "/uploads/default-avatar.jpg"
                        }`
                  }
                  alt="avatar"
                />
              </div>

              <div className="profile-details">
                <h1>{user?.fullName || "No Name"}</h1>
                <p>{user?.bio || "Chưa có tiểu sử"}</p>

                <div className="profile-stats">
                  <div className="profile-stat">
                    <div className="value">{playlists.length}</div>{" "}
                    {/* hiển thị số playlist */}
                    <div className="label">Playlists</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="edit-btn" onClick={onEditClick}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProfileHeader;
