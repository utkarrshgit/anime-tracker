import animeMock from "../data/animeMock";
import AnimeCard from "../components/AnimeCard";

function AnimeList() {
  return (
    <div style={{ display: "flex", gap: 16, padding: 20 }}>
      {animeMock.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}

export default AnimeList;