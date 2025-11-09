import React from "react";
import "../../styles/theme.css";

const LyricsPanel = () => {
  // ✅ Dữ liệu lyrics tĩnh (với xuống dòng)
  const lyrics = `Dancing through these midnight dreams.

In the midnight dreams we share,
Nothing else can compare,
Hold me close and never let go,
In this moment, let love flow.

When the morning comes around,
And our feet touch solid ground,
I'll still hear that sweet sound,
Of our midnight dreams.

Every heartbeat echoes loud,
Breaking through the silent crowd,
Your voice is like a melody,
That sets my spirit free.`;

  return (
    <div className="lyrics-container">
      <h2 className="lyrics-title">Lyrics</h2>

      <div className="lyrics-scroll">
        <div className="lyrics-content">
          {lyrics.split("\n").map((line, index) => (
            <p key={index} className="lyrics-line">
              {line || <br />} {/* Giữ khoảng trống giữa các đoạn */}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LyricsPanel;
