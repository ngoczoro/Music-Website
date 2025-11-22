// Thay thế bằng URL API Backend thực tế của bạn
const API_BASE_URL = "http://localhost:8081/api";

const handleResponse = async (response) => {
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : {};

  return {
    ok: response.ok,
    status: response.status,
    message: data.message || response.statusText,
    data,
  };
};

export const registerUser = async (userData) => {
  const url = `${API_BASE_URL}/register`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const loginUser = async (credentials) => {
  const url = `${API_BASE_URL}/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse(response);

  // Lưu token vào Local Storage (Thực hành phổ biến)
  if (res.data?.token) {
    localStorage.setItem("authToken", res.data.token);
  }

  return res;
};
export const forgotPassword = async (email) => {
  const url = `${API_BASE_URL}/password/forgot`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  const data = await handleResponse(response);
  return data;
};
export const resetPassword = async (email, newPassword) => {
  const url = `${API_BASE_URL}/password/reset`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  });

  const data = await handleResponse(response);
  return data;
};
export const resendOTP = async (email, type) => {
  const url = `${API_BASE_URL}/resend-otp`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      type: type, // "REGISTER" hoặc "FORGOT_PASSWORD"
    }),
  });
  const data = await handleResponse(response);
  return data;
};

export const verifyEmail = async (email, otp) => {
  console.log("Calling OTP verification API for:", email);
  const url = `${API_BASE_URL}/verify-email`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  return handleResponse(response);
};
export const verifyOtp = async (email, otp) => {
  console.log("Calling OTP verification API for:", email);
  const url = `${API_BASE_URL}/verify-otp`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  return handleResponse(response);
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
  // Có thể gọi thêm API logout nếu cần
  console.log("Đã đăng xuất và xóa token.");
};
