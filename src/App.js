import React from 'react';
import LoginPage from './Forms/LoginPage';
import Home from './components/Home';
import About from './components/About';
import SignUpModal from './Forms/SignUpModal';
import ForgetPassword from './Forms/ForgetPassword';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile/UserProfile';
import Maps from './Maps/Map';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct/SingleProduct';
import UserProducts from './components/UserProducts';
import Messenger from './components/Messenger/Messenger';
function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/userproducts" element={<UserProducts />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/map" element={<Maps />} />
      <Route path="/signup" element={<SignUpModal />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/chat" element={<Messenger />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/singleproduct/:id" element={<SingleProduct />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
