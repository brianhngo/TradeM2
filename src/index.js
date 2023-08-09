import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.js';

import Navbar from './components/Navbar.js';

const container = document.getElementById('App');
const root = createRoot(container);

root.render(
  <Router>
    <Navbar />
    <App />
  </Router>
);
