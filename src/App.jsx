import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AnimeList from "./pages/AnimeList";
import AnimeDetail from "./pages/AnimeDetail";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <nav style={{ padding: 12 }}>
        <Link to="/" style={{ marginRight: 12 }}>
          All Anime
        </Link>

        {user ? (
          <Link to="/watchlist" style={{ marginRight: 12 }}>
            Watchlist
          </Link>
        ) : (
          <span style={{ marginRight: 12, opacity: 0.5 }}>Watchlist</span>
        )}

        {user ? (
          <button onClick={() => signOut(auth)}>Log out</button>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <AnimeList watchlistOnly />
            </ProtectedRoute>
          }
        />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;