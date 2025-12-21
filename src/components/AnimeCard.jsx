function AnimeCard({ anime, isInWatchlist, onToggle }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, width: 220 }}>
      <h3>{anime.title}</h3>
      <p>{anime.genres.join(", ")}</p>
      <p>⭐ {anime.score}</p>

      <button onClick={() => onToggle(anime.id)}>
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default AnimeCard;