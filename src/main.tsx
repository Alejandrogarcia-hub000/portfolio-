// Ensure window.fetch is writable and configurable in all environments
(function() {
  try {
    if (typeof window !== 'undefined') {
      let _fetch = window.fetch ? window.fetch.bind(window) : undefined;
      try {
        Object.defineProperty(window, 'fetch', {
          configurable: true,
          enumerable: true,
          get() { return _fetch; },
          set(val) { _fetch = val; }
        });
      } catch {}
      if (typeof Window !== 'undefined' && Window.prototype) {
        try {
          Object.defineProperty(Window.prototype, 'fetch', {
            configurable: true,
            enumerable: true,
            get() { return _fetch; },
            set(val) { _fetch = val; }
          });
        } catch {}
      }
    }
  } catch {}
})();

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </BrowserRouter>
  </StrictMode>
);
