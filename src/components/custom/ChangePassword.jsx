import React, { useState } from "react";
import { changePassword } from "../../services/authService";

export default function ChangePassword({ onCancel }) {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPass !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await changePassword({
        oldPassword: current,
        newPassword: newPass,
      });
      alert("Password changed successfully!");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
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
