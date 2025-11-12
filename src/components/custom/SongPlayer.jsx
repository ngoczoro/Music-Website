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

const SongPlayer = ({ songId }) => {
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(70);

  const audioRef = useRef(null);

  // 🔹 Gọi API lấy bài hát
  useEffect(() => {
    const loadSong = async () => {
      try {
        const data = await fetchSongById(songId);
        setSong(data);
      } catch (err) {
        console.error("Lỗi tải bài hát:", err);
      }
    };
    loadSong();
  }, [songId]);

  // 🔹 Reset trạng thái khi đổi bài hát
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [songId]);

  // 🔹 Lắng nghe event audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 🔹 Play / Pause
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

  // 🔹 Cập nhật thời gian khi kéo thanh tiến trình
  const handleSeek = (e) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // 🔹 Format thời gian
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 🔹 Chọn bài ngẫu nhiên
  const playRandomSong = () => {
    if (songList.length === 0) return;
    let random;
    do {
      random = songList[Math.floor(Math.random() * songList.length)];
    } while (random.id === song.id);

    if (onChangeSong) onChangeSong(random.id);
  };

  // 🔹 Skip Forward / Back
  const handleSkipForward = () => playRandomSong();
  const handleSkipBack = () => playRandomSong();

  if (!song) return <div>Đang tải bài hát...</div>;

  // 🔹 URL thực tế
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
          <button className="icon-btn">
            <Shuffle size={18} />
          </button>
          <button className="icon-btn">
            <SkipBack size={24} />
          </button>

          <button className="playsong-btn" onClick={togglePlay}>
            {isPlaying ? (
              <Pause color="white" size={26} />
            ) : (
              <Play color="white" size={26} />
            )}
          </button>

          <button className="icon-btn">
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

      {/* Thẻ audio */}
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
