import React, { useState } from "react";

export default function ProfileInformation() {
  const [fullName, setFullName] = useState("John Doe");
  const [userName] = useState("johndoe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [bio, setBio] = useState("Music lover and playlist curator");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Changes saved successfully!");
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2 className="form-title">Personal Information</h2>
      <p className="form-subtitle">Update your profile details and avatar</p>

      <div className="avatar-section">
        <img
          src={
            avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png"
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
          onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
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
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
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
        <button
          type="button"
          className="cancel-btn"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button type="submit" className="save-btn">
          <img src="./src/assets/icon/save.svg" alt="Save" /> Save Changes
        </button>
      </div>
    </form>
  );
}
