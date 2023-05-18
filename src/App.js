import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FavList from './components/FavList';
import './App.css';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavList />} />
      </Routes>
    </Router>
  );
};

export default App;
