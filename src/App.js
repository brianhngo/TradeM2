import React from 'react';
import LoginPage from './Forms/LoginPage';

import Home from './components/Home';
import About from './components/About';


import SignUpModal from './Forms/SignUpModal';
import ForgetPassword from './Forms/ForgetPassword';
import { Route, Routes } from 'react-router-dom';
import User from './UserProduct/User';
import UserProfile from './UserProfile/UserProfile';
import Maps from './Maps/Map';
import AllProducts from './components/AllProducts';


function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/map" element={<Maps />} />
      <Route path="/signup" element={<SignUpModal />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/user" element={<User />} />
      <Route path="*" element={<Home />} />
      <Route path="/products" element={<AllProducts />} />
    </Routes>
  );
}

export default App;
