import React from "react";
import "../../styles/theme.css";

export function ProfileHeader() {
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
            src="https://images.unsplash.com/photo-1656283384093-1e227e621fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnR8ZW58MXx8fHwxNzYwNTc3MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="cover"
          />
        </div>

        <div className="profile-info">
          <div className="profile-left">
            <div className="profile-avatar">
              <img
                src="https://images.unsplash.com/photo-1501027874987-73e9c32f46a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMG11c2ljfGVufDF8fHx8MTc2MDY4NDczN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="avatar"
              />
            </div>

            <div className="profile-details">
              <h1>Sarah Johnson</h1>
              <p>Music Enthusiast • Premium Member</p>

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
