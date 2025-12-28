import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function AnimeDetail() {
  const { id } = useParams();
  const { watchlist, toggleWatchlist } = useWatchlist();

  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        const a = data.data;
        setAnime({
          id: a.mal_id,
          title: a.title,
          genres: a.genres.map((g) => g.name),
          score: a.score ?? 0,
          synopsis: a.synopsis ?? "No synopsis available.",
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load anime");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;

  const isInWatchlist = watchlist.includes(anime.id);

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Back</Link>

      <h1>{anime.title}</h1>
      <p>
        <strong>Genres:</strong> {anime.genres.join(", ")}
      </p>
      <p>
        <strong>Score:</strong> ⭐ {anime.score}
      </p>

      <button onClick={() => toggleWatchlist(anime.id)}>
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>

      <p style={{ marginTop: 16 }}>{anime.synopsis}</p>
    </div>
  );
}

export default AnimeDetail;