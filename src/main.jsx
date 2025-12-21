import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WatchlistProvider } from "./context/WatchlistContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </StrictMode>,
)
