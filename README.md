# 🎌 Anime Tracker

A modern anime browsing web app with search, filters, infinite scroll, watchlist, and detailed anime pages — built with **React** and a real public API.
<br><br>
🔗 Live Demo: `https://anime-tracker-sigma.vercel.app`

---

## ✨ Features

- 🔍 Browse anime with infinite scroll
- ⏱️ Debounced search by title
- 🏷️ Multi-genre filtering
- 🔐 User authentication (Email/Password & Google)
- ⭐ Personal watchlist per user
- ☁️ Watchlist persisted with Firestore
- 📌 Dedicated Watchlist view (protected)
- 📄 Anime detail pages (`/anime/:id`)
- 🧭 Client-side routing
- ⚠️ Graceful handling of API rate limits
- 🧼 Clean loading and empty states

---

## 🛠️ Tech Stack

- ⚛️ Frontend: React (Vite)
- 🧭 Routing: React Router
- 🧠 State Management: React Context
- 🔐 Authentication: Firebase Auth
- ☁️ Database: Firestore
- 🌐 Data Source: Jikan API (MyAnimeList)
- 🎨 Styling: Minimal inline CSS
- 🚀 Hosting: Vercel

---

## 📸 Screenshots

_(will be added later)_

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v18+ recommended)
- npm

### 📦 Installation

```bash
git clone https://github.com/your-username/anime-tracker.git
cd anime-tracker
npm install
npm run dev
```

Open in browser:<br>
👉 `http://localhost:5173`

---

## 🗂️ Project Structure

```
src/
 ├─ components/
 │   └─ AnimeCard.jsx
 ├─ context/
 │   └─ WatchlistContext.jsx
 ├─ pages/
 │   ├─ AnimeList.jsx
 │   └─ AnimeDetail.jsx
 ├─ App.jsx
 └─ main.jsx
```

---

## 🧩 Key Design Decisions

- 🧠 **Context over prop drilling** for watchlist state
- 🏗️ **Frontend-first architecture** before backend
- 🆔 **ID-based watchlist** for minimal persistence
- ♻️ **Deduplicated infinite scroll** to handle API overlap
- ⚖️ **Minimal error handling** for public API rate limits

---

## ⚠️ Known Limitations

- 🌐 Uses a **public API** with rate limits
- 📱 Watchlist is **device-local** (no user accounts yet)
- 🎯 UI intentionally minimal (focus on logic & architecture)

---

## 💡 Why This Project

This project demonstrates:<br>

- ✅ Real-world React architecture
- 🔄 Handling async data & pagination
- 🧩 Scalable state management patterns
- 🧭 Routing and dynamic pages
- 🐞 Production-style debugging and iteration

---

## 📦 Versions

- **v1.0-frontend**  
  Core browsing experience with routing and infinite scroll

- **v1.1-auth-firestore**  
  Authentication and persistent per-user watchlist

- **v1.2-watchlist-architecture**  
  Dedicated watchlist page with ID-based fetching

- **v1.4-feature-complete**  
  Anime details enriched with characters, voice actors, trailers, and episodes
