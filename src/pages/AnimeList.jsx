import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";

function AnimeList() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // debounce search
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  // fetch data
  useEffect(() => {
    const isFirstPage = page === 1;

    if (isFirstPage) {
      setInitialLoading(true);
    } else {
      setLoadingMore(true);
    }

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

        setAnimeList((prev) => {
          const map = new Map(prev.map((a) => [a.id, a]));
          formatted.forEach((a) => map.set(a.id, a));
          return Array.from(map.values());
        });

        setHasMore(data.pagination.has_next_page);
      })
      .catch(() => {
        if (page === 1) {
          setError("Failed to load anime data");
        }
      })
      .finally(() => {
        setInitialLoading(false);
        setLoadingMore(false);
      });
  }, [page]);

  // infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (nearBottom && !loadingMore && hasMore) {
        setPage((p) => p + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);

  if (initialLoading && error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }
  if (initialLoading) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }
  if (error) return <p style={{ padding: 20 }}>{error}</p>;

  const genres = [...new Set(animeList.flatMap((a) => a.genres))];

  // filtering logic
  const filteredAnime = animeList.filter((anime) => {
    const matchesTitle = anime.title
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase());

    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((g) => anime.genres.includes(g));

    return matchesTitle && matchesGenre;
  });

  const noResults = filteredAnime.length === 0;

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

      {/* Empty states */}
      {noResults && (
        <p style={{ marginTop: 16 }}>No anime match your search or filters.</p>
      )}

      {/* Anime list */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {filteredAnime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {/* Bottom indicators */}
      {loadingMore && <p style={{ marginTop: 16 }}>Loading more...</p>}
      {!hasMore && <p style={{ marginTop: 16 }}>No more anime</p>}
    </div>
  );
}

export default AnimeList;