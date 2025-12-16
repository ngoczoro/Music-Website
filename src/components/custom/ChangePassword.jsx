import React, { useState } from "react";
import { changePassword } from "../../services/musicService";

export default function ChangePassword({ onCancel }) {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [errors, setErrors] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);

  const validatePassword = () => {
    let valid = true;
    let newErrors = { current: "", newPass: "", confirm: "" };

    // Current password không được để trống
    if (!current.trim()) {
      newErrors.current = "Current password can not be empty";
      valid = false;
    }

    // New password không để trống
    if (!newPass.trim()) {
      newErrors.newPass = "New password can not be empty";
      valid = false;
    }

    // Confirm không để trống
    if (!confirm.trim()) {
      newErrors.confirm = "Confirm new password can not be empty";
      valid = false;
    }

    // Nếu còn lỗi trống → dừng
    if (!valid) {
      setErrors(newErrors);
      return false;
    }

    // Mật khẩu mới không được trùng mật khẩu hiện tại
    if (newPass === current) {
      newErrors.newPass = "New password must not match the old password";
      valid = false;
    }

    // Độ dài
    if (newPass.length < 8) {
      newErrors.newPass = "Password must contain at least 8 characters";
      valid = false;
    }

    // Chữ hoa, chữ thường, ký tự đặc biệt
    const hasUpper = /[A-Z]/.test(newPass);
    const hasLower = /[a-z]/.test(newPass);
    const hasNumber = /[0-9]/.test(newPass);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPass);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      newErrors.newPass =
        "Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
      valid = false;
    }

    // Confirm phải trùng
    if (newPass !== confirm) {
      newErrors.confirm = "Password and Confirm Password do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      setErrors({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      // Sai mật khẩu hiện tại
      setErrors({
        ...errors,
        current: "Current password is incorrect",
      });
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
        {/* CURRENT PASSWORD */}
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
          {errors.current && <p className="error-text">{errors.current}</p>}
        </div>

        {/* NEW PASSWORD */}
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="At least 8 chars, uppercase, lowercase, special"
          />
          {errors.newPass && <p className="error-text">{errors.newPass}</p>}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {errors.confirm && <p className="error-text">{errors.confirm}</p>}
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
