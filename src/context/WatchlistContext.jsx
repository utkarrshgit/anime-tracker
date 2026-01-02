import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load watchlist when user changes
  useEffect(() => {
    if (!user) {
      setWatchlist([]);
      setHydrated(false);
      return;
    }

    setHydrated(false);

    const load = async () => {
      const ref = doc(db, "watchlists", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setWatchlist(snap.data().animeIds || []);
      } else {
        const local = localStorage.getItem("watchlist");
        const parsed = local ? JSON.parse(local) : [];

        if (parsed.length > 0) {
          setWatchlist(parsed);
        } else {
          setWatchlist([]);
        }
      }

      setHydrated(true);
    };

    load();
  }, [user]);

  // Save watchlist ONLY after hydration
  useEffect(() => {
    if (!user || !hydrated) return;

    const save = async () => {
      setSaving(true);
      const ref = doc(db, "watchlists", user.uid);
      await setDoc(ref, { animeIds: watchlist });
      setSaving(false);
    };

    save();
  }, [watchlist, user, hydrated]);

  const toggleWatchlist = (id) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, hydrated, saving }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}