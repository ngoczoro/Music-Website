import React, { useEffect, useState } from "react";
import "../../styles/theme.css";
import { fetchSongById } from "../../services/authService";

const LyricsPanel = ({ songId, currentTime }) => {
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
        const result = await fetchSongById(songId);
        const song = result.data;

        setLyrics(song.lyrics || []);
        setSongTitle(song.title || "");
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

  // ⭐ Tính dòng lyric đang phát
  const lineDuration = 3; // mỗi dòng 3 giây
  const activeIndex = Math.floor(currentTime / lineDuration);

  // Chuyển LRC "[01:47.80] text" -> { time: 107.80, text: "text" }
  const parsedLyrics = lyrics.map((line) => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (!match) return { time: 0, text: line };
    const minutes = parseInt(match[1]);
    const seconds = parseFloat(match[2]);
    return { time: minutes * 60 + seconds, text: match[3].trim() };
  });

  return (
    <div className="lyrics-container">
      <h2 className="lyrics-title">{songTitle || "Lyrics"}</h2>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="lyrics-scroll">
          <div className="lyrics-content">
            {lyrics.length > 0 ? (
              parsedLyrics.map((item, index) => {
                const nextTime = parsedLyrics[index + 1]?.time || Infinity;
                const active =
                  currentTime >= item.time && currentTime < nextTime;

                return (
                  <p
                    key={index}
                    className={`lyrics-line ${active ? "active-line" : ""}`}
                  >
                    {item.text}
                  </p>
                );
              })
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
