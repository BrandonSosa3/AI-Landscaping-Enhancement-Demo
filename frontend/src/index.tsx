import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

{/* Main entry point of the React app, says take <App /> and render it inside the HTML page */}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

