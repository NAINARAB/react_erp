import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './comp/header/header';
import Login from './comp/login/login';
import Sidenav from './comp/sidenav/sidenav';
import Home from './comp/home/home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route exact path="/"  element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/sidenav" element={<Sidenav />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
