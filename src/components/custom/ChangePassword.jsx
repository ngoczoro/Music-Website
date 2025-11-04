import React, { useState } from "react";

export default function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2 className="form-title">Change Password</h2>
      <p className="form-subtitle">
        Ensure your account is using a strong password
      </p>

      <div className="form-grid">
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>

        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="At least 8 characters"
          />
        </div>

        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
          <img src="./src/assets/icon/save.svg" alt="Save" />
          Save Changes
        </button>
      </div>
    </form>
  );
}
