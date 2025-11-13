import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongPlayer from "../../components/custom/SongPlayer";
import LyricsPanel from "../../components/custom/LyricsPanel";
import ArtistInfoPanel from "../../components/custom/ArtistInfoPanel";
import { fetchSongById } from "../../services/authService";
import "../../styles/theme.css";

const SongDetail = () => {
  const { id } = useParams(); // songId từ URL
  const [song, setSong] = useState(null);

  useEffect(() => {
    const loadSong = async () => {
      try {
        const data = await fetchSongById(id);
        console.log("✅ Song data:", data);

        // Trường hợp artistId là object (ObjectId Mongo) => cần lấy _id
        const fixedData = {
          ...data,
          artistId:
            typeof data.artistId === "object"
              ? data.artistId._id || data.artistId.id
              : data.artistId,
        };

        setSong(fixedData);
      } catch (err) {
        console.error("❌ Lỗi khi fetch song:", err.message);
      }
    };

    if (id) loadSong();
  }, [id]);

  if (!song)
    return (
      <div style={{ textAlign: "center" }}>Đang tải thông tin bài hát...</div>
    );

  return (
    <div
      className="songdetail-container"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* Phần player */}
      <div className="songplayer-section">
        <SongPlayer songId={song.id || id} />
      </div>

      {/* Phần lyric + artist */}
      <div
        className="panel-section"
        style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
      >
        <LyricsPanel songId={song.id || id} />

        <ArtistInfoPanel
          artistId={song.artistId}
          topSongs={song.topSongs || []}
          artistData={{
            fullName: song.artistName || "Nghệ sĩ chưa xác định",
            avatarUrl:
              song.coverImageUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            bio: song.description || "Không có mô tả.",
          }}
        />
      </div>
    </div>
  );
};

export default SongDetail;
