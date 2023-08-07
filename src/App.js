//import './App.css';
import db from './firebase';
import React from 'react';
import LoginPage from './Forms/LoginPage';
import SignUpModal from './Forms/SignUpModal';
import ForgetPassword from './Forms/ForgetPassword';
import { Route, Routes } from 'react-router-dom';
import Map from './Maps/Map';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/map" element={<Map />} />
      <Route path="/signup" element={<SignUpModal />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
    </Routes>
  );
}

export default App;
