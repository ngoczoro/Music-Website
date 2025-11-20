// Thay thế bằng URL API Backend thực tế của bạn
const API_BASE_URL = "http://localhost:8081/api";


// const handleResponse = async (response) => {
//   const isJson = response.headers
//     .get("content-type")
//     ?.includes("application/json");
//   const data = isJson ? await response.json() : null;

//   if (!response.ok) {
//     // Sử dụng thông báo lỗi từ server nếu có, ngược lại dùng thông báo chung
//     const error = (data && data.message) || response.statusText;
//     throw new Error(error);
//   }

//   return data;
// };
const handleResponse = async (response) => {
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : {};

  return {
    ok: response.ok,
    status: response.status,
    message: data.message || response.statusText,
    data
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
  if (data.token) {
    console.log("Lưu token vào Local Storage:", data.token);
    localStorage.setItem("authToken", data.token);
  }

  return data;
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

/**
 * Lấy thông tin người dùng hiện tại (profile)
 */
export const getCurrentUser = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const url = `${API_BASE_URL}/common/users/me`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

/**
 * Lấy tất cả playlist của người dùng đang đăng nhập
 */
export const fetchMyPlaylists = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const url = `${API_BASE_URL}/common/playlist`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

/**
 * Lấy danh sách bài hát trong playlist cụ thể (ví dụ: Favorites)
 */
export const fetchSongsInPlaylist = async (playlistId) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const url = `${API_BASE_URL}/common/playlist/${playlistId}/songs`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

/**
 * Lấy danh sách nghệ sĩ thịnh hành (trending)
 */
export const fetchTrendingArtists = async () => {
  const token = localStorage.getItem("authToken");
  const url = `${API_BASE_URL}/common/users/trending-artists`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return handleResponse(response);
};
/**
 * Cập nhật thông tin hồ sơ người dùng (tên, bio, avatar)
 * - Nếu chỉ đổi tên/bio thì bỏ qua avatar
 * - Nếu đổi avatar, truyền file (từ input type="file")
 */
export const updateProfile = async ({ fullName, bio, avatar }) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const formData = new FormData();
  if (fullName) formData.append("fullName", fullName);
  if (bio) formData.append("bio", bio);
  if (avatar) formData.append("avatar", avatar); // file ảnh

  const response = await fetch(`${API_BASE_URL}/common/users/me/change`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return handleResponse(response);
};

/**
 * Đổi mật khẩu người dùng đang đăng nhập
 * @param {object} data - { oldPassword, newPassword }
 */
export const changePassword = async (data) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const response = await fetch(
    `${API_BASE_URL}/common/users/me/password/change`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }),
    }
  );

  return handleResponse(response);
};
/**
 * Lấy chi tiết bài hát theo ID
 */
export const fetchSongById = async (songId) => {
  const token = localStorage.getItem("authToken");
  if (!songId) throw new Error("Thiếu songId");

  const url = `http://localhost:8081/api/common/song/${songId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return handleResponse(response);
};

/**
 * Lấy thông tin nghệ sĩ theo artistId
 * @param {string} artistId
 * @returns {Promise<object>} - { fullName, avatarUrl, bio, ... }
 */
export const fetchArtistById = async (artistId) => {
  console.log("Fetching artistId:", artistId);

  if (!artistId) throw new Error("Thiếu artistId");

  const token = localStorage.getItem("authToken");
  const url = `${API_BASE_URL}/common/users/${artistId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  console.log("Artist response status:", response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Không tìm thấy artistId: ${artistId}`
    );
  }

  const data = await response.json();
  console.log("Artist data:", data);
  return data;
};
