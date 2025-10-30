import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import "../../styles/theme.css";

export function ProfileHeader() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dòng tạm để test, sau này xóa đi
    localStorage.setItem(
      "authToken",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjE3OTk5MDIsImV4cCI6MTc2MzAwOTUwMn0.f1L30XSRBfVQU9xnVISSMSh4lYP-zASa2XOzBnZT30k"
    );
    const fetchProfile = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin user:", err);
        setError("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
                  <div className="value">127</div>
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
            <button className="edit-btn">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
