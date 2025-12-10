import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
  Repeat,
  Shuffle,
} from "lucide-react";
import "../../styles/theme.css";
import { fetchSongById } from "../../services/musicService";

async function sendListeningHistory(songId) {
  try {
    await fetch("http://localhost:8081/api/common/song/listening-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ songId: String(songId) }),
    });
  } catch (err) {
    console.warn("Không thể lưu lịch sử nghe:", err);
  }
}

const SongPlayer = ({ songId, songList = [], onChangeSong, onTimeUpdate }) => {
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef(null);
  const sentHistoryRef = useRef(false); // chỉ gửi 1 lần / bài

  useEffect(() => {
    const loadSong = async () => {
      try {
        const { data } = await fetchSongById(songId);
        setSong(data);
      } catch (err) {
        console.error("Lỗi tải bài hát:", err);
      }
    };
    if (songId) loadSong();
  }, [songId]);

  // Reset khi đổi bài hát
  useEffect(() => {
    if (!audioRef.current) return;
    sentHistoryRef.current = false; // reset flag

    const audio = audioRef.current;
    audio.onloadedmetadata = () => setDuration(audio.duration || 0);
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);

    return () => {
      audio.onloadedmetadata = null;
      audio.ontimeupdate = null;
    };
  }, [songId]);

  // Gán src mỗi khi đổi bài
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = `http://localhost:8081/api/common/song/stream/${songId}`;
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [songId]);

  // Lắng nghe audio & gửi history khi nghe >= 50%
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (onTimeUpdate) onTimeUpdate(audio.currentTime);

      if (
        !sentHistoryRef.current &&
        audio.duration > 0 &&
        audio.currentTime >= audio.duration * 0.5
      ) {
        sentHistoryRef.current = true;
        sendListeningHistory(song.id); // chỉ bắn 1 lần
      }
    };

    const handleLoaded = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (isShuffle) handleShuffle();
      else handleSkipForward();
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [songId, song, isShuffle, songList]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Trình duyệt chặn phát tự động:", err);
      }
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleShuffle = () => {
    if (!songList.length || !onChangeSong) return;
    const filtered = songList.filter((s) => s.id !== song.id);
    const randomSong = filtered[Math.floor(Math.random() * filtered.length)];
    if (randomSong) onChangeSong(randomSong.id);
  };

  const handleSkipForward = () => {
    if (!songList.length || !onChangeSong) return;
    const currentIndex = songList.findIndex((s) => s.id === song.id);
    const nextIndex = (currentIndex + 1) % songList.length;
    onChangeSong(songList[nextIndex].id);
  };

  const handleSkipBack = () => {
    if (!songList.length || !onChangeSong) return;
    const currentIndex = songList.findIndex((s) => s.id === song.id);
    const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
    onChangeSong(songList[prevIndex].id);
  };

  if (!song) return <div>Đang tải bài hát...</div>;

  const audioUrl = `http://localhost:8081/api/common/song/stream/${song.id}`;
  const coverUrl = song.coverImageUrl?.startsWith("http")
    ? song.coverImageUrl
    : `http://localhost:8081${
        song.coverImageUrl || "/uploads/default-cover.jpg"
      }`;

  return (
    <div className="songplayer-container">
      <img src={coverUrl} alt={song.title} className="songplayer-cover" />

      <div className="songplayer-info">
        <h2 className="songplayer-title">{song.title}</h2>
        <p className="songplayer-artist">{song.artistName}</p>

        <div className="control-row">
          <button
            className={`icon-btn ${isShuffle ? "active" : ""}`}
            onClick={() => setIsShuffle(!isShuffle)}
          >
            <Shuffle size={18} />
          </button>

          <button className="icon-btn" onClick={handleSkipBack}>
            <SkipBack size={24} />
          </button>

          <button className="playsong-btn" onClick={togglePlay}>
            {isPlaying ? (
              <Pause color="white" size={26} />
            ) : (
              <Play color="white" size={26} />
            )}
          </button>

          <button className="icon-btn" onClick={handleSkipForward}>
            <SkipForward size={24} />
          </button>

          <button className="icon-btn">
            <Repeat size={18} />
          </button>
        </div>

        <div className="songplayer-progress">
          <span className="time-text">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
          />
          <span className="time-text">{formatTime(duration)}</span>
        </div>

        <div className="bottom-row">
          <div style={{ flex: 1 }} />
          <button
            className={`icon-btn ${isFavorite ? "liked" : ""}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart fill={isFavorite ? "#ff0000" : "none"} size={22} />
          </button>
          <div className="volume-control">
            <Volume2 size={18} />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                const newVol = Number(e.target.value);
                setVolume(newVol);
                if (audioRef.current) audioRef.current.volume = newVol / 100;
              }}
              className="volume-bar"
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default SongPlayer;
