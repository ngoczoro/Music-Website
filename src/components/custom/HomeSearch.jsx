import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchSongs } from "../../services/searchService";
import { MusicCard } from "./MusicCard";

export default function HomeSearch() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearching(true);
        const data = await searchSongs(keyword);
        setResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <div className="profile-search-bar">
      <div className="search-container">
        <img
          src="./src/assets/icon/search.svg"
          alt="Search"
          className="search-icon"
        />
        <input
          type="text"
          placeholder="Enter song title, artist name to search..."
          className="profile-search-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* KẾT QUẢ SEARCH */}
      {keyword && (
        <div className="profile-search-horizontal">
          {searching && <div>Searching...</div>}

          {!searching &&
            results.map((song) => (
              <MusicCard
                key={song.id}
                title={song.title}
                artist={song.artistName}
                imageUrl={song.coverImageUrl}
                duration={song.duration}
                onMouseDown={() => {
                  navigate(`/song/${song.id}`, {
                    state: { autoplay: true },
                  });
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}
