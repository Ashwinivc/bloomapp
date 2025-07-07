import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGA } from './utils/analytics';

// Initialize Google Analytics
// Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics Measurement ID
// Example: 'G-XXXXXXXXXX' for GA4 or 'UA-XXXXXXXXX-X' for Universal Analytics
initGA();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
