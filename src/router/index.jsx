import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";
import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";
import MyPlaylist from "../pages/MyPlaylist";
import MainLayout from "../layout/MainLayout";
import EditProfile from "../pages/EditProfile";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SongDetail from "../pages/SongDetail";
import PlaylistDetail from "../pages/PlaylistDetail";
import FavoriteSongs from "../pages/FavoriteSongs";

export default function AppRouter() {
  const hasToken = !!localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={<Navigate to={hasToken ? "/home" : "/login"} replace />}
        />

        {/* ----- ROUTES CÓ DÙNG MAINLAYOUT ----- */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/playlist" element={<MyPlaylist />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/song/:id" element={<SongDetail />} />
          <Route path="/playlists/:id" element={<PlaylistDetail />} />
          <Route path="/favourite" element={<FavoriteSongs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
