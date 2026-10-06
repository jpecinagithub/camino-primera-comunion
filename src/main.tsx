import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './index.css';
import App from './App.tsx';
import { trackPwaInstalled } from './analytics';

// La app se instaló como PWA (evento del navegador, una sola vez por instalación).
window.addEventListener('appinstalled', () => {
  trackPwaInstalled();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
