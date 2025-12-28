import { useWatchlist } from "../context/WatchlistContext";
import { Link } from "react-router-dom";

function AnimeCard({ anime }) {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const isInWatchlist = watchlist.includes(anime.id);

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, width: 220 }}>
      <h3>
        <Link to={`/anime/${anime.id}`}>{anime.title}</Link>
      </h3>
      <p>{anime.genres.join(", ")}</p>
      <p>⭐ {anime.score}</p>

      <button onClick={() => toggleWatchlist(anime.id)}>
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default AnimeCard;