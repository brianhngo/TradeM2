//import './App.css';
import db from './firebase';
import React from 'react';
import LoginPage from './Forms/LoginPage';
import SignUpModal from './Forms/SignUpModal';
import ForgetPassword from './Forms/ForgetPassword';
import { Route, Routes } from 'react-router-dom';
import User from './UserProduct/User'
import ProductForm from './UserProduct/ProductForm'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpModal />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/user/:userId" element={<User />} />
      <Route path="/productForm" element={ProductForm} />
    </Routes>
  );
}

export default App;
