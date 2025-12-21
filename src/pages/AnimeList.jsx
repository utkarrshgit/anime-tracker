import { useState } from "react";
import animeMock from "../data/animeMock";
import AnimeCard from "../components/AnimeCard";

function AnimeList() {
    const [query, setQuery] = useState("");

    const filteredAnime = animeMock.filter((anime) => 
        anime.title.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <div style={{ padding: 20 }}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, marginBottom: 16, width: 240 }}
      />

      <div style={{ display: "flex", gap: 16 }}>
        {filteredAnime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default AnimeList;