import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/home/Home';
import Register from './pages/signup/Register';
import Login from './pages/signup/Login';
import MenuBar from './components/menu-item/menubar.component';

const App = () => {
  return (
    <BrowserRouter>
      <MenuBar />
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
