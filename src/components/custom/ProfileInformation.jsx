import React, { useState, useEffect } from "react";
import { getCurrentUser, updateProfile } from "../../services/musicService";

export default function ProfileInformation({ onCancel }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Lấy thông tin user đang đăng nhập ---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setFullName(data.fullName || "");
        setEmail(data.email || "");
        setBio(data.bio || "");
        setAvatarPreview(data.avatarUrl || "");
      } catch (err) {
        console.error("Lỗi tải thông tin người dùng:", err);
      }
    };
    fetchUser();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({
        fullName,
        bio,
        avatar: avatarFile,
      });
      alert("Cập nhật hồ sơ thành công!");
      window.location.reload(); // reload lại để ProfilePage hiển thị dữ liệu mới
    } catch (err) {
      alert("Cập nhật thất bại: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2 className="form-title">Personal Information</h2>
      <p className="form-subtitle">Update your profile details and avatar</p>

      <div className="avatar-section">
        <img
          src={
            avatarPreview ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt="avatar"
          className="avatar-img"
        />
        <label htmlFor="avatar-upload" className="avatar-upload-label">
          📷
        </label>
        <input
          type="file"
          id="avatar-upload"
          hidden
          onChange={handleAvatarChange}
        />
      </div>

      <div className="form-grid">
        <div>
          <label>Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label>Email Address</label>
          <input value={email} disabled />
        </div>

        <div className="bio-section">
          <label>Bio</label>
          <textarea
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn" disabled={loading}>
          <img src="./src/assets/icon/save.svg" alt="Save" />{" "}
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
