import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";

import MainLayout from "../layout/MainLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
