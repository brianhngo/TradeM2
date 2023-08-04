import React from "react";
import ReactDOM from "react-dom";

import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import App from "./App.js";

const container = document.getElementById("App");
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/login" element={<App />} />
    </Routes>
  </Router>
);
