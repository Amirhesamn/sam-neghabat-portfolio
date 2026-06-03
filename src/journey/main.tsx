import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './fonts/fonts.css';
import './journey.css';
import { Journey } from './Journey';

createRoot(document.getElementById('journey-root')!).render(
  <StrictMode>
    <Journey />
  </StrictMode>,
);
