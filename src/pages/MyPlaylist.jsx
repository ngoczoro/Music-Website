import React, { useEffect, useState } from "react";

const MyPlaylist = () => {
  const [playlists, setPlaylists] = useState([]); // lưu toàn bộ playlists từ backend
  const [currentPage, setCurrentPage] = useState(1); // trang hiện tại
  const playlistsPerPage = 8; // số playlist hiển thị mỗi trang
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🧭 Địa chỉ backend API
  const API_URL = "http://localhost:8081/api/playlists";
  // ⚠️ Sau khi deploy, bạn chỉ cần thay bằng URL thật trên Render, ví dụ:
  // const API_URL = "https://musicwebapp-backend.onrender.com/api/playlists";

  // 🧩 Gọi API backend khi load trang
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch playlists");
        const data = await res.json();
        setPlaylists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  // 🧮 Tính toán phân trang
  const indexOfLast = currentPage * playlistsPerPage;
  const indexOfFirst = indexOfLast - playlistsPerPage;
  const currentPlaylists = playlists.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(playlists.length / playlistsPerPage);

  // 🧭 Xử lý khi nhấn nút chuyển trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <p className="p-10 text-gray-500">Loading playlists...</p>;
  if (error) return <p className="p-10 text-red-500">Error: {error}</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-white border-r p-5 flex flex-col">
        <div className="text-2xl font-bold mb-8">🎵 Logo</div>
        <div className="flex-1 space-y-8">
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Discover</h3>
            <ul className="space-y-2">
              <li>🏠 Home</li>
              <li>👩‍🎤 Artist</li>
              <li>🎧 Genre</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">Library</h3>
            <ul className="space-y-2">
              <li>🕒 Recent</li>
              <li>❤️ Favourite</li>
              <li className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-md">
                🎶 Playlist
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-2">More</h3>
            <ul className="space-y-2">
              <li>📝 Apply for Artist</li>
              <li>👤 Account</li>
              <li>🔓 Logout</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h2 className="text-lg font-semibold text-blue-600 mb-4">
          Your Playlist
        </h2>

        <select className="border rounded px-3 py-2 mb-6">
          <option>Recently added</option>
          <option>A-Z</option>
        </select>

        {/* Grid hiển thị playlist */}
        {currentPlaylists.length === 0 ? (
          <p className="text-gray-500">You don’t have any playlists yet.</p>
        ) : (
          <div className="grid grid-cols-4 gap-8">
            {currentPlaylists.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg p-3 hover:shadow-md transition"
              >
                <img
                  src={p.image || "https://via.placeholder.com/150"}
                  alt={p.name}
                  className="rounded-lg mb-2 w-full h-48 object-cover"
                />
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">{p.owner}</p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlaylist;
