// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

// import React, { StrictMode, useState } from "react";
// import { BrowserRouter } from "react-router-dom";
// import { createRoot } from "react-dom/client";
// // import "./index.css";
// import { Sidebar } from "./components/custom/Sidebar.jsx";
// import HomePage from "./pages/HomePage/index.jsx";

// function TestApp() {
//   const [currentPage, setCurrentPage] = useState("Home");

//   const handleMenuClick = (id) => {
//     setCurrentPage(id);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar activeItem={currentPage} onMenuClick={handleMenuClick} />
//       <div style={{ flex: 1, padding: "20px" }}>
//         {currentPage === "Home" ? (
//           <HomePage />
//         ) : (
//           <h2>{currentPage} Page (demo)</h2>
//         )}
//       </div>
//     </div>
//   );
// }

// localStorage.setItem(
//   "authToken",
//   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjIwOTEyMTgsImV4cCI6MTc2MzMwMDgxOH0.Mpul2HnCnLa5Xy0aB6KR2cQLIt2h-268BYapHeynkg4"
// );

// createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <TestApp />
//   </BrowserRouter>
// );

// /////////////////////////////////////////////
// Test play song trong trang profile//
// /////////////////////////////////////////////////////
// import React, { StrictMode, useState } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; // Thêm Routes, Route
// // import "./index.css";
// import { Sidebar } from "./components/custom/Sidebar.jsx";
// import ProfilePage from "./pages/ProfilePage/index.jsx";
// import SongPlayer from "./components/custom/SongPlayer.jsx"; // import component
// import { useParams } from "react-router-dom";
// import SongDetail from "./pages/SongDetail/index.jsx";
// function SongDetailPage() {
//   const { id } = useParams(); // lấy id từ URL
//   return <SongPlayer songId={id} />; // render player theo id
// }

// function TestApp() {
//   const [currentPage, setCurrentPage] = useState("Home");
//   const navigate = useNavigate();

//   const handleMenuClick = (id) => {
//     setCurrentPage(id);
//     if (id === "Account") navigate("/profile");
//     else if (id === "Home") navigate("/");
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar activeItem={currentPage} onMenuClick={handleMenuClick} />
//       <div style={{ flex: 1, padding: "20px" }}>
//         {/* Thêm router con để hiển thị từng trang */}
//         <Routes>
//           <Route path="/" element={<h2>Home Page (demo)</h2>} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/song/:id" element={<SongDetail />} />{" "}
//         </Routes>
//       </div>
//     </div>
//   );
// }

// // Token test
// localStorage.setItem(
//   "authToken",
//   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjM4MTk5MDAsImV4cCI6MTc2NTAyOTUwMH0.ZtbbdiBolZyc1gIdHRZlju8MrdPNDhQiw6LqEzAuLVE"
// );

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <TestApp />
//     </BrowserRouter>
//   </StrictMode>
// );

// /////////////////////////////////////////////
// Test play song trong trang trending//
// /////////////////////////////////////////////////////
import React, { StrictMode, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { createRoot } from "react-dom/client";

import { Sidebar } from "./components/custom/Sidebar.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import ProfilePage from "./pages/ProfilePage/index.jsx";
import SongDetail from "./pages/SongDetail/index.jsx";
import SongPlayer from "./components/custom/SongPlayer.jsx";

// Trang detail bài hát
function SongDetailPage() {
  const { id } = useParams();
  return <SongDetail songId={id} />;
}

// App chính
function App() {
  const [activeMenu, setActiveMenu] = useState("Home");
  const navigate = useNavigate();

  const handleMenuClick = (id) => {
    setActiveMenu(id);

    if (id === "Home") navigate("/");
    if (id === "Account") navigate("/profile");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activeItem={activeMenu} onMenuClick={handleMenuClick} />

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/song/:id" element={<SongDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

// Token test
localStorage.setItem(
  "authToken",
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjM4MTk5MDAsImV4cCI6MTc2NTAyOTUwMH0.ZtbbdiBolZyc1gIdHRZlju8MrdPNDhQiw6LqEzAuLVE"
);

// Render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
