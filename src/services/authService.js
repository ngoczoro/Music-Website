// Thay thế bằng URL API Backend thực tế của bạn
const API_BASE_URL = 'http://localhost:8081/api'; 

/**
 * Hàm trợ giúp để xử lý phản hồi API chung.
 * @param {Response} response - Đối tượng Response từ fetch().
 * @returns {Promise<object>} - Dữ liệu JSON hoặc ném lỗi.
 */
const handleResponse = async (response) => {
  const isJson = response.headers.get('content-type')?.includes('application/json');
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  console.log('Đang gọi API đăng nhập với:', credentials.email);
  const url = `${API_BASE_URL}/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse(response);
  
  // Lưu token vào Local Storage (Thực hành phổ biến)
  if (data.token) {
    console.log('Lưu token vào Local Storage:', data.token);
    localStorage.setItem('authToken', data.token);
  }
  
  return data;
};

/**
 * Xóa token khỏi Local Storage để Đăng xuất.
 */
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  // Có thể gọi thêm API logout nếu cần
  console.log('Đã đăng xuất và xóa token.');
};

export const verifyEmail = async (email, otp) => {
  console.log('Calling OTP verification API for:', email);
    const url = `${API_BASE_URL}/verify-email`;


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  });

  // Sử dụng hàm handleResponse đã định nghĩa trước đó trong file này
  return handleResponse(response); 
};