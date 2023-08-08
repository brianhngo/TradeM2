import React from 'react';
import LoginPage from './Forms/LoginPage';

import Home from './components/Home';
import About from './components/About';

import SignUpModal from './Forms/SignUpModal';
import ForgetPassword from './Forms/ForgetPassword';
import { Route, Routes } from 'react-router-dom';
import User from './UserProduct/User'
import Maps from './Maps/Map';

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/signup" element={<SignUpModal />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/user" element={<User />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
