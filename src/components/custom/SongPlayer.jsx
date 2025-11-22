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
import { fetchSongById } from "../../services/authService";

const SongPlayer = ({ songId, songList = [], onChangeSong, onTimeUpdate }) => {
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef(null);

  // 🟢 Gọi API lấy bài hát
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

  // 🟢 Reset khi đổi bài hát
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    audio.src = `http://localhost:8081/api/common/song/stream/${songId}`;

    audio.load(); // ⭐ Quan trọng nhất
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {});
  }, [songId]);

  // 🟢 Lắng nghe audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (onTimeUpdate) onTimeUpdate(audio.currentTime); // ⭐ Gửi thời gian ra ngoài
    };
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else {
        handleSkipForward();
      }
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isShuffle, songList]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = `http://localhost:8081/api/common/song/stream/${songId}`;
      audioRef.current.load(); // ⭐ BẮT BUỘC
      audioRef.current.play().catch(() => {});
    }
  }, [songId]);

  // 🟢 Play / Pause
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

  // 🟢 Cập nhật thời gian khi kéo thanh tiến trình
  const handleSeek = (e) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // 🟢 Định dạng thời gian
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 🟢 Phát ngẫu nhiên bài
  const handleShuffle = () => {
    if (!songList.length || !onChangeSong) return;
    const filtered = songList.filter((s) => s.id !== song.id);
    const randomSong = filtered[Math.floor(Math.random() * filtered.length)];
    if (randomSong) onChangeSong(randomSong.id);
  };

  // 🟢 Skip Forward
  const handleSkipForward = () => {
    if (!songList.length || !onChangeSong) return;
    const currentIndex = songList.findIndex((s) => s.id === song.id);
    const nextIndex = (currentIndex + 1) % songList.length;
    onChangeSong(songList[nextIndex].id);
  };

  // 🟢 Skip Back
  const handleSkipBack = () => {
    if (!songList.length || !onChangeSong) return;
    const currentIndex = songList.findIndex((s) => s.id === song.id);
    const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
    onChangeSong(songList[prevIndex].id);
  };

  if (!song) return <div>Đang tải bài hát...</div>;

  // 🟢 URL thực tế
  const audioUrl = `http://localhost:8081/api/common/song/stream/${song.id}`;
  const coverUrl = `http://localhost:8081${song.coverImageUrl}`;

  return (
    <div className="songplayer-container">
      <img src={coverUrl} alt={song.title} className="songplayer-cover" />

      <div className="songplayer-info">
        <h2 className="songplayer-title">{song.title}</h2>
        <p className="songplayer-artist">{song.artistName}</p>

        {/* Bộ điều khiển */}
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

        {/* Thanh tiến trình */}
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

        {/* Heart + Volume */}
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

      {/* Audio */}
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
