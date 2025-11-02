// Thay thế bằng URL API Backend thực tế của bạn
const API_BASE_URL = "http://localhost:8081/api";

/**
 * Hàm trợ giúp để xử lý phản hồi API chung.
 * @param {Response} response - Đối tượng Response từ fetch().
 * @returns {Promise<object>} - Dữ liệu JSON hoặc ném lỗi.
 */
const handleResponse = async (response) => {
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    // Sử dụng thông báo lỗi từ server nếu có, ngược lại dùng thông báo chung
    const error = (data && data.message) || response.statusText;
    throw new Error(error);
  }

  return data;
};

/**
 * Gọi API Đăng ký người dùng mới.
 * @param {object} userData - { fullName, email, password, confirmPassword }
 * @returns {Promise<object>} - Trả về dữ liệu phản hồi (ví dụ: { message: 'User created' })
 */
export const registerUser = async (userData) => {
  // console.log('Đang gọi API đăng ký với:', userData.email);
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

/**
 * Gọi API Đăng nhập người dùng.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} - Trả về dữ liệu người dùng và token (ví dụ: { user, token })
 */
export const loginUser = async (credentials) => {
  console.log("Đang gọi API đăng nhập với:", credentials.email);
  const url = `${API_BASE_URL}/auth/login`;

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

/**
 * Xóa token khỏi Local Storage để Đăng xuất.
 */
export const logoutUser = () => {
  localStorage.removeItem("authToken");
  // Có thể gọi thêm API logout nếu cần
  console.log("Đã đăng xuất và xóa token.");
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

  // Sử dụng hàm handleResponse đã định nghĩa trước đó trong file này
  return handleResponse(response);
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
