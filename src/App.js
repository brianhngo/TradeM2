//import './App.css';
import db from './firebase';
import React from 'react';
import LoginPage from './Forms/LoginPage';
import Home from './components/Home';
import About from './components/About';
import Map from './components/Map';
import { Route, Routes } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SignUpModal from './Forms/SignUpModal';
import ForgetPassword from './Forms/ForgetPassword';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <>
   
    <div className="App">
     

      <Routes>

        <Route path="*" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />

      <Route path="/signup" element={<SignUpModal />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
        
      </Routes>

   
    </div>
   
    </>
   
     
  );
}

export default App;