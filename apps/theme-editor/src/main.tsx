import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { loadFont } from './app/utils/loadFont';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Preload the default font
loadFont('Roboto');

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
