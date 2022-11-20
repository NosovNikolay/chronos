import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './App/hooks/useAuth';
import App from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// modal provider
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
