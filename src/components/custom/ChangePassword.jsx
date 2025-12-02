import React, { useState } from "react";
import { changePassword } from "../../services/musicService";

export default function ChangePassword({ onCancel }) {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = () => {
    // Mật khẩu mới không được trùng mật khẩu hiện tại
    if (newPass === current) {
      alert("Mật khẩu mới không được trùng với mật khẩu hiện tại!");
      return false;
    }

    // Kiểm tra độ dài
    if (newPass.length < 8) {
      alert("Mật khẩu mới phải có ít nhất 8 ký tự!");
      return false;
    }

    // Kiểm tra chữ hoa, chữ thường và ký tự đặc biệt
    const hasUpper = /[A-Z]/.test(newPass);
    const hasLower = /[a-z]/.test(newPass);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPass);

    if (!hasUpper || !hasLower || !hasSpecial) {
      alert(
        "Mật khẩu mới phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt!"
      );
      return false;
    }

    // Kiểm tra confirm
    if (newPass !== confirm) {
      alert("Xác nhận mật khẩu không trùng khớp!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FE validation
    if (!validatePassword()) return;

    setLoading(true);
    try {
      await changePassword({
        oldPassword: current,
        newPassword: newPass,
      });

      alert("Đổi mật khẩu thành công!");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err) {
      // Backend trả về trường hợp current password không đúng
      alert(
        "Đổi mật khẩu thất bại: " +
          (err?.response?.data || err.message || "Unknown error")
      );
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
            placeholder="At least 8 characters, A-z & special char"
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
          <img src="./src/assets/icon/save.svg" alt="Save" />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
