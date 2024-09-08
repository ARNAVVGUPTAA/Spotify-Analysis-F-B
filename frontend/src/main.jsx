import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import TopTracks from './pages/TopTracks.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TopTracks />
  </StrictMode>,
);
