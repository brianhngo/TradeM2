//import './App.css';
import db from './firebase';
import React from 'react';
import LoginPage from './Forms/LoginPage';
import { Route, Routes } from 'react-router-dom';
import User from './component/User'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
