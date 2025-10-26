import React from "react";

const MyPlaylist = () => {
  const playlists = Array(8).fill({
    image: "https://i.imgur.com/3GvwNBf.jpeg", // ảnh mẫu
    name: "Name of playlist",
    owner: "name of owner",
  });

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

        {/* Playlist grid */}
        <div className="grid grid-cols-4 gap-8">
          {playlists.map((p, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 hover:shadow-md transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="rounded-lg mb-2 w-full h-48 object-cover"
              />
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">{p.owner}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPlaylist;
