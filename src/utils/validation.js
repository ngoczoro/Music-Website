/**
 * Checks if basic required fields are empty.
 * @param {object} formData - Form data.
 * @returns {string | null} - Returns the error message if any field is empty, otherwise returns null.
 */
export const checkEmptyFields = (formData) => {
  if (!formData.fullName) {
    return 'Please enter your full name.';
  }
  if (!formData.email) {
    return 'Please enter your email address.';
  }
  if (!formData.password) {
    return 'Please enter a password.';
  }
  if (!formData.confirmPassword) {
    return 'Please confirm your password.';
  }
  return null;
};

/**
 * Checks if the password and confirmation password match.
 * @param {string} password - Password.
 * @param {string} confirmPassword - Confirmation password.
 * @returns {string | null} - Returns an error message if they do not match, otherwise returns null.
 */
export const checkPasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Password and Confirm Password do not match.';
  }
  return null;
};

/**
 * Kiểm tra định dạng email có hợp lệ không.
 */
export const checkEmailFormat = (email) => {
  // Regex kiểm tra định dạng email cơ bản: chữ@chữ.chữ
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  if (!emailRegex.test(email)) {
    return 'Invalid email format. Please check your email address.';
  }
  return null;
};

/**
 * Kiểm tra chính sách mật khẩu (độ mạnh).
 * 1. Ít nhất 8 ký tự.
 * 2. Phải chứa ít nhất 1 chữ thường.
 * 3. Phải chứa ít nhất 1 chữ in hoa.
 * 4. Phải chứa ít nhất 1 số.
 * 5. Phải chứa ít nhất 1 ký tự đặc biệt.
 */
export const checkPasswordPolicy = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  // Regex Lookaheads để kiểm tra tất cả các điều kiện cùng lúc
  const strongPasswordRegex = new RegExp(
    // Bắt đầu chuỗi và kiểm tra 5 điều kiện (Lookaheads):
    '^(?=.*[a-z])' + // Phải chứa ít nhất 1 chữ thường
    '(?=.*[A-Z])' + // Phải chứa ít nhất 1 chữ in hoa
    '(?=.*[0-9])' + // Phải chứa ít nhất 1 số
    '(?=.*[!@#$%^&*])' + // Phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*)
    '(?=.{8,})' + // Phải có tổng cộng ít nhất 8 ký tự
    '' // Kết thúc kiểm tra
  );

  if (!strongPasswordRegex.test(password)) {
    return 'Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (!@#$%^&*).';
  }

  return null;
};
