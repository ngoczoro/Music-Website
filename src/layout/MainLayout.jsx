import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "../components/custom/Sidebar";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    if (path.startsWith("/home")) setActiveItem("Home");
    else if (path.startsWith("/profile")) setActiveItem("Account");
    else if (path.startsWith("/playlist")) setActiveItem("Playlist");
    else if (path.startsWith("/editprofile")) setActiveItem("Account");
    else if (path.startsWith("/favourite")) setActiveItem("Favorite");

  }, [location.pathname]);

  const handleMenuClick = (id) => {
    if (id === "Logout") {
      // Xử lý logout
      localStorage.removeItem("authToken");
      navigate("/login");
      return;
    }

    setActiveItem(id);

    // Map id của Sidebar -> route thực tế
    const idToPath = {
      Home: "/home",
      Artist: "/home",          // tạm thời có thể cùng trang Home hoặc sau này tạo route riêng
      Genre: "/home",           // tương tự
      Recent: "/home",          // hoặc /recent nếu bạn tạo
      Favorite: "/favourite",
      Playlist: "/playlist",
      ApplyForArtist: "/home",  // hoặc route riêng sau này
      Account: "/profile",
    };

    const path = idToPath[id];
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeItem={activeItem} onMenuClick={handleMenuClick} />
      <div className="page-content">
        {/* Nơi render các page con: Home, Profile, Playlist, EditProfile,... */}
        <Outlet />
      </div>
    </div>
  );
}
