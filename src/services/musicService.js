const API_BASE_URL = "http://localhost:8081/api";

export const addSongToFavorites = async (songId) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const res = await fetch(
    `${API_BASE_URL}/common/playlist/favorites/songs/${songId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return handleResponse(res);
};

export const removeSongFromFavorites = async (songId) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const res = await fetch(
    `${API_BASE_URL}/common/playlist/favorites/songs/${songId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return handleResponse(res);
};

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

export const checkSongInFavorite = async (songId) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");
  try {
    const response = await fetch(
      `${API_BASE_URL}/common/playlist/favorite/songs/${encodeURIComponent(songId)}/exists`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await handleResponse(response);
    //  console.log("Check favorite response:", res);
    if (res.ok) return !!res.data?.inFavorite;
    console.error("Check favorite failed:", res.message);
    return false;
  } catch (err) {
    console.error("Check favorite error:", err?.message || err);
    return false;
  }
};

/**
 * Lấy thông tin người dùng hiện tại (profile)
 */
export const getCurrentUser = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const res = await fetch(`${API_BASE_URL}/common/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const result = await handleResponse(res);

  return result.data; // ✔ chỉ trả về phần data
};

/**
 * Lấy tất cả playlist của người dùng đang đăng nhập
 */
export const fetchMyPlaylists = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const res = await fetch(`${API_BASE_URL}/common/playlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await handleResponse(res);

  // Backend trả data là ARRAY
  return Array.isArray(result.data) ? result.data : [];
};

/**
 * Lấy thông tin playlist theo ID
 */
export const fetchPlaylistById = async (playlistId) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  // Lấy tất cả playlists và tìm playlist có ID khớp
  const playlists = await fetchMyPlaylists();
  const playlist = playlists.find(
    (p) => p.id === playlistId || p._id === playlistId
  );

  if (!playlist) {
    throw new Error("Không tìm thấy playlist");
  }

  return playlist;
};

/**
 * Lấy danh sách bài hát trong playlist cụ thể (ví dụ: Favorites)
 */
export const fetchSongsInPlaylist = async (playlistId) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const res = await fetch(
    `${API_BASE_URL}/common/playlist/${playlistId}/songs`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await handleResponse(res);

  return Array.isArray(result.data) ? result.data : [];
};

/**
 * Lấy danh sách nghệ sĩ thịnh hành (trending)
 */
export const fetchTrendingArtists = async () => {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${API_BASE_URL}/common/users/trending-artists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return handleResponse(res);
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
  if (avatar) formData.append("avatar", avatar);

  const res = await fetch(`${API_BASE_URL}/common/users/me/change`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return handleResponse(res);
};

/**
 * Đổi mật khẩu người dùng đang đăng nhập
 * @param {object} data - { oldPassword, newPassword }
 */
export const changePassword = async ({ oldPassword, newPassword }) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const res = await fetch(`${API_BASE_URL}/common/users/me/password/change`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!res.ok) {
    // đọc text trả về từ BE
    const errorText = await res.text();
    throw new Error(errorText || "Unknown error");
  }

  return await res.text();
};

/**
 * Lấy chi tiết bài hát theo ID
 */
export const fetchSongById = async (songId) => {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${API_BASE_URL}/common/song/${songId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return handleResponse(res);
};
/**
 * Lấy thông tin nghệ sĩ theo artistId
 * @param {string} artistId
 * @returns {Promise<object>} - { fullName, avatarUrl, bio, ... }
 */
export const fetchArtistById = async (artistId) => {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${API_BASE_URL}/common/users/${artistId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return handleResponse(res);
};

/**
 * Lấy URL stream nhạc từ backend
 * FE chỉ cần set vào <audio src> là phát.
 */
export const getStreamUrl = (songId) => {
  return `${API_BASE_URL}/common/song/stream/${songId}`;
};
/**
 * Lấy lyric từ BE.
 * dùng field `lyrics` BE trả về.
 * Nếu BE CHƯA parse sẵn, fallback sang đọc file .txt/.lrc từ `lyricUrl`.
 */
export const fetchLyricsBySongId = async (songId) => {
  const result = await fetchSongById(songId);
  const song = result.data;

  if (!song) {
    return { song: null, lines: [] };
  }

  // BE hiện tại đã đọc file và trả về mảng `lyrics`
  if (Array.isArray(song.lyrics) && song.lyrics.length > 0) {
    return { song, lines: song.lyrics };
  }

  // Fallback: tự đọc file .txt/.lrc từ lyricUrl
  if (song.lyricUrl) {
    const lyricUrl = song.lyricUrl.startsWith("http")
      ? song.lyricUrl
      : `http://localhost:8081${song.lyricUrl}`;

    const res = await fetch(lyricUrl);
    if (res.ok) {
      const text = await res.text();
      const lines = text.split(/\r?\n/);
      return { song, lines };
    }
  }

  return { song, lines: [] };
};

//getPopularSongs

export async function getPopularSongs() {
  try {
    const token = localStorage.getItem("authToken");

    const res = await fetch("http://localhost:8081/api/common/song/popular", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(res.status);

    return await res.json();
  } catch (error) {
    console.error("❌ Lỗi fetch trending:", error);
    throw new Error("Failed to fetch trending songs");
  }
}
// Lấy danh sách gợi ý
export async function getRecommendedSongs(userId) {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Chưa đăng nhập");

    const res = await fetch(`${API_BASE_URL}/common/song/rcm/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(res.status);

    // BE đang trả List<Song>
    return await res.json();
  } catch (err) {
    console.error("❌ Lỗi fetch recommended:", err);
    return [];
  }
}




/**
 * Tạo playlist mới
 * @param {object} payload - { name, isPublic }
 */
export const createPlaylist = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8081/api/playlists", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ KHÔNG set Content-Type khi dùng FormData
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to create playlist");
  }

  return res.json();
};


/**
 * Cập nhật playlist (đổi tên, public/private, thumbnail...)
 * @param {string} playlistId
 * @param {object} payload - { name?, isPublic? }
 */
export const updatePlaylist = async (playlistId, payload) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const res = await fetch(`${API_BASE_URL}/common/playlist/${playlistId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};


/**
 * Xóa playlist theo ID
 * @param {string} playlistId
 */
export const deletePlaylist = async (playlistId) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Chưa đăng nhập");

  const res = await fetch(`${API_BASE_URL}/common/playlist/${playlistId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
};

