import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from './components/views/landingPage/LandingPage';
import NavBar from './components/views/navBar/NavBar';
import LoginPage from './components/views/loginPage/LoginPage';
import LegisterPage from './components/views/legisterPage/LegisterPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar className="App-header"/>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<LegisterPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
