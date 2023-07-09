import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Admin from './pages/Admin';
import Sales from './pages/Sales';
import Login from './pages/Login';

const App = () => (
  <Routes>
    <Route path="/" element={(<Login />)} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/sales" element={<Sales />} />
  </Routes>
);

export default App;
