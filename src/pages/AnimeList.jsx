import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { useWatchlist } from "../context/WatchlistContext";

function AnimeList({ watchlistOnly = false }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const { watchlist } = useWatchlist();

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    setLoading(true);

    fetch(`https://api.jikan.moe/v4/anime?page=${page}&limit=12`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        const formatted = data.data.map((a) => ({
          id: a.mal_id,
          title: a.title,
          genres: a.genres.map((g) => g.name),
          score: a.score ?? 0,
        }));

        setAnimeList(formatted);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load anime data");
        setLoading(false);
      });
  }, [page]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;

  const genres = [...new Set(animeList.flatMap((a) => a.genres))];

  const filteredAnime = animeList.filter((anime) => {
    const matchesTitle = anime.title
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase());

    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((g) => anime.genres.includes(g));

    const matchesWatchlist = !watchlistOnly || watchlist.includes(anime.id);

    return matchesTitle && matchesGenre && matchesWatchlist;
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

      {/* Pagination */}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 12px" }}>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      {/* Anime list */}
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        {filteredAnime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default AnimeList;