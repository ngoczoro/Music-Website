import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";
import ProfilePage from "../pages/ProfilePage";
import MyPlaylist from "../pages/MyPlaylist";
import MainLayout from "../layout/MainLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/playlist" element={<MyPlaylist />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
