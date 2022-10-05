import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppState from './Context/AppState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppState>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppState>

);