import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";
import ProfilePage from "../pages/ProfilePage";
import MyPlaylist from "../pages/MyPlaylist";
import MainLayout from "../layout/MainLayout";
import EditProfile from "../pages/EditProfile";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/playlist" element={<MyPlaylist />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
