import React, { useEffect, useState } from "react";
import "../../styles/theme.css";
import { fetchSongById } from "../../services/authService";

const LyricsPanel = ({ songId }) => {
  const [lyrics, setLyrics] = useState([]);
  const [songTitle, setSongTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!songId) return;

    const getLyrics = async () => {
      setLoading(true);
      setError("");
      try {
        const songData = await fetchSongById(songId);
        setLyrics(songData.lyrics || []);
        setSongTitle(songData.title || "");
      } catch (err) {
        console.error("Lỗi khi tải lyrics:", err);
        setError("Không thể tải lời bài hát.");
        setLyrics([]);
        setSongTitle("");
      } finally {
        setLoading(false);
      }
    };

    getLyrics();
  }, [songId]);

  if (!songId) {
    return <div className="lyrics-container">Chọn một bài hát để xem lời.</div>;
  }

  return (
    <div className="lyrics-container">
      <h2 className="lyrics-title">{songTitle || "Lyrics"}</h2>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="lyrics-scroll">
          <div className="lyrics-content">
            {lyrics.length > 0 ? (
              lyrics.map((line, index) => (
                <p key={index} className="lyrics-line">
                  {line || <br />} {/* Giữ khoảng trống giữa các đoạn */}
                </p>
              ))
            ) : (
              <p>Chưa có lời cho bài hát này.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LyricsPanel;
