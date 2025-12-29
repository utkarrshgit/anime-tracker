import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AnimeList from "./pages/AnimeList";
import AnimeDetail from "./pages/AnimeDetail";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <nav style={{ padding: 12 }}>
        <Link to="/" style={{ marginRight: 12 }}>
          All Anime
        </Link>
        <Link to="/watchlist">Watchlist</Link>

        {user ? (
          <button onClick={() => signOut(auth)}>Log out</button>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="/watchlist" element={<AnimeList watchlistOnly />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;