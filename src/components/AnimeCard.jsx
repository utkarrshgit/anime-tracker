import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import "./AnimeCard.css"

function AnimeCard({ anime }) {
  const { watchlist, toggleWatchlist, hydrated, saving } = useWatchlist();
  const isInWatchlist = watchlist.includes(anime.id);

  return (
    <div className="anime-card">
      <Link to={`/anime/${anime.id}`} className="anime-card__image-wrapper">
        <img
          src={anime.image}
          alt={anime.title}
          className="anime-card__image"
          loading="lazy"
        />
        <div className="anime-card__score">★ {anime.score}</div>
      </Link>

      <div className="anime-card__content">
        <h3 className="anime-card__title">{anime.title}</h3>
        <p className="anime-card__genres">
          {anime.genres.slice(0, 3).join(", ")}
        </p>

        <button
          className={`anime-card__btn ${isInWatchlist ? "remove" : "add"}`}
          onClick={() => toggleWatchlist(anime.id)}
          disabled={!hydrated || saving}
        >
          {saving ? "Saving…" : isInWatchlist ? "Remove" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}

export default AnimeCard;