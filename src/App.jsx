import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AnimeList from "./pages/AnimeList";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12 }}>
        <Link to="/" style={{ marginRight: 12 }}>
          All Anime
        </Link>
        <Link to="/watchlist">Watchlist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="/watchlist" element={<AnimeList watchlistOnly />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;