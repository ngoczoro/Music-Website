// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Sidebar } from "./components/custom/Sidebar.jsx";
import ProfilePage from "./pages/ProfilePage/index.jsx";

function TestApp() {
  const [currentPage, setCurrentPage] = useState("Home");

  const handleMenuClick = (id) => {
    setCurrentPage(id);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activeItem={currentPage} onMenuClick={handleMenuClick} />
      <div style={{ flex: 1, padding: "20px" }}>
        {currentPage === "Account" ? (
          <ProfilePage />
        ) : (
          <h2>{currentPage} Page (demo)</h2>
        )}
      </div>
    </div>
  );
}

// Dòng tạm để test đăng nhập
localStorage.setItem(
  "authToken",
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzUyMTAxOUBnbS51aXQuZWR1LnZuIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NjIwOTEyMTgsImV4cCI6MTc2MzMwMDgxOH0.Mpul2HnCnLa5Xy0aB6KR2cQLIt2h-268BYapHeynkg4"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TestApp />
  </StrictMode>
);
