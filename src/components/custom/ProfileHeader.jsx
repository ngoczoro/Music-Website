import React, { useEffect, useState } from "react";
import { getCurrentUser, fetchMyPlaylists } from "../../services/authService";
import "../../styles/theme.css";

export function ProfileHeader({ onEditClick }) {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // (Chỉ dùng dòng này để test, sau này có thể bỏ)
        localStorage.setItem(
          "authToken",
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjIwOTEyMTgsImV4cCI6MTc2MzMwMDgxOH0.Mpul2HnCnLa5Xy0aB6KR2cQLIt2h-268BYapHeynkg4"
        );

        // Lấy thông tin người dùng
        const userData = await getCurrentUser();
        setUser(userData);

        // Lấy danh sách playlist của người dùng
        const playlistsData = await fetchMyPlaylists();
        setPlaylists(playlistsData || []);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải thông tin người dùng hoặc playlist");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Đang tải...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="profile-page">
      {/* Thanh tìm kiếm */}
      <div className="profile-search-bar">
        <div className="search-container">
          <img
            src="./src/assets/icon/search.svg"
            alt="Search"
            className="search-icon"
          />
          <input
            type="text"
            placeholder="Search artist, song, playlist"
            className="profile-search-input"
          />
        </div>
      </div>

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
                  user?.avatarUrl
                    ? `http://localhost:8081${user.avatarUrl}`
                    : "https://via.placeholder.com/150"
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
                <div className="profile-stat">
                  <div className="value">2.4K</div>
                  <div className="label">Followers</div>
                </div>
                <div className="profile-stat">
                  <div className="value">892</div>
                  <div className="label">Following</div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button>
              <img src="./src/assets/icon/share.svg" alt="Share" />
            </button>
            <button>
              <img src="./src/assets/icon/setting.svg" alt="Settings" />
            </button>
            <button className="edit-btn" onClick={onEditClick}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
