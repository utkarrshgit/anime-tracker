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
  const [characters, setCharacters] = useState([]);

  const [episodes, setEpisodes] = useState([]);
  const [episodePage, setEpisodePage] = useState(1);
  const [hasMoreEpisodes, setHasMoreEpisodes] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

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
          trailer: a.trailer?.url ?? null,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load anime");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
      .then((res) => res.json())
      .then(({ data }) => {
        const formatted = data.map((c) => {
          const jpVA = c.voice_actors.find((va) => va.language === "Japanese");
          const enVA = c.voice_actors.find((va) => va.language === "English");

          return {
            id: c.character.mal_id,
            name: c.character.name,
            image: c.character.images?.jpg?.image_url,
            role: c.role,
            jpVA: jpVA
              ? {
                  name: jpVA.person.name,
                  image: jpVA.person.images?.jpg?.image_url,
                }
              : null,
            enVA: enVA
              ? {
                  name: enVA.person.name,
                  image: enVA.person.images?.jpg?.image_url,
                }
              : null,
          };
        });

        setCharacters(formatted);
      })
      .catch(() => {
        setCharacters([]);
      });
  }, [id]);

  useEffect(() => {
    setEpisodes([]);
    setEpisodePage(1);
    setHasMoreEpisodes(true);
  }, [id]);

  useEffect(() => {
    if (!hasMoreEpisodes) return;

    setLoadingEpisodes(true);

    fetch(`https://api.jikan.moe/v4/anime/${id}/episodes?page=${episodePage}`)
      .then((res) => res.json())
      .then(({ data, pagination }) => {
        const formatted = data.map((e) => ({
          id: e.mal_id,
          number: e.mal_id,
          title: e.title || `Episode ${e.mal_id}`,
          url: e.url,
        }));

        setEpisodes((prev) => [...prev, ...formatted]);
        setHasMoreEpisodes(pagination.has_next_page);
      })
      .catch(() => {
        setHasMoreEpisodes(false);
      })
      .finally(() => {
        setLoadingEpisodes(false);
      });
  }, [id, episodePage]);

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

      {anime.trailer && (
        <p>
          <a href={anime.trailer} target="_blank" rel="noopener noreferrer">
            ▶ Watch Trailer
          </a>
        </p>
      )}

      {characters.length > 0 && (
        <section className="anime-characters">
          <h2>Characters</h2>

          <div className="character-grid">
            {characters.map((c) => (
              <div key={c.id} className="character-card">
                {c.image && <img src={c.image} alt={c.name} />}
                <p className="character-name">{c.name}</p>
                <p className="character-role">{c.role}</p>

                {c.jpVA && <p className="va">🇯🇵 {c.jpVA.name}</p>}
                {c.enVA && <p className="va">🇺🇸 {c.enVA.name}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="anime-episodes">
        <h2>Episodes</h2>

        <ul className="episode-list">
          {episodes.map((ep) => (
            <li key={ep.id} className="episode-item">
              <span>Episode {ep.number}</span>{" "}
              <a href={ep.url} target="_blank" rel="noopener noreferrer">
                {ep.title}
              </a>
            </li>
          ))}
        </ul>

        {loadingEpisodes && <p>Loading episodes…</p>}

        {hasMoreEpisodes && !loadingEpisodes && (
          <button onClick={() => setEpisodePage((p) => p + 1)}>
            Load more
          </button>
        )}
      </section>
      
    </div>
  );
}

export default AnimeDetail;