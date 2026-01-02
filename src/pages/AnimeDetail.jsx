import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import "./AnimeDetail.css";

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
          image: a.images?.jpg?.image_url,
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
    <div className="app-container">
      <div className="anime-detail">
        <div className="anime-detail__poster">
          <img src={anime.image} alt={anime.title} />
        </div>

        <div className="anime-detail__info">
          <h1>{anime.title}</h1>
          <p>⭐ {anime.score}</p>
          <p>{anime.genres.join(", ")}</p>
          <button onClick={() => toggleWatchlist(anime.id)}>
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>

      <p className="anime-detail__synopsis">{anime.synopsis}</p>
    </div>
  );
}

export default AnimeDetail;