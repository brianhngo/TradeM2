import React from 'react';
import ReactDOM from 'react-dom';

import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import { Provider } from "react-redux";
import App from "./App.js";
import LoginPage from "./Forms/LoginPage.js";
import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";
import About from "./components/About.js";
import Map from "./components/Map.js";
const container = document.getElementById("App");
const root = createRoot(container);


root.render(
  <Router>
    <Navbar />
    <App />
  </Router>
);
