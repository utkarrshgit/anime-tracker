# 🎌 Anime Tracker

A modern anime browsing web app with search, filters, infinite scroll, watchlist, and detailed anime pages — built with **React** and a real public API.
<br><br>
🔗 Live Demo: https://your-app.vercel.app

---

## ✨ Features

- 📜 Browse anime with **infinite scroll**
- 🔍 **Debounced search** by title
- 🏷️ **Multi-genre filtering**
- ⭐ **Watchlist** (persistent via localStorage)
- 📌 Dedicated **Watchlist view**
- 📄 **Anime detail pages** (`/anime/:id`)
- 🧭 Client-side routing
- 🚦 Graceful handling of API rate limits
- 🧼 Clean empty and loading states

---

## 🛠️ Tech Stack

- ⚛️ **Frontend:** React (Vite)
- 🧭 **Routing:** React Router
- 🧠 **State Management:** React Context
- 📡 **Data Source:** Jikan API (MyAnimeList)
- 🎨 **Styling:** Inline CSS (minimal, functional)
- 💾 **Persistence:** localStorage

---

## 📸 Screenshots

_(will be added shortly)_

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
👉 http://localhost:5173

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

- 🧠 Context over prop drilling for watchlist state
- 🏗️ Frontend-first architecture before backend
- 🆔 ID-based watchlist for minimal persistence
- ♻️ Deduplicated infinite scroll to handle API overlap
- ⚖️ Minimal error handling for public API rate limits

---

## ⚠️ Known Limitations

- 🌐 Uses a public API with rate limits
- 📱 Watchlist is device-local (no user accounts yet)
- 🎯 UI intentionally minimal (focus on logic & architecture)

---

## 🗺️ Roadmap

- 🔐 Backend with authentication
- ☁️ Persist watchlist per user
- 🚦 API proxy & caching
- 👀 IntersectionObserver for smoother infinite scroll
- 🌙 UI polish (dark mode, skeleton loaders)

---

## 💡 Why This Project

- ✅ Real-world React architecture
- 🔄 Handling async data & pagination
- 🧩 Scalable state management patterns
- 🧭 Routing and dynamic pages
- 🐞 Production-style debugging and iteration

---
