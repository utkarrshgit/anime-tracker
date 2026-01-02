import { useEffect, useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import AnimeCard from "../components/AnimeCard";

function Watchlist() {
  const { watchlist } = useWatchlist();
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (watchlist.length === 0) {
        setAnime([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          watchlist.map((id) =>
            fetch(`https://api.jikan.moe/v4/anime/${id}`)
              .then((r) => {
                if (!r.ok) throw new Error("fetch failed");
                return r.json();
              })
              .then((j) => j.data)
          )
        );

        if (!cancelled) setAnime(results);
      } catch (e) {
        if (!cancelled) setError("Failed to load watchlist");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [watchlist]);

  if (loading) return <p style={{ padding: 20 }}>Loading watchlist…</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;
  if (anime.length === 0)
    return <p style={{ padding: 20 }}>Your watchlist is empty.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Watchlist</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {anime.map((a) => (
          <AnimeCard
            key={a.mal_id}
            anime={{
              id: a.mal_id,
              title: a.title,
              genres: a.genres.map((g) => g.name),
              score: a.score ?? 0,
              image: a.images?.jpg?.image_url,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Watchlist;