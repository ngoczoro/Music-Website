import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { Navigate } from "react-router-dom";
import SongDetail from "../pages/SongDetail";
import PlaylistDetail from "../pages/PlaylistDetail";
import FavoriteSongs from "../pages/FavoriteSongs";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route KHÔNG dùng layout */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Routes DÙNG MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/playlist" element={<MyPlaylist />} />
          <Route path="/editprofile" element={<EditProfile />} />

          {/*Dời SongDetail vào đây */}
          <Route path="/song/:id" element={<SongDetail />} />
        </Route>
      </Routes>
          <Route path="/playlists/:id" element={<PlaylistDetail />} />
          <Route path="/favourite" element={<FavoriteSongs />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
