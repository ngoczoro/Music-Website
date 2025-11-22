import React, { useState } from "react";
import { Sidebar } from "../../components/custom/Sidebar";
import ProfileInformation from "../../components/custom/ProfileInformation";
import ChangePassword from "../../components/custom/ChangePassword";
import "../../styles/theme.css";

const EditProfilePage = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("profile"); // profile | password

  return (
    <div className="edit-profile-page">
      {/* sidebar bên trái */}
      <div className="edit-profile-content">
        <div className="breadcrumb-wrapper">
          <div className="breadcrumb">
            <div className="breadcrumb-text">
              <span
                className="breadcrumb-link"
                style={{ cursor: "pointer", color: "#667085" }}
                onClick={onBack}
              >
                Account
              </span>
              <span className="breadcrumb-separator">{">"}</span>
              <span className="breadcrumb-current">Edit Profile</span>
            </div>
            <div className="breadcrumb-line"></div>
          </div>
        </div>

        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <img src="./src/assets/icon/user.svg" alt="User" /> Profile
            Information
          </button>
          <button
            className={`tab-btn ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            <img src="./src/assets/icon/lock.svg" alt="Lock" /> Change Password
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "profile" ? (
            <ProfileInformation onCancel={onBack} />
          ) : (
            <ChangePassword onCancel={onBack} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
