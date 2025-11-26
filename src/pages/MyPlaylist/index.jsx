import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/custom/Sidebar";
import { ProfileHeader } from "../../components/custom/ProfileHeader";
import { PlaylistList } from "../../components/custom/PlaylistList";
import { SongList } from "../../components/custom/SongList";
import { ArtistList } from "../../components/custom/ArtistList";
import Breadcrumb from "../components/Breadcrumb";
import "../../styles/theme.css";

const MyPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const playlistsPerPage = 8;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Kiểm tra trạng thái đăng nhập
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 🧭 API backend
  const API_URL = "http://localhost:8081/api/playlists";

  useEffect(() => {
    if (!user || !token) {
      setLoading(false); // không fetch nếu là guest
      return;
    }

    const fetchPlaylists = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [user, token]);

  // 🧮 Pagination
  const indexOfLast = currentPage * playlistsPerPage;
  const indexOfFirst = indexOfLast - playlistsPerPage;
  const currentPlaylists = playlists.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(playlists.length / playlistsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <p className="p-10 text-gray-500">Loading playlists...</p>;
  if (error) return <p className="p-10 text-red-500">Error: {error}</p>;

  // 🧱 Nếu Guest → hiển thị lời mời đăng nhập
  // if (!user || !token) {
  //   return (
  //     <div className="flex h-screen items-center justify-center flex-col text-center">
  //       <h2 className="text-2xl font-semibold text-gray-700 mb-4">
  //         You are not logged in
  //       </h2>
  //       <p className="text-gray-500 mb-6">
  //         Please log in to view your playlists and save your favorite songs.
  //       </p>
  //       <a
  //         href="/login"
  //         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  //       >
  //         Go to Login
  //       </a>
  //     </div>
  //   );
  // }

  // 🧱 Nếu là User → hiển thị danh sách playlist
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

        {currentPlaylists.length === 0 ? (
          <p className="text-gray-500">You don’t have any playlists yet.</p>
        ) : (
          <div className="grid grid-cols-4 gap-8">
            {currentPlaylists.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/playlists/${p._id}`)} // 👉 chuyển đến PlaylistDetail
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
