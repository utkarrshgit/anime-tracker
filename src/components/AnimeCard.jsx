function AnimeCard({ anime }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, width: 220 }}>
      <h3>{anime.title}</h3>
      <p>{anime.genres.join(", ")}</p>
      <p>⭐ {anime.score}</p>
    </div>
  );
}

export default AnimeCard;