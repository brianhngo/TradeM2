import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import App from './App.js';

const container = document.getElementById('App');
const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
