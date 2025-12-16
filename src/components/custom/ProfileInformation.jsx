import React, { useState, useEffect } from "react";
import { getCurrentUser, updateProfile } from "../../services/musicService";

export default function ProfileInformation({ onCancel }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [setOldFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // --- Lấy thông tin user đang đăng nhập ---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setFullName(data.fullName || "");
        setOldFullName(data.fullName || "");
        setEmail(data.email || "");
        setBio(data.bio || "");
        setAvatarPreview(data.avatarUrl || "");
      } catch (err) {
        console.error("User information loading error:", err);
      }
    };
    fetchUser();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ALLOWED_IMAGE_TYPES = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    //Sai format
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setErrorMsg("Invalid image format");
      setAvatarFile(null);
      e.target.value = "";
      return;
    }

    //Đúng format
    setErrorMsg("");
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMsg) return; //không submit nếu có lỗi
    setLoading(true);

    try {
      const trimmedName = fullName.trim();

      const payload = {
        bio,
        avatar: avatarFile,
      };

      //chỉ gửi fullName khi hợp lệ
      if (trimmedName !== "" && trimmedName.length <= 30) {
        payload.fullName = trimmedName;
      }

      await updateProfile(payload);

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile!");
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
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
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
