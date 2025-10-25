import React, { useState } from "react";
import { Sidebar } from "../../components/custom/Sidebar";
import { ProfileHeader } from "../../components/custom/ProfileHeader";
import { PlaylistList } from "../../components/custom/PlaylistList";
import { SongList } from "../../components/custom/SongList";
import { ArtistList } from "../../components/custom/ArtistList";
import "../../styles/theme.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("playlist");

  const renderContent = () => {
    switch (activeTab) {
      case "playlist":
        return <PlaylistList />;
      case "favorites":
        return <SongList />;
      case "artists":
        return <ArtistList />;
      default:
        return <PlaylistList />;
    }
  };

  return (
    <div
      className="profile-container"
      style={{ display: "flex", minHeight: "100vh" }}
    >
      {/* Sidebar bên trái */}

      {/* Nội dung chính */}
      <div
        className="profile-main"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <ProfileHeader />

        {/* Thanh chọn tab */}
        <div
          className="profile-tabs"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            borderBottom: "1px solid #e5e7eb",
            width: "1020px",
            margin: "30px auto 0",
          }}
        >
          <button
            className={`profile-tab ${
              activeTab === "playlist" ? "active" : ""
            }`}
            onClick={() => setActiveTab("playlist")}
          >
            Playlists
          </button>
          <button
            className={`profile-tab ${
              activeTab === "favorites" ? "active" : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorite Songs
          </button>
          <button
            className={`profile-tab ${activeTab === "artists" ? "active" : ""}`}
            onClick={() => setActiveTab("artists")}
          >
            Artists
          </button>
        </div>

        {/* Nội dung hiển thị theo tab */}
        <div
          className="profile-content"
          style={{
            width: "1020px",
            margin: "0 auto",
            padding: "30px 0",
            transition: "opacity 0.3s ease",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
