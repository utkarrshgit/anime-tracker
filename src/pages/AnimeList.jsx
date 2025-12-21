import { useEffect, useState } from "react";
import animeMock from "../data/animeMock";
import AnimeCard from "../components/AnimeCard";

function AnimeList() {
  const [query, setQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  // WATCHLIST STATE (IDs only)
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // sync watchlist to localStorage
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // unique genres
  const genres = [...new Set(animeMock.flatMap((a) => a.genres))];

  // toggle watchlist handler
  const toggleWatchlist = (id) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // filtering logic
  const filteredAnime = animeMock.filter((anime) => {
    const matchesTitle = anime.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((g) => anime.genres.includes(g));

    const matchWatchlist = 
      !showWatchlistOnly || watchlist.includes(anime.id);

    return matchesTitle && matchesGenre && matchWatchlist;
  });

  return (
    <div style={{ padding: 20 }}>
      {/* Search */}
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, marginBottom: 16, width: 240 }}
      />

      {/* Genre checkboxes */}
      <div style={{ marginBottom: 16 }}>
        {genres.map((g) => (
          <label key={g} style={{ marginRight: 12 }}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(g)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, g]);
                } else {
                  setSelectedGenres(
                    selectedGenres.filter((genre) => genre !== g)
                  );
                }
              }}
            />{" "}
            {g}
          </label>
        ))}
      </div>

      {/* Watchlist toggle */}
      <button
        onClick={() => setShowWatchlistOnly((prev) => !prev)}
        style={{ padding: 8, marginBottom: 16 }}
      >
        {showWatchlistOnly ? "Show all" : "Show Watchlist"}
      </button>

      {/* Anime list */}
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        {filteredAnime.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            isInWatchlist={watchlist.includes(anime.id)}
            onToggle={toggleWatchlist}
          />
        ))}
      </div>
    </div>
  );
}

export default AnimeList;