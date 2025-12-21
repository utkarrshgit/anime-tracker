import { useState } from "react";
import animeMock from "../data/animeMock";
import AnimeCard from "../components/AnimeCard";

function AnimeList() {
    const [query, setQuery] = useState("");
		const [genre, setGenre] = useState("All");

		const genres = ["All", ...new Set(animeMock.flatMap(a => a.genres))];

    const filteredAnime = animeMock.filter((anime) => {
			const matchesTitle = anime.title
        .toLowerCase()
        .includes(query.toLowerCase());
			
			const matchesGenre = 
				genre === "All" || anime.genres.includes(genre);

			return matchesTitle && matchesGenre;
		}
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

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        style={{ padding: 8 }}
      >
				{genres.map((g) => (
					<option key={g} value={g}>
						{g}
					</option>
				))}
			</select>

      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        {filteredAnime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default AnimeList;