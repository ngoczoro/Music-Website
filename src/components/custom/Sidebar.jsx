import React from "react";
import HomeIcon from "../../assets/icon/home.svg";
import ArtistIcon from "../../assets/icon/microphone.svg";
import GenreIcon from "../../assets/icon/genre.svg";
import ClockIcon from "../../assets/icon/time.svg";
import HeartIcon from "../../assets/icon/heart.svg";
import MusicIcon from "../../assets/icon/music.svg";
import ArchiveIcon from "../../assets/icon/archive.svg";
import UserIcon from "../../assets/icon/user.svg";
import LogoutIcon from "../../assets/icon/logout.svg";
import "../../styles/theme.css";

export function Sidebar({ activeItem = "Account", onMenuClick }) {
  const menuItems = {
    discover: [
      { icon: HomeIcon, label: "Home", id: "Home" },
      { icon: ArtistIcon, label: "Artist", id: "Artist" },
      { icon: GenreIcon, label: "Genre", id: "Genre" },
    ],
    library: [
      { icon: ClockIcon, label: "Recent", id: "Recent" },
      { icon: HeartIcon, label: "Favorite", id: "Favorite" },
      { icon: MusicIcon, label: "Playlist", id: "Playlist" },
    ],
    more: [
      { icon: ArchiveIcon, label: "Apply for Artist", id: "ApplyForArtist" },
      { icon: UserIcon, label: "Account", id: "Account" },
      { icon: LogoutIcon, label: "Logout", id: "Logout" },
    ],
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img
          src="./src/assets/img/logo.png"
          alt="Logo"
          className="logo-image"
        />
        <span className="logo-text">Logo</span>
      </div>

      {/* Render 3 nhóm menu */}
      {Object.entries(menuItems).map(([section, items]) => (
        <div key={section} className="sidebar-section">
          <h3 className="section-title">
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </h3>
          <div className="menu-list">
            {items.map((item) => (
              <button
                key={item.id}
                className={`menu-item ${
                  activeItem === item.id ? "active" : ""
                }`}
                onClick={() => onMenuClick(item.id)} // 🔹 Gọi callback khi click
              >
                <img src={item.icon} className="menu-icon" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
