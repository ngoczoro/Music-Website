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
      newErrors.current = "Mật khẩu hiện tại không được để trống!";
      valid = false;
    }

    // New password không để trống
    if (!newPass.trim()) {
      newErrors.newPass = "Mật khẩu mới không được để trống!";
      valid = false;
    }

    // Confirm không để trống
    if (!confirm.trim()) {
      newErrors.confirm = "Xác nhận lại mật khẩu không được để trống!";
      valid = false;
    }

    // Nếu còn lỗi trống → dừng
    if (!valid) {
      setErrors(newErrors);
      return false;
    }

    // Mật khẩu mới không được trùng mật khẩu hiện tại
    if (newPass === current) {
      newErrors.newPass =
        "Mật khẩu mới không được trùng với mật khẩu hiện tại!";
      valid = false;
    }

    // Độ dài
    if (newPass.length < 8) {
      newErrors.newPass = "Mật khẩu mới phải có ít nhất 8 ký tự!";
      valid = false;
    }

    // Chữ hoa, chữ thường, ký tự đặc biệt
    const hasUpper = /[A-Z]/.test(newPass);
    const hasLower = /[a-z]/.test(newPass);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPass);

    if (!hasUpper || !hasLower || !hasSpecial) {
      newErrors.newPass =
        "Mật khẩu mới phải có 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt!";
      valid = false;
    }

    // Confirm phải trùng
    if (newPass !== confirm) {
      newErrors.confirm = "Xác nhận mật khẩu không trùng khớp!";
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
        current: "Mật khẩu hiện tại không chính xác!",
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
