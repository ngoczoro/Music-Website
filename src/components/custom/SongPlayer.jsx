import React, { useState, useEffect } from "react";
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

const SongPlayer = () => {
  const albumCover =
    "https://weart.vn/wp-content/uploads/2025/06/meo-cute-voi-anh-mat-to-tron-dang-yeu.jpg";
  const title = "Midnight Dreams";
  const artist = "Luna Martinez";
  const duration = 264;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(89);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="songplayer-container">
      <img src={albumCover} alt={title} className="songplayer-cover" />

      <div className="songplayer-info">
        <h2 className="songplayer-title">{title}</h2>
        <p className="songplayer-artist">{artist}</p>

        {/* Hàng 1: Nút điều khiển */}
        <div className="control-row">
          <button className="icon-btn">
            <Shuffle size={18} />
          </button>
          <button className="icon-btn">
            <SkipBack size={24} />
          </button>

          <button
            className="playsong-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
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

        {/* Hàng 2: Thanh tiến trình */}
        <div className="songplayer-progress">
          <span className="time-text">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="progress-bar"
          />
          <span className="time-text">{formatTime(duration)}</span>
        </div>

        {/* Hàng 3: Heart + Volume */}
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
              onChange={(e) => setVolume(Number(e.target.value))}
              className="volume-bar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongPlayer;
